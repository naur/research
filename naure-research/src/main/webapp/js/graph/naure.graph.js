/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/4/12 11:00 AM
 * Description:
 *
 */

//graphic

Array.prototype.remove = function (elem) {
    var index = this.indexOf(elem);
    if (index !== -1) {
        this.splice(index, 1)
    }
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

define(['jquery', 'naure', 'math'], function ($, NAURE) {
    NAURE.Graph = (function () {
        var graph = {
            ui:null,
            system: null,
            init:function (ui) {
                return graph;
            }
        };

        return graph.init();
    })();

    return NAURE;
});