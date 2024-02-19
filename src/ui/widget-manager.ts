import Observable from "../common/observable"

export type Widget = {
    id: string
    destroy: () => any
}

class WidgetManager extends Observable {
    private widgets: Widget[]

    public constructor() {
        super()
    
        this.widgets = []
    }

    public add(widget: Widget): void {
        this.widgets.push(widget)
        this.notifyAll("widgetAdded", widget)
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
            this.notifyAll("widgetRemoved", widget)
        }
    }

    public removeAllWidgets(): void {
        this.widgets.forEach(widget => widget.destroy())
        this.widgets = []
        this.notifyAll("AllWidgetsRemoved")
    }
}

export default WidgetManager