const GAMEVAR = {};

GAMEVAR.deltaTime = 0;
GAMEVAR.timestep = 1000 / 60;
GAMEVAR.lastRender = 0;

class Game
{
    constructor(width = 500, height = 500)
    {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = "1px solid black";
        document.body.append(this.canvas);
    }

    run()
    {
        window.requestAnimationFrame(GAMEVAR.gameLoop);
    }

    update(dt)
    {
    }

    render()
    {
    }
}

const GAME = new Game();

GAMEVAR.gameLoop = function(timestamp)
{
    GAMEVAR.deltaTime += timestamp - GAMEVAR.lastRender;
    GAMEVAR.lastRender = timestamp;

    if (GAMEVAR.deltaTime > 160)
        return;

    while(GAMEVAR.deltaTime >= GAMEVAR.timestep){
        GAME.update(GAMEVAR.timestep);
        GAMEVAR.deltaTime -= GAMEVAR.timestep;
    }
    GAME.render();
    window.requestAnimationFrame(GAMEVAR.gameLoop);
}