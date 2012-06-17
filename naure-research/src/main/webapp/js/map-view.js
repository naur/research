/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/16/12
 * Time: 4:56 PM
 * To change this template use File | Settings | File Templates.
 */

var map, geocoder, eventContext;
var overlayNodes = {
    "道路":function () {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    },
    "卫星":function () {
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    },
    "道路和卫星":function () {
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    },
    "地形":function () {
        map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    },
    Geocoder:{
        input:{type:'button', title:'Geocoding', value:'Geocoder'},
        html:'<input type="text" style="width:100px;" />',
        handler:function (content) {
            $(this).attr('disabled', true);
            NAURE.Message.empty();
            eventContext = this;
            var address = $(content.data).children(':first-child').val()
            geocoder.geocode({ 'address':address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(12);
                    var marker = new google.maps.Marker({
                        map:map, position:results[0].geometry.location
                    });
                } else {
                    NAURE.Message.show({content:"Geocode was not successful for the following reason: " + status});
                }
//                NAURE.JSON.Parser(results, function (option) {
//                    option.content = option.content.replace(/null/gi, '<span style="color:red">null</span>');
//                    NAURE.Message.show(option);
//                });
                $(eventContext).attr('disabled', false);
            });
        }
    },
    Trace:{
        input:{type:'button', title:'Trace', value:'Trace'},
        html:'<select id="trace-path" onchange="selectTracePath(this);">' +
            '<option value="trace1">trace1</option>' +
            '<option value="trace2">trace2</option>' +
            '<option value="trace3">trace3</option>' +
            '<option value="trace4">trace4</option>' +
            '<option value="trace5">trace5</option>' +
            '</select><input id="trace-path-name" type=text />',
        handler:function (content) {
            $(this).attr('disabled', true);
            NAURE.Message.empty();
            eventContext = this;
            var traceId = $(content.data).children(':first-child').val();

            map.setCenter(new google.maps.LatLng(37.772323, -122.214897));
            var tracePlanCoordinates = [
                new google.maps.LatLng(37.772323, -122.214897),
                new google.maps.LatLng(21.291982, -157.821856),
                new google.maps.LatLng(-18.142599, 178.431),
                new google.maps.LatLng(-27.46758, 153.027892)];
            var tracePath = new google.maps.Polyline({
                path: tracePlanCoordinates,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            tracePath.setMap(map);
            $(this).attr('disabled', false);
        }
    }
};
function selectTracePath(obj) {
    $(obj).next().val($(obj).val());
}
function initialize() {
    var latlng = new google.maps.LatLng(39.904214, 116.40741300000002);
    var myOptions = {
        zoom:12,
        center:latlng,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    geocoder = new google.maps.Geocoder();
}

$(function () {
    $('#map_canvas').message();
    $('body').overlay({
        nodes:overlayNodes
    });

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?v=3.7&sensor=false&region=zh-CN&language=zh-CN&callback=initialize";
    document.body.appendChild(script);
});