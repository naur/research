/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/26/12 10:15 AM
 * Description:
 *              math.sets demo
 */

/*-------------------- 全局变量 START ----------------*/

var naure, message, http, graphics, lines;
var points, arborPoints;
//"article section canvas"
var parse = Parseur().parse;
var sys;

var overlayNodes = {
    'arbor':function () {
        message.empty();
        arborGraph();
    },
    'Stacks':function () {
        message.empty();
        var S = new Array(10);
        message.show({content:'ARRAY - TOP !' + S.top, dateformat:'HH:mm:ss fff'});
        S.pushv1('A');
        S.pushv1('贾睿之');
        message.show({content:'ARRAY - TOP !' + S.top, dateformat:'HH:mm:ss fff'});
    },
    'Queues':function () {
    },
    'Linked lists':function () {
        message.empty();
        var k1 = new LinkedListNotSentinel(9);
        var k2 = new LinkedListNotSentinel(16);
        var k3 = new LinkedListNotSentinel(4);
        var k4 = new LinkedListNotSentinel(1);

        k1.next = k2;
        k2.prev = k1;
        k2.next = k3;
        k3.prev = k2;
        k3.next = k4;
        k4.prev = k3;

        //init Linked lists
        message.show({content:$.format('Linked lists: {0}', k1.keys().join('-')), color:'red', dateformat:'HH:mm:ss fff'});

        //seacrh procedure
        var searchKey = 4;
        message.show({content:$.format('Search Key: {0}', searchKey), dateformat:'HH:mm:ss fff'});
        var result = k1.search(searchKey);
        message.show({content:$.format('{0}: prev {1}, next {2}, head {3}', result.key, result.prev.key, result.next.key, result.head().key), dateformat:'HH:mm:ss fff'});

        //insert procedure
        var insertKey = new LinkedListNotSentinel(18);
        message.show({content:$.format('Insert Key: {0}', insertKey.key), dateformat:'HH:mm:ss fff'});
        k1.insert(insertKey);
        message.show({content:$.format('{0}: prev {1}, next {2}, head {3}', insertKey.key, insertKey.prev == null ? 'NIL' : insertKey.prev.key, insertKey.next.key, insertKey.head().key), dateformat:'HH:mm:ss fff'});

        message.show({content:$.format('Linked lists: {0}', insertKey.keys().join('-')), color:'red', dateformat:'HH:mm:ss fff'});

        //delete procedure
        var deleteKey = 4;
        message.show({content:$.format('Delete Key: {0}', deleteKey), dateformat:'HH:mm:ss fff'});
        result = k1.search(deleteKey);
        k1.remove(result);
        message.show({content:$.format('Linked lists: {0}', insertKey.keys().join('-')), color:'red', dateformat:'HH:mm:ss fff'});
    },
    'Linked lists (sentinel)':function () {
        message.empty();
        var linkedList = new LinkedList(9, 16, 4, 1);
        message.show({content:$.format('Linked lists: {0}', linkedList.keys().join('-')), color:'red', dateformat:'HH:mm:ss fff'});
        message.show({content:$.format('{0}, prev {1}, next {2}', 'sentinel', linkedList.sentinel.prev.key, linkedList.sentinel.next.key), dateformat:'HH:mm:ss fff'});
    },
    'Binary Search Trees':function () {
        message.empty();
        var binaryTree = new BinaryTree(12, 5, 18, 2, 9, 15, 19, 13, 17);

        message.show({content:'START'});

        arborDrawing({
            method:function () {
                binaryTree.InorderTreeWalk(binaryTree.root, function (x) {
                    points.enqueue(x);
                });
            }});
    },
    'Red-Black Trees':function () {
        m.empty();
        var redBlackTree = new RedBlackTree('A', 'B', 'C', 'D');  //7, 4, 11, 3, 6, 9, 18, 2, 14, 19, 12, 17, 22, 20
        message.show({content:'START'});

        arborDrawing({
            method:function () {
                redBlackTree.InorderTreeWalk(redBlackTree.root, function (x) {
                    points.enqueue(x);
                });
            },
            method1:function () {
                //旋转
//                var searchNode = redBlackTree.Search(redBlackTree.root, 11);
//                message.show({content:'Rotations: ' + JSON.stringify($.toJSON(searchNode)), color:'#000080'});
//                redBlackTree.LeftRotate(redBlackTree, searchNode);
//                redBlackTree.InorderTreeWalk(redBlackTree.root, function (x) {
//                    arborPoints += pointsFormat(x);
//                    arborPoints += pointsFormat(x, x.left);
//                    arborPoints += pointsFormat(x, x.right);
//                    message.show({content:JSON.stringify($.toJSON(x))});
//                });
            }
        });
    },
    'Treaps':function () {
        message.empty();
        var treap = new Treap('G', 'B', 'H', 'A', 'E', 'K', 'I');

        message.show({content:'START'});

        arborDrawing({
            method:function () {
                treap.InorderTreeWalk(treap.root, function (x) {
                    points.enqueue(x);
                });
            }});
    },
    'order-statistic tree':function () {
        message.empty();
        var orderStatisticTree = new OrderStatisticTree(1, 2, 3, 4, 5, 6, 7);

        message.show({content:'START'});

        arborDrawing({
            method:function () {
                orderStatisticTree.InorderTreeWalk(orderStatisticTree.root, function (x) {
                    points.enqueue(x);
                });
            }});
    }
};

/*-------------------- 全局变量 END ------------------*/

/*-------------------- 函数 START --------------------*/

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
//        message.show({content:JSON.stringify(network)});
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

    //message.show({content:JSON.stringify(network)});
    sys.merge(network);
}
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
        message.show({content:JSON.stringify($.toJSON(point))});
        arborPoints += pointsFormat(point);
        arborPoints += pointsFormat(point, point.left);
        arborPoints += pointsFormat(point, point.right);
        arborGraph(arborPoints);

        setTimeout(arguments.callee, 2000);
    }, 2000);
}

/*-------------------- 函数 END ----------------------*/

/*-------------------- 事件 START --------------------*/
/*-------------------- 事件 END ----------------------*/

/*-------------------- 初始化 START ------------------*/

require(['jquery', 'naure.message', 'naure.overlay', 'naure.analytics'], function ($, NAURE) {
    naure = NAURE;
    message = NAURE.Message;

    $(function () {
        $('article section:eq(0)').message();
        $('body').overlay({
            nodes:overlayNodes
        });

        //初始化 arbor
        //$.extend(arbor, {System:CoordinateSystem});
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
});

/*-------------------- 初始化 END --------------------*/