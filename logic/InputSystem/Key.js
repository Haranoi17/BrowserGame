class Key 
{
    static W = "W";
    static S = "S";
    static A = "A";
    static D = "D";
    static E = "E";
    static lshift = "lshift";
    static space = "space";
    
    constructor(keyCode) 
    {
        this.getKeyCode = () => keyCode;
        this.status = KeyStatus.UP;
        this.previousStatus = KeyStatus.UP;
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
        return this.status == KeyStatus.DOWN;
    }

    justPressed()
    {
        return this.status == KeyStatus.DOWN && this.previousStatus == KeyStatus.UP;
    }

    update()
    {
        this.previousStatus = this.status;
    }
}