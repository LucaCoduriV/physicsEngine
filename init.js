let lastRender = 0;
let world;
let canvas

//quand la page à chargé tous ses fichiers.
window.onload = function () {
    canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    world  = new World(ctx);

    world.addObject(new PolygonShape(ctx,new SAT.Vector(100,100), [
        new SAT.Vector(),
        new SAT.Vector(0,50),
        new SAT.Vector(50,50),
        new SAT.Vector(50,0)
    ]));
    world.addObject(new PolygonShape(ctx,new SAT.Vector(300,100), [
        new SAT.Vector(),
        new SAT.Vector(0,50),
        new SAT.Vector(50,50)
    ]));
    world.addObject(new CircleShape(ctx,new SAT.Vector(600,300),50));
    world.addObject(new CircleShape(ctx,new SAT.Vector(650,300),50));



    world.start();





















}