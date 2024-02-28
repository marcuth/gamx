import Observable from "../common/observable"

export type AudioStorage = {
    [key: string]: HTMLAudioElement
}

class AudioManager extends Observable {
    public storage: AudioStorage

    public constructor() {
        super()

        this.storage = {}
    }

    private ensureKeyUnique(key: string): void {
        if (key in this.storage) {
            throw new Error(`The ${key} key already exists in the audio storage!`)
        }
    }

    private ensureKeyExist(key: string): void {
        if ((key in this.storage)) {
            throw new Error(`The ${key} key does exist in the audio store!`)
        }
    }

    private ensureKeyDoesNotExist(key: string): void {
        if (!(key in this.storage)) {
            throw new Error(`The ${key} key does not exist in the audio store!`)
        }
    }

    public set(key: string, audio: HTMLAudioElement): void {
        this.storage[key] = audio
    }

    public add(key: string, audio: HTMLAudioElement): void {
        this.ensureKeyUnique(key)
        this.storage[key] = audio
    }

    public remove(key: string): void {
        this.ensureKeyDoesNotExist(key)
        delete this.storage[key]
    }

    public play(
        key: string,
        tryUntilSuccess: boolean = true,
        timeout: number = 100
    ): void {
        this.ensureKeyExist(key)

        if (this.storage[key].paused) {
            if (tryUntilSuccess) {
                try {
                    this.storage[key].play()
                } catch(error) {
                    const playMethod = this.play.bind(this)

                    setTimeout(() => {
                        playMethod(key)
                    }, timeout)
                }
            }
        }
    }

    public pause(key: string): void {
        this.ensureKeyExist(key)

        if (!this.storage[key].paused) {
            this.storage[key].pause()
        }
    }

    public destroy(): void {
        for (const key in this.storage) {
            this.pause(key)
        }

        this.storage = {}
    }
}

export default AudioManager