let lastRender = 0;
let world;


//quand la page à chargé tous ses fichiers.
window.onload = function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    world  = new World(ctx);
    world.start();

    world.addObject(new HdCircle(ctx,new SAT.Vector(600,300),50));





















}