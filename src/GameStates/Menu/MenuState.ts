class MenuState extends GameState implements IDrawable//temporary hack
{
    protected nextStateType: StateType;

    constructor()
    {
        super();
    }

    onUpdate(input: Input, deltaTime: number): void
    {
        this.handleInput(input);
    }

    onDraw(renderer: Renderer): void
    {
        renderer.render(this);
    }

    //temporary hack
    draw(canvas: Canvas): void
    {
    }

    private handleInput(input: Input): void
    {
        if (input.justPressed(KeyCode.esc))
        {
            this.shouldExit = true;
            this.nextStateType = StateType.Playing;
        }
    }
}
