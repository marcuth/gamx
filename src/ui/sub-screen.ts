import Component from "./component"
import { GamxState } from "gamx"

export type SubScreenOptions = {
    ctx: CanvasRenderingContext2D
    components: Component[]
}

class SubScreen<T = GamxState> {
    public ctx: CanvasRenderingContext2D
    public components: Component[]
    public gameState:T

    public constructor({
        ctx,
        components,
        gameState
    }: SubScreenOptions & {
        gameState: T
    }) {
        this.ctx = ctx
        this.components = components
        this.gameState = gameState
        this.setup()
    }

    public setup(): void {}
}

export default SubScreen