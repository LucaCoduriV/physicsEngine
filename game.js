//tuto https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
//tuto2 https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
//tuto3 https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#choosing-timestep
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://www.briankoponen.com/html5-javascript-game-tutorial-space-invaders-part-5/
//cette fonction dessine sur le canevas
//todo adapter la vitesse en fonction de la taille du canevas

class Game{
    static canvas = document.getElementById("canvas");
    static ctx = Game.canvas.getContext("2d");
    circle;
    constructor(){
        this.load();

    }

    load(){
        this.circle = new Circle(Game.ctx,600,300,5,5, 50 );
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
        this.circle.draw();






//////////////////////////////////////////////////////////////////////
        this.drawFPS(secondsPassed);
    }

//Cette fonction met à jour les éléments
    update(timestamp) {

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







