class Platform implements ICollidable, IDrawable
{
    private position: Vector = new Vector(0, 100);
    private size: Vector = new Vector(1000, 100);

    constructor(position: Vector, size: Vector)
    {
        this.position = position;
        this.size = size;
    }
    getCollisionType(): CollisionType
    {
        return CollisionType.environment;
    }

    getInfluencingCollisionTypes(): Array<CollisionType>
    {
        return new Array<CollisionType>();
    }

    getPosition(): Vector
    {
        return this.position;
    }

    getSize(): Vector
    {
        return this.size;
    }

    draw(canvas: Canvas): void
    {
        canvas.drawRectangle(this.position, this.size);
    }

    collide(other: ICollidable): void
    {

    }

}