import _WidgetManager from "./widget-manager"
import _SubScreen from "./sub-screen"
import _Component from "./component"
import _Button from "./button"
import _Screen from "./screen"
import _Widget from "./widget"

export module ui {
    export const WidgetManager = _WidgetManager
    export const SubScreen = _SubScreen
    export const Component = _Component
    export const Button = _Button
    export const Screen = _Screen
    export abstract class Widget extends _Widget {}
}

export default ui