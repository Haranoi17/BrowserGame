class GameState
{
    static Menu = 0;
    static Playing = 1;

    constructor()
    {
        this.shouldExit = false;
        this.nextState = GameState.Menu;
    }

    onEnter(){}
    
    onUpdate(input, deltaTime)
    {
        this.handleInput(input);
    }

    onExit()
    {
        this.shouldExit = false;
    }

    getNextStateType()
    {
        return this.nextState;
    }

    draw(canvas){}

    handleInput(input){}
}