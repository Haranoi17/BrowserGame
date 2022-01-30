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
    isGrounded: boolean = false;

    update(deltaTime: number, player: Player)
    {
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
        else
        {
            this.jumpTimer = 0;
        }
    }

    forceStop()
    {
        this.isJumping = false;
        this.jumpTimer = 0;
    }

    perform(startPosition: Vector)
    {
        if (this.isGrounded)
        {
            this.isJumping = true;
            this.jumpStartPosition = startPosition;
            this.jumpTimer = 0;
            this.isGrounded = false;
        }
    }
}

class Item
{
    readonly image: HTMLImageElement;

    constructor(imagePath: string)
    {
        this.image = new Image();
        this.image.src = imagePath;
    }
}

class Equipment implements IDrawable
{
    private readonly maxAmount: number = 10;
    private readonly cellSize: number = 30;
    private position: Vector = new Vector(0, 0);
    private cellsPositions: Array<Vector> = new Array<Vector>();
    private items: Array<Item> = new Array<Item>();

    addItem(item: Item)
    {
        if (this.items.length < this.maxAmount)
        {
            this.items.push(item);
        }
    }

    draw(canvas: Canvas): void 
    {
        this.calculateOnScreenPosition(canvas);
        this.calculateCellsPositions(canvas);
        this.drawItems(canvas);
        this.drawCells(canvas);
    }

    private calculateOnScreenPosition(canvas: Canvas)
    {
        this.position = new Vector(canvas.htmlCanvas.width - this.cellSize * 1.2, this.cellSize);
    }

    private calculateCellsPositions(canvas: Canvas)
    {
        const cameraOffset: Vector = new Vector(canvas.ctx.getTransform().e, canvas.ctx.getTransform().f);
        this.cellsPositions = []
        for (let i = 0; i < this.maxAmount; ++i)
        {
            const cellPosition: Vector = new Vector(-cameraOffset.x + this.position.x, -cameraOffset.y + this.cellSize * i + this.position.y);
            this.cellsPositions.push(cellPosition);
        }
    }
    private drawCells(canvas: Canvas)
    {
        for (let i = 0; i < this.maxAmount; ++i)
        {
            canvas.ctx.moveTo(this.cellsPositions[i].x, this.cellsPositions[i].y);
            canvas.ctx.lineTo(this.cellsPositions[i].x + this.cellSize, this.cellsPositions[i].y);
            canvas.ctx.lineTo(this.cellsPositions[i].x + this.cellSize, this.cellsPositions[i].y + this.cellSize);
            canvas.ctx.lineTo(this.cellsPositions[i].x, this.cellsPositions[i].y + this.cellSize);
            canvas.ctx.lineTo(this.cellsPositions[i].x, this.cellsPositions[i].y);
        }

        canvas.ctx.stroke();
    }

    private drawItems(canvas: Canvas)
    {
        for (let i = 0; i < this.items.length; ++i)
        {
            canvas.drawImage(this.items[i].image, this.cellsPositions[i], new Vector(this.cellSize, this.cellSize));
        }
    }
}

class Player implements IFollowable, IDrawable, ICollidable
{
    physical: Physical = new Physical(Dynamics.kinematic, 250);
    private animations: Map<PlayerAnimation, GameAnimation> = new Map<PlayerAnimation, GameAnimation>();
    private currentAnimation: PlayerAnimation = PlayerAnimation.idle;
    private size: Vector = new Vector(50, 50);
    scale: Vector = new Vector(1, 1);

    private jump: Jump = new Jump();
    private dash: Dash = new Dash(1000, 0.1);
    private equipment: Equipment = new Equipment();

    private soundPlayer: SoundPlayer = new SoundPlayer();
    private isDed: boolean = false;


    constructor()
    {
        this.animations.set(PlayerAnimation.idle, new GameAnimation("/assets/animations/Player/Idle", new Count(4), ImageExtension.png, new FPS(4)));
        this.animations.set(PlayerAnimation.run, new GameAnimation("/assets/animations/Player/Run", new Count(8), ImageExtension.png, new FPS(12)));
        this.animations.set(PlayerAnimation.dash, new GameAnimation("/assets/animations/player/Dash", new Count(1), ImageExtension.png, new FPS(1)));

        this.equipment.addItem(new Item("/assets/items/item.png"));
    }

    update(deltaTime: number): void
    {
        this.physical.update(deltaTime);
        this.dash.update(deltaTime, this);
        this.physical.fall();
        this.jump.update(deltaTime, this);
        this.animate();
        this.flip();
        this.animations.get(this.currentAnimation).update(deltaTime);
        this.jump.isGrounded = false;
    }

    draw(canvas: Canvas): void
    {
        const currentAnimationFrame = this.animations.get(this.currentAnimation).getCurrentImage();
        const currentPosition = this.physical.getPosition();
        canvas.drawFlipableImage(currentAnimationFrame, currentPosition, this.scale, this.size);
        this.equipment.draw(canvas);

        canvas.drawRectangle(this.physical.position, this.size);
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

    getCollisionType(): CollisionType
    {
        return CollisionType.character;
    }

    getInfluencingCollisionTypes(): Array<CollisionType>
    {
        return new Array<CollisionType>(CollisionType.environment, CollisionType.character);
    }

    getPosition(): Vector
    {
        return this.physical.position;
    }

    getSize(): Vector
    {
        return this.size;
    }

    collide(other: ICollidable): void
    {
        const c: CollisionData = CollisionSystem.createCollisionData(this, other);
        const offset = CollisionSystem.detectionOffset;

        if (other.getCollisionType() == CollisionType.environment)
        {
            if (c.bottom >= c.otherTop && c.right > c.otherLeft && c.left < c.otherRight && !(c.bottom - offset > c.otherTop))
            {
                this.physical.position = new Vector(c.left, c.otherTop - this.size.y);
                this.jump.isGrounded = true;
                this.jump.forceStop();
            }

            if (c.top + offset > c.otherBottom)
            {
                this.jump.forceStop();
                this.physical.position = new Vector(c.left, c.otherBottom);
            }
            else if (c.bottom - offset >= c.otherTop)
            {
                if (c.left <= c.otherRight && c.right >= c.otherRight)
                {
                    const indent = c.left - c.otherRight;
                    this.physical.position = new Vector(c.left - indent, c.top);
                }

                if (c.left <= c.otherLeft && c.right >= c.otherLeft)
                {
                    const indent = c.right - c.otherLeft;
                    this.physical.position = new Vector(c.left - indent, c.top);
                }
            }

        }

        if (other.getCollisionType() == CollisionType.character)
        {
            if (!this.isDed)
            {
                this.soundPlayer.play(AudioFiles.deathSound);
                this.isDed = true;
            }
        }
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

        if (input.justPressed(KeyCode.space))
        {
            this.jump.perform(this.physical.position);
        }
    }
}