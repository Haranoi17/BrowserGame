class StateMachine
{
    constructor()
    {  
        this.states = new Map();
        this.states.set(GameState.Menu, new MenuState());
        this.states.set(GameState.Playing, new PlayingState());

        this.currentStateType = GameState.Menu;
        this.currentState = this.states.get(this.currentStateType);
    }

    switchStates()
    {
        if( this.currentState.shouldExit )
        {
            this.currentState.onExit();
            
            this.currentStateType = this.currentState.getNextStateType();
            this.currentState = this.states.get(this.currentStateType);

            this.currentState.onEnter();
        }
    }

    update(input, deltaTime)
    {
        this.currentState.onUpdate(input, deltaTime);
        this.switchStates();
    }

    draw(canvas)
    {
        this.currentState.draw(canvas);
    }
}