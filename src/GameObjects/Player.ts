enum PlayerAnimation
{
    idle,
    run,
}

class Player implements IFollowable, IDrawable
{
    private physical: Physical = new Physical(Dynamics.kinematic);
    private animations: Map<PlayerAnimation, GameAnimation> = new Map<PlayerAnimation, GameAnimation>();
    private currentAnimation: PlayerAnimation = PlayerAnimation.idle;
    private size: Vector = new Vector(50, 50);
    private scale: Vector = new Vector(1, 1);

    constructor()
    {
        this.animations.set(PlayerAnimation.idle, new GameAnimation("/assets/animations/Player/Idle", new Count(4), ImageExtension.png, new FPS(4)));
        this.animations.set(PlayerAnimation.run, new GameAnimation("/assets/animations/Player/Run", new Count(8), ImageExtension.png, new FPS(12)));
    }

    update(deltaTime: number): void
    {
        this.physical.update(deltaTime);
        this.animate();
        this.flip()
        this.animations.get(this.currentAnimation).update(deltaTime);
    }

    draw(canvas: Canvas): void
    {
        const currentAnimationFrame = this.animations.get(this.currentAnimation).getCurrentImage();
        const currentPosition = this.physical.getPosition();
        canvas.drawFlipableImage(currentAnimationFrame, currentPosition, this.scale, this.size);
    }

    flip()
    {
        if (this.physical.getVelocity().x < 0)
        {
            this.scale = new Vector(-1, 1);
        }
        else if (this.physical.getVelocity().x > 0)
        {
            this.scale = new Vector(1, 1);
        }
    }

    animate(): void 
    {
        if (Math.abs(this.physical.getVelocity().x) > 0)
        {
            this.currentAnimation = PlayerAnimation.run;
        }
        else
        {
            this.currentAnimation = PlayerAnimation.idle;
        }
    }

    getPositionToFollow(): Vector 
    {
        return Vector.add(this.physical.getPosition(), Vector.scale(this.size, 0.5));
    }

    handleInput(input: Input)
    {
        let forceVector = new Vector(0, 0);
        if (input.isPressed(KeyCode.W))
        {
            forceVector = Vector.add(forceVector, new Vector(0, -5000));
        }

        if (input.isPressed(KeyCode.S))
        {
            forceVector = Vector.add(forceVector, new Vector(0, 5000));
        }

        if (input.isPressed(KeyCode.A))
        {
            forceVector = Vector.add(forceVector, new Vector(-5000, 0));
        }

        if (input.isPressed(KeyCode.D))
        {
            forceVector = Vector.add(forceVector, new Vector(5000, 0));
        }

        this.physical.applyForce(forceVector);
    }
}

