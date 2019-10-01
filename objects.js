//Les objets sont dessiner depuis leur centre

class vector{
    constructor(){

    }
    static intersectCircleCircle(x1,y1,r1,x2,y2,r2){
        let dist = vector.getDistanceBetweenTwoPoints(x1,y1,x2,y1);
        if(dist <= r1 + r2){

        }
    }


    static getNormalizeVector(){

    }

    static intersectRectRect(){

    }



    static getDistanceBetweenTwoPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}

class GameObjects{
    gameObjects
    constructor(context, x, y, velocityX, velocityY, mass = 0){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = velocityX;
        this.vy = velocityY;
        this.mass = mass;
        this.isColliding = false;
    }
    static addToWorld(object){

    }
}

class Circle extends GameObjects{
    constructor(context, x, y, velocityX, velocityY, radius, mass = 0, ){
        super(context, x, y, velocityX, velocityY, mass);
        this.radius = radius;
    }

    draw(){
        this.context.save();
        this.context.strokeStyle = "rgb(0,0,0)";
        this.context.strokeWidth = 10;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.restore();
    }

    update(){


    }
}