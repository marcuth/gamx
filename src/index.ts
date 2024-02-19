import ResourceLoader from "./util/resource-loader"
import Screen from "./ui/screen"
import Renderer from "./util/render"

export type GamxGameOptions = {
    document: Document
    rootQuery: string
}

class GamxGame {
    public resourceLoader: ResourceLoader
    public screen: Screen
    public renderer: Renderer

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
    }

    public setup() {}
}

export default GamxGame