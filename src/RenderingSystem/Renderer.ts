class Renderer
{
    private canvas: Canvas;
    private camera: Camera = new Camera();

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

    render(drawable: IDrawable): void
    {
        drawable.draw(this.canvas);
    }

    lookAt(followableObject: IFollowable): void
    {
        this.camera.setObjectToFollow(followableObject);
        this.camera.setCanvasSize(new Vector(this.canvas.htmlCanvas.width, this.canvas.htmlCanvas.height));
        this.render(this.camera);
    }
}