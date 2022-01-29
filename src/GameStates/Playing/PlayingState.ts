class PlayingState extends GameState implements IDrawable//temporary hack
{
    private player: Player = new Player();
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

        this.player.update(deltaTime);
    }

    onDraw(renderer: Renderer): void
    {
        renderer.render(this);
        renderer.render(this.player);
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
