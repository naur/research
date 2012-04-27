/**
 * 二叉查找树（binary search tree）
 *  */
function BinaryTreeNode(k) {
    this.key = k;
    this.left = arguments[1] ? arguments[1] : null;
    this.right = arguments[1] ? arguments[1] : null;
    this.parent = arguments[1] ? arguments[1] : null;
    this.color = arguments[2] ? arguments[2] : null;
}
function BinaryTree() {
    //中序遍历算法【前序遍历、后续遍历】
    this.InorderTreeWalk = function (x) {
        if (x != this.NIL) {
            arguments[1](x);
            this.InorderTreeWalk(x.left, arguments[1]);
            this.InorderTreeWalk(x.right, arguments[1]);
        }
    };
    //x: 指向树根节点的指针; k: 搜索关键字
    this.Search = function (x, k) {
        if (x == this.NIL || k == x.key)
            return x;
        if (k < x.key)
            return this.Search(x.left, k);
        else
            return this.Search(x.right, k);
    };
    this.Minimum = function (x) {
        while (x.left != this.NIL) {
            x = x.left;
        }
        return x;
    };
    this.Maximum = function (x) {
        while (x.right != this.NIL) {
            x = x.right;
        }
        return x;
    };
    //TREE-INSERT begins at the root of the tree and traces a path downward.
    this.Insert = function (T, z) {
        var y = T.NIL; //The pointer y is maintained as the parent of x.
        var x = T.root;  //The pointer x traces the path.
        while (x && x != T.NIL) {
            y = x;
            if (z.key < x.key)
                x = x.left;
            else
                x = x.right;
        }
        z.parent = y;
        if (y == T.NIL)
            T.root = z;    // Tree T was empty
        else {
            if (z.key < y.key)
                y.left = z;
            else
                y.right = z;
        }
    };
    //初始化 Binary Search Tree
    this.init = function (args) {
        if (!args)
            return;
        this.NIL = new BinaryTreeNode(null);
        for (i = 0; i < args.length; i++) {
            this.Insert(this, new BinaryTreeNode(args[i], this.NIL));
        }
    };
    this.init(arguments);
}

/**
 * Treaps
 * A treap is a binary search tree with a modified way of ordering the nodes.
 * */
function TreapNode(k, priority) {
    this.priority = priority;
    TreapNode.superclass.constructor.call(this, k, arguments[2]);
}
extend(TreapNode, BinaryTreeNode);
function Treap() {
    this.init = function (args) {
        this.NIL = new TreapNode(null);
        for (i = 0; i < args.length; i++) {
            this.Insert(this, new TreapNode(args[i], 1, this.NIL));
        }
    };
    this.init(arguments);
}
extend(Treap, BinaryTree);

/**
 * 红黑树
 * A binary search tree is a red-black if it satisfies the following red-black properties;
 *      1: Event node is either red or black.
 *      2: The root is black.
 *      3: Event leaf(NIL) is black.
 *      4: If a node is red, then both its children are black.
 *      5: For each node, all paths from the node to descendant leaves contain the same number of black nodes;
 * */
function RedBlackTree() {
    this.LeftRotate = function (T, x) {
        var y = x.right;

        x.right = y.left;
        if (y.left != T.NIL)
            y.left.parent = x;

        y.parent = x.parent;

        if (x.parent == T.NIL)
            T.root = y;
        else {
            if (x == x.parent.left)
                x.parent.left = y;
            else
                x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    };
    this.RightRotate = function (T, x) {
        var y = x.left;

        x.left = y.right;
        if (y.right != T.NIL)
            y.right.parent = x;

        y.parent = x.parent;

        if (x.parent == T.NIL)
            t.root = y;
        else {
            if (x == x.parent.left)
                x.parent.left = y;
            else
                x.parent.right = y;
        }

        y.right = x;
        x.parent = y;
    };

    /*
     * the following three-part invariant
     * a. Node z is red.
     * b. If z.parent is the root, the z.parent is black.
     * c. If there is a violation of the red-black properties, there is at most one violation., and it is of either property 2 or property 4.
     * */
    this.InsertFixup = function (T, z) {
        while (z.parent.color == 'RED') {
            if (z.parent == z.parent.parent.left) {
                y = z.parent.parent.right;
                //case 1: z's uncle y is red
                if (y.color == 'RED') {
                    z.parent.color = 'BLACK';
                    y.color = 'BLACK';
                    z.parent.parent.color = "RED";
                    z = z.parent.parent;
                } else {
                    //case 2: z's uncle y is black and z is a right clild
                    if (z == z.parent.right) {
                        z = z.parent;
                        this.LeftRotate(T, z);
                    }
                    //case 2: z's uncle y is black and z is a left clild
                    z.parent.color = 'BLACK';
                    z.parent.parent.color = 'RED';
                    this.RightRotate(T, z.parent.parent);
                }
            } else {
                //same as then clause with "right" and "left" exchanged
                y = z.parent.parent.left;
                //case 1: z's uncle y is red
                if (y.color == 'RED') {
                    z.parent.color = 'BLACK';
                    y.color = 'BLACK';
                    z.parent.parent.color = "RED";
                    z = z.parent.parent;
                } else {
                    //case 2: z's uncle y is black and z is a right clild
                    if (z == z.parent.left) {
                        z = z.parent;
                        this.RightRotate(T, z);
                    }
                    //case 2: z's uncle y is black and z is a left clild
                    z.parent.color = 'BLACK';
                    z.parent.parent.color = 'RED';
                    this.LeftRotate(T, z.parent.parent);
                }
            }
        }
        T.root.color = 'BLACK';
    };
    this.Insert = function (T, z) {
        RedBlackTree.superclass.Insert(T, z);
        z.color = 'RED';
        this.InsertFixup(T, z);
    };
    this.init(arguments);
}
extend(RedBlackTree, BinaryTree);

/**
 * An order-statistic tree
 **/
function OrderStatisticTreeNode(k) {
    this.size = 1;
    BinaryTreeNode.superclass.constructor.call(this, k, arguments[1]);
}
function OrderStatisticTree() {
    this.LeftRotate = function (T, x) {
        RedBlackTree.superclass.LeftRotate(T, x);
        x.parent.size = x.size;
        x.size = x.left.size + x.right.size + 1;
    };
    this.RightRotate = function (T, x) {
        RedBlackTree.superclass.LeftRotate(T, x);
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

/**
 * BinomialHeap
 * */
function BinomialHeapNode(k) {
    this.key = k;
    this.parent = null;
    this.sibling = null;
    this.child = null;
    this.degree = 0;
}
BinomialHeap = {
    Minimum:function (H) {
        y = NIL;
        x = H.head;
    },
    Link:function (y, z) {
        y.parent = z;
        y.sibling = z.child;
        z.child = y;
        z.degree = z.degree + 1;
    },
    Union:function () {
    },
    Insert:function (H, x) {

    },
    Make:function () {
        this.head = NIL;
        return this;
    }
};

/**
 * Optimal binary search trees
* */
function OptimalBinartTree() {

}