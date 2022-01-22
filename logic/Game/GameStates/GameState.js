class GameState
{
    static Menu = 0;
    static Playing = 1;

    constructor()
    {
        this.shouldExit = false;
        this.nextState = GameState.Menu;

        this.canvas = document.getElementById("gameWindow");
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d");
    }

    onEnter(){}
    
    onUpdate(input, deltaTime)
    {
        this.handleInput(input);
    }

    onExit(){this.shouldExit = false;}

    getNextState(){return this.nextState;}

    draw(){}

    handleInput(input){}
}