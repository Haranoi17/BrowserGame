function updateGame()
{
    game.gameLoop()
}

setInterval(updateGame, game.fixedUpdateTime);