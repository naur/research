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

var jslocalpath = '/Research/projects/res/core/naure-integrate/src/main/webapp';
jslocalpath = '';
var jsresearch = jslocalpath.replace('naure-integrate', 'naure-research');


require.config({
    //baseUrl: '',
    paths: {
        'loading': '/js/loading',
        jquery: jslocalpath + '/js/core/jquery-2.1.1.min',
        'jquery.widget': jslocalpath + '/js/core/jquery.widget.min',
        'jquery.mousewheel': jslocalpath + '/js/core/jquery.mousewheel',
        'jquery.strings': jslocalpath + '/js/core/jquery.strings',
        'jquery.validate': jslocalpath + '/js/core/jquery.validate',
        'jquery.query': jslocalpath + '/js/core/jquery.query',
        'jquery.template': jslocalpath + '/js/core/jsrender.min',
        'jquery.flip': jslocalpath + '/js/core/jquery.flip',
        'jquery.velocity': jslocalpath + '/js/core/jquery.velocity.min',

        //metro ui css
        'metro': jslocalpath + '/js/core/metro.min',
        //bootstrap
        'bootstrap': jslocalpath + '/js/core/bootstrap.min',

        'ajaxslt': jslocalpath + '/js/core/ajaxslt',

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

        'jStat': jslocalpath + '/js/math/jstat-1.0.0',

        'oop': jslocalpath + '/js/core/oop',

        //'swfobject': jslocalpath + '/js/core/uploadify/swfobject',
        'jquery.uploadify': jslocalpath + '/js/core/uploadify/jquery.uploadify.min',

        //google map
        //'google.maps': 'http://maps.google.com/maps/api/js?v=3.9&sensor=false&region=zh-CN&language=zh-CN',
        //'google.maps': jsresearch + '/js/core/google.maps',
        'google.maps': 'http://maps.googleapis.com/maps/api/js?key=AIzaSyCFq_f1XYnmyUiG7SHj9u1guoq7DInfp_g&sensor=false&region=zh-CN&language=zh-CN',
        'google.maplabel': jsresearch + '/js/core/maplabel-compiled',
        //baidu maps
        'baidu.maps': 'http://api.map.baidu.com/api?v=2.0&ak=D69d79d3237709943f2c2e06cc1db20a',

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

        'naure': jslocalpath + '/js/core/naure',
        'naure.validate': jslocalpath + '/js/core/naure.validate',
        'naure.pattern': jslocalpath + '/js/core/naure.pattern',
        'naure.pattern.ajax': jslocalpath + '/js/core/naure.pattern',
        'naure.pattern.xsl': jslocalpath + '/js/core/naure.pattern',
        'naure.utility': jslocalpath + '/js/core/naure.utility',
        'naure.analytics': jslocalpath + '/js/core/naure.analytics',
        'naure.ui': jslocalpath + '/js/core/naure.ui',
        'naure.http': jslocalpath + '/js/core/naure.http',
        'naure.http.xmlhttp': jslocalpath + '/js/core/naure.http.xmlhttp',
        'naure.http.ajax': jslocalpath + '/js/core/naure.http.ajax',
        'naure.http.xsl': jslocalpath + '/js/core/naure.http.xsl',
        'naure.location': jslocalpath + '/js/core/naure.location',
        'naure.message': jslocalpath + '/js/core/naure.message',
        'naure.ui.overlay': jslocalpath + '/js/core/naure.ui.overlay',

        'naure.math': jsresearch + '/js/core/math/naure.math',
        'naure.math.number': jsresearch + '/js/core/math/naure.math.number',
        'naure.math.symbol': jsresearch + '/js/core/math/naure.math.symbol',
        'naure.math.structures': jsresearch + '/js/core/math/naure.math.structures',

        'naure.math.probability': jsresearch + '/js/core/math/probability/naure.math.probability',
        'naure.math.probability.stochastic': jsresearch + '/js/core/math/probability/naure.math.probability.stochastic',

        'naure.math.matrixes': jsresearch + '/js/core/math/matrixes/naure.math.matrixes',
        'naure.math.sets': jsresearch + '/js/core/math/sets/naure.math.sets',
        'naure.math.sets.tree': jsresearch + '/js/core/math/sets/naure.math.sets.tree',
        'naure.math.sets.tree.augmenting': jsresearch + '/js/core/math/sets/naure.math.sets.tree.augmenting',
        'naure.math.statistics': jsresearch + '/js/core/math/statistics/naure.math.statistics',
        'naure.math.statistics.finance': jsresearch + '/js/core/math/statistics/naure.math.statistics.finance',

        'naure.chart.gantt': jsresearch + '/js/core/chart/naure.chart.gantt',

        'naure.graphics': jsresearch + '/js/core/graphics/naure.graphics',
        'naure.graphics.math': jsresearch + '/js/core/graphics/naure.graphics.math',
        'naure.graphics.gridlines': jsresearch + '/js/core/graphics/naure.graphics.gridlines',
        'naure.graphics.ui': jsresearch + '/js/core/graphics/naure.graphics.ui',
        'naure.graphics.layout': jsresearch + '/js/core/graphics/naure.graphics.layout',
        'naure.graphics.equation': jsresearch + '/js/core/graphics/naure.graphics.equation',
        'naure.graphics.finance': jsresearch + '/js/core/graphics/naure.graphics.finance',
        'naure.graphics.stochastic': jsresearch + '/js/core/graphics/naure.graphics.stochastic',

        'math': jsresearch + '/js/core/math',
        'math.matrix': jslocalpath + '/js/core/math.matrix',

        //Integrate template
        'integrate-template': jslocalpath + '/templates/integrate-template',
        //Research template
        'research-template': jslocalpath + '/templates/research-template',
        //Shoping template
        'shoping-template': jslocalpath + '/templates/shoping-template'
    },
//    config: {
//        'naure.analytics': {
//            isTrack: true
//        }
//    },
    shim: {
        'jquery.widget': ['jquery'],
        'jquery.mousewheel': ['jquery'],
        'jquery.strings': ['jquery'],
        'jquery.validate': ['jquery'],
        'jquery.query': ['jquery'],
        'jquery.template': ['jquery'],
        'jquery.uploadify': ['jquery'],
        'metro': ['jquery', 'jquery.widget', 'jquery.mousewheel'],
        'bootstrap': ['jquery'],
        'modern.calendar': ['moment']
    }
});