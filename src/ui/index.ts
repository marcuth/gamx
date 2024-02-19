import _WidgetManager from "./widget-manager"
import _SubScreen from "./sub-screen"
import _UiButton from "./button"
import _Screen from "./screen"
import _Entity from "./entity"
import _Widget from "./widget"

export module ui {
    export const WidgetManager = _WidgetManager
    export const SubScreen = _SubScreen
    export const UiButton = _UiButton
    export const Screen = _Screen
    export abstract class Entity extends _Entity {}
    export const Widget = _Widget
}

export default ui