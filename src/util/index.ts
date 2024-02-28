import _KeyboardListener from "./keyboard-listener"
import _ResourceLoader from "./resource-loader"
import _AudioManager from "./audio-manager"
import _Renderer from "./renderer"

module util {
    export const Renderer = _Renderer
    export const AudioManager = _AudioManager
    export const ResourceLoader = _ResourceLoader
    export const KeyboardListener = _KeyboardListener
}

export default util