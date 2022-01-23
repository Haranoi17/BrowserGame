class Vector
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    
    length()
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
    normal()
    {
        let normalVec =  new Vector(0, 0);
        
        if(this.length())
        {
            normalVec = new Vector(this.x/this.length(), this.y/this.length());
        }
        
        return normalVec;
    }

    static multiply(vec1, vec2)
    {
        return new Vector(vec1.x * vec2.x, vec1.y * vec2.y);
    }
    
    static scale(vec, scale)
    {
        return new Vector(vec.x * scale, vec.y * scale);
    }
    
    static negative(vec)
    {
        return new Vector(-vec.x, -vec.y);
    }
    
    static add(vec1, vec2)
    {
        return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
    }

    static subtract(vec1, vec2)
    {
        return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
    }
}
