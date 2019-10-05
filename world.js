class World {
    _objects = [];

    constructor(ctx) {
        this.context = ctx;
        this.load();
    }

    start() {
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    load() {

    }

    draw(secondsPassed) {
        this.context.save();
        this.context.fillStyle = "0";
        this.context.fillRect(0, 0, 1200, 600);
        this.context.restore();


        this._objects.forEach(object => object.draw());


        this.drawFPS(secondsPassed);
    }

//Cette fonction met à jour les éléments
    update(timestamp) {
        this._objects[0].data.pos.x = Mouse.position.X;
        this._objects[0].data.pos.y = Mouse.position.Y;
        this.checkCollisionBetweenObjects();
        this._objects.forEach(object => object.update());
    }


//cette fonction représente la gameloop du jeu
    loop(timestamp) {
        //Calculate the number of seconds passed
        //since the last frame
        let secondsPassed = (timestamp - lastRender) / 1000;
        //Calculate fps


        this.update(timestamp);
        this.draw(secondsPassed);

        if (this.remainingRefreshes > 1) {
            this.remainingRefreshes--;
        } else {
            this.remainingRefreshes = 3600;
        }

        lastRender = timestamp;
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    drawFPS(secondsPassed) {
        let fps = Math.round(1 / secondsPassed);
        //Draw number to the screen
        this.context.save();
        this.context.font = '25px Arial';
        this.context.fillStyle = 'white';
        this.context.fillText("FPS: " + fps, 10, 30);
        this.context.restore();
    }

    addObject(object) {
        this._objects.push(object);
    }

    checkCollisionBetweenObjects() {
        let response = new SAT.Response();
        let isColliding = false;

        //on parcourt la liste des objets pour comparer chaque objet avec les autres;
        for (let aCount = 0; aCount < this._objects.length; aCount++) {
            for (let bCount = aCount + 1; bCount < this._objects.length; bCount++) {
                let aObject = aCount;
                let bObject = bCount;
                //Check si le premier objet est un cercle
                if (this._objects[aObject] instanceof CircleShape) {
                    //check si le deuxième objet est un cercle
                    if (this._objects[bObject] instanceof CircleShape) {
                        isColliding = SAT.testCircleCircle(this._objects[aObject].data, this._objects[bObject].data, response);
                    }
                }else if(this._objects[aObject] instanceof PolygonShape){
                    if (this._objects[bObject] instanceof CircleShape) {
                        isColliding = SAT.testPolygonCircle(this._objects[aObject].data, this._objects[bObject].data, response);
                    }else{
                        isColliding = SAT.testPolygonPolygon(this._objects[aObject].data, this._objects[bObject].data, response);
                    }
                }
                if (isColliding) {
                    //si une collision existe alors on répond en conséquence
                    this._objects[aObject].respondTocollision(this._objects[bObject], response);
                }
            }
        }
    }


}