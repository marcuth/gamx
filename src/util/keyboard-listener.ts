import Observable from "../common/observable"

export type ModifierKeys = {
    ctrl: boolean
    alt: boolean
    shift: boolean
    meta: boolean
}

export type KeyboardListenerOptions = {
    document: Document
}

class KeyboardListener extends Observable {
    public document: Document

    public constructor({ document }: KeyboardListenerOptions) {
        super()

        this.document = document
        this.handleKeydown = this.handleKeydown.bind(this)
        document.addEventListener("keydown", this.handleKeydown)
    }

    private handleKeydown(event: KeyboardEvent): void {
        const key = event.code

        const modifierKeys: ModifierKeys = {
            ctrl: event.ctrlKey,
            alt: event.altKey,
            shift: event.shiftKey,
            meta: event.metaKey
        }

        this.notifyAll(key, modifierKeys)
    }

    public destroy() {
        this.document.removeEventListener("keydown", this.handleKeydown)
    }
}

export default KeyboardListener