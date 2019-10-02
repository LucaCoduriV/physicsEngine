//tuto https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
//tuto2 https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
//tuto3 https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#choosing-timestep
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://www.briankoponen.com/html5-javascript-game-tutorial-space-invaders-part-5/
//cette fonction dessine sur le canevas
//todo adapter la vitesse en fonction de la taille du canevas
function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
}


class Game{
    static ennemyNumber = 10;
    static canvas = document.getElementById("canvas");
    static ctx = Game.canvas.getContext("2d");
    static objects = [];
    constructor(){
        this.load();

    }

    load(){


        for(let i = 0; i<Game.ennemyNumber; i++){
            let xMax = 1150;
            let yMax = 550;
            let xMin = 50;
            let yMin = 50;
            let vRandX = generateRandomInteger(0.01, 0.05);
            //vRandX *= Math.random() < 0.5 ? -1 : 1;
            let vRandY = generateRandomInteger(0.01, 0.05);
            //vRandY *= Math.random() < 0.5 ? -1 : 1;

            let randomPositionX = generateRandomInteger(xMin, xMax);
            let randomPositionY = generateRandomInteger(yMin, yMax);
            Game.objects.push(new Circle(Game.ctx,randomPositionX,randomPositionY,0.01,0.01, 50 ));
        }
    }

    start(){
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    draw(secondsPassed) {
        Game.ctx.save();
        Game.ctx.fillStyle = "rgb(255,255,255)";
        Game.ctx.fillRect(0,0,1200,600);
        Game.ctx.restore();
////////////////////////////////////////////////////////////////////
        Game.objects.forEach(object=>object.draw());






//////////////////////////////////////////////////////////////////////
        this.drawFPS(secondsPassed);
    }

//Cette fonction met à jour les éléments
    update(timestamp) {
        Game.objects[1].x = Mouse.position.X;
        Game.objects[1].y = Mouse.position.Y;
        Game.objects.forEach(object=>object.update());
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
        }
        else {
            this.remainingRefreshes = 3600;
        }

        lastRender = timestamp;
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    drawFPS(secondsPassed) {
        let fps = Math.round(1 / secondsPassed);
        //Draw number to the screen
        Game.ctx.font = '25px Arial';
        Game.ctx.fillStyle = 'black';
        Game.ctx.fillText("FPS: " + fps, 10, 30);
    }

}







