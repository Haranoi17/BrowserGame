enum Debug
{
    on,
    off,
}

class Game
{
    public input: Input = new Input();

    readonly fixedUpdateTime: number;

    private timer: Timer = new Timer();
    private stateMachine: StateMachine = new StateMachine();
    private renderer: Renderer = new Renderer(this.getCanvas());

    private fpsCounter: FpsCounter = new FpsCounter();

    private readonly debug: Debug = Debug.on;
    private readonly targetUpdatesPerSecond: number = 140;

    constructor()
    {
        const oneSecondInMilliseconds: number = 1000.0;
        this.fixedUpdateTime = oneSecondInMilliseconds / this.targetUpdatesPerSecond;
    }

    gameLoop(): void
    {
        this.update();
        this.draw();
    }

    update(): void
    {
        this.stateMachine.update(this.input, this.getDeltaTime());

        this.renderer.update(this.getDeltaTime());

        this.fpsCounter.update(this.getDeltaTime());
        this.input.update();
        this.timer.update();
    }

    draw(): void
    {
        this.renderer.clear();

        const objectToFollow = this.stateMachine.getFocusedObject();
        this.renderer.lookAt(objectToFollow);
        this.stateMachine.draw(this.renderer);

        this.renderer.render();
    }

    private getDeltaTime(): number
    {
        if (this.debug == Debug.on)
        {
            return 1.0 / this.targetUpdatesPerSecond;
        }

        return this.timer.getDeltaTime();
    }

    private getCanvas(): HTMLCanvasElement
    {
        let canvas = document.getElementById("gameWindow") as HTMLCanvasElement;
        return canvas;
    }
}

class FpsCounter
{
    private frameCounter: number = 0;
    private readonly framePeriod: number = 20;
    private timeInPeriod: number = 0;

    update(deltaTime: number): void
    {
        this.frameCounter++;
        this.timeInPeriod += deltaTime;
        if (this.frameCounter == this.framePeriod)
        {
            let FPS = document.getElementById("fps") as HTMLParagraphElement;
            FPS.innerHTML = "FPS: " + (this.framePeriod / this.timeInPeriod).toFixed(0).toString();
            this.frameCounter = 0;
            this.timeInPeriod = 0;
        }
    }
}