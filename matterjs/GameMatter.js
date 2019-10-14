class GameMatter
{
    constructor()
    {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;

        this.setupInput();

        this.mousePos = {x: 0, y: 0};

        this.mouse = Matter.Mouse.create(GAME.canvas);


        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {mouse: this.mouse});

        this.mouseConstraint.mouse.pixelRation = 3;

        Matter.World.add(this.world, this.mouseConstraint);

        this.boxes = [];

        for(let i=0; i<5; i++)
        {
            this.boxes[i] = new Box(GAME.width/2, 50, 10, 10, {restitution: 1, friction: 2});
            this.boxes[i].addBody(this.world);
        }

        this.sling = {pointA: null};

        this.ground = new Box(GAME.width/2, GAME.height-20, GAME.width+50, 100);
        this.ground.addBody(this.world);
        this.ground.setStatic(true);

        this.wallLeft = new Box(0, GAME.height/2, 100, GAME.height);
        this.wallLeft.addBody(this.world);
        this.wallLeft.setStatic(true);

        this.wallRight = new Box(GAME.width, GAME.height/2, 100, GAME.height);
        this.wallRight.addBody(this.world);
        this.wallRight.setStatic(true);

        this.wallTop = new Box(GAME.width/2, -50, GAME.width, 100);
        this.wallTop.addBody(this.world);
        this.wallTop.setStatic(true);

        this.cirlcles = [];

        for(let i=0; i<5; i++)
        {
            this.cirlcles[i] = new Circle(100, 100, 10);
            this.cirlcles[i].addBody(this.world);
        }


        this.ctrl = false;
        this.selectedBox = null;
    }


    setupInput()
    {
        let me = this;
        GAME.canvas.onmousedown = function(e)
        {
            me.mousePos = me.getPos(GAME.canvas, e);

            if(me.ctrl === true)
            {
                for(let i=0; i<me.boxes.length; i++)
                {
                    let boxPos = {x: me.boxes[i].body.position.x, y: me.boxes[i].body.position.y, w: me.boxes[i].w, h: me.boxes[i].h};
                    let mouseP = {x: me.mousePos.x, y: me.mousePos.y, w: 1, h: 1};
                    if(me.collide(mouseP, boxPos) && me.selectedBox != me.boxes[i])
                    {
                        if(me.selectedBox != null)
                        {
                            me.selectedBox.setColor();
                        }
                        me.selectedBox = me.boxes[i];
                        me.selectedBox.color = 'yellow';
                        break;
                    }
                }
            }
            else
            {
                if(me.selectedBox == null)
                    return;

                me.sling = Matter.Constraint.create({
                    pointA: me.mousePos,
                    bodyB: me.selectedBox.body,
                    stiffness: 0.2,
                    length: 100
                });
                Matter.World.add(me.world, me.sling);
            }
        }

        GAME.canvas.onmouseup = function(e)
        {
            me.mousePos = me.getPos(GAME.canvas, e);
            me.sling.pointA = null;
        }

        GAME.canvas.onmousemove = function(e)
        {
            me.mousePos = me.getPos(GAME.canvas, e);
            //me.sling.pointA = me.mousePos;
        }

        window.onkeyup = function(e)
        {
            if(e.keyCode == 17)
            {
                me.ctrl = !me.ctrl;
            }
        }

    }

    collide( source, target ) {
        return !(
            ( ( source.y + source.h / 2 ) < ( target.y - target.h / 2 ) ) ||
            ( (source.y - source.h / 2) > ( target.y + target.h / 2) ) ||
            ( ( source.x + source.w / 2 ) < (target.x - target.w / 2) ) ||
            ( (source.x - source.w / 2) > ( target.x + target.w / 2) )
        );
    }

    getPos(c, e){
        let rect = c.getBoundingClientRect();
        return {x:e.clientX - rect.left, y: e.clientY - rect.top};
    }

    update(dt)
    {
        Matter.Engine.update(this.engine, dt);
        /*let c = new Circle(100, 100, 10);
        this.cirlcles.push(c);
        c.addBody(this.world);*/
    }

    render()
    {
        GAME.context.clearRect(0, 0, GAME.width, GAME.height);

        if(this.sling.pointA != null)
        {
            GAME.context.beginPath();
            GAME.context.moveTo(this.sling.pointA.x, this.sling.pointA.y);
            GAME.context.lineTo(this.sling.bodyB.position.x, this.sling.bodyB.position.y);
            GAME.context.stroke();
        }

        for(let i=0; i<this.boxes.length; i++)
        {
            this.boxes[i].render();
            //Matter.Body.applyForce(this.boxes[i].body, {x: this.boxes[i].body.position.x, y: this.boxes[i].body.position.y}, {x:0.0005,y:0});
        }

        this.wallRight.render();
        this.wallLeft.render();
        this.wallTop.render();
        this.ground.render();

        for(let i=0; i<this.cirlcles.length; i++)
        {
            GAME.context.fillStyle = 'grey';
            this.cirlcles[i].render();
        }

    }

}