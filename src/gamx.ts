import KeyboardListener from "./util/keyboard-listener"
import ResourceLoader from "./util/resource-loader"
import Screen, { ScreenSize } from "./ui/screen"
import Renderer from "./util/renderer"

export type GamxOptions = {
    document: Document
    rootQuery: string
    screenSize: ScreenSize
    defaultBackgroundColor?: string
}

export type GamxState = {
    [key: string]: any
}

class Gamx {
    public resourceLoader: ResourceLoader
    public screen: Screen
    public renderer: Renderer
    public keyboardListener: KeyboardListener
    public state: GamxState
    
    public constructor({
        document,
        rootQuery,
        screenSize,
        defaultBackgroundColor
    }: GamxOptions) {
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

        this.state = {}

        this.setup()
    }

    public setState(newState: GamxState): void {
        this.state = Object.assign(this.state, newState)
    }

    public setup(): void {}
}

export default Gamx