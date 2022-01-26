class Game
{
    public input: Input = new Input();

    readonly fixedUpdateTime: number;

    private timer: Timer = new Timer();
    private camera: Camera = new Camera();
    private stateMachine: StateMachine = new StateMachine();

    constructor()
    {
        const oneSecondInMilliseconds: number = 1000.0;
        const targetUpdatesPerSecond: number = 144.0;
        this.fixedUpdateTime = oneSecondInMilliseconds / targetUpdatesPerSecond;

        this.setupCanvas();
    }

    gameLoop(): void
    {
        this.update();
        this.draw();
    }

    update(): void
    {
        this.stateMachine.update(this.input, this.getDeltaTime());

        const canvasSize = new Vector(this.getCanvas().width, this.getCanvas().height);
        const objectToFollow = this.stateMachine.getFocusedObject();
        this.camera.specificUpdate(objectToFollow, canvasSize, this.getDeltaTime());

        this.input.update();
        this.timer.update();
    }

    draw(): void
    {
        this.camera.draw(this.getCanvas());
        this.stateMachine.draw(this.getCanvas());
    }

    private getDeltaTime(): number
    {
        return this.timer.getDeltaTime();
    }

    private setupCanvas(): void
    {
        let canvas = document.getElementById("gameWindow") as HTMLCanvasElement;
        canvas.width = 600;
        canvas.height = 400;
    }

    private getCanvas(): HTMLCanvasElement
    {
        let canvas = document.getElementById("gameWindow") as HTMLCanvasElement;
        return canvas;
    }
}