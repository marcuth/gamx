import Observable from "../common/observable"

export type AnyObjectType = HTMLImageElement | HTMLAudioElement | HTMLVideoElement

export type ResourceItem = {
    id: string
    source: string
    loadEventName?: string
    object: AnyObjectType
}

export type LoadResourceCallback = () => any

export type EventListenerToDestroy = {
    element: HTMLElement
    eventName: string
    callback: EventListener
}

function loadResource(resource: ResourceItem, loader: ResourceLoader, callback: LoadResourceCallback): void {
    resource.object.src = resource.source

    function eventListener(event: any) {
        callback()
    }

    if (!resource.loadEventName) resource.loadEventName = "load"

    resource.object.addEventListener(resource.loadEventName, eventListener)
    loader.addToDestroyList(resource.object, resource.loadEventName, eventListener)
}

class ResourceLoader extends Observable {
    public readonly resources: ResourceItem[]
    private elementsToDestroy: HTMLElement[]
    private eventListenersToDestroy: EventListenerToDestroy[]
    public loadedCount: number

    public constructor() {
        super()

        this.resources = []
        this.elementsToDestroy = []
        this.eventListenersToDestroy = []
        this.loadedCount = 0
    }

    private incrementLoadedCount() {
        this.loadedCount++
    }

    public addToQueue(id: string, resourceItems: ResourceItem[]): void {
        this.resources.push(...resourceItems)

        let queueLoadedCount = 0

        for (const resource of resourceItems) {
            loadResource(resource, this, () => {
                queueLoadedCount++
                
                this.incrementLoadedCount()

                this.notifyAll(
                    "loadedResource",
                    resource,
                    id,
                    resourceItems.length,
                    queueLoadedCount
                )

                if (queueLoadedCount === resourceItems.length) {
                    this.notifyAll("loadedResourceQueue", id, resourceItems)
                }
            })
        }
    }

    public addToDestroyList(element: HTMLElement, eventName: string, callback: EventListener): void {
        this.elementsToDestroy.push(element)
        this.eventListenersToDestroy.push({ element, eventName, callback })
    }

    public destroy(): void {
        for (const { element, eventName, callback } of this.eventListenersToDestroy) {
            element.removeEventListener(eventName, callback)
        }

        for (const element of this.elementsToDestroy) {
            if (element instanceof HTMLAudioElement) {
                if (!element.paused) {
                    element.pause()
                }
            }

            if (element.parentNode) {
                element.parentNode.removeChild(element)
            }
        }

        this.eventListenersToDestroy = []
        this.elementsToDestroy = []
    }
}

export default ResourceLoader