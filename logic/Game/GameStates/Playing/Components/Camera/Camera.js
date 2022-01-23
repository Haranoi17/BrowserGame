class Camera
{
    constructor()
    {
        this.position = new Vector(0,0);
        this.positionOffset = new Vector(0,0);
        this.middleOfCameraPosition = new Vector(0,0);
        this.zoom = 1;

        this.speed = 10;
    }
    
    update(objectToFollow, deltaTime)
    {
        this.followObject(objectToFollow, deltaTime);
    }
    
    move(canvas)
    {
        let ctx = canvas.getContext('2d');
        this.middleOfCameraPosition = new Vector(this.position.x + canvas.width/2, this.position.y + canvas.height/2);
        
        ctx.translate(-this.positionOffset.x, -this.positionOffset.y);
        this.positionOffset = new Vector(0,0);
        ctx.scale(this.zoom, this.zoom);
    }
    
    followObject(object, deltaTime)
    {
        let vectorBetweenObjectAndCameraCenter = Vector.subtract(object.position, this.middleOfCameraPosition);
        
        this.positionOffset = Vector.add(this.positionOffset, Vector.scale(vectorBetweenObjectAndCameraCenter, deltaTime * this.speed));
        this.position = Vector.add(this.position, this.positionOffset);
    }
}