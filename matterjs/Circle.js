class Circle
{
    constructor(x, y, r)
    {
        this.r = r;
        this.body = Matter.Bodies.circle(x, y, r, { restitution: 1, friction: 0.1 });
    }

    addBody(world)
    {
        Matter.World.add(world, this.body);
    }

    setStatic(state)
    {
        this.body.isStatic = state;
    }

    update()
    {

    }

    render()
    {
        let pos = this.body.position;
        GAME.context.beginPath();
        GAME.context.arc(pos.x, pos.y, this.r, 0, 2 * Math.PI);
        GAME.context.stroke();
        GAME.context.closePath();
        /*GAME.context.fill();*/

        GAME.context.beginPath();
        GAME.context.moveTo(pos.x, pos.y);
        GAME.context.lineTo(pos.x + this.r/2, pos.y+this.r/2);
        GAME.context.stroke();
    }
}