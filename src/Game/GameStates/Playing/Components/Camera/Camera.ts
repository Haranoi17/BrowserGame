class Camera
{
    private position: Vector = new Vector(0, 0);
    private positionOffset: Vector = new Vector(0, 0);
    private zoom: Vector = new Vector(1, 1);
    private speed: Vector = new Vector(10, 10);


    update(targetPosition: Vector, canvasSize: Vector, deltaTime: number): void
    {
        this.positionOffset = this.calculateCameraStep(targetPosition, canvasSize, deltaTime);
        this.position = Vector.add(this.position, this.positionOffset);
    }

    move(canvas: HTMLCanvasElement): void
    {
        let ctx = canvas.getContext('2d');

        ctx.translate(-this.positionOffset.x, -this.positionOffset.y);
        ctx.scale(this.zoom.x, this.zoom.y);
    }

    calculateCameraStep(targetPosition: Vector, canvasSize: Vector, deltaTime: number): Vector
    {
        const vectorFromCameraCenterToObject = Vector.subtract(targetPosition, this.calculateMiddleOfCameraPosition(canvasSize));
        const vectorFromCameraCenterToObjectWithSpeedApplied = new Vector(vectorFromCameraCenterToObject.x * this.speed.x, vectorFromCameraCenterToObject.y * this.speed.y);
        return Vector.scale(vectorFromCameraCenterToObjectWithSpeedApplied, deltaTime);
    }

    private calculateMiddleOfCameraPosition(canvasSize: Vector): Vector
    {
        const halfCanvasSize = new Vector(canvasSize.x / 2, canvasSize.y / 2);
        return Vector.add(this.position, halfCanvasSize);
    }
}