export type ObserverSync = (event: string, ...args: any[]) => any
export type ObserverAsync = (event: string, ...args: any[]) => Promise<any>
export type Observer = ObserverSync | ObserverAsync

class Observable {
    protected observers: Observer[]

    public constructor() {
        this.observers = []
    }

    public subscribe(observer: Observer): void {
        this.observers.push(observer)
    }

    protected notifyAll(event: string, ...args: any[]): void {
        this.observers.forEach(observer => {
            observer(event, args)
        })
    }
}

export default Observable