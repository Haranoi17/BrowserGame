class MenuState extends GameState
{
    constructor()
    {
        super();

        this.buttons = new Array();
        this.buttons.push(new MenuButton("Play!", ()=>{
            this.shouldExit = true;
            this.nextState = GameState.Playing;
        }))

        this.buttons.push(new MenuButton("Exit"), ()=>{window.close();})
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
        let ctx = canvas.getContext('2d');

        for(let i = 0; i < this.buttons.length - 1; ++i)
        {
            const button = this.buttons[i];
            const gap = 100;
            const startHeight = canvas.height/5;
            const ctxOffset = new Vector(ctx.getTransform().e, ctx.getTransform().f);
            const buttonPositionRelativeToWindow = new Vector(canvas.width/2 - button.getWidth()/2, startHeight + i * (button.getHeight() + gap));
            const buttonPositionInWorld = Vector.subtract(buttonPositionRelativeToWindow, ctxOffset);
            
            button.draw(canvas, buttonPositionInWorld);
        }
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
