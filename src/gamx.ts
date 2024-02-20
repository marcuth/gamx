import KeyboardListener from "./util/keyboard-listener"
import ResourceLoader from "./util/resource-loader"
import Screen, { ScreenSize } from "./ui/screen"
import Renderer from "./util/renderer"

export type GamxOptions = {
    document: Document
    rootQuery: string
    screenSize: ScreenSize
    defaultBackgroundColor?: string
    state: any
}

export type GamxState = {
    [key: string]: any
}

class Gamx<GameState = GamxState> {
    public resourceLoader: ResourceLoader
    public screen: Screen
    public renderer: Renderer
    public keyboardListener: KeyboardListener
    public state: GameState
    
    public constructor({
        document,
        rootQuery,
        screenSize,
        defaultBackgroundColor,
        state
    }: GamxOptions & { state: GameState }) {
        this.resourceLoader = new ResourceLoader()

        this.screen = new Screen({
            document: document,
            rootQuery: rootQuery,
            size: screenSize
        })

        this.renderer = new Renderer({
            canvas: this.screen.canvas,
            defaultBackgroundColor: defaultBackgroundColor ?? "#000"
        })

        this.keyboardListener = new KeyboardListener({ document: document })

        this.state = state

        this.setup()
    }

    public updateState(newState: GameState): void {
        this.state = Object.assign(this.state as object, newState)
    }

    public setState(newState: GameState): void {
        this.state = {...newState}
    }

    public setup(): void {}

    public destroy(): void {
        this.renderer.pause()
        this.keyboardListener.destroy()
        this.screen.destroy()
    }
}

export default Gamx