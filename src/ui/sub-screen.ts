import Entity from "./entity"

export type SubScreenOptions = {
    entities: Entity[]
}

class SubScreen {
    public entities: Entity[]

    public constructor({ entities }: SubScreenOptions) {
        this.entities = entities
    }
}

export default SubScreen