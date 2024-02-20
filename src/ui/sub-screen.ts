import Component from "./component"
import { GamxState } from "gamx"

export type SubScreenOptions = {
    ctx: CanvasRenderingContext2D
    components: Component[]
}

class SubScreen<GameState = GamxState> {
    public ctx: CanvasRenderingContext2D
    public components: Component[]
    public gameState: GameState

    public constructor({
        ctx,
        components,
        gameState
    }: SubScreenOptions & {
        gameState: GameState
    }) {
        this.ctx = ctx
        this.components = components
        this.gameState = gameState
        this.setup.bind(this)()
    }

    public setup(): void {}
}

export default SubScreen