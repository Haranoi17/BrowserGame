class PlayingState extends GameState
{
    constructor()
    {
        super();
        this.physicalObject = new Physical();
    }

    onEnter(){console.log("entered Playing");}
    
    onUpdate(input, deltaTime)
    {
        super.onUpdate(input, deltaTime);
        this.physicalObject.update(deltaTime);
    }

    onExit(){console.log("exited Playing"); super.onExit();}

    draw()
    {
        this.ctx.fillStyle='rgb(50,50,50)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(this.physicalObject.position.x, this.physicalObject.position.y, 50, 50);
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
        
        if(input.justPressed(Key.space))
        {
            this.shouldExit = true;
            this.nextState = GameState.Menu;
        }
    }
}
