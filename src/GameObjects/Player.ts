enum PlayerAnimation
{
    idle,
    run,
    dash,
}

class Dash
{
    isDashing: boolean = false;
    private dashSpeed: number = 1000;
    private dashTimer: number = 0;
    readonly dashDuration: number = 0.1;

    constructor(speed: number = 100, duration: number = 1)
    {
        this.dashSpeed = speed;
        this.dashDuration = duration;
    }

    update(deltaTime: number, player: Player)
    {
        if (this.isDashing)
        {
            this.dashTimer += deltaTime;
            if (this.dashTimer >= this.dashDuration)
            {
                this.dashTimer = this.dashDuration;
                this.isDashing = false;
            }

            player.physical.position = new Vector(player.physical.position.x + (this.dashSpeed * player.scale.x) * deltaTime, player.physical.position.y)
        }
    }

    perform()
    {
        this.isDashing = true;
        this.dashTimer = 0;
    }
}

class Jump
{
    private isJumping: boolean = false;
    private jumpTimer: number = 0;
    private jumpStartPosition: Vector = new Vector(0, 0);
    private jumpHeightCoefficient: number = 250;


    update(deltaTime: number, player: Player)
    {
        if (!this.isJumping && !player.isGrounded)
        {
            player.physical.fall();
        }
        else if (player.isGrounded)
        {
            player.physical.stopFalling();
        }

        if (this.isJumping)
        {
            if (this.jumpTimer >= 1)
            {
                this.jumpTimer = 1;
                this.isJumping = false;
            }
            else
            {
                this.jumpTimer += deltaTime * 2;
            }

            player.physical.position = new Vector(player.physical.position.x, this.jumpStartPosition.y - ((1 - this.jumpTimer) * this.jumpTimer) * this.jumpHeightCoefficient); //x-x^2
        }
    }

    perform(isGrounded: boolean, startPosition: Vector)
    {
        if (isGrounded)
        {
            this.isJumping = true;
            this.jumpStartPosition = startPosition;
            this.jumpTimer = 0;
        }
    }
}

class Player implements IFollowable, IDrawable
{
    physical: Physical = new Physical(Dynamics.kinematic, 250);
    private animations: Map<PlayerAnimation, GameAnimation> = new Map<PlayerAnimation, GameAnimation>();
    private currentAnimation: PlayerAnimation = PlayerAnimation.idle;
    private size: Vector = new Vector(50, 50);
    scale: Vector = new Vector(1, 1);

    isGrounded: boolean = false;

    private jump: Jump = new Jump();
    private dash: Dash = new Dash(1000, 0.1);

    constructor()
    {
        this.animations.set(PlayerAnimation.idle, new GameAnimation("/assets/animations/Player/Idle", new Count(4), ImageExtension.png, new FPS(4)));
        this.animations.set(PlayerAnimation.run, new GameAnimation("/assets/animations/Player/Run", new Count(8), ImageExtension.png, new FPS(12)));
        this.animations.set(PlayerAnimation.dash, new GameAnimation("/assets/animations/player/Dash", new Count(1), ImageExtension.png, new FPS(1)));
    }

    update(deltaTime: number): void
    {
        this.physical.update(deltaTime);
        this.dash.update(deltaTime, this);
        this.checkIfGrounded()
        this.jump.update(deltaTime, this);
        this.animate();
        this.flip();
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

        if (this.dash.isDashing)
        {
            this.currentAnimation = PlayerAnimation.dash;
        }
    }

    getPositionToFollow(): Vector 
    {
        return Vector.add(this.physical.getPosition(), Vector.scale(this.size, 0.5));
    }

    handleInput(input: Input)
    {
        let forceVector = new Vector(0, 0);

        if (input.isPressed(KeyCode.A))
        {
            forceVector = Vector.add(forceVector, new Vector(-5000, 0));
        }

        if (input.isPressed(KeyCode.D))
        {
            forceVector = Vector.add(forceVector, new Vector(5000, 0));
        }

        this.physical.applyForce(forceVector);

        if (input.justPressed(KeyCode.lshift))
        {
            this.dash.perform();
        }

        if (input.justPressed(KeyCode.space) && this.isGrounded)
        {
            this.jump.perform(this.isGrounded, this.physical.position);
        }
    }

    private checkIfGrounded()
    {
        this.isGrounded = this.physical.position.y >= 10
    }
}