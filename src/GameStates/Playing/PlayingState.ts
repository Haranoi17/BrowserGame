class PlayingState extends GameState implements IDrawable//temporary hack
{
    private player: Player = new Player();
    private platforms: Array<Platform> = new Array<Platform>();
    private image: HTMLImageElement;
    private collisionSystem: CollisionSystem = new CollisionSystem();

    constructor()
    {
        super();

        this.image = new Image();
        this.image.src = "/assets/99824.jpg";
        this.platforms.push(new Platform(new Vector(0, 100), new Vector(100, 100)));
        this.platforms.push(new Platform(new Vector(100, 150), new Vector(200, 100)));
        this.platforms.push(new Platform(new Vector(200, 200), new Vector(300, 100)));
        this.platforms.push(new Platform(new Vector(400, 100), new Vector(300, 100)))
        this.platforms.push(new Platform(new Vector(100, -50), new Vector(300, 100)))
    }

    onUpdate(input: Input, deltaTime: number): void
    {
        this.handleInput(input);


        this.player.update(deltaTime);
        this.collisionSystem.clearCollidables();
        this.collisionSystem.updateCollidable(this.player);
        for (let platform of this.platforms)
        {
            this.collisionSystem.updateCollidable(platform);
        }
        this.collisionSystem.updateCollisions();
    }

    onDraw(renderer: Renderer): void
    {
        renderer.addToRender(this);
        renderer.addToRender(this.player);
        for (let platform of this.platforms)
        {
            renderer.addToRender(platform);
        }
    }

    //temporary hack
    draw(canvas: Canvas): void
    {
        canvas.drawImage(this.image, new Vector(-500, -500));
    }

    getFocusedObject(): IFollowable
    {
        return this.player;
    }

    private handleInput(input: Input): void
    {
        this.player.handleInput(input);

        if (input.justPressed(KeyCode.esc))
        {
            this.shouldExit = true;
            this.nextStateType = StateType.Menu;
        }
    }
}
