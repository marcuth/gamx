import Component from "./component"
import { GamxState } from "gamx"

export type SubScreenOptions = {
    ctx: CanvasRenderingContext2D
    components: Component[]
    gameState: GamxState
}

class SubScreen {
    public ctx: CanvasRenderingContext2D
    public components: Component[]

    public constructor({
        ctx,
        components,
        gameState
    }: SubScreenOptions) {
        this.ctx = ctx
        this.components = components
        this.setup()
    }

    public setup(): void {}
}

export default SubScreen