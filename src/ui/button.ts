import { v4 as uuidv4 } from "uuid"

import { Coordinates } from "../common/types"
import Observable from "../common/observable"
import Widget from "./widget"

export type ButtonOptions = {
    ctx: CanvasRenderingContext2D
    coordinates: Coordinates
    width: number
    height: number
    image?: HTMLImageElement
    imageMouseOver?: HTMLImageElement
    imageClipping?: ImageClipping
    imageMouseOverClipping?: ImageClipping
    color?: string
    colorMouseOver?: string
}

export type ImageClipping = {
    x: number
    y: number
    width: number
    height: number
}
class Button extends Observable implements Widget {
    public id: string
    public ctx: CanvasRenderingContext2D
    public coordinates: Coordinates
    public width: number
    public height: number
    public image?: HTMLImageElement
    public imageMouseOver?: HTMLImageElement
    public imageClipping?: ImageClipping
    public imageMouseOverClipping?: ImageClipping
    public color?: string
    public colorMouseOver?: string

    private isEventListenersAdded: boolean = false
    private lastMouseMovementCheck: number = 0
    private isMouseOver: boolean = false

    public constructor({
        ctx,
        coordinates,
        width,
        height,
        image,
        imageClipping,
        imageMouseOver,
        imageMouseOverClipping,
        color,
        colorMouseOver
    }: ButtonOptions) {
        super()
        this.id = uuidv4()
        this.ctx = ctx
        this.coordinates = coordinates
        this.width = width
        this.height = height
        this.image = image
        this.imageClipping = imageClipping
        this.imageMouseOver = imageMouseOver
        this.imageMouseOverClipping = imageMouseOverClipping
        this.color = color
        this.colorMouseOver = colorMouseOver
        this.handleClick = this.handleClick.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
    }

    private isPointInsideButton(
        point: Coordinates,
        button: Coordinates,
        buttonWidth: number,
        buttonHeight: number
    ) {
        return (
            point.x >= button.x &&
            point.x <= button.x + buttonWidth &&
            point.y >= button.y &&
            point.y <= button.y + buttonHeight
        )
    }

    private handleMouseMove(event: MouseEvent) {
        const currentTime = Date.now()

        const { offsetX, offsetY } = event
        const {
            coordinates,
            width,
            height,
            ctx
        } = this

        if (
            offsetX >= coordinates.x &&
            offsetX <= coordinates.x + width &&
            offsetY >= coordinates.y &&
            offsetY <= coordinates.y + height &&
            !this.isMouseOver
        ) {
            ctx.canvas.style.cursor = "pointer"
            this.isMouseOver = true
            this.lastMouseMovementCheck = currentTime
        } else if (this.isMouseOver && currentTime > this.lastMouseMovementCheck + 150) {
            this.lastMouseMovementCheck = currentTime
            ctx.canvas.style.cursor = "auto"
            this.isMouseOver = false
        }
    }

    private handleClick(event: MouseEvent) {
        const { offsetX, offsetY } = event
        const { coordinates, width, height } = this

        if (this.isPointInsideButton(
            { x: offsetX, y: offsetY},
            coordinates,
            width,
            height
        )) {
            this.notifyAll("click")
        }
    }

    private handleDoubleClick(event: MouseEvent) {
        const { offsetX, offsetY } = event
        const { coordinates, width, height } = this
        
        if (this.isPointInsideButton(
            { x: offsetX, y: offsetY},
            coordinates,
            width,
            height
        )) {
            this.notifyAll("doubleClick")
        }
    }

    private handleMouseUp(event: MouseEvent) {
        const { offsetX, offsetY } = event
        const { coordinates, width, height } = this
        
        if (this.isPointInsideButton(
            { x: offsetX, y: offsetY},
            coordinates,
            width,
            height
        )) {
            this.notifyAll("mouseUp")
        }
    }

    private handleMouseDown(event: MouseEvent) {
        const { offsetX, offsetY } = event
        const { coordinates, width, height } = this
        
        if (this.isPointInsideButton(
            { x: offsetX, y: offsetY},
            coordinates,
            width,
            height
        )) {
            this.notifyAll("mouseDown")
        }
    }

    public draw() {
        const {
            ctx,
            image,
            color,
            imageClipping,
            colorMouseOver,
            imageMouseOver,
            imageMouseOverClipping
        } = this

        if (!image && !color) return

        const selectedImage = this.isMouseOver ? (imageMouseOver && imageMouseOverClipping ? imageMouseOver : image) : image
        const selectedImageClipping = this.isMouseOver ? (imageMouseOver && imageMouseOverClipping ? imageMouseOverClipping : imageClipping) : imageClipping
        const selectedColor = this.isMouseOver ? (colorMouseOver ? colorMouseOver : color) : color

        if (selectedColor) {
            ctx.fillStyle = selectedColor

            ctx.fillRect(
                this.coordinates.x,
                this.coordinates.y,
                this.width,
                this.height
            )

        } else if (selectedImage) {
            if (selectedImageClipping) {
                ctx.drawImage(
                    selectedImage,
                    selectedImageClipping.x,
                    selectedImageClipping.y,
                    selectedImageClipping.width,
                    selectedImageClipping.height,
                    this.coordinates.x,
                    this.coordinates.y,
                    this.width,
                    this.height
                )
            } else {
                ctx.drawImage(
                    selectedImage,
                    this.coordinates.x,
                    this.coordinates.y,
                    this.width,
                    this.height
                )
            }

        } else {
            throw new Error("Either a color or an image must be provided")
        }

        if (!this.isEventListenersAdded) {
            this.handleMouseMove = this.handleMouseMove.bind(this)
            ctx.canvas.addEventListener("mousedown", this.handleMouseDown)
            ctx.canvas.addEventListener("mouseup", this.handleMouseUp)
            ctx.canvas.addEventListener("click", this.handleClick)
            ctx.canvas.addEventListener("dblclick", this.handleDoubleClick)
            ctx.canvas.addEventListener("mousemove", this.handleMouseMove)
            this.isEventListenersAdded = true
        }

        this.notifyAll("drawn")
    }

    public destroy() {
        const { ctx } = this

        if (this.isEventListenersAdded) {
            ctx.canvas.removeEventListener("mousedown", this.handleMouseDown)
            ctx.canvas.removeEventListener("mouseup", this.handleMouseUp)
            ctx.canvas.removeEventListener("click", this.handleClick)
            ctx.canvas.removeEventListener("dblclick", this.handleDoubleClick)
            ctx.canvas.removeEventListener("mousemove", this.handleMouseMove)
            ctx.canvas.style.cursor = "auto"
            this.isEventListenersAdded = false
        }

        this.notifyAll("destroyed")
    }
}

export default Button