import Entity from "./entity"

export type SubScreenOptions = {
    entities: Entity[]
}

abstract class SubScreen {
    public entities: Entity[]

    public constructor({ entities }: SubScreenOptions) {
        this.entities = entities
    }

    public abstract setup(): any
}

export default SubScreen