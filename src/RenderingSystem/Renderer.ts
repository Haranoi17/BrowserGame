class Renderer
{
    private canvas: Canvas;
    private camera: Camera = new Camera();

    private drawables: Array<IDrawable> = new Array<IDrawable>();

    constructor(htmlCanvas: HTMLCanvasElement)
    {
        this.canvas = new Canvas(htmlCanvas);
        this.canvas.htmlCanvas.width = 600;
        this.canvas.htmlCanvas.height = 400;
    }

    clear(): void
    {
        this.canvas.clearVisibleRectangle(this.camera.position);
    }

    update(deltaTime: number): void
    {
        this.camera.update(deltaTime);
    }

    addToRender(drawable: IDrawable): void
    {
        this.drawables.push(drawable);
    }

    render()
    {
        this.renderDrawables();
        this.renderCoordinates();
    }

    lookAt(followableObject: IFollowable): void
    {
        this.camera.setObjectToFollow(followableObject);
        this.camera.setCanvasSize(new Vector(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height));
        this.addToRender(this.camera);
    }

    private renderDrawables()
    {
        for (const drawable of this.drawables)
        {
            drawable.draw(this.canvas);
        }
        this.drawables = [];
    }

    private renderCoordinates()
    {
        this.canvas.ctx.beginPath();
        this.canvas.ctx.moveTo(-1000, 0);
        this.canvas.ctx.lineTo(1000, 0);
        this.canvas.ctx.stroke();

        this.canvas.ctx.beginPath();
        this.canvas.ctx.moveTo(0, -1000);
        this.canvas.ctx.lineTo(0, 1000);
        this.canvas.ctx.stroke();
    }
}