/**
 * Script:
 *              贾睿之
 * Email:
 *              naur@live.cn
 * Date:
 *              7/4/12 6:41 PM
 * Description:
 *
 */

var jslocalpath = '/Research/projects/naure/naure-web/src/main/webapp';
jslocalpath = '';
var jslocalpath1 = jslocalpath.replace('naure-web', 'naure-research');

require.config({
    paths:{
        jquery:jslocalpath + '/js/jquery-1.7.2.min',
        'jquery.strings':jslocalpath + '/js/jquery.strings',
        'ajaxslt':jslocalpath + '/js/ajaxslt',

        'jStat':jslocalpath + '/js/jstat-1.0.0',

        'naure':jslocalpath + '/js/naure',
        'naure.utility':jslocalpath + '/js/naure.utility',
        'naure.analytics':jslocalpath + '/js/naure.analytics',
        'naure.ui.templet':jslocalpath + '/js/naure.ui.templet',
        'naure.location':jslocalpath + '/js/naure.location',
        'naure.http':jslocalpath + '/js/naure.http',
        'naure.xsl':jslocalpath + '/js/naure.xsl',
        'naure.message':jslocalpath + '/js/naure.message',
        'naure.overlay':jslocalpath + '/js/naure.overlay',

        'naure.math':jslocalpath1 + '/js/math/naure.math',
        'naure.math.matrixes':jslocalpath1 + '/js/math/naure.math.matrixes',

        'naure.graphics':jslocalpath1 + '/js/graphics/naure.graphics',
        'naure.graphics.math':jslocalpath1 + '/js/graphics/naure.graphics.math',
        'naure.graphics.gridlines':jslocalpath1 + '/js/graphics/naure.graphics.gridlines',
        'naure.graphics.ui':jslocalpath1 + '/js/graphics/naure.graphics.ui',
        'naure.graphics.layout':jslocalpath1 + '/js/graphics/naure.graphics.layout',
        'naure.graphics.equation':jslocalpath1 + '/js/graphics/naure.graphics.equation',
        'naure.graphics.finance':jslocalpath1 + '/js/graphics/naure.graphics.finance',

        'math':jslocalpath1 + '/js/math/math',
        'math.matrix':jslocalpath + '/js/math/math.matrix'
    },
    shim:{
        'jquery-strings':['jquery']
    }
});