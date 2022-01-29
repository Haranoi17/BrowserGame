enum StateType
{
    Menu = 0,
    Playing = 1,
}

class GameState
{
    protected shouldExit: boolean;
    protected nextStateType: StateType;

    onEnter(): void { }

    onUpdate(input: Input, deltaTime: number): void { }

    onDraw(renderer: Renderer): void { }

    onExit(): void { this.shouldExit = false; }

    getNextStateType(): StateType { return this.nextStateType; }

    shoudStateChange(): boolean
    {
        return this.shouldExit;
    }

    getFocusedObject(): IFollowable { return new FollowableMock(); }
}