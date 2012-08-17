
/**
 * An order-statistic tree
 */
function OrderStatisticTreeNode(k) {
    this.size = 1;
    OrderStatisticTreeNode.superclass.constructor.call(this, k, arguments[1]);
}
function OrderStatisticTree() {
    this.LeftRotate = function (T, x) {
        OrderStatisticTree.superclass.LeftRotate(T, x);
        x.parent.size = x.size;
        x.size = x.left.size + x.right.size + 1;
    };
    this.RightRotate = function (T, x) {
        OrderStatisticTree.superclass.RightRotate(T, x);
        x.parent.size = x.size;
        x.size = x.left.size + x.right.size + 1;
    };
    //初始化 Binary Search Tree
    this.init = function (args) {
        if (!args)
            return;
        this.NIL = new OrderStatisticTreeNode(null);
        for (i = 0; i < args.length; i++) {
            this.Insert(this, new OrderStatisticTreeNode(args[i], this.NIL));
        }
    };
    this.init(arguments);
}
extend(OrderStatisticTreeNode, BinaryTreeNode);
extend(OrderStatisticTree, RedBlackTree);
