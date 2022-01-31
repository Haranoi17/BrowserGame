enum CollisionType
{
    basic,
    character,
    environment,
    trigger,
}

interface ICollidable
{
    getSize(): Vector;
    getPosition(): Vector;
    getCollisionType(): CollisionType;
    getInfluencingCollisionTypes(): Array<CollisionType>;
    collide(other: ICollidable): void;
}

class CollisionData
{
    left: number;
    right: number;
    top: number;
    bottom: number;

    otherLeft: number;
    otherRight: number;
    otherTop: number;
    otherBottom: number;
}

class CollisionSystem
{
    static detectionOffset: number = 5;
    private collidables: Array<ICollidable> = new Array<ICollidable>();

    clearCollidables(): void
    {
        this.collidables = [];
    }

    updateCollidable(collidable: ICollidable): void
    {
        this.collidables.push(collidable);
    }

    updateCollisions(): void
    {
        for (let i = 0; i < this.collidables.length - 1; ++i)
        {
            for (let j = i + 1; j < this.collidables.length; ++j)
            {
                const first = this.collidables[i];
                const second = this.collidables[j];

                if (this.areOverlapping(first, second))
                {
                    if (this.canCollide(first, second))
                    {
                        first.collide(second);
                    }

                    if (this.canCollide(second, first))
                    {
                        second.collide(first);
                    }
                }
            }
        }
    }

    private areOverlapping(first: ICollidable, second: ICollidable): boolean
    {
        return first.getPosition().x < second.getPosition().x + second.getSize().x &&
            first.getPosition().x + first.getSize().x > second.getPosition().x &&
            first.getPosition().y < second.getPosition().y + second.getSize().y &&
            first.getPosition().y + first.getSize().y > second.getPosition().y;
    }

    private canCollide(first: ICollidable, second: ICollidable): boolean
    {
        for (let influencingCollisionType of first.getInfluencingCollisionTypes())
        {
            if (influencingCollisionType == second.getCollisionType())
            {
                return true;
            }
        }
        return false;
    }

    static createCollisionData(first: ICollidable, second: ICollidable): CollisionData
    {
        let collisionData: CollisionData = new CollisionData();
        collisionData.left = first.getPosition().x;
        collisionData.right = first.getPosition().x + first.getSize().x;
        collisionData.top = first.getPosition().y;
        collisionData.bottom = first.getPosition().y + first.getSize().y;
        collisionData.otherLeft = second.getPosition().x;
        collisionData.otherRight = second.getPosition().x + second.getSize().x;
        collisionData.otherTop = second.getPosition().y;
        collisionData.otherBottom = second.getPosition().y + second.getSize().y;

        return collisionData;
    }
}