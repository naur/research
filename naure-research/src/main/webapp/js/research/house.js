var global = {
    font: {
        size: 12,
        color: 'red'
    },
    map: null,
    marker: null,
    geocoder: null,
    //经度：114.38484,  维度：30.478435
    //北京：39.904214, 116.40741300000002);
    center: [30.47856, 114.40844],
    points: [
        {point: [30.47856, 114.40844], name: '工作地方'},
        {point: [30.40364, 114.41549], name: '保利清能西海岸'},
        {point: [30.43973, 114.43742], name: '平安光谷春天'},
        {point: [30.48021, 114.51558], name: '朗诗里程'},
        {point: [30.49713, 114.53742], name: '光谷北大资源.山水年华'}
    ],
    maps: {
        google: {
            zoom: 14,
            create: function (container, center, zoom) {
                return new google.maps.Map(
                    document.getElementById(container), {
                        zoom: zoom,
                        center: center,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                );
            },
            marker: function (map, mark) {
                var mapLabel = new MapLabel({
                    text: mark.name,
                    map: map,
                    position: mark.point,
                    fontSize: global.font.size,
                    fontColor: global.font.color,
                    align: 'right',
                    title: '您当前所在的位置\r\n经度：' + mark.point.lng() + '\r\n维度： ' + mark.point.lat()
                });
                var marker = new google.maps.Marker();
                marker.bindTo('map', mapLabel);
                marker.bindTo('position', mapLabel);
            },
            parsePoint: function (point) {
                return new google.maps.LatLng(point[0], point[1]);
            }
        },
        baidu: {
            zoom: 15,
            parsePoint: function (point) {
                //Point(lng 经度:Number, lat 纬度:Number)
                return new BMap.Point(point[1], point[0]);
            },
            create: function (container, center, zoom) {
                var map = new BMap.Map(container);
                map.centerAndZoom(center, zoom);
                map.addControl(new BMap.NavigationControl());   //地图平移缩放控件，PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。
                map.addControl(new BMap.ScaleControl());        //比例尺控件，默认位于地图左下方，显示地图的比例关系。
                map.addControl(new BMap.OverviewMapControl());  //缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
                //map.addControl(new BMap.GeolocationControl());  //定位控件，针对移动端开发，默认位于地图左下方。
                map.addControl(new BMap.MapTypeControl());      //地图类型控件，默认位于地图右上方。
                map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
                map.enableScrollWheelZoom();                            //启用滚轮放大缩小
                return map;
            },
            marker: function (map, mark) {
                map.addOverlay(new BMap.Marker(mark.point));
                var label = new BMap.Label(mark.name, {
                    offset: 0,
                    position: mark.point
                });
                label.setStyle({color: global.font.color, fontSize: global.font.size});
                label.setTitle(mark.name);
                map.addOverlay(label);
            },
            line: function (map, points) {
                var array = [];
                for (var index in points) {
                    array.push(points[index].point);
                }
                var polyline = new BMap.Polyline(array,
                    {strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5}
                );
                map.addOverlay(polyline);
            }
        }
    }
};

function init(map) {
    for (var index in global.points) {
        global.points[index].point = map.parsePoint(global.points[index].point);
    }
    global.center = map.parsePoint(global.center);

    global.map = map.create('map', global.center, map.zoom);
    for (var index in global.points) {
        map.marker(global.map, global.points[index]);
    }
    //map.line(map, global.points);
}

//require(['loading', 'research-template', 'google.maps', 'google.maplabel'], function (NAURE) {
require(['loading', 'research-template'], function (NAURE) {
    $(function () {
        init(global.maps.baidu);
    });
});