abstract class Component<Props = void> {
    private props: Props

    public constructor(props: Props) {
        this.props = props as Props
    }

    public setProps(newProps: Props): void {
        this.props = newProps
    }

    public abstract draw(ctx: CanvasRenderingContext2D): any
}

export default Component