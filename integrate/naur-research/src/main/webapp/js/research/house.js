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
    center: {coordinate: [114.40844, 30.47856], name: ''},
    points: [
//        {point: [30.47856, 114.40844], name: '工作地方', addr: '武汉市东湖高新技术开发区关山大道1号 光谷软件园F6栋6楼'},
//        {point: [30.40364, 114.41549], name: '保利清能西海岸', addr: ''},
//        {point: [30.43973, 114.43742], name: '平安光谷春天', addr: ''},
//        {point: [30.48021, 114.51558], name: '朗诗里程', addr: ''},
//        {point: [30.49713, 114.53742], name: '光谷北大资源.山水年华', addr: ''}
        {coordinate: [114.412589, 30.485188], name: '工作地方', addr: '武汉市东湖高新技术开发区关山大道1号 光谷软件园F6栋6楼', city: '武汉市', uri: '/house'},
        {coordinate: [114.316892, 30.424641], name: ' 三姐家', addr: '武汉市东湖高新技术开发区关山大道1号 光谷软件园F6栋6楼', city: '武汉市', uri: '/house'},
        {coordinate: [114.386277, 30.463497], name: '名湖豪庭', house: ['34层 102.67平 第16层7500 15年12月入住 2梯3户 容积率2.5'], addr: '武汉市东湖高新技术开发区关山大道1号 光谷软件园F6栋6楼', city: '武汉市', uri: 'http://minghuhaoting.fang.com'},
        {coordinate: [114.421697, 30.409536], name: '保利清能西海岸', house: ['11层第3层 91平 6551 容积率1.93', '8层第3层 108平 6650'], addr: '江夏杨桥湖大道与栗庙路交汇处', city: '武汉市', uri: 'http://xihaianblqn.fang.com'},
        {coordinate: [114.44384, 30.446165], name: '平安光谷春天', house: ['精装 8千 34层 容积率3.1'], addr: '东湖高新开发区 高新六路15号', city: '武汉市', uri: 'http://guangguchuntianpa.fang.com'},
        {coordinate: [114.521633, 30.488825], name: '朗诗里程', house: ['公摊19% 均价6500 2梯4户 容积率2.80'], addr: '东湖高新 高新大道光谷六路与神墩二路交汇处', city: '武汉市', uri: 'http://langshilicheng.fang.com'},
        {coordinate: [114.544468, 30.502159], name: '光谷北大资源.山水年华', house: ['9层 104.85平 大概8千 容积率1.80'], addr: '武汉市东湖高新区珊瑚北路与九峰二路交汇处', city: '武汉市', uri: 'http://shanshuinianhuabdzy.fang.com'}
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
            marker: function (map, point) {
                var mapLabel = new MapLabel({
                    text: point.name,
                    map: map,
                    position: point.coordinate,
                    fontSize: global.font.size,
                    fontColor: global.font.color,
                    align: 'right',
                    title: '您当前所在的位置\r\n经度：' + point.coordinate.lng() + '\r\n维度： ' + point.coordinate.lat()
                });
                var marker = new google.maps.Marker();
                marker.bindTo('map', mapLabel);
                marker.bindTo('position', mapLabel);
            },
            parsePoint: function (point) {
                return new google.maps.LatLng(point.coordinate[1], point.coordinate[0]);
            }
        },
        baidu: {    //http://api.map.baidu.com/lbsapi/getpoint/index.html
            zoom: 19,
            create: function (container, center, zoom) {
                var map = new BMap.Map(container);
                map.centerAndZoom(center, zoom);
                map.addControl(new BMap.NavigationControl());   //地图平移缩放控件，PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。
                map.addControl(new BMap.ScaleControl());        //比例尺控件，默认位于地图左下方，显示地图的比例关系。
                map.addControl(new BMap.OverviewMapControl());  //缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
                var stCtrl = new BMap.PanoramaControl();
                stCtrl.setOffset(new BMap.Size(10, 40));
                map.addControl(stCtrl);                                 //全景控件
                //map.addControl(new BMap.GeolocationControl());  //定位控件，针对移动端开发，默认位于地图左下方。
                map.addControl(new BMap.MapTypeControl());      //地图类型控件，默认位于地图右上方。
                map.setCurrentCity("武汉"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
                map.enableScrollWheelZoom();                            //启用滚轮放大缩小
                return map;
            },
            getCoordinate: function (point) {
                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上，并调整地图视野
                myGeo.getPoint(point.addr, function (coord) {
                    if (coord) {
                        console.log(JSON.stringify(coord));
                        point.coordinate = coord;
                    }
                }, point.city);
            },
            getLocation: function (point) {
                // 创建地理编码实例
                var myGeo = new BMap.Geocoder();
                // 根据坐标得到地址描述
                myGeo.getLocation(point.coordinate, function (result) {
                    if (result) {
                        point.attr = result.address;
                    }
                });
            },
            parsePoint: function (point) {
                //Point(lng 经度:Number, lat 纬度:Number)
                return new BMap.Point(point.coordinate[0], point.coordinate[1]);
            },
            marker: function (map, point) {
                map.addOverlay(new BMap.Marker(point.coordinate));
                var label = new BMap.Label(point.name, {
                    offset: 0,
                    position: point.coordinate
                });
                label.setStyle({color: global.font.color, fontSize: global.font.size});
                var str = '<a target="_blank" href="' + point.uri + '">' + point.name + '</a>'
                if (point.house) {
                    for (var index in point.house) {
                        str += '<br />' + point.house[index];
                    }
                }
                label.setContent(str);

                map.addOverlay(label);
            },
            line: function (map, points) {
                var array = [];
                for (var index in points) {
                    array.push(points[index].coordinate);
                }
                var polyline = new BMap.Polyline(array,
                    {strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5}
                );
                map.addOverlay(polyline);
            },
            navigation: function (map, src, dst) {
                var driving = new BMap.DrivingRoute(map, {
                    renderOptions: {
                        map: map,
                        autoViewport: true
                    }
                });
                driving.search(src.coordinate, dst.coordinate);
            }
        }
    }
};

function init(map) {
    for (var index in global.points) {
        global.points[index].coordinate = map.parsePoint(global.points[index]);
    }
    global.center = map.parsePoint(global.center);

    global.map = map.create('map', global.center, map.zoom);
    for (var i = 0; i < global.points.length; i++) {
        map.marker(global.map, global.points[i]);
        //map.line(map, global.points);
        if (0 != i) {
            map.navigation(global.map, global.points[0], global.points[i]);
        }
    }
}

//require(['loading', 'research-template', 'google.maps', 'google.maplabel'], function (NAUR) {
require(['loading', 'research-template'], function (NAUR) {
    $(function () {
        init(global.maps.baidu);
    });
});