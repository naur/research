/**
 * Script:
 *              贾睿之
 * Email:
 *              naur@live.cn
 * Date:
 *              7/4/12 4:21 PM
 * Description:
 *              提供 GPS 数据服务
 */

define(['jquery', 'naure'], function($, NAURE) {

    NAURE.Location.ErrorCode = {
        PERMISSION_DENIED:1, //(数值为1) 表示没有权限使用地理定位API
        POSITION_UNAVAILABLE:2, //(数值为2) 表示无法确定设备的位置，例如一个或多个的用于定位采集程序报告了一个内部错误导致了全部过程的失败
        TIMEOUT:3, //(数值为3) 表示超时
        NOSUPPORT:4 //(数值为4) 表示浏览器不支持 navigator.geolocation
    };
    NAURE.Location.DefaultGeoOptions = {
        enableHighAccuracy:false, //是否返回更详细更准确的结构，默认为false不启用，选择true则启用，但是会导致较长的响应时间及增加功耗，这种情况更多的用在移动设备上。
        timeout:10000, //设备位置获取操作的超时时间设定（不包括获取用户权限时间），单位为毫秒，如果在设定的timeout时间内未能获取位置定位，则会执行errorCallback()返回code（3）。如果未设定timeout，那么timeout默认为无穷大，如果timeout为负数，则默认timeout为0。
        maximumAge:0 //设定位置缓存时间，以毫秒为单位，如果不设置该值，该值默认为0，如果设定负数，则默认为0。该值为0时，位置定位时会重新获取一个新的位置对象；该值大于0时，即从上一次获取位置时开始，缓存位置对象，如果再次获取位置时间不超过maximumAge，则返回缓存中的位置，如果超出maximumAge，则重新获取一个新的位置。
    };

    if (navigator.geolocation) {
        NAURE.Location.enableGeoLocation = true;
    } else {
        NAURE.Location.enableGeoLocation = false;
    }

    NAURE.Location.Start = function (options) {
        var opt = $.extend({
            geoOptions:NAURE.Location.DefaultGeoOptions,
            success:null,
            error:null
        }, options);

        if (!NAURE.Location.enableGeoLocation) {
            if (opt.error)
                opt.error({code:NAURE.Location.ErrorCode.NOSUPPORT, message:"NAURE.Location.enableGeoLocation = false"});
            return
        }

        if (opt.geoOptions)
            return navigator.geolocation.watchPosition(opt.success, opt.error, opt.geoOptions);
        else
            return navigator.geolocation.watchPosition(opt.success, opt.error);
    };
    NAURE.Location.End = function (watchId) {
        if (!NAURE.Location.enableGeoLocation) {
            if (opt.error)
                opt.error({code:NAURE.Location.ErrorCode.NOSUPPORT, message:"NAURE.Location.enableGeoLocation = false"});
            return
        }
        navigator.geolocation.clearWatch(watchId);
    };
    NAURE.Location.Current = function (options) {
        var opt = $.extend({
            geoOptions:NAURE.Location.DefaultGeoOptions,
            success:null,
            error:null
        }, options);

        if (!NAURE.Location.enableGeoLocation) {
            if (opt.error)
                opt.error({code:NAURE.Location.ErrorCode.NOSUPPORT, message:"NAURE.Location.enableGeoLocation = false"});
            return
        }

        if (opt.geoOptions)
            navigator.geolocation.getCurrentPosition(opt.success, opt.error, opt.geoOptions);
        else
            navigator.geolocation.getCurrentPosition(opt.success, opt.error);
    };

    return NAURE;
});


//function startGps() {
//    var gps = navigator.geolocation;
//    if (gps) {
//        gps.getCurrentPosition(showGps,
//            function (error) {
//                NAURE.Message.empty();
//                NAURE.Message.show({content:"Got an error, code: " + error.code + " message: " + error.message});
//            },
//            {maximumAge:10000}); // 这里设置超时为10000毫秒，即10秒
//    }
//    else {
//        showGps();
//    }
//}
//
//function showGps(position) {
//    if (position) {
//        var latitude = position.coords.latitude;
//        var longitude = position.coords.longitude;
//        map.setCenter(new google.maps.LatLng(latitude, longitude));
//        new google.maps.Marker({
//            position:new google.maps.LatLng(latitude, longitude),
//            map:map,
//            title:$.format("当前你所在的位置！\r\n经度：{0}\r\n纬度：{1}", longitude, latitude)
//        });
//    }
//    else
//        NAURE.Message.show({content:'position is null'});
//}