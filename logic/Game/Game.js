class Game
{
    constructor()
    {
        const oneSecondInMilliseconds = 1000.0;
        const targetUpdatesPerSecond = 144.0;
        this.fixedUpdateTime = oneSecondInMilliseconds / targetUpdatesPerSecond;

        this.input = new Input();
        this.timer = new Timer();
        this.soundPlayer = new SoundPlayer();        
        this.stateMachine = new StateMachine();

        this.setupCanvas();
    }

    gameLoop()
    {
        this.update();
        this.draw();
    }
    
    update()
    {
        this.stateMachine.update(this.input, this.getDeltaTime());

        this.input.update();
        this.timer.update();
    }
    
    draw()
    {
        this.stateMachine.draw(this.getCanvas());
    }

    getDeltaTime()
    {
        return this.timer.getDeltaTime();
    }

    setupCanvas()
    { 
        let canvas = document.getElementById("gameWindow");
        canvas.width = 600;
        canvas.height = 400;
    }

    getCanvas()
    {
        let canvas = document.getElementById("gameWindow");
        return canvas;
    }
}