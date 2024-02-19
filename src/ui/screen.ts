import { v4 as uuidv4 } from "uuid"

import Observable from "../common/observable"
import WidgetManager from "./widget-manager"

export type ScreenOptions = {
    document: Document
    rootQuery: string
}

export class ScreenRootNotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "RootNotFoundError"
    }
}

export type Root = HTMLElement | null

class Screen extends Observable {
    public canvas: HTMLCanvasElement
    public widgetManager: WidgetManager

    public constructor({ document, rootQuery }: ScreenOptions) {
        super()

        const root: Root = document.querySelector(rootQuery)

        if (!root) {
            throw new ScreenRootNotFoundError(`Root element with query "${rootQuery}" not found.`)
        }

        this.widgetManager = new WidgetManager()

        this.canvas = this.createCanvasInside(document, root)
    }

    private createCanvasInside(document: Document, element: HTMLElement): HTMLCanvasElement {
        const canvas = document.createElement("canvas")
        canvas.id = uuidv4()
        element.appendChild(canvas)
        this.notifyAll("canvasCreated", canvas)
        return canvas
    }
}

export default Screen