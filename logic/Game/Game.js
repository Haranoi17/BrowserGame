class Game
{
    constructor()
    {
        const second = 1000.0 ;//ms
        const FPS = 5.0;
        this.fixedUpdateTime = second/FPS; //ms
        
        this.input = new Input();
        this.soundPlayer = new SoundPlayer();
    }

    gameLoop()
    {
        this.update();
        this.draw();
    }
    
    update()
    {
        if(this.input.isClicked(Key.W))
        {
            this.soundPlayer.play(AudioFiles.clickSound);
        }

        this.input.update();
    }

    draw()
    {
        console.log("GameDrawn");
    }
}