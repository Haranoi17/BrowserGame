class MenuState extends GameState
{
    constructor()
    {
        super();
    }

    onEnter(){}
    
    onUpdate(input, deltaTime)
    {
        super.onUpdate(input, deltaTime);
    }
    
    onExit()
    {
        super.onExit(); 
        return this.nextState;
    }

    draw(canvas)
    {

    }

    handleInput(input)
    {
        if(input.justPressed(Key.esc))
        {
            this.shouldExit = true;
            this.nextState = GameState.Playing;
        }
    }
}
