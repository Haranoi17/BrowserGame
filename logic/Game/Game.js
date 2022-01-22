class Game
{
    constructor()
    {
        const oneSecondInMilliseconds = 1000.0;
        const targetUpdatesPerSecond = 144.0;
        this.fixedUpdateTime = oneSecondInMilliseconds/targetUpdatesPerSecond;
        
        this.input = new Input();
        this.soundPlayer = new SoundPlayer();
        this.timer = new Timer();

        
        //temp
        this.physicalObject = new Physical();
        this.canvas = document.getElementById("gameWindow");
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d");
    }

    gameLoop()
    {
        this.update();
        this.draw();
    }
    
    update()
    {
        this.handleInput();
        this.physicalObject.update(this.getDeltaTime());

        this.input.update();
        this.timer.update();
    }
    
    draw()
    {
        this.ctx.fillStyle='rgb(50,50,50)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(this.physicalObject.position.x, this.physicalObject.position.y, 50, 50);
    }
    
    getDeltaTime()
    {
        return this.timer.getDeltaTime();
    }
    
    handleInput()
    {   
       this.handlePlayerMovement();
    }

    handlePlayerMovement()
    {
        let forceVector = new Vector(0,0);
        if(this.input.isPressed(Key.W))
        {
            forceVector.y -= 500;
        }
        
        if(this.input.isPressed(Key.S))
        {
            forceVector.y += 500;
        }
        
        if(this.input.isPressed(Key.A))
        {
            forceVector.x -= 500;
        }
        
        if(this.input.isPressed(Key.D))
        {
            forceVector.x += 500;
        }

        this.physicalObject.applyForce(forceVector);
    }
}