import KeyboardListener from "./util/keyboard-listener"
import ResourceLoader from "./util/resource-loader"
import Screen, { ScreenSize } from "./ui/screen"
import AudioManager from "./util/audio-manager"
import Renderer from "./util/renderer"

export type GamxOptions = {
    document: Document
    rootQuery: string
    screenSize: ScreenSize
    defaultBackgroundColor?: string
    state: any
}

export type GamxState = Record<string, any>

class Gamx<GameState = GamxState> {
    public readonly resourceLoader: ResourceLoader
    public readonly screen: Screen
    public readonly renderer: Renderer
    public readonly keyboardListener: KeyboardListener
    public readonly audioManager: AudioManager
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

        this.audioManager = new AudioManager()

        this.state = state

        this.setup.bind(this)()
        this.afterSetup.bind(this)()
    }

    public updateState(newState: Partial<GameState>): void {
        this.state = Object.assign(this.state as object, newState) as GameState
    }

    public setState(newState: GameState): void {
        this.state = {...newState}
    }

    public setup(): void {}

    public afterSetup(): void {}

    public destroy(): void {
        this.renderer.pause()
        this.keyboardListener.destroy()
        this.screen.destroy()
        this.audioManager.destroy()
    }
}

export default Gamx