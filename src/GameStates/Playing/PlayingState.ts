class PlayingState extends GameState
{
    private physicalObject: Physical = new Physical(Dynamics.kinematic);
    private image: HTMLImageElement;

    constructor()
    {
        super();

        this.image = new Image();
        this.image.src = "/assets/99824.jpg";
    }

    onUpdate(input: Input, deltaTime: number): void
    {
        this.handleInput(input);

        this.physicalObject.update(deltaTime);
    }

    onDraw(canvas: HTMLCanvasElement): void
    {
        let ctx = canvas.getContext('2d');

        ctx.drawImage(this.image, -500, -500);

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(this.physicalObject.position.x, this.physicalObject.position.y, 50, 50);
    }

    getFocusedObject(): GameObject
    {
        return this.physicalObject;
    }

    private handleInput(input: Input): void
    {
        let forceVector = new Vector(0, 0);
        if (input.isPressed(KeyCode.W))
        {
            forceVector = Vector.add(forceVector, new Vector(0, -5000));
        }

        if (input.isPressed(KeyCode.S))
        {
            forceVector = Vector.add(forceVector, new Vector(0, 5000));
        }

        if (input.isPressed(KeyCode.A))
        {
            forceVector = Vector.add(forceVector, new Vector(-5000, 0));
        }

        if (input.isPressed(KeyCode.D))
        {
            forceVector = Vector.add(forceVector, new Vector(5000, 0));
        }

        this.physicalObject.applyForce(forceVector);

        if (input.justPressed(KeyCode.esc))
        {
            this.shouldExit = true;
            this.nextStateType = StateType.Menu;
        }
    }
}
