import _ResourceLoader from "./util/resource-loader"
import _WidgetManager from "./ui/widget-manager"
import _Observable from "./common/observable"
import _Renderer from "./util/render"
import _UiButton from "./ui/button"
import _Screen from "./ui/screen"
import GamxGame from "./gamx"

export module common {
    export const Observable = _Observable
}

export module util {
    export const Renderer = _Renderer
    export const ResourceLoader = _ResourceLoader
}

export module ui {
    export const Screen = _Screen
    export const UiButton = _UiButton
    export const WidgetManager = _WidgetManager
}

export default GamxGame