/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              7/4/12 6:41 PM
 * Description:
 *
 */

var jslocalpath = '/Research/projects/research/naure-web/src/main/webapp';
//jslocalpath = '';
var jslocalpath1 = jslocalpath.replace('naure-web', 'naure-research');


require.config({
    //baseUrl: '',
    paths: {
        jquery: jslocalpath + '/js/jquery-1.8.0.min',
        'jquery.strings': jslocalpath + '/js/jquery.strings',
        'jquery.validate': jslocalpath + '/js/jquery.validate',
        'ajaxslt': jslocalpath + '/js/ajaxslt',

        'jStat': jslocalpath + '/js/math/jstat-1.0.0',

        'oop': jslocalpath + '/js/oop',

        'swfobject': jslocalpath + '/js/uploadify/swfobject',
        'jquery.uploadify': jslocalpath + '/js/uploadify/jquery.uploadify.v2.1.4',

        'naure': jslocalpath + '/js/naure',
        'naure.validate': jslocalpath + '/js/naure.validate',
        'naure.pattern': jslocalpath + '/js/naure.pattern',
        'naure.utility': jslocalpath + '/js/naure.utility',
        'naure.analytics': jslocalpath + '/js/naure.analytics',
        'naure.ui.templet': jslocalpath + '/js/naure.ui.templet',
        'naure.location': jslocalpath + '/js/naure.location',
        'naure.http': jslocalpath + '/js/naure.http',
        'naure.xsl': jslocalpath + '/js/naure.xsl',
        'naure.message': jslocalpath + '/js/naure.message',
        'naure.overlay': jslocalpath + '/js/naure.overlay',

        'arbor-etc': jslocalpath1 + '/js/arbor/etc',
        'arbor-kernel': jslocalpath1 + '/js/arbor/kernel',
        'arbor-graphics-colors': jslocalpath1 + '/js/arbor/graphics/colors',
        'arbor-graphics-primitives': jslocalpath1 + '/js/arbor/graphics/primitives',
        'arbor-graphics-graphics': jslocalpath1 + '/js/arbor/graphics/graphics',
        'arbor-physics-atoms': jslocalpath1 + '/js/arbor/physics/atoms',
        'arbor-physics-system': jslocalpath1 + '/js/arbor/physics/system',
        'arbor-physics-barnes-hut': jslocalpath1 + '/js/arbor/physics/barnes-hut',
        'arbor-physics-physics': jslocalpath1 + '/js/arbor/physics/physics',
        'arbor-dev': jslocalpath1 + '/js/arbor/dev',
        'arbor-parseur': jslocalpath1 + '/js/arbor/parseur',
        'arbor-renderer': jslocalpath1 + '/js/arbor-renderer',

        'naure.math': jslocalpath1 + '/js/math/naure.math',
        'naure.math.symbol': jslocalpath1 + '/js/math/naure.math.symbol',
        'naure.math.structures': jslocalpath1 + '/js/math/naure.math.structures',

        'naure.math.probability': jslocalpath1 + '/js/math/probability/naure.math.probability',
        'naure.math.probability.stochastic': jslocalpath1 + '/js/math/probability/naure.math.probability.stochastic',

        'naure.math.matrixes': jslocalpath1 + '/js/math/matrixes/naure.math.matrixes',
        'naure.math.sets': jslocalpath1 + '/js/math/sets/naure.math.sets',
        'naure.math.sets.tree': jslocalpath1 + '/js/math/sets/naure.math.sets.tree',
        'naure.math.sets.tree.augmenting': jslocalpath1 + '/js/math/sets/naure.math.sets.tree.augmenting',
        'naure.math.statistics': jslocalpath1 + '/js/math/statistics/naure.math.statistics',
        'naure.math.statistics.finance': jslocalpath1 + '/js/math/statistics/naure.math.statistics.finance',

        'naure.chart.gantt': jslocalpath1 + '/js/chart/naure.chart.gantt',

        'naure.graphics': jslocalpath1 + '/js/graphics/naure.graphics',
        'naure.graphics.math': jslocalpath1 + '/js/graphics/naure.graphics.math',
        'naure.graphics.gridlines': jslocalpath1 + '/js/graphics/naure.graphics.gridlines',
        'naure.graphics.ui': jslocalpath1 + '/js/graphics/naure.graphics.ui',
        'naure.graphics.layout': jslocalpath1 + '/js/graphics/naure.graphics.layout',
        'naure.graphics.equation': jslocalpath1 + '/js/graphics/naure.graphics.equation',
        'naure.graphics.finance': jslocalpath1 + '/js/graphics/naure.graphics.finance',
        'naure.graphics.stochastic': jslocalpath1 + '/js/graphics/naure.graphics.stochastic',

        'math': jslocalpath1 + '/js/math/math',
        'math.matrix': jslocalpath + '/js/math/math.matrix'
    },
//    config: {
//        'naure.analytics': {
//            isTrack: true
//        }
//    },
    shim: {
        'jquery-strings': ['jquery'],
        'jquery.uploadify': ['jquery']
    }
});