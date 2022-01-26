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
    private fps: number = 0;
    private timeline: number = 0;
    private readonly clipTime: number;
    private readonly frameTime: number;
    private allImagesLoaded: boolean = false;

    constructor(folderWithFrames: string, frameCount: number, fileExtension: ImageExtension, fps: number)
    {
        this.fps = fps;
        this.clipTime = frameCount / fps;
        this.frameTime = 1.0 / fps;

        for (let i = 0; i < frameCount; i++)
        {
            let frame = new Image();
            frame.src = `${folderWithFrames}/${i}.${fileExtension}`
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