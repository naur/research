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

var jslocalpath = '/Research/projects/research/jd-web/src/main/webapp';
jslocalpath = '';

require.config({
    //baseUrl: '',
    paths:{
        jquery:jslocalpath + '/resources/js/jquery',
        'jquery.strings':jslocalpath + '/resources/js/jquery.strings',
        'jquery.utils':jslocalpath + '/resources/js/jquery.utils',
        'jquery.validate':jslocalpath + '/resources/js/jquery.validate',
        'ajaxslt':jslocalpath + '/resources/js/ajaxslt',

        'oop':jslocalpath + '/resources/js/oop',

        'swfobject':jslocalpath + '/resources/js/uploadify/swfobject',
        'jquery.uploadify':jslocalpath + '/resources/js/uploadify/jquery.uploadify-3.1.min',

        'jd':jslocalpath + '/resources/js/jd',
        'jd.validate':jslocalpath + '/resources/js/jd.validate',
        'jd.pattern':jslocalpath + '/resources/js/jd.pattern',
        'jd.utility':jslocalpath + '/resources/js/jd.utility',
        'jd.xsl':jslocalpath + '/resources/js/jd.xsl',
        'jd.message':jslocalpath + '/resources/js/jd.message'
    },
//    config: {
//        'jd.analytics': {
//            isTrack: true
//        }
//    },
    shim:{
        'jquery-strings':['jquery'],
        'jquery.uploadify':['jquery']
    }
});