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
        
        this.states = new Map();
        this.states.set(GameState.Menu, new MenuState());
        this.states.set(GameState.Playing, new PlayingState());

        this.currentState = GameState.Menu;
    }

    gameLoop()
    {
        this.update();
        this.draw();
    }
    
    update()
    {
        this.updateCurrentState();
        this.switchStates();

        this.input.update();
        this.timer.update();
    }
    
    draw()
    {
        this.drawCurrentState();
    }
    
    updateCurrentState()
    {
        this.states.get(this.currentState).onUpdate(this.input, this.getDeltaTime());
    }

    drawCurrentState()
    {
        this.states.get(this.currentState).draw();
    }

    switchStates()
    {
        if( this.states.get(this.currentState).shouldExit)
        {
            this.states.get(this.currentState).onExit();
            this.currentState = this.states.get(this.currentState).getNextState();
            this.states.get(this.currentState).onEnter();
        }
    }

    getDeltaTime()
    {
        return this.timer.getDeltaTime();
    }
}