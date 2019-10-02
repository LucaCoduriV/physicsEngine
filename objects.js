class GameObjects{
    gameObjects
    constructor(context, x, y, velocityX, velocityY, mass = 0){
        this.context = context;
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.mass = mass;
        this.isColliding = false;
    }
    static addToWorld(object){

    }
    static getDistanceBetweenTwoPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    static intersectCircleCircle(x1,y1,r1,x2,y2,r2){
        let dist = GameObjects.getDistanceBetweenTwoPoints(x1,y1,x2,y2);
        if(dist < r1 + r2){
            return true;
        }
        return false;
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
        for(let i = 0;i< Game.objects.length;i++){
            if(GameObjects.intersectCircleCircle(this.x,this.y,this.radius,Game.objects[i].x,Game.objects[i].y,Game.objects[i].radius) && this !== Game.objects[i]){
                this.velocityX *= -1;
                this.velocityY *= -1;
            }else{
                this.x += this.velocityX;
                this.y += this.velocityY;
            }
        }


    }
}