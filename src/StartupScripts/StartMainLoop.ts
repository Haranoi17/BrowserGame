function updateGame(): void
{
    game.gameLoop();
}

setInterval(updateGame, game.fixedUpdateTime);