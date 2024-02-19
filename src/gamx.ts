import ResourceLoader from "./util/resource-loader"
import Renderer from "./util/render"
import Screen from "./ui/screen"

export type GamxGameOptions = {
    document: Document
    rootQuery: string
}

export type GamxGameState = {
    [key: string]: any
}

class GamxGame {
    public resourceLoader: ResourceLoader
    public screen: Screen
    public renderer: Renderer
    public state: GamxGameState

    public constructor({ document, rootQuery }: GamxGameOptions) {
        this.resourceLoader = new ResourceLoader()

        this.screen = new Screen({
            document: document,
            rootQuery: rootQuery
        })

        this.renderer = new Renderer({
            canvas: this.screen.canvas,
            subScreen: { entities: [] },
            requestAnimationFrame: requestAnimationFrame
        })

        this.state = {}

        this.setup()
    }

    public setState(newState: GamxGameState): void {
        this.state = Object.assign(this.state, newState)
    }

    public setup(): void {}
}

export default GamxGame