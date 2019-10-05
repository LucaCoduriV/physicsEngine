let lastRender = 0;
let world;


//quand la page à chargé tous ses fichiers.
window.onload = function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    world  = new World(ctx);

    world.addObject(new CircleShape(ctx,new SAT.Vector(600,300),50));
    world.addObject(new CircleShape(ctx,new SAT.Vector(650,300),50));

    world.start();





















}