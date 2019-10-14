class Box
{
    constructor(x, y, w, h, options = {})
    {
        this.w = w;
        this.h = h;
        this.body = Matter.Bodies.rectangle(x, y, w, h, options);

        this.color = null;
        this.setColor();
    }

    setColor()
    {
        let colors = ['blue', 'green', 'red'];

        this.color = colors[Math.floor(Math.random()*3)];
    }

    addBody(world)
    {
        Matter.World.add(world, this.body);
    }

    scale(x, y, options = {})
    {
        Matter.Body.scale(this.body, x, y, options );
        this.w *= x;
        this.h *= y;
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
        GAME.context.fillStyle = this.color;
        let pos = this.body.position;
        /*GAME.context.save();
        GAME.context.translate(pos.x, pos.y);
        GAME.context.rotate(this.body.angle*Math.PI/180);
        GAME.context.fillRect(-(this.w/2), -(this.h/2), this.w, this.h);
        GAME.context.restore();*/


        for(let i=0;i<this.body.vertices.length;i++)
        {
            GAME.context.beginPath();


            GAME.context.moveTo(this.body.vertices[i].x, this.body.vertices[i].y);
            if(i==this.body.vertices.length-1)
                GAME.context.lineTo(this.body.vertices[0].x, this.body.vertices[0].y);
            else
                GAME.context.lineTo(this.body.vertices[i+1].x, this.body.vertices[i+1].y);
            GAME.context.stroke();
            GAME.context.fill();
        }


    }
}