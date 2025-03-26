import Observable from "../common/observable"
import SubScreen from "../ui/sub-screen"

export type RendererOptions = {
    canvas: HTMLCanvasElement
    subScreen?: SubScreen<any, any>
    defaultBackgroundColor: string
    targetFps?: number
}

class Renderer extends Observable {
    public isRunning: boolean
    public fps: number
    public targetFps?: number
    public frameDelay: number
    public subScreen?: SubScreen<any, any>
    public lastFrameTime: number
    public readonly defaultBackgroundColor: string

    private canvas: HTMLCanvasElement

    public constructor({
        canvas,
        subScreen,
        defaultBackgroundColor,
        targetFps
    }: RendererOptions) {
        super()
        this.canvas = canvas
        this.subScreen = subScreen
        this.defaultBackgroundColor = defaultBackgroundColor
        this.isRunning = false
        this.lastFrameTime = 0
        this.fps = 0
        this.targetFps = targetFps
        this.frameDelay = this.targetFps ? 1000 / this.targetFps : 0
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

    public setTargetFps(newTarget: number): void {
        this.targetFps = newTarget
        this.frameDelay = 1000 / this.targetFps
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

    public setSubScreen(newSubScreen: SubScreen<any, any>): void {
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
            this.subScreen.components.forEach(entity => {
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
            const currentTime = Date.now()
            const elapsed = currentTime - this.lastFrameTime

            if (elapsed > this.frameDelay) {
                this.calculateFps(currentTime)
                requestAnimationFrame(this.render.bind(this))
            } else {
                setTimeout(() => {
                    this.calculateFps(currentTime)
                    requestAnimationFrame(this.render.bind(this))
                }, this.frameDelay - elapsed)
            }
        }
    }
}

export default Renderer