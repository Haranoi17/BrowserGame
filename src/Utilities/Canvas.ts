class Canvas
{
    htmlCanvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement)
    {
        this.htmlCanvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    drawImage(image: HTMLImageElement, position: Vector, size: Vector = new Vector(0, 0))
    {
        if (size.length() == 0)
        {
            size = new Vector(image.width, image.height);
        }

        this.ctx.drawImage(image, position.x, position.y, size.x, size.y);
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

    drawRectangle(position: Vector, size: Vector)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(position.x, position.y);
        this.ctx.lineTo(position.x + size.x, position.y);
        this.ctx.lineTo(position.x + size.x, position.y + size.y);
        this.ctx.lineTo(position.x, position.y + size.y);
        this.ctx.lineTo(position.x, position.y);
        this.ctx.stroke();
    }

    clearVisibleRectangle(cameraPosition: Vector)
    {
        this.ctx.clearRect(cameraPosition.x, cameraPosition.y, this.htmlCanvas.width, this.htmlCanvas.height);
    }
}