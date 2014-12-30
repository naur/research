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

define(['jquery', 'naur.math.sets.js'], function ($, NAUR) {

    NAUR.Math.Sets.Tree = (function () {
        var tree = {
            type: {
                ln: 2,
                neg: 3
            },
            traversal: {
                //先根序
                Preorder: function(options) {

                },
                //中根序
                Inorder: function() {},
                //后根序
                Postorder: function() {}
            }
        };

        return tree;
    })();

    return NAUR;
});
