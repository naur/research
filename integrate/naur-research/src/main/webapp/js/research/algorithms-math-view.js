// math.sets demo

var overlayNodes = {
    'arbor':function () {
        NAUR.Message.empty();
        arborGraph();
    }
};

var points, arborPoints;

function pointsFormat(x, y) {
    if (!x.key)
        return '';

    if (y) {
        if (y.key)
            return $.format('{0} -> {1}\n', x.key, y.key);
        else
            return '';
    }

    if (x.color)
        return $.format('{0} color:{1}\n', x.key, x.color).replace(/(color:[\w]+)/, '{$1}');
    else
        return $.format('{0} shape:dot\n', x.key).replace('shape:dot', '{shape:dot}');
}
function arborGraph(points) {
    if (!points)
        points = '\n12 -> 5\n12 -> 18\n' +
            '5 -> 2\n5 -> 9\n' +
            '18 -> 15\n18 -> 19\n';
    var network;

//    $.getJSON('/resources/the-cave-of-time.json', false, function (doc) {
//        network = parse(doc.src);
//        $.each(network.nodes, function (nname, ndata) {
//            if (ndata.label === undefined)
//                ndata.label = nname;
//        });
//
//        NAUR.Message.show({content:JSON.stringify(network)});
//        sys.merge(network);
//    });
//    mapping: '1 -> 2\n' +
//        '2 -> 3\n2 -> 5\n' +
//        '3 -> 4\n' +
//        '4 -> 1\n' +
//        '5 -> 6\n5 -> 7\n' +
//        '6 -> 1\n' +
//        '7 -> 3\n7 -> 8\n' +
//        '8 -> 4\n8 -> 6',


//    var pointArray = network.points.split(',');
//    for (i = 0; i < pointArray.length; i++) {
//        $.extend(network.nodes = network.nodes || {}, JSON.parse('{"' + pointArray[i] + '":{}}'));
//    }

    network = parse(points);
    $.each(network.nodes, function (nname, ndata) {
        if (ndata.label === undefined)
            ndata.label = nname;
    });

    //NAUR.Message.show({content:JSON.stringify(network)});
    sys.merge(network);
}

var parse = Parseur().parse;
var sys;

function arborDrawing(options) {
    arborPoints = "";
    points = new Array(100);
    options.method();

    setTimeout(function () {
        var point = points.dequeue();
        if (!point) {
            arborPoints = '';
            if (options.method1)
                options.method1();
            if (arborPoints && arborPoints.length > 0)
                arborGraph(arborPoints);
            return;
        }
        NAUR.Message.show({content:JSON.stringify($.toJSON(point))});
        arborPoints += pointsFormat(point);
        arborPoints += pointsFormat(point, point.left);
        arborPoints += pointsFormat(point, point.right);
        arborGraph(arborPoints);

        setTimeout(arguments.callee, 2000);
    }, 2000);
}

$(function () {
    NAUR.Message.defaults.global.transparent = true;
    $('body').message({overlay:'left-top'});
    $('body').overlay({
        nodes:overlayNodes
    });
    $.extend(arbor, {System:ParticleSystem});
    sys = arbor.System({
        repulsion:600,
        stiffness:1000,
        friction:0, //摩擦力
        gravity:true, //重力,引力
        //fps: 10,
        //dt:0.02,
        //precision : 1
    }) // create the system with sensible repulsion/stiffness/friction
    //var sys = arbor.System();
    //sys.parameters({gravity:true}) // use center-gravity to make the graph settle nicely (ymmv)
    //sys.renderer = SimpleRenderer("article section canvas") // our newly created renderer will have its .init() method called shortly by sys...
    sys.renderer = SimpleRenderer("article section canvas"); // our newly created renderer will have its .init() method called shortly by sys...
});

