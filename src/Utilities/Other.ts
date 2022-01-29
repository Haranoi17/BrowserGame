function millisecondsToSeconds(milliseconds: number): number
{
    return milliseconds / 1000.0;
}

class Count
{
    value: number = 0;
    constructor(count: number)
    {
        this.value = count;
    }
}

class FPS
{
    value: number = 0;
    constructor(count: number)
    {
        this.value = count;
    }
}
