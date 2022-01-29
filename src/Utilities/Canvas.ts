class Canvas
{
    htmlCanvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement)
    {
        this.htmlCanvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    drawImage(image: HTMLImageElement, position: Vector)
    {
        this.ctx.drawImage(image, position.x, position.y);
    }

    drawFlipableImage(image: HTMLImageElement, position: Vector, scale: Vector, size: Vector)
    {
        let imagePosX = position.x;

        if (scale.x < 0)
        {
            imagePosX = -position.x - size.x;
        }

        this.ctx.scale(scale.x, scale.y);
        this.ctx.drawImage(image, imagePosX + size.x, position.y, -size.x, size.y);
        this.ctx.scale(scale.x, scale.y);
    }

    clearVisibleRectangle(cameraPosition: Vector)
    {
        this.ctx.clearRect(cameraPosition.x, cameraPosition.y, this.htmlCanvas.width, this.htmlCanvas.height);
    }
}