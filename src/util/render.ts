import { RequestAnimationFrame } from "../common/types"

export type Entity = {
    draw: (ctx: CanvasRenderingContext2D) => any
}

export type SubScreen = {
    entities: Entity[]
}

export type RendererOptions = {
    canvas: HTMLCanvasElement
    subScreen: SubScreen
    requestAnimationFrame: RequestAnimationFrame
}

class Renderer {
    public isRunning: boolean
    public fps: number

    private canvas: HTMLCanvasElement
    private subScreen: SubScreen
    private requestAnimationFrame: RequestAnimationFrame
    private lastFrameTime: number

    public constructor({
        canvas,
        subScreen,
        requestAnimationFrame
    }: RendererOptions) {
        this.canvas = canvas
        this.subScreen = subScreen
        this.requestAnimationFrame = requestAnimationFrame
        this.isRunning = false
        this.lastFrameTime = 0
        this.fps = 0
    }

    private calculateFps(currentTime: number) {
        if (this.lastFrameTime === 0) {
            this.lastFrameTime = currentTime
            return
        }

        const elapsedMilliseconds = currentTime - this.lastFrameTime
        this.fps = Math.round(1000 / elapsedMilliseconds)
        this.lastFrameTime = currentTime
    }

    public pause() {
        this.isRunning = false
    }

    public play() {
        if (!this.isRunning) {
            this.isRunning = true
            this.render()
        }
    }

    public setSubScreen(newSubScreen: SubScreen): void {
        this.subScreen = newSubScreen
    }

    private render() {
        const ctx = this.canvas.getContext("2d")!

        this.subScreen.entities.forEach(entity => {
            entity.draw(ctx)
        })

        if (this.isRunning) {
            return this.requestAnimationFrame(() => {
                this.calculateFps(Date.now())
                this.render()
            })
        }
    }
}

export default Renderer