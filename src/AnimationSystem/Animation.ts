enum ImageExtension
{
    png = "png",
    jpg = "jpg",
    jpeg = "jpeg",
}

class GameAnimation
{
    private frames: Array<HTMLImageElement> = new Array<HTMLImageElement>();
    private iterator: number = 0;
    private fps: FPS = new FPS(0);
    private timeline: number = 0;
    private readonly clipTime: number;
    private readonly frameTime: number;

    constructor(folderWithFrames: string, frameCount: Count, imageExtension: ImageExtension, fps: FPS)
    {
        this.fps = fps;
        this.clipTime = frameCount.value / fps.value;
        this.frameTime = 1.0 / fps.value;

        for (let i = 0; i < frameCount.value; i++)
        {
            let frame = new Image();
            frame.src = `${folderWithFrames}/${i}.${imageExtension}`
            this.frames.push(frame);
        }
    }

    update(deltaTime: number)
    {
        this.timeline += deltaTime;

        this.iterator = Math.floor(this.timeline / this.frameTime);

        if (this.iterator >= this.frames.length)
        {
            this.timeline = 0;
            this.iterator = 0;
        }
    }

    getCurrentImage(): HTMLImageElement
    {
        return this.frames[this.iterator];
    }
}