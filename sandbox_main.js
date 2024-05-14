var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        background: '#0000FF'
    }
});
render.options.background = '#FFFFFF';
render.canvas.width = 900;
render.canvas.height = 620;
let ground = Bodies.rectangle(400, 610, 1200, 60, { isStatic: true });
let ground2 = Bodies.rectangle(400, 0, 1200, 60, { isStatic: true });
let ground3 = Bodies.rectangle(870, 0, 60, 1200, { isStatic: true });
let ground4 = Bodies.rectangle(0, 0, 60, 1100, { isStatic: true });
let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: true}
    }
});
let size = document.getElementById("sizething").value;
let wsize = document.getElementById("widththing").value;
let hsize = document.getElementById("heightthing").value;
let sizeon = document.getElementById("sizeenabled").value;
var moonOn = false;
var reverseOn = false;
function makeBox() {
    size = document.getElementById("sizething").value;
    sizeon = document.getElementById("sizeenabled").value;
    wsize = document.getElementById("widththing").value;
    hsize = document.getElementById("heightthing").value;
    console.log(size, sizeon, wsize, hsize)
    if (sizeon === "on") {
        var box = Bodies.rectangle(400, 200, size, size);
    } else {
        var box = Bodies.rectangle(400, 200, wsize, hsize);
    }
    Composite.add(engine.world, [box]);
}
function makeCirc() {
    size = document.getElementById("sizething").value;
    let circle = Bodies.circle(400, 200, size);
    Composite.add(engine.world, [circle]);
}
function makeTri() {
    size = document.getElementById("sizething").value;
    let triangle = Bodies.polygon(400, 200, 3, size)
    Composite.add(engine.world, [triangle]);
}
function clearAll() {
    // clear everythign except for floors
    Composite.clear(engine.world);
    Composite.add(engine.world, [ground, ground2, ground3, ground4, mouseConstraint]);
}
function pauseSim() {
    Runner.stop(runner);
}
function resumeSim() {
    Runner.start(runner, engine);
}
function moonToggle() {
    if (moonOn) {
        if (reverseOn) {
            engine.world.gravity.y = -1;
            moonOn = false;
        } else {
            engine.world.gravity.y = 1;
            moonOn = false;
        }
    } else {
        engine.world.gravity.y = 0.002;
        moonOn = true;
    }
}
function reverseToggle() {
    if (reverseOn) {
        engine.world.gravity.y = -1;
        reverseOn = false;
    } else {
        if (moonOn) {
            engine.world.gravity.y = 0.002;
            reverseOn = true;
        } else {
            engine.world.gravity.y = 1;
            reverseOn = true;
        }
    }
}
let starterbox = Bodies.rectangle(400, 200, 30, 89, { isStatic: false });
render.mouse = mouse;
Composite.add(engine.world, [starterbox, ground, ground2, ground3, ground4, mouseConstraint]);
Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);