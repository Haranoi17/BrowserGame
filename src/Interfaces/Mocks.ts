class DrawableMock implements IDrawable
{
    draw(canvas: Canvas): void { }
}

class FollowableMock implements IFollowable
{
    getPositionToFollow(): Vector
    {
        return new Vector(0, 0);
    }
}