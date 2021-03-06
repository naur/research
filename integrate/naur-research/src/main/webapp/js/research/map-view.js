/*
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@360buy.com
 * Date:
 *              6/16/12 4:56 PM
 * Description:
 *              Google Map
 * */

/*-------------------- 全局变量 START --------------------*/

var NAUR, map, marker, tracePathList, geocoder, eventContext, watchId, realTime = false, tracePathList = new Array();
var overlayNodes = {
    "道路": function () {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    },
    "卫星": function () {
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    },
    "道路和卫星": function () {
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    },
    "地形": function () {
        map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    },
    "Current": function () {
        watchId = NAUR.Location.Current({success: function (position) {
            if (position) {
                //NAUR.Message.show({content:JSON.stringify($.toJSON(position))});
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    title: $.format('您当前所在的位置\r\n经度：{0}\r\n维度： {1}', position.coords.longitude, position.coords.latitude)
                });
                NAUR.Message.show({content: $.format('您当前所在的位置, 经度：{0}\r\n维度： {1}', position.coords.longitude, position.coords.latitude)});
            } else {
                NAUR.Message.show({content: 'position is null', color: 'red'});
            }
        }, error: function (error) {
            NAUR.Message.show({content: "Got an error, code: " + error.code + " message: " + error.message, color: 'red'});
        }});
    },
    "Real time": function () {
        if (marker) marker.setMap(null);

        realTime = !realTime;
        if (!realTime && watchId) {
            NAUR.Location.End(watchId);
            NAUR.Message.show({content: "real time geolocation end", color: 'red'});
            return;
        }

        for (i = 0; i < tracePathList.length; i++)
            tracePathList[i].setMap(null);

        watchId = NAUR.Location.Start({success: function (position) {
            if (position) {
                //NAUR.Message.show({content:JSON.stringify($.toJSON(position))});
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    title: $.format('您当前所在的位置\r\n经度：{0}\r\n维度： {1}', position.coords.longitude, position.coords.latitude)
                });
                NAUR.Message.show({content: $.format('您当前所在的位置, 经度：{0}\r\n维度： {1}', position.coords.longitude, position.coords.latitude)});
            } else {
                NAUR.Message.show({content: 'position is null', color: 'red'});
            }
        }, error: function (error) {
            NAUR.Message.show({content: "Got an error, code: " + error.code + " message: " + error.message, color: 'red'});
        }});
        NAUR.Message.show({content: "real time geolocation, watchId = " + watchId});
    },
    Geocoder: {
        input: {type: 'button', title: 'Geocoding', value: 'Geocoder'},
        html: '<input type="text" style="width:100px;" />',
        handler: function (content) {
            $(this).attr('disabled', true);
            NAUR.Message.empty();
            eventContext = this;
            var address = $(content.data).children(':first-child').val()
            geocoder.geocode({ 'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(12);
                    var marker = new google.maps.Marker({
                        map: map, position: results[0].geometry.location
                    });
                } else {
                    NAUR.Message.show({content: "Geocode was not successful for the following reason: " + status});
                }
//                NAUR.JSON.Parser(results, function (option) {
//                    option.content = option.content.replace(/null/gi, '<span style="color:red">null</span>');
//                    NAUR.Message.show(option);
//                });
                $(eventContext).attr('disabled', false);
            });
        }
    },
    Trace: {
        input: {type: 'button', title: 'Trace', value: 'Trace'},
        html: '<select id="trace-path" onchange="selectTracePath(this);">' +
            '<option value="trace1">trace1</option>' +
            '<option value="trace2">trace2</option>' +
            '<option value="trace3">trace3</option>' +
            '<option value="trace4">trace4</option>' +
            '<option value="trace5">trace5</option>' +
            '</select><input id="trace-path-name" type=text />',
        handler: function (content) {
            $(this).attr('disabled', true);

            NAUR.Message.empty();
            eventContext = this;
            var traceId = $(content.data).children(':last-child').val();
            if (null == traceId || traceId.length <= 0) {
                NAUR.Message.show({content: 'traceId is empty', color: 'red'});
                $(this).attr('disabled', false);
                return;
            }

            NAUR.HTTP.acquire({
                xmlUrl: '/map/path/' + traceId + '.xml',
                context: this,
                success: function (obj) {
                    var searchKey = 'location';
                    if (obj.output == null || obj.output.length <= 0 || $(obj.output).find(searchKey).length <= 0) {
                        NAUR.Message.show({content: 'data of traceId ' + traceId + '" is empty', color: 'red'});
                        $(obj.context).attr('disabled', false);
                        return;
                    }

                    var tracePlanCoordinates = new Array();
                    $(obj.output).find(searchKey).each(function (index, data) {
                        tracePlanCoordinates.push(new google.maps.LatLng(
                            new Number($(this).children('latitude').text()),
                            new Number($(this).children('longitude').text())));
                    });

                    map.setCenter(new google.maps.LatLng(
                        tracePlanCoordinates[0].lat(),
                        tracePlanCoordinates[0].lng()));

                    tracePathList.push(new google.maps.Polyline({
                        path: tracePlanCoordinates,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    }));
                    tracePathList[0].setMap(map);
                    $(obj.context).attr('disabled', false);
                },
                error: function () {
                    NAUR.Message.show({content: 'Got trace data error', color: 'red'});
                    $(obj.context).attr('disabled', false);
                }
            });
        }
    }
};

/*-------------------- 全局变量 END --------------------*/

/*-------------------- 函数 START --------------------*/

function selectTracePath(obj) {
    $(obj).next().val($(obj).val());
}

function initialize() {
    //经度：114.38484,  维度：30.478435
    // 北京：39.904214, 116.40741300000002);
    var latlng = new google.maps.LatLng(30.478435, 114.38484);
    var myOptions = {
        zoom: 14,
        center: latlng,
        cursor: '111111',
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: $.format('您当前所在的位置\r\n经度：{0}\r\n维度： {1}', latlng.lng(), latlng.lat())
    });

    geocoder = new google.maps.Geocoder();
}

/*-------------------- 函数 END --------------------*/

/*-------------------- 初始化 START --------------------*/

require(['http://maps.google.com/maps/api/js?v=3.9&sensor=false&region=zh-CN&language=zh-CN&callback=initialize']);

require(['jquery', 'naur.location', 'naur.message', 'naur.ui.overlay', 'naur.analytics'], function ($, NAUR) {

    this.NAUR = NAUR;

    $(function () {
        $('body').message({overlay: 'left-bottom', multiple: false});
        $('body').overlay({
            nodes: overlayNodes,
            clear: function () {
                for (i = 0; i < tracePathList.length; i++)
                    tracePathList[i].setMap(null);
                tracePathList.clear();
            }
        });
    });
});

/*-------------------- 初始化 END --------------------*/
