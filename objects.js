class GameObjects {
    constructor(context,vectorList, mass = 1) {
        this.context = context;
        this.vectorList = vectorList;
        this.velocity = {
            x: (Math.random() * -15) + -5,
            y: (Math.random() * -15) + -5
        };
        this.mass = mass;
        this.color = "rgb(0,0,0)"
        this.bounce = 0.9;
        this.friction = 0.1;
        this.acceleration = 0;
    }
}

class HdCircle extends GameObjects {
    circleHitBox;
    constructor(context, vectorList, radius, mass = 1) {
        super(context, vectorList, mass);
        this.radius = radius;
        this.color = "rgb(200,0,100)";
        this.circleHitBox = new SAT.Circle(vectorList[0],this.radius);
    }

    draw() {
        this.context.save();
        this.context.fillStyle = this.color;
        this.context.strokeStyle = "rgb(255,255,255)";
        this.context.strokeWidth = 10;
        this.context.beginPath();
        this.context.arc(this.vectorList.x, this.vectorList.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }

    update() {

    }
}