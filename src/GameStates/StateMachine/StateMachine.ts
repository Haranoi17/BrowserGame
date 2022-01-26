class StateMachine
{
    private states: Map<StateType, GameState>;
    private currentStateType: StateType;

    constructor()
    {
        this.states = new Map();
        this.states.set(StateType.Menu, new MenuState());
        this.states.set(StateType.Playing, new PlayingState());

        this.currentStateType = StateType.Menu;
    }

    private currentState(): GameState
    {
        return this.states.get(this.currentStateType);
    }

    switchStates()
    {
        if (this.currentState().shoudStateChange())
        {
            this.currentState().onExit();

            this.currentStateType = this.currentState().getNextStateType();

            this.currentState().onEnter();
        }
    }

    update(input: Input, deltaTime: number): void
    {
        this.currentState().onUpdate(input, deltaTime);
        this.switchStates();
    }

    draw(canvas: HTMLCanvasElement): void
    {
        this.currentState().onDraw(canvas);
    }

    getFocusedObject(): GameObject
    {
        return this.currentState().getFocusedObject();
    }
}