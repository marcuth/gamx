import Component from "./component"
import { GamxState } from "gamx"

export type SubScreenOptions = {
    ctx: CanvasRenderingContext2D
    components: Component[]
}

class SubScreen<GameState = GamxState, SetupProps = void> {
    public readonly ctx: CanvasRenderingContext2D
    public readonly components: Component<any>[]
    public readonly gameState: GameState
    protected setupProps?: SetupProps

    public constructor({
        ctx,
        components,
        gameState,
        setupProps
    }: SubScreenOptions & {
        gameState: GameState
        setupProps: SetupProps
    }) {
        this.ctx = ctx
        this.components = components
        this.gameState = gameState
        this.setupProps = setupProps
        
        this.setup.bind(this)(this.setupProps)
        this.afterSetup.bind(this)()
    }

    public setProps(newProps: SetupProps): void {
        this.setupProps = newProps
    }

    protected setup(setupProps: SetupProps): void {}

    protected afterSetup(): void {
        delete this.setupProps
    }
}

export default SubScreen