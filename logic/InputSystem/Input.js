class Input
{
    constructor() 
    {
        this.keys = new Map();
        this.keys.set(Key.W, new Key(KeyCode.W));
        this.keys.set(Key.S, new Key(KeyCode.S));
        this.keys.set(Key.A, new Key(KeyCode.A));
        this.keys.set(Key.D, new Key(KeyCode.D));
        this.keys.set(Key.E, new Key(KeyCode.E));
        this.keys.set(Key.lshift, new Key(KeyCode.lshift));
        this.keys.set(Key.space, new Key(KeyCode.space));
    }

    isKeyPressed(keyName) 
    {
        return this.keys.get(keyName).isPressed();
    }

    isClicked(keyName)
    {
        return this.keys.get(keyName).isClicked();
    }

    update()
    {
        this.keys.forEach((key)=>{key.update();});
    }
}