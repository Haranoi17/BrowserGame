class MenuState extends GameState
{
    constructor()
    {
        super();
    }

    onEnter(){console.log("entered Menu");}
    
    onUpdate(input, deltaTime)
    {
        super.onUpdate(input, deltaTime);
    }
    
    onExit(){console.log("exited Menu"); super.onExit(); return this.nextState;}

    draw(){}

    handleInput(input)
    {
        if(input.justPressed(Key.space))
        {
            this.shouldExit = true;
            this.nextState = GameState.Playing;
        }
    }
}
