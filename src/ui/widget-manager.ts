export type Widget = {
    id: string
    destroy: () => any
}

class WidgetManager {
    private widgets: Widget[]

    public constructor() {
        this.widgets = []
    }

    public add(widget: Widget): void {
        this.widgets.push(widget)
    }

    public get(id: string): Widget | null {
        const index = this.widgets.findIndex(widget => widget.id === id)

        if (index !== -1) {
            const widget = this.widgets[index]
            return widget
        }

        return null
    }

    public remove(id: string): void {
        const index = this.widgets.findIndex(widget => widget.id === id)

        if (index !== -1) {
            const widget = this.widgets[index]
            widget.destroy()
            this.widgets.splice(index, 1)
        }
    }

    public removeAllButtons(): void {
        this.widgets.forEach(widget => widget.destroy())
        this.widgets = []
    }
}

export default WidgetManager