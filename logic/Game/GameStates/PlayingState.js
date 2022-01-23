class PlayingState extends GameState
{
    constructor()
    {
        super();
        this.physicalObject = new Physical();
    }

    onEnter()
    {

    }
    
    onUpdate(input, deltaTime)
    {
        super.onUpdate(input, deltaTime);
        this.physicalObject.update(deltaTime);
    }

    onExit()
    { 
        super.onExit();
    }

    draw(canvas)
    {
        let ctx = canvas.getContext('2d');

        ctx.fillStyle='rgb(50,50,50)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(this.physicalObject.position.x, this.physicalObject.position.y, 50, 50);
    }

    handleInput(input)
    {
        let forceVector = new Vector(0,0);
        if(input.isPressed(Key.W))
        {
            forceVector.y -= 500;
        }
        
        if(input.isPressed(Key.S))
        {
            forceVector.y += 500;
        }
        
        if(input.isPressed(Key.A))
        {
            forceVector.x -= 500;
        }
        
        if(input.isPressed(Key.D))
        {
            forceVector.x += 500;
        }

        this.physicalObject.applyForce(forceVector);
        
        if(input.justPressed(Key.esc))
        {
            this.shouldExit = true;
            this.nextState = GameState.Menu;
        }
    }
}
