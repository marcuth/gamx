import { v4 as uuidv4 } from "uuid"

import Observable from "../common/observable"
import WidgetManager from "./widget-manager"

export type ScreenSize = {
    width: number
    height: number
}

export type ScreenOptions = {
    document: Document
    rootQuery: string
    size: ScreenSize
}

export type CreateCanvasInsideOptions = {
    document: Document
    element: HTMLElement
    size: ScreenSize
}

export type Root = HTMLElement | null

export class ScreenRootNotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "RootNotFoundError"
    }
}

class Screen extends Observable {
    public readonly canvas: HTMLCanvasElement
    public readonly widgetManager: WidgetManager
    public size: ScreenSize

    public constructor({
        document,
        rootQuery,
        size
    }: ScreenOptions) {
        super()

        const root: Root = document.querySelector(rootQuery)

        if (!root) {
            throw new ScreenRootNotFoundError(`Root element with query "${rootQuery}" not found.`)
        }

        this.size = size
        this.widgetManager = new WidgetManager()

        this.canvas = this.createCanvasInside({
            document: document,
            element: root,
            size: size
        })
    }

    private createCanvasInside({
        document,
        element,
        size
    }: CreateCanvasInsideOptions): HTMLCanvasElement {
        const canvas = document.createElement("canvas")

        canvas.id = uuidv4()

        canvas.width = size.width
        canvas.height = size.height
        
        element.appendChild(canvas)
        this.notifyAll("canvasCreated", canvas)

        return canvas
    }

    public setSize(newSize: ScreenSize): void {
        this.size = newSize
        this.canvas.width = newSize.width
        this.canvas.height = newSize.height
    }

    public destroy(): void {
        this.widgetManager.removeAllWidgets()
        this.canvas.remove()
    }
}

export default Screen