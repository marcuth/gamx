import { RequestAnimationFrame } from "../common/types"
import Observable from "../common/observable"
import SubScreen from "../ui/sub-screen"

export type RendererOptions = {
    canvas: HTMLCanvasElement
    subScreen?: SubScreen
    defaultBackgroundColor: string
    requestAnimationFrame: RequestAnimationFrame
}

class Renderer extends Observable {
    public isRunning: boolean
    public fps: number

    private canvas: HTMLCanvasElement
    private subScreen?: SubScreen
    private requestAnimationFrame: RequestAnimationFrame
    private defaultBackgroundColor: string
    private lastFrameTime: number

    public constructor({
        canvas,
        subScreen,
        defaultBackgroundColor,
        requestAnimationFrame
    }: RendererOptions) {
        super()
        this.canvas = canvas
        this.subScreen = subScreen
        this.defaultBackgroundColor = defaultBackgroundColor
        this.requestAnimationFrame = requestAnimationFrame.bind(this)
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

    private clearScreen() {
        const ctx = this.canvas.getContext("2d")!

        ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )
    }

    private render() {
        this.notifyAll("frame", this.fps)

        const ctx = this.canvas.getContext("2d")!

        this.clearScreen()

        if (this.subScreen) {
            this.subScreen.entities.forEach(entity => {
                entity.draw(ctx)
            })
        } else {
            ctx.fillStyle = this.defaultBackgroundColor

            ctx.fillRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            )
        }

        if (this.isRunning) {
            return this.requestAnimationFrame(() => {
                this.calculateFps(Date.now())
                this.render()
            })
        }
    }
}

export default Renderer