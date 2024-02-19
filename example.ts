import { ResourceItem } from "./src/util/resource-loader"
import GamxGame, { ui } from "./src/index"

class MyGame extends GamxGame {
    public setup(): void {
        
    }
}

function main(): void {
    const game = new MyGame({
        document: document,
        rootQuery: "#root"
    })

    game.renderer.subscribe((event, ...args) => {
        console.log(event, ...args)
    })
    
    game.screen.subscribe((event, ...args) => {
        console.log(event, args)
    })

    game.screen.widgetManager.subscribe((event, ...args) => {
        console.log(event, args)
    })

    game.resourceLoader.subscribe((event, ...args) => {
        console.log(event, args)

        if (event === "loadedResourceQueue") {
            const [ id, resourceItems ] = args as [ string, ResourceItem[], ...any ]
        }
    })
    
    game.resourceLoader.addToQueue("fila01", [
        {
            id: "imagem01",
            object: new Image(),
            source: "https://imagens.com/minha-imagem.png"
        }
    ])

    const button = new ui.UiButton({
        ctx: game.screen.canvas.getContext("2d")!,
        coordinates: {
            x: 0,
            y: 0
        },
        width: 30,
        height: 30,
        color: "#ccc",
        colorMouseOver: "#bbb"
    })

    game.screen.widgetManager.add(button)
    
    game.renderer.play()
}

main()