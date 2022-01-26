class Timer
{
    private deltaTime: number;
    private previousTime: number;

    constructor()
    {
        this.deltaTime = 0.0;
        this.previousTime = new Date().getTime();
    }

    update(): void
    {
        this.deltaTime = (new Date().getTime() - this.previousTime);
        this.previousTime = new Date().getTime()
    }

    getDeltaTime(): number
    {
        return millisecondsToSeconds(this.deltaTime);
    }
}