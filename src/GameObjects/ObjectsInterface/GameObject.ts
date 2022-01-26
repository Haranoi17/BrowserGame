class GameObject
{
    position: Vector = new Vector(0, 0);
    scale: Vector = new Vector(1, 1);
    rotation: number = 0;

    update(deltaTime: number): void { }
    draw(canvas: HTMLCanvasElement): void { }
}