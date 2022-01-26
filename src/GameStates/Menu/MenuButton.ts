class MenuButton
{
    private onClick: () => void;
    private image: HTMLImageElement;
    private text: string;
    private position: Vector;

    constructor(text: string, onClick: () => void)
    {
        this.image = new Image();
        this.image.src = "/assets/buttons/unpressedButton.png";

        this.text = text;

        this.onClick = onClick;
    }

    draw(canvas: HTMLCanvasElement, position: Vector): void
    {
        let ctx = canvas.getContext('2d');
        let image = this.image;

        ctx.drawImage(this.image, position.x, position.y);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "30px Arial";

        let centeredTextPosition = new Vector(position.x + this.image.width / 2 - this.text.length * 6, position.y + this.image.height / 2 + 10)
        ctx.fillText(this.text, centeredTextPosition.x, centeredTextPosition.y);
    }

    getWidth(): number
    {
        return this.image.width;
    }

    getHeight(): number
    {
        return this.image.height;
    }
}