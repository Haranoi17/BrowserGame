class Camera implements IDrawable
{
    position: Vector = new Vector(0, 0);
    private positionOffset: Vector = new Vector(0, 0);
    private zoom: Vector = new Vector(1, 1);
    private speed: Vector = new Vector(10, 10);
    private canvasSize: Vector = new Vector(0, 0);

    private target: IFollowable = new FollowableMock();

    setObjectToFollow(objectToFollow: IFollowable): void
    {
        this.target = objectToFollow;
    }

    setCanvasSize(canvasSize: Vector): void
    {
        this.canvasSize = canvasSize;
    }

    update(deltaTime: number): void
    {
        this.positionOffset = this.calculateCameraStep(deltaTime);
        this.position = Vector.add(this.position, this.positionOffset);
    }

    draw(canvas: Canvas): void
    {
        canvas.ctx.translate(-this.positionOffset.x, -this.positionOffset.y);
        canvas.ctx.scale(this.zoom.x, this.zoom.y);
    }

    private calculateCameraStep(deltaTime: number): Vector
    {
        const vectorFromCameraCenterToObject = Vector.subtract(this.target.getPositionToFollow(), this.calculateMiddleOfCameraPosition());
        const vectorFromCameraCenterToObjectWithSpeedApplied = new Vector(vectorFromCameraCenterToObject.x * this.speed.x, vectorFromCameraCenterToObject.y * this.speed.y);

        return Vector.scale(vectorFromCameraCenterToObjectWithSpeedApplied, deltaTime);
    }

    private calculateMiddleOfCameraPosition(): Vector
    {
        const halfCanvasSize = new Vector(this.canvasSize.x / 2, this.canvasSize.y / 2);
        return Vector.add(this.position, halfCanvasSize);
    }
}

