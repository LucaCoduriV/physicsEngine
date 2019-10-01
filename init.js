let canvas;
let ctx;
let lastRender = 0;
let game = new Game();


//quand la page à chargé tous ses fichiers.
window.onload = function () {
    init();
}

//Function qui se chargera d'executer toutes les autres fonctions
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    console.log("sprites loaded");

    game.start();

}