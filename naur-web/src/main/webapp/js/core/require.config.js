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

//var jsprefix = '/Research/projects/res/core/naur-integrate/src/main/webapp';
var jsprefix = '/';
jsprefix = jsprefix.replace('naur-integrate', 'naur-research');

require.config({
    //baseUrl: '',
    paths: {
        'loading': jsprefix + 'js/loading',
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
        'echarts': jsprefix + 'js/echarts/echarts',
        'echarts/chart/bar': jsprefix + 'js/core/echarts/chart/bar',       // 把所需图表指向单文件
        'echarts/chart/line': jsprefix + 'js/core/echarts/chart/line',

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

        'naur': jsprefix + 'js/core/naur',
        'naur.validate': jsprefix + 'js/core/naur.validate',
        'naur.pattern': jsprefix + 'js/core/naur.pattern',
        'naur.pattern.ajax': jsprefix + 'js/core/naur.pattern',
        'naur.pattern.xsl': jsprefix + 'js/core/naur.pattern',
        'naur.utility': jsprefix + 'js/core/naur.utility',
        'naur.analytics': jsprefix + 'js/core/naur.analytics',
        'naur.ui': jsprefix + 'js/core/naur.ui',
        'naur.ui.echarts': jsprefix + 'js/core/naur.ui.echarts',
        'naur.http': jsprefix + 'js/core/naur.http',
        'naur.http.xmlhttp': jsprefix + 'js/core/naur.http.xmlhttp',
        'naur.http.ajax': jsprefix + 'js/core/naur.http.ajax',
        'naur.http.xsl': jsprefix + 'js/core/naur.http.xsl',
        'naur.location': jsprefix + 'js/core/naur.location',
        'naur.message': jsprefix + 'js/core/naur.message',
        'naur.ui.overlay': jsprefix + 'js/core/naur.ui.overlay',

        'naur.math': jsprefix + 'js/core/math/naur.math',
        'naur.math.number': jsprefix + 'js/core/math/naur.math.number',
        'naur.math.symbol': jsprefix + 'js/core/math/naur.math.symbol',
        'naur.math.structures': jsprefix + 'js/core/math/naur.math.structures',

        'naur.math.probability': jsprefix + 'js/core/math/probability/naur.math.probability',
        'naur.math.probability.stochastic': jsprefix + 'js/core/math/probability/naur.math.probability.stochastic',

        'naur.math.matrixes': jsprefix + 'js/core/math/matrixes/naur.math.matrixes',
        'naur.math.sets': jsprefix + 'js/core/math/sets/naur.math.sets',
        'naur.math.sets.tree': jsprefix + 'js/core/math/sets/naur.math.sets.tree',
        'naur.math.sets.tree.augmenting': jsprefix + 'js/core/math/sets/naur.math.sets.tree.augmenting',
        'naur.math.statistics': jsprefix + 'js/core/math/statistics/naur.math.statistics',
        'naur.math.statistics.finance': jsprefix + 'js/core/math/statistics/naur.math.statistics.finance',

        'naur.chart.gantt': jsprefix + 'js/core/chart/naur.chart.gantt',

        'naur.graphics': jsprefix + 'js/core/graphics/naur.graphics',
        'naur.graphics.math': jsprefix + 'js/core/graphics/naur.graphics.math',
        'naur.graphics.gridlines': jsprefix + 'js/core/graphics/naur.graphics.gridlines',
        'naur.graphics.ui': jsprefix + 'js/core/graphics/naur.graphics.ui',
        'naur.graphics.layout': jsprefix + 'js/core/graphics/naur.graphics.layout',
        'naur.graphics.equation': jsprefix + 'js/core/graphics/naur.graphics.equation',
        'naur.graphics.finance': jsprefix + 'js/core/graphics/naur.graphics.finance',
        'naur.graphics.stochastic': jsprefix + 'js/core/graphics/naur.graphics.stochastic',

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
//        'naur.analytics': {
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