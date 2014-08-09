/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              11/12/12 3:40 PM
 * Description:
 *
 */

define(['jquery', 'naure', 'naure.math.js'], function ($, NAURE) {

    NAURE.Math.Structures = (function () {
        var structures = {
            //堆：Heap
            // 栈 Stack
            /*
             * 队列
             * */
            Queue: function () {
            },
            /*
             *链表
             */
            Linked: function Linked(k, info) {
                //关键字域 (key field)
                this.key = k;
                //指针域 (pointer fields)
                this.next = null;
                this.prev = null;
                this.info = info;
            },
            /**
             * 二叉查找树（binary search tree）
             *  */
            BinaryTreeNode: function BinaryTreeNode(k) {
                this.key = k;
                this.left = arguments[1] ? arguments[1] : null;
                this.right = arguments[1] ? arguments[1] : null;
                this.parent = arguments[1] ? arguments[1] : null;
                this.color = arguments[2] ? arguments[2] : null;
            },
            node: function (options) {
                //$.extend(this, options);
                this.key = options.key;
                this.left = options.left;
                this.right = options.right;
                this.parent = options.parent;
                this.color = options.color;
                this.type = options.type;       //2,3,4,5,6,7  ln,neg,+,-,*,/
                this.tag = options.tag;
                this.info = options.info;
            }
        };

        return structures;
    })();

    return NAURE;
});