class KeyCode
{
    static W = 87;
    static S = 83;
    static A = 65;
    static D = 68;
    static E = 69;
    static lshift = 16;
    static space = 32;
}

class KeyStatus
{
    static UP = false;
    static DOWN = true;
}

class Key 
{

    constructor(keyCode) 
    {
        this.getKeyCode = () => keyCode;
        this.status = KeyStatus.UP;
    }

    setDown() 
    {
        this.status = KeyStatus.DOWN;
    }

    setUp() 
    {
        this.status = KeyStatus.UP;
    }

    isPressed() 
    {
        return this.status;
    }
}

class Input 
{
    constructor() 
    {
        this.keys = new Map();
        this.keys.set("W", new Key(KeyCode.W));
        this.keys.set("S", new Key(KeyCode.S));
        this.keys.set("A", new Key(KeyCode.A));
        this.keys.set("D", new Key(KeyCode.D));
        this.keys.set("E", new Key(KeyCode.E));
        this.keys.set("lshift", new Key(KeyCode.lshift));
        this.keys.set("space", new Key(KeyCode.space));
    }

    isKeyPressed(keyName) 
    {
        return this.keys.get(keyName).isPressed();
    }
}

// global variable available for whole project if included this file is in index.html
var input = new Input();

// example usage 
// input.isKeyPressed("W");