function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//
// Physics(function (world) {
//
//     var viewWidth = $(window).width();
//     var viewHeight = $(window).height();
//
//
//     var renderer = Physics.renderer('pixi', {
//         el: 'myworld',
//         width: viewWidth,
//         height: viewHeight
//     });
//
//     world.add(renderer);
//
//     world.subscribe('step', function () {
//         world.render();
//     });
//
//
//     var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
//
//     world.add(Physics.behavior('edge-collision-detection', {
//         aabb: viewportBounds,
//         restitution: 0.3
//     }));
//
//     var x_pos = [viewWidth / 2, viewWidth / 5, viewWidth];
//
//     var texts = ['20 школ', '3000 участников', '2 хакатона', '100 городов', '600 экспертов'];
//     var k = 0;
//     for (var i = 0; i < 3; i++) {
//
//         var a = viewWidth / getRandomInt(5, 8);
//         var body = Physics.body('convex-polygon', {
//             x: x_pos[i],
//             y: -100,
//             vx: 0,
//             vy: 0,
//             angle: Math.random(),
//             vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a, y: a}, {x: 0, y: a}],
//             text: {
//                 text: texts[k], style: {
//                     fontFamily: 'Ubuntu',
//                     fontSize: 13,
//                     fill: '#ffffff',
//                     strokeThickness: 0,
//                     wordWrap: true,
//                     wordWrapWidth: j,
//                     align: 'center'
//                 }
//             }
//         });
//
//         world.add(body);
//
//         k += 1;
//
//         var j = viewWidth / getRandomInt(8, 11);
//         var myWheel = Physics.body('circle', {
//             x: x_pos[i],
//             y: -100,
//             radius: j,
//             text: {
//                 text: texts[k], style: {
//                     fontFamily: 'Ubuntu',
//                     fontSize: 13,
//                     fill: '#ffffff',
//                     strokeThickness: 0,
//                     wordWrap: true,
//                     wordWrapWidth: j,
//                     align: 'center'
//                 }
//             }
//         });
//
//         world.add(myWheel);
//
//
//     }
//
//     for (i = 0; i < 10; i++) {
//
//         a = viewWidth / getRandomInt(10, 30);
//
//         var body = Physics.body('convex-polygon', {
//             x: x_pos.random(),
//             y: -100,
//             vx: 0,
//             vy: 0,
//             angle: Math.random(),
//             vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a, y: a}, {x: 0, y: a}],
//         });
//
//
//         world.add(body);
//
//
//         myWheel = Physics.body('circle', {
//             x: x_pos.random(),
//             y: -100,
//             radius: viewWidth / getRandomInt(30, 61)
//         });
//
//         world.add(myWheel);
//     }
//
//     world.add(Physics.behavior('body-collision-detection'));
//     world.add(Physics.behavior('sweep-prune'));
//     world.add(Physics.behavior('body-impulse-response'));
//     world.add(Physics.behavior('constant-acceleration'));
//
//
//     // subscribe to ticker to advance the simulation
//     Physics.util.ticker.subscribe(function (time, dt) {
//         world.step(time);
//     });
//
//
//     // start the ticker
//     Physics.util.ticker.start();
//
//     setTimeout(function () {
//         Physics.util.ticker.stop();
//     }, 5000);
//
// });
//
// function run_world() {
//     Physics.util.ticker.start();
// }

$(document).ready(function () {
    var Example = Example || {};


    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Svg = Matter.Svg;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById("myworld"),
        engine: engine,
        options: {
            width: $(window).width(),
            height: $(window).height(),
            background: '#fafafa',
            wireframes: false
        }

    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(20, 20, 10, 5, 0, 0, function (x, y) {
        var sides = Math.round(Common.random(1, 8));

        // triangles can be a little unstable, so avoid until fixed
        sides = (sides === 3) ? 4 : sides;

        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 10
            };
        }

        switch (Math.round(Common.random(0, 1))) {
            case 0:
                if (Common.random() < 0.8) {
                    return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), {chamfer: chamfer});
                } else {
                    return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), {chamfer: chamfer});
                }
            case 1:
                return Bodies.polygon(x, y, sides, Common.random(25, 50), {chamfer: chamfer});
        }
    });

    World.add(world, stack);

    var a = 50;
    var wall1 = Bodies.rectangle($(window).width() / 2, 0, $(window).width(), a, {
        isStatic: true, render: {
            fillStyle: "#fff",
            lineWidth: 0
        }
    });
    World.add(world, wall1);

    var wall2 = Bodies.rectangle($(window).width() / 2, $(window).height(), $(window).width(), a, {
        isStatic: true, render: {
            fillStyle: "#fff",
            lineWidth: 0
        }
    });
    World.add(world, wall2);

    var wall3 = Bodies.rectangle($(window).width(), $(window).height() / 2, a, $(window).height(), {
        isStatic: true, render: {
            fillStyle: "#fff",
            lineWidth: 0
        }
    });
    World.add(world, wall3);

    var wall4 = Bodies.rectangle(0, $(window).height() / 2, a, $(window).height(), {
        isStatic: true, render: {
            fillStyle: "#fff",
            lineWidth: 0
        }
    });
    World.add(world, wall4);

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    render.mouse = mouse;

    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function () {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
});