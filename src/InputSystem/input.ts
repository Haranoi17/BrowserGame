enum KeyState
{
    UP = 0,
    DOWN = 1,
}


enum KeyCode
{
    W = 87,
    S = 83,
    A = 65,
    D = 68,
    E = 69,
    lshift = 16,
    space = 32,
    esc = 27,
}

class Key
{
    readonly code: KeyCode;
    private status: KeyState;
    private previousStatus: KeyState;

    constructor(keyCode: KeyCode)
    {
        this.code = keyCode;
        this.status = KeyState.UP;
        this.previousStatus = KeyState.UP;
    }

    setDown(): void
    {
        this.status = KeyState.DOWN;
    }

    setUp(): void
    {
        this.status = KeyState.UP;
    }

    isPressed(): boolean
    {
        return this.status == KeyState.DOWN;
    }

    justPressed(): boolean
    {
        return this.status == KeyState.DOWN && this.previousStatus == KeyState.UP;
    }

    update(): void
    {
        this.previousStatus = this.status;
    }
}

class Input
{
    keys: Map<KeyCode, Key>;

    constructor()
    {
        this.keys = new Map();
        this.keys.set(KeyCode.W, new Key(KeyCode.W));
        this.keys.set(KeyCode.S, new Key(KeyCode.S));
        this.keys.set(KeyCode.A, new Key(KeyCode.A));
        this.keys.set(KeyCode.D, new Key(KeyCode.D));
        this.keys.set(KeyCode.E, new Key(KeyCode.E));
        this.keys.set(KeyCode.lshift, new Key(KeyCode.lshift));
        this.keys.set(KeyCode.space, new Key(KeyCode.space));
        this.keys.set(KeyCode.esc, new Key(KeyCode.esc));
    }

    isPressed(keyCode: KeyCode): boolean
    {
        return this.keys.get(keyCode).isPressed();
    }

    justPressed(keyCode: KeyCode): boolean
    {
        return this.keys.get(keyCode).justPressed();
    }

    update(): void
    {
        this.keys.forEach((key) => { key.update(); });
    }
}