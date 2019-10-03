class GameObjects{
    constructor(context, x, y, mass = 1){
        this.context = context;
        this.x = x;
        this.y = y;
        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5
        };
        this.mass = mass;
        this.color = "rgb(0,0,0)"
        this.bounce = 1;
        this.friction = 0.00001;
        this.gravitySpeed = 0;
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
    static rotate(velocity, angle){
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
        return rotatedVelocities;
    }
    static resolveCollision(object, otherObject){
        const xVelocityDiff = object.velocity.x - otherObject.velocity.x;
        const yVelocityDiff = object.velocity.y - otherObject.velocity.y;

        const xDist = otherObject.x - object.x;
        const yDist = otherObject.y - object.y;

        //prevent accidental overlap of particles
        if(xVelocityDiff * xDist + yVelocityDiff + yDist >= 0){

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherObject.y - object.y, otherObject.x -object.x);

            //store mass in var for better readability in collision equation
            const m1 = object.mass;
            const m2 = otherObject.mass;

            //velocity before equation
            const u1 = GameObjects.rotate(object.velocity, angle);
            const u2 = GameObjects.rotate(otherObject.velocity, angle);

            //velocity after 1d collision equation
            const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
            const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

            // Final velocity after rotating axis back to original location
            const vFinal1 = GameObjects.rotate(v1, -angle);
            const vFinal2 = GameObjects.rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            object.velocity.x = vFinal1.x;
            object.velocity.y = vFinal1.y;

            otherObject.velocity.x = vFinal2.x;
            otherObject.velocity.y = vFinal2.y;
        }

    }
}

class Circle extends GameObjects{
    constructor(context, x, y, radius, mass = 1){
        super(context, x, y, mass);
        this.radius = radius;
        this.color = "rgb(200,0,100)";
    }

    draw(){
        this.context.save();
        this.context.fillStyle = this.color;
        this.context.strokeStyle = "rgb(0,0,0)";
        this.context.strokeWidth = 10;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }

    update(){
        this.gravitySpeed += Game.gravity;


        for(let i = 0;i< Game.objects.length;i++){
            if(GameObjects.intersectCircleCircle(this.x,this.y,this.radius,Game.objects[i].x,Game.objects[i].y,Game.objects[i].radius) && this !== Game.objects[i]){
                this.color = "rgb(0,100,100)";
                GameObjects.resolveCollision(this,Game.objects[i])
            }
            if(this.x - this.radius <= 0 || this.x + this.radius >= 1200){
                this.color = "rgb(0,100,100)";
                this.velocity.x = -this.velocity.x;
            }
            if(this.y - this.radius <= 0){
                this.color = "rgb(0,100,100)";
                this.gravitySpeed = 0;
                this.velocity.y = -this.velocity.y * this.bounce;
            }
            //quand ça touche le sol
            if(this.y + this.radius >= 600){
                this.y = 600 - this.radius;
                this.velocity.y = -Math.abs(this.velocity.y);
                this.y += this.velocity;
            }
            //déplace la boulle
            this.y += this.velocity.y + this.gravitySpeed;
            this.x += this.velocity.x;

        }


    }

}