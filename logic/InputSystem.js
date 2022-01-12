class Key {
    static W_keyCode = 87;
    static S_keyCode = 83;
    static A_keyCode = 65;
    static D_keyCode = 68;
    static E_keyCode = 69;
    static lshift_keyCode = 16;
    static space_keyCode = 32;

    static UP = false;
    static DOWN = true;

    constructor(fakeConstantKeyCodeFunction) {
        //This is function because I wanted to make it constant value
        this.getKeyCode = fakeConstantKeyCodeFunction;
        this.status = Key.KEYUP;
    }

    setDown() {
        this.status = Key.DOWN;
    }

    setUp() {
        this.status = Key.UP;
    }

    isPressed() {
        return this.status;
    }
}

class Input {
    constructor() {
        this.keys = new Map();
        this.keys.set("W", new Key(() => { return Key.W_keyCode; }));
        this.keys.set("S", new Key(() => { return Key.S_keyCode; }));
        this.keys.set("A", new Key(() => { return Key.A_keyCode; }));
        this.keys.set("D", new Key(() => { return Key.D_keyCode; }));
        this.keys.set("E", new Key(() => { return Key.E_keyCode; }));
        this.keys.set("lshift", new Key(() => { return Key.lshift_keyCode; }));
        this.keys.set("space", new Key(() => { return Key.space_keyCode; }));
    }

    isKeyPressed(keyName) {
        return this.keys.get(keyName).isPressed();
    }
}


function relayKeyUpFromBrowser(event) {
    input.keys.forEach(key => {
        if (event.keyCode == key.getKeyCode()) {
            key.setUp();
        }
    })
}

function relayKeyDownFromBrowser(event) {
    input.keys.forEach(key => {
        if (event.keyCode == key.getKeyCode()) {
            key.setDown();
        }
    })
}

window.addEventListener("keyup", relayKeyUpFromBrowser);
window.addEventListener("keydown", relayKeyDownFromBrowser);


// global variable available for whole project if included this file is in index.html
var input = new Input();

// example usage 
// input.isKeyPressed("W");
// dont use input.keys fiels... I had no idea how to make them private.