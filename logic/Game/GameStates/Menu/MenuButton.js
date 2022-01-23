class MenuButton
{
    constructor(text, onClick)
    {
        this.image = new Image();
        this.image.src = "/assets/buttons/unpressedButton.png";
 
        this.text = text;

        this.onClick = onclick;
    }

    draw(canvas, positionVector)
    {
        let ctx = canvas.getContext('2d');
        let image = this.image;

        ctx.drawImage(this.image, positionVector.x, positionVector.y);
        ctx.fillStyle="rgb(255,255,255)";
        ctx.font = "30px Arial";

        let centeredTextPosition = new Vector(positionVector.x + this.image.width/2 - this.text.length * 6, positionVector.y + this.image.height/2 + 10)
        ctx.fillText(this.text, centeredTextPosition.x, centeredTextPosition.y);
    }

    getWidth()
    {
        return this.image.width;
    }

    getHeight()
    {
        return this.image.height;
    }
}