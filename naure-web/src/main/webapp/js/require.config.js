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

require.config({
    paths:{
        jquery:'/Research/projects/naure/naure-web/src/main/webapp/js/jquery-1.7.2.min',
        'jquery.strings':'/Research/projects/naure/naure-web/src/main/webapp/js/jquery.strings',
        'ajaxslt':'/Research/projects/naure/naure-web/src/main/webapp/js/ajaxslt',
        'naure':'/Research/projects/naure/naure-web/src/main/webapp/js/naure',
        'naure.utility':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.utility',
        'naure.ui.templet':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.ui.templet',
        'naure.location':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.location',
        'naure.http':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.http',
        'naure.xsl':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.xsl.js',
        'naure.message':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.message',
        'naure.overlay':'/Research/projects/naure/naure-web/src/main/webapp/js/naure.overlay',

        'naure.math':'/Research/projects/naure/naure-research/src/main/webapp/js/math/naure.math',
        'naure.graph':'/Research/projects/naure/naure-research/src/main/webapp/js/graph/naure.graph',
        'naure.graph.math':'/Research/projects/naure/naure-research/src/main/webapp/js/graph/naure.graph.math',
        'naure.graph.ui':'/Research/projects/naure/naure-research/src/main/webapp/js/graph/naure.graph.ui',

        'math':'/Research/projects/naure/naure-research/src/main/webapp/js/math/math',
        'math.matrix':'/Research/projects/naure/naure-web/src/main/webapp/js/math/math.matrix'
    },
    shim:{
        'jquery-strings':['jquery']
    }
});