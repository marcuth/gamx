import GamxGame from "./src"

class MyGame extends GamxGame {
    public setup() {
        
    }
}

function main(): void {
    const game = new GamxGame({
        document: document,
        rootQuery: "#root"
    })
    
    game.resourceLoader.subscribe((event, ...args) => {
        console.log(event, args)
    })
    
    game.resourceLoader.addToQueue("fila01", [
        {
            id: "imagem01",
            object: new Image(),
            source: "https://imagens.com/minha-imagem.png"
        }
    ])
    
    game.renderer.play()
}

main()