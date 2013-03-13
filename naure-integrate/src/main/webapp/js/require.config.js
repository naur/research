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

var jslocalpath = '/Research/projects/research/naure-integrate/src/main/webapp';
//jslocalpath = '';
var jsresearch = jslocalpath.replace('naure-integrate', 'naure-research');


require.config({
    //baseUrl: '',
    paths: {
        jquery: jslocalpath + '/js/jquery-1.8.0.min',
        'jquery.strings': jslocalpath + '/js/jquery.strings',
        'jquery.validate': jslocalpath + '/js/jquery.validate',
        'ajaxslt': jslocalpath + '/js/ajaxslt',

        'moment': jslocalpath + '/js/moment',

        'modern.accordion': jslocalpath + '/js/modern/accordion',
        'modern.buttonset': jslocalpath + '/js/modern/buttonset',
        'modern.calendar': jslocalpath + '/js/modern/calendar',
        'modern.carousel': jslocalpath + '/js/modern/carousel',
        'modern.dialog': jslocalpath + '/js/modern/dialog',
        'modern.dropdown': jslocalpath + '/js/modern/dropdown',
        'modern.input-control': jslocalpath + '/js/modern/input-control',
        'modern.pagecontrol': jslocalpath + '/js/modern/pagecontrol',
        'modern.rating': jslocalpath + '/js/modern/rating',
        'modern.slider': jslocalpath + '/js/modern/slider',
        'modern.start-menu': jslocalpath + '/js/modern/start-menu',
        'modern.tile-drag': jslocalpath + '/js/modern/tile-drag',
        'modern.tile-slider': jslocalpath + '/js/modern/tile-slider',

        'jquery.flip': jslocalpath + '/js/jquery.flip',

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

        'arbor-etc': jsresearch + '/js/arbor/etc',
        'arbor-kernel': jsresearch + '/js/arbor/kernel',
        'arbor-graphics-colors': jsresearch + '/js/arbor/graphics/colors',
        'arbor-graphics-primitives': jsresearch + '/js/arbor/graphics/primitives',
        'arbor-graphics-graphics': jsresearch + '/js/arbor/graphics/graphics',
        'arbor-physics-atoms': jsresearch + '/js/arbor/physics/atoms',
        'arbor-physics-system': jsresearch + '/js/arbor/physics/system',
        'arbor-physics-barnes-hut': jsresearch + '/js/arbor/physics/barnes-hut',
        'arbor-physics-physics': jsresearch + '/js/arbor/physics/physics',
        'arbor-dev': jsresearch + '/js/arbor/dev',
        'arbor-parseur': jsresearch + '/js/arbor/parseur',
        'arbor-renderer': jsresearch + '/js/arbor-renderer',

        'naure.math': jsresearch + '/js/math/naure.math',
        'naure.math.number': jsresearch + '/js/math/naure.math.number',
        'naure.math.symbol': jsresearch + '/js/math/naure.math.symbol',
        'naure.math.structures': jsresearch + '/js/math/naure.math.structures',

        'naure.math.probability': jsresearch + '/js/math/probability/naure.math.probability',
        'naure.math.probability.stochastic': jsresearch + '/js/math/probability/naure.math.probability.stochastic',

        'naure.math.matrixes': jsresearch + '/js/math/matrixes/naure.math.matrixes',
        'naure.math.sets': jsresearch + '/js/math/sets/naure.math.sets',
        'naure.math.sets.tree': jsresearch + '/js/math/sets/naure.math.sets.tree',
        'naure.math.sets.tree.augmenting': jsresearch + '/js/math/sets/naure.math.sets.tree.augmenting',
        'naure.math.statistics': jsresearch + '/js/math/statistics/naure.math.statistics',
        'naure.math.statistics.finance': jsresearch + '/js/math/statistics/naure.math.statistics.finance',

        'naure.chart.gantt': jsresearch + '/js/chart/naure.chart.gantt',

        'naure.graphics': jsresearch + '/js/graphics/naure.graphics',
        'naure.graphics.math': jsresearch + '/js/graphics/naure.graphics.math',
        'naure.graphics.gridlines': jsresearch + '/js/graphics/naure.graphics.gridlines',
        'naure.graphics.ui': jsresearch + '/js/graphics/naure.graphics.ui',
        'naure.graphics.layout': jsresearch + '/js/graphics/naure.graphics.layout',
        'naure.graphics.equation': jsresearch + '/js/graphics/naure.graphics.equation',
        'naure.graphics.finance': jsresearch + '/js/graphics/naure.graphics.finance',
        'naure.graphics.stochastic': jsresearch + '/js/graphics/naure.graphics.stochastic',

        'math': jsresearch + '/js/math/math',
        'math.matrix': jslocalpath + '/js/math/math.matrix'
    },
//    config: {
//        'naure.analytics': {
//            isTrack: true
//        }
//    },
    shim: {
        'jquery.strings': ['jquery'],
        'jquery.uploadify': ['jquery'],
        'modern.calendar': ['moment']
    }
});