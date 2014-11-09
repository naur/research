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

//var jsprefix = '/Research/projects/res/core/naure-integrate/src/main/webapp';
var jsprefix = '/';
jsprefix = jsprefix.replace('naure-integrate', 'naure-research');

require.config({
    //baseUrl: '',
    paths: {
        'loading': 'js/loading',
        jquery: jsprefix + 'js/core/jquery-2.1.1.min',
        'jquery.widget': jsprefix + 'js/core/jquery.widget.min',
        'jquery.mousewheel': jsprefix + 'js/core/jquery.mousewheel',
        'jquery.strings': jsprefix + 'js/core/jquery.strings',
        'jquery.validate': jsprefix + 'js/core/jquery.validate',
        'jquery.query': jsprefix + 'js/core/jquery.query',
        'jquery.template': jsprefix + 'js/core/jsrender.min',
        'jquery.flip': jsprefix + 'js/core/jquery.flip',
        'jquery.velocity': jsprefix + 'js/core/jquery.velocity.min',

        //metro ui css
        'metro': jsprefix + 'js/core/metro.min',
        //bootstrap
        'bootstrap': jsprefix + 'js/core/bootstrap.min',

        'ajaxslt': jsprefix + 'js/core/ajaxslt',

        'moment': jsprefix + 'js/moment',

        'modern.accordion': jsprefix + 'js/modern/accordion',
        'modern.buttonset': jsprefix + 'js/modern/buttonset',
        'modern.calendar': jsprefix + 'js/modern/calendar',
        'modern.carousel': jsprefix + 'js/modern/carousel',
        'modern.dialog': jsprefix + 'js/modern/dialog',
        'modern.dropdown': jsprefix + 'js/modern/dropdown',
        'modern.input-control': jsprefix + 'js/modern/input-control',
        'modern.pagecontrol': jsprefix + 'js/modern/pagecontrol',
        'modern.rating': jsprefix + 'js/modern/rating',
        'modern.slider': jsprefix + 'js/modern/slider',
        'modern.start-menu': jsprefix + 'js/modern/start-menu',
        'modern.tile-drag': jsprefix + 'js/modern/tile-drag',
        'modern.tile-slider': jsprefix + 'js/modern/tile-slider',

        'jStat': jsprefix + 'js/math/jstat-1.0.0',

        'oop': jsprefix + 'js/core/oop',

        //'swfobject': jsprefix + 'js/core/uploadify/swfobject',
        'jquery.uploadify': jsprefix + 'js/core/uploadify/jquery.uploadify.min',

        //echarts-2.0.4
        'echarts': jsprefix + 'js/echarts',
        'echarts/chart/bar': jsprefix + 'js/core/chart/echarts',       // 把所需图表指向单文件
        'echarts/chart/line': jsprefix + 'js/core/chart/echarts',

        //google map
        //'google.maps': 'http://maps.google.com/maps/api/js?v=3.9&sensor=false&region=zh-CN&language=zh-CN',
        //'google.maps': jsprefix + 'js/core/google.maps',
        'google.maps': 'http://maps.googleapis.com/maps/api/js?key=AIzaSyCFq_f1XYnmyUiG7SHj9u1guoq7DInfp_g&sensor=false&region=zh-CN&language=zh-CN',
        'google.maplabel': jsprefix + 'js/core/maplabel-compiled',
        //baidu maps
        'baidu.maps': 'http://api.map.baidu.com/api?v=2.0&ak=D69d79d3237709943f2c2e06cc1db20a',

        'arbor-etc': jsprefix + 'js/arbor/etc',
        'arbor-kernel': jsprefix + 'js/arbor/kernel',
        'arbor-graphics-colors': jsprefix + 'js/arbor/graphics/colors',
        'arbor-graphics-primitives': jsprefix + 'js/arbor/graphics/primitives',
        'arbor-graphics-graphics': jsprefix + 'js/arbor/graphics/graphics',
        'arbor-physics-atoms': jsprefix + 'js/arbor/physics/atoms',
        'arbor-physics-system': jsprefix + 'js/arbor/physics/system',
        'arbor-physics-barnes-hut': jsprefix + 'js/arbor/physics/barnes-hut',
        'arbor-physics-physics': jsprefix + 'js/arbor/physics/physics',
        'arbor-dev': jsprefix + 'js/arbor/dev',
        'arbor-parseur': jsprefix + 'js/arbor/parseur',
        'arbor-renderer': jsprefix + 'js/arbor-renderer',

        'naure': jsprefix + 'js/core/naure',
        'naure.validate': jsprefix + 'js/core/naure.validate',
        'naure.pattern': jsprefix + 'js/core/naure.pattern',
        'naure.pattern.ajax': jsprefix + 'js/core/naure.pattern',
        'naure.pattern.xsl': jsprefix + 'js/core/naure.pattern',
        'naure.utility': jsprefix + 'js/core/naure.utility',
        'naure.analytics': jsprefix + 'js/core/naure.analytics',
        'naure.ui': jsprefix + 'js/core/naure.ui',
        'naure.ui.echarts': jsprefix + 'js/core/naure.ui.echarts',
        'naure.http': jsprefix + 'js/core/naure.http',
        'naure.http.xmlhttp': jsprefix + 'js/core/naure.http.xmlhttp',
        'naure.http.ajax': jsprefix + 'js/core/naure.http.ajax',
        'naure.http.xsl': jsprefix + 'js/core/naure.http.xsl',
        'naure.location': jsprefix + 'js/core/naure.location',
        'naure.message': jsprefix + 'js/core/naure.message',
        'naure.ui.overlay': jsprefix + 'js/core/naure.ui.overlay',

        'naure.math': jsprefix + 'js/core/math/naure.math',
        'naure.math.number': jsprefix + 'js/core/math/naure.math.number',
        'naure.math.symbol': jsprefix + 'js/core/math/naure.math.symbol',
        'naure.math.structures': jsprefix + 'js/core/math/naure.math.structures',

        'naure.math.probability': jsprefix + 'js/core/math/probability/naure.math.probability',
        'naure.math.probability.stochastic': jsprefix + 'js/core/math/probability/naure.math.probability.stochastic',

        'naure.math.matrixes': jsprefix + 'js/core/math/matrixes/naure.math.matrixes',
        'naure.math.sets': jsprefix + 'js/core/math/sets/naure.math.sets',
        'naure.math.sets.tree': jsprefix + 'js/core/math/sets/naure.math.sets.tree',
        'naure.math.sets.tree.augmenting': jsprefix + 'js/core/math/sets/naure.math.sets.tree.augmenting',
        'naure.math.statistics': jsprefix + 'js/core/math/statistics/naure.math.statistics',
        'naure.math.statistics.finance': jsprefix + 'js/core/math/statistics/naure.math.statistics.finance',

        'naure.chart.gantt': jsprefix + 'js/core/chart/naure.chart.gantt',

        'naure.graphics': jsprefix + 'js/core/graphics/naure.graphics',
        'naure.graphics.math': jsprefix + 'js/core/graphics/naure.graphics.math',
        'naure.graphics.gridlines': jsprefix + 'js/core/graphics/naure.graphics.gridlines',
        'naure.graphics.ui': jsprefix + 'js/core/graphics/naure.graphics.ui',
        'naure.graphics.layout': jsprefix + 'js/core/graphics/naure.graphics.layout',
        'naure.graphics.equation': jsprefix + 'js/core/graphics/naure.graphics.equation',
        'naure.graphics.finance': jsprefix + 'js/core/graphics/naure.graphics.finance',
        'naure.graphics.stochastic': jsprefix + 'js/core/graphics/naure.graphics.stochastic',

        'math': jsprefix + 'js/core/math',
        'math.matrix': jsprefix + 'js/core/math.matrix',

        //Integrate template
        'integrate-template': jsprefix + '/templates/integrate-template',
        //Research template
        'research-template': jsprefix + '/templates/research-template',
        //Shoping template
        'shoping-template': jsprefix + '/templates/shoping-template'
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