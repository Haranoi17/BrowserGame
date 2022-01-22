class Timer
{
    #deltaTime;
    #previousTime;

    constructor()
    {   
        this.#deltaTime = 0.0;
        this.#previousTime = new Date().getTime();
    }

    update()
    {
        this.#deltaTime = (new Date().getTime() - this.#previousTime);
        this.#previousTime = new Date().getTime()
    }

    getDeltaTime()
    {
        return this.millisecondsToSeconds(this.#deltaTime);
    }

    millisecondsToSeconds(milliseconds)
    {
        return milliseconds/1000;
    }
}