class GameObjects {
    constructor(context,vectors, mass = 1) {
        this.context = context;
        this.vectors = vectors;
        this.velocity = {
            x: (Math.random() * -15) + -5,
            y: (Math.random() * -15) + -5
        };
        this.mass = mass;
        this.color = "rgb(0,0,0)"
        this.bounce = 0.9;
        this.friction = 0.1;
        this.acceleration = 0;
        this.data = null;
    }
    respondTocollision(otherObject, response){
        //sans prendre en compte la masse on va juste pousser l'autre objet
        response.overlapV.scale(0.5);
        this.data.pos.sub(response.overlapV);
        otherObject.data.pos.add(response.overlapV);
    }
}

class CircleShape extends GameObjects {

    constructor(context, vectors, radius, mass = 1) {
        super(context, vectors, mass);
        this.radius = radius;
        this.color = "rgb(200,0,100)";
        this.data = new SAT.Circle(vectors,this.radius);
    }

    draw() {
        this.context.save();
        this.context.fillStyle = this.color;
        this.context.strokeStyle = "rgb(255,255,255)";
        this.context.strokeWidth = 10;
        this.context.beginPath();
        this.context.arc(this.vectors.x, this.vectors.y, this.radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }

    update() {

    }
}