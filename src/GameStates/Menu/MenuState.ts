class MenuState extends GameState
{
    private buttons: Array<MenuButton> = new Array<MenuButton>();
    protected nextStateType: StateType;

    constructor()
    {
        super();
        this.buttons.push(new MenuButton("Play!", () =>
        {
            this.shouldExit = true;
            this.nextStateType = StateType.Playing;
        }))

        this.buttons.push(new MenuButton("Exit", () => { window.close(); }));
    }

    onUpdate(input: Input, deltaTime: number): void
    {
        this.handleInput(input);
    }

    onDraw(canvas: HTMLCanvasElement): void
    {
        let ctx = canvas.getContext('2d');

        for (let i = 0; i < this.buttons.length; ++i)
        {
            const button = this.buttons[i];
            const gap = 100;
            const startHeight = canvas.height / 5;
            const ctxOffset = new Vector(ctx.getTransform().e, ctx.getTransform().f);
            const buttonPositionRelativeToWindow = new Vector(canvas.width / 2 - button.getWidth() / 2, startHeight + i * (button.getHeight() + gap));
            const buttonPositionInWorld = Vector.subtract(buttonPositionRelativeToWindow, ctxOffset);

            button.draw(canvas, buttonPositionInWorld);
        }
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
