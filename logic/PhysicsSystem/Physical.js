class Physical
{
    static #gravity = 100;
    static #dragCoefficient = 0.05;

    constructor()
    {
        this.mass = 1;
        this.position = new Vector(0,0);
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0, Physical.#gravity);
        this.drag = new Vector(0,0);
    }

    update(deltaTime)
    {
        this.applyGravityForce();
        
        this.velocity = Vector.add(this.velocity, Vector.scale(this.acceleration, deltaTime));
        
        const dragValues = new Vector(Physical.#dragCoefficient * Math.pow(this.velocity.x, 2), Physical.#dragCoefficient * Math.pow(this.velocity.y, 2));
        const oppositeVelocityDirection = Vector.negative(this.velocity).normal();
   
        this.drag = Vector.multiply(dragValues, oppositeVelocityDirection);
        
        this.position = Vector.add(this.position, Vector.scale(this.velocity, deltaTime));
    }

    applyForce(forceVector)
    {
        this.acceleration = Vector.add(this.drag, Vector.scale(forceVector, 1.0/this.mass));
        this.applyGravityForce();
    }

    applyGravityForce()
    {
        this.acceleration.y += Physical.#gravity*this.mass;
    }
}