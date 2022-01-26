function relayKeyUpFromBrowser(event)
{
    game.input.keys.forEach(key =>
    {
        if (event.keyCode == key.code)
        {
            key.setUp();
        }
    })
}

function relayKeyDownFromBrowser(event)
{
    game.input.keys.forEach(key =>
    {
        if (event.keyCode == key.code)
        {
            key.setDown();
        }
    })
}

window.addEventListener("keyup", relayKeyUpFromBrowser);
window.addEventListener("keydown", relayKeyDownFromBrowser);