/*
 * Script：
 *              贾睿之
 * Email：
 *             jiaruizhi@360buy.com
 *
 * Description：
 *            Tree 相关
 * Date：
 *          12:22 12/3/2011
 */

define(['jquery', 'naure.math.sets'], function ($, NAURE) {

    NAURE.Math.Sets.Tree = (function () {
        var tree = {
            node:function (options) {
                this.key = options.key;
                this.left = options.left;
                this.right = options.right;
                this.parent = options.parent;
                this.color = options.color;
                this.type = options.type;
                this.tag = options.tag;
                this.info = options.info;
            }
        };

        return tree;
    })();

    return NAURE;
});
