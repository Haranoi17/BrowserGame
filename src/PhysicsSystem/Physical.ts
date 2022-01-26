enum Dynamics
{
    kinematic = 0,
    dynamic = 1,
}

class Physical
{
    private static gravityAcceleration: Vector = new Vector(0, 100);
    private static dragCoefficient: number = 5;

    public position: Vector;
    private velocity: Vector;
    private acceleration: Vector;
    private dragForce: Vector;
    private mass: number;
    private dynamics: Dynamics;
    private kinematicSpeed: number;

    private appliedForces = new Array<Vector>();

    constructor(isKinematic: Dynamics)
    {
        this.dynamics = isKinematic;
        this.mass = 1;
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.dragForce = new Vector(0, 0);
        this.kinematicSpeed = 100;
    }

    update(deltaTime: number): void
    {
        if (this.isKinematic())
        {
            this.velocity = this.calculateKinematicVelocity(deltaTime);
        }
        else
        {
            this.calculateDrag();
            this.calculateAcceleration();
            this.calculateVelocity(deltaTime);
        }

        this.calculatePosition(deltaTime);
        this.clearForces();
    }

    applyForce(force: Vector): void
    {
        this.appliedForces.push(force);
    }

    private isKinematic(): boolean
    {
        return this.dynamics == Dynamics.kinematic;
    }

    private clearForces(): void
    {
        this.appliedForces = [];
    }

    private calculateDrag(): void
    {
        const dragValues: Vector = Vector.scale(new Vector(Math.pow(this.velocity.x, 2), Math.pow(this.velocity.y, 2)), Physical.dragCoefficient);
        const velocityOppositeDirection = Vector.negative(this.velocity).normal();

        this.dragForce = new Vector(velocityOppositeDirection.x * dragValues.x, velocityOppositeDirection.y * dragValues.y);
    }

    private calculateAppliedForce(): Vector
    {
        let appliedForce: Vector = new Vector(0, 0);

        for (let force of this.appliedForces)
        {
            appliedForce = Vector.add(appliedForce, force);
        }

        return appliedForce;
    }

    private calculateKinematicVelocity(deltaTime: number): Vector
    {
        const moveDirection = this.calculateAppliedForce()
        return Vector.scale(moveDirection.normal(), this.kinematicSpeed);
    }

    private calculateAcceleration()
    {
        let appliedForce: Vector = this.calculateAppliedForce();

        appliedForce = Vector.add(appliedForce, this.dragForce)

        const appliedAcceleration = Vector.scale(appliedForce, 1.0 / this.mass);

        this.acceleration = Vector.add(appliedAcceleration, Physical.gravityAcceleration);
    }

    private calculateVelocity(deltaTime: number): void
    {
        let velocityChange: Vector = Vector.scale(this.acceleration, deltaTime);

        this.velocity = Vector.add(this.velocity, Vector.scale(velocityChange, deltaTime));
    }

    private calculatePosition(deltaTime: number): void
    {
        this.position = Vector.add(this.position, Vector.scale(this.velocity, deltaTime));
    }
}