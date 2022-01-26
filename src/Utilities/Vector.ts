class Vector
{
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    length(): number
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normal(): Vector
    {
        let length: number = this.length();
        let normal: Vector = new Vector(0, 0);

        if (length)
        {
            normal = new Vector(this.x / length, this.y / length);
        }

        return normal;
    }

    static add(first: Vector, second: Vector): Vector
    {
        return new Vector(first.x + second.x, first.y + second.y);
    }

    static subtract(first: Vector, second: Vector): Vector
    {
        return new Vector(first.x - second.x, first.y - second.y);
    }

    static scale(vector: Vector, scale: number): Vector
    {
        return new Vector(vector.x * scale, vector.y * scale);
    }

    static negative(vector: Vector): Vector
    {
        return new Vector(-vector.x, -vector.y);
    }
}