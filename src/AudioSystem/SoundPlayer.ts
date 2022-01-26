class SoundPlayer
{
    play(soundPath: string)
    {
        new Audio(soundPath).play();
    }
}