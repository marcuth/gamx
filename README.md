# Gamx 🎮

[![npm version](https://img.shields.io/npm/v/gamx.svg)](https://www.npmjs.com/package/gamx)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Gamx is a lightweight, flexible JavaScript game library designed to simplify the creation of browser-based games using the Canvas API.

## ✨ Features

- 📱 **Canvas Management**: Automatic setup and sizing of the game canvas.
- 🎨 **Powerful Rendering**: Built-in renderer with support for sub-screens and components.
- 📂 **Resource Loading**: Effortless loading of images, audio, and video with progress tracking.
- ⌨️ **Input Handling**: Clean keyboard listener management.
- 🔊 **Audio Management**: Integrated audio controller.
- 🧩 **UI Components**: Base classes for buttons and widgets.
- 🔄 **State Management**: Simple and effective game state handling.
- 📡 **Observable Pattern**: Decoupled event-driven architecture using observables.

## 🚀 Installation

Install via npm:

```bash
npm install gamx
```

## 🛠️ Quick Start

Here's a basic example to get you started:

```javascript
import Gamx from 'gamx';

const game = new Gamx({
    document: document,
    rootQuery: '#app',
    screenSize: { width: 800, height: 600 },
    defaultBackgroundColor: '#1a1a1a',
    state: { score: 0, level: 1 }
});

// Setup game logic
game.setup = () => {
    console.log('Game is setting up!');
};

// Start the renderer
game.renderer.play();
```

## 📖 Key Modules

### `Gamx` (Core)
The main entry point. It orchestrates the screen, renderer, resource loader, and input listeners.
- `updateState(newState)`: Partially update the game state.
- `setState(newState)`: Replace the entire game state.
- `destroy()`: Clean up all resources and event listeners.

### `Screen`
Manages the `<canvas>` element.
- `setSize(width, height)`: Dynamically change game resolution.

### `Renderer`
Controls the game loop and drawing process.
- `play()` / `pause()`: Toggle the rendering loop.
- `setTargetFps(fps)`: Limit the frame rate.
- `setSubScreen(subScreen)`: Change the active screen being rendered.

### `ResourceLoader`
Loads game assets asynchronously.
- `addToQueue(id, items)`: Add assets to the loading queue.
- Listen to `loadedResource` or `loadedResourceQueue` events for progress.

### `Ui` (User Interface)
Pre-built components to speed up development.
- `Button`: Interactive canvas-based buttons with hover support.
- `SubScreen`: Logic for managing different game "pages" (e.g., Menu, Game, Pause).

## 🎮 Examples

### Creating a Component
Components help you modularize elements drawn on the canvas.

```javascript
import { Ui } from 'gamx';

class PlayerComponent extends Ui.Component {
    draw(ctx) {
        ctx.fillStyle = this.props.color || 'white';
        ctx.fillRect(this.props.x, this.props.y, 50, 50);
    }
}
```

### Creating a SubScreen
SubScreens represent different views of your game like a Menu or a Map.

```javascript
import { Ui } from 'gamx';

// 1. Define the SubScreen
class MenuScreen extends Ui.SubScreen {
    setup(setupProps) {
        // Initialize components when the screen mounts
        const player = new PlayerComponent({ x: 100, y: 100, color: 'blue' });
        this.components.push(player);
    }
}

// 2. Instantiate and switch to this sub-screen using the renderer
const menu = new MenuScreen({
    ctx: game.screen.canvas.getContext('2d'),
    components: [],
    gameState: game.state,
    setupProps: {} 
});

game.renderer.setSubScreen(menu);
```

### Working with Widgets (Buttons)
Widgets are UI elements that can be managed by the `WidgetManager` on the main `Screen` to handle interactions easily.

```javascript
import { Ui } from 'gamx';

// 1. Create a button widget
const playButton = new Ui.Button({
    ctx: game.screen.canvas.getContext('2d'),
    coordinates: { x: 300, y: 200 },
    width: 150,
    height: 50,
    color: '#ff0000',
    colorMouseOver: '#ff5555' 
});

// 2. Listen to interactions
playButton.on('click', () => {
    console.log("Play button clicked!");
});

// 3. Add to the manager to ensure event listeners are tracked
game.screen.widgetManager.add(playButton);

// 4. Remember to draw your widgets in your render loop or sub-screen
game.renderer.on('frame', () => {
    playButton.draw();
});
```

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---
Developed with ❤️ by [Marcuth](https://github.com/1Marcuth)