interface IDrawable
{
    draw(canvas: Canvas): void;
}

interface IFollowable
{
    getPositionToFollow(): Vector;
}