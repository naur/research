/**
 * Script:
 *              贾睿之
 * Email:
 *              jiaruizhi@yihaodian.com
 * Date:
 *              2014/6/11 14:27
 * Description:
 *              提供 echarts 的一些通用功能
 * Usage:
 *     global.params = {
 *        classify: jsonData['dto.classify'],
 *        start: jsonData['dto.start'] + 'T00:00:00+08:00',
 *        end: jsonData['dto.end'] + 'T00:00:00+08:00',
 *        precision: jsonData['dto.statType'],
 *        lines: lines,
 *        title: global.queryType[jsonData['dto.classify']].chartTitle,
 *        dataZoomLimit: 40,
 *        type: 'line',
 *        valueAxisFormat: valueAxisFormat,
 *        tooltipFormat: tooltipFormat
 *      };
 *      global.params.subtitle = new Date(global.params.start).format('yyyy年MM月dd日') + ' --- ' + new Date(global.params.end).format('yyyy年MM月dd日');
 *      global.params.points = global.charts.parsePoints(global.params);
 *      var option = global.charts.getChartOption(global.params);
 *      var series = global.charts.getSeries(data, global.params);
 *      global.charts.canvas['canvas1'].render({option: option, series: series});
 *
 */

define(['naur.ui', 'naur.utility', 'echarts-main', 'echarts-theme-light'], function (NAUR, $2, $3, theme) {
        var utility = NAUR.Utility;
        var ec = echarts;

        NAUR.UI.Echarts = (function () {
            var echarts = {
                theme: theme,
                core: ec,
                options: {
                    line: {
                        grid: {
                            x: 80,
                            y: 60,
                            x2: 100,
                            y2: 85
                        },
                        //title: {
                        //    x: "center",
                        //    y: "top",
                        //    textStyle: {
                        //        color: "#274b6d",
                        //        fontFamily: "arial, sans-serif",
                        //        fontSize: "14px"
                        //    },
                        //    subtextStyle: {
                        //        color: "#a22e00",
                        //        fontFamily: "arial, sans-serif",
                        //        fontSize: "11px",
                        //        fontStyle: "italic"
                        //    }
                        //},
                        tooltip: {
                            trigger: "axis",
                            //formatter: tooltipFormat,
                            axisPointer: {
                                type: "shadow"
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            textStyle: {
                                color: "#808000",
                                fontSize: "10"
                            }
                        },
                        calculable: true,
                        dataZoom: {
                            show: true,
                            realtime: true,
                            start: 60,
                            end: 100,
                            height: 12,
                            y: 45
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                magicType: {show: true, type: ["line", "bar"]},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            },
                            featureTitle: {
                                mark: "辅助线开关",
                                markUndo: "删除辅助线",
                                markClear: "清空辅助线",
                                dataZoom: "区域缩放",
                                dataZoomReset: "区域缩放后退",
                                dataView: "数据视图",
                                lineChart: "折线图切换",
                                barChart: "柱形图切换",
                                customChart: "自定义",
                                restore: "还原",
                                saveAsImage: "保存为图片"
                            },
                            featureImageIcon: {
                                customChart: ""
                            }
                        }
                    },
                    bar_hor: {
                        grid: {
                            x: 80,
                            y: 60,
                            x2: 100,
                            y2: 85
                        },
                        tooltip: {
                            trigger: "axis",
                            //formatter: tooltipFormat,
                            axisPointer: {
                                type: "shadow"
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            textStyle: {
                                color: "#808000",
                                fontSize: "10"
                            }
                        },
                        calculable: true,
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                magicType: {show: true, type: ["line", "bar"]},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            },
                            featureTitle: {
                                mark: "辅助线开关",
                                markUndo: "删除辅助线",
                                markClear: "清空辅助线",
                                dataZoom: "区域缩放",
                                dataZoomReset: "区域缩放后退",
                                dataView: "数据视图",
                                lineChart: "折线图切换",
                                barChart: "柱形图切换",
                                restore: "还原",
                                saveAsImage: "保存为图片"
                            },
                            featureImageIcon: {}
                        }
                    },
                    pie: {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            textStyle: {
                                color: "#808000",
                                fontSize: "10"
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {show: true, readOnly: false},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: false
                    }
                }
            };

            echarts.options.bar = echarts.options.line;

            /**
             * TODO jrz year 未实现
             * 根据参数获取X 坐标，返回日期数组
             * params ：{
             *                  start:'',
             *                  end:'',
             *                  precision: 'day|week|month|year'
             *              }
             * 返回坐标的刻度和对应的值, 如：{key:[1,2,3,4,5], map:[{1:0}, {2:0}, {3:0}, {4:0}, {5:0}]}
             */
            echarts.parsePoints = function (params) {
                var x;
                x = utility.getDays(params.start, params.end, function (date) {
                    if (params.pointFilter && params.pointFilter(date)) {
                        return null;
                    }

                    var result = null;
                    if ("week" == params.precision)
                        result = date.getWeek(params.firstDayOfWeek).weekOfYear;
                    else if ("month" == params.precision)
                        result = date.format('yyyy-MM');
                    else
                        result = date.format('yyyy-MM-dd');
                    return result;
                }, params.precision);

                var buffer = {
                    keys: x,
                    map: {}
                };
                for (var index in x) {
                    if (!x.hasOwnProperty(index)) continue;
                    buffer.map[x[index]] = 0;
                }
                return buffer;
            };

            /**
             * axis : {lines: 线段的名字和对应的ID, points: 坐标的刻度和对应的值, position: 坐标点所在的坐标轴, subtext: 子标题}.  X 和 Y 轴坐标类型
             * 例如：{
                 *              lines: {key:value, key:value}, 线段的ID和对应的名字,
                 *                      如果有多条线段，那么 key 是线段标识符，value 是线段的中文名，会作为 charts 的 legend 显示在图表。
                 *                      后台返回的数据，通过key来识别是哪个线段的数据
                 *              points:{keys:[1,2,3,4,5], map:[{1:0}, {2:0}, {3:0}, {4:0}, {5:0}]}, 坐标的刻度和对应的值,
                 *              title: "title",
                 *              subtitle: "subtitle",
                 *              dataZoomLimit: 可变坐标的最小刻度数量限制,
                 *              position: 坐标的位置，取值为 x 或 y，如果是 'xy'，那么就是双数值轴折线
                 *              tooltipFormat: "tooltipFormat".
                 *              categoryAxisFormat: categoryAxisFormat',
                 *              valueAxisFormat: 'valueAxisFormat',
                 *          }
             */
            echarts.getChartOption = function (axis) {
                //默认
                if (!axis.position) axis.position = 'x';

                var opt = {
                    title: {
                        text: axis.title,
                        subtext: axis.subtitle
                    },
                    tooltip: {
                        formatter: axis.tooltipFormat ? axis.tooltipFormat : null
                    },
                    legend: {
                        data: utility.arraySplit(axis.lines).values,
                        orient: 'vertical',
                        x: 'right',
                        y: 'center'
                    },
                    dataZoom: {
                        show: (axis.points.keys && axis.points.keys.length > axis.dataZoomLimit) ? true : false,
                        start: axis.dataZoomLimit < axis.points.keys.length ? (axis.points.keys.length - axis.dataZoomLimit) / axis.points.keys.length * 100 : 0
                    },
                    xAxis: [
                        {
                            splitLine: {show: false},
                            type: 'x' == axis.position ? 'category' : 'value',
                            data: 'x' == axis.position ? axis.points.keys : null,
                            axisLabel: {
                                formatter: axis.categoryAxisFormat ? axis.categoryAxisFormat : null,
                                interval: 0,
                                rotate: 45,
                                textStyle: {
                                    color: '#000080',
                                    fontSize: '11'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'y' == axis.position ? 'category' : 'value',
                            data: 'y' == axis.position ? axis.points.keys : null,
                            axisLabel: {
                                formatter: axis.valueAxisFormat ? axis.valueAxisFormat : null,
                                textStyle: {
                                    color: '#008000',
                                    fontSize: '12'
                                }
                            }
                        }
                    ]
                };

                if (axis.grid) {
                    opt.grid = axis.grid;
                }

                return $.extend(true, {}, echarts.options.line, opt);
            };

            /**
             *
             * @param data 数据里可以包含多个数据集，例如：{ds1:[{key:?, value:?},{key:?, value:?}], ds2:[]}，ds1 = lines.key1, ds2 = lines.key2
             * @param axis 如：{
                 *                              lines: {key1:value1, key2:value2}, 线段的名字和对应的ID,
                 *                              points:{key:[1,2,3,4,5], map:[{1:0}, {2:0}, {3:0}, {4:0}, {5:0}]}, 坐标的刻度和对应的值,
                 *                              stackPrefix,
                 *                              type,
                 *                              stack
                 *                          }
             * @returns {Array}
             */
            echarts.getSeries = function (data, axis) {
                var opt = $.extend({
                    type: 'line',    //默认 line
                    stack: null,
                    stackPrefix: null,
                    series: [],
                    yAxisIndex: 0,
                    itemStyle: {
                        normal: {
//                label: {
//                    show: true,
//                    textStyle: {
//                        fontSize: '12',
//                        fontFamily: '微软雅黑',
//                        fontWeight: 'bold'
//                    }
//                }
                        }
                    },
                    line: null,
                    //TODO jrz 值需要修改
                    barWidth: 5,
                    barMaxWidth: 30
                }, axis);

                var series = [], line = null, tmp;

                //遍历多个线段
                for (var i in opt.lines) {
                    if (!opt.lines.hasOwnProperty(i)) continue;

                    //如果没有数据，就不生成点
                    if (data && data[i]) {
                        var points = $.extend(true, {}, opt.points.map);
                        line = data[i]; //取一条线段的数据集
                        for (var j in line) {
                            if (!line.hasOwnProperty(j)) continue;
                            if (null != points[line[j].key])
                                points[line[j].key] = line[j].value;
                        }

                        tmp = utility.arraySplit(points);
                        series.push({
                            name: opt.lines[i],
                            type: opt.type,
                            stack: opt.stack ? opt.stack + (opt.stackPrefix ? opt.stackPrefix : '') : null,
                            //tooltip: opt.tooltip,
                            itemStyle: opt.itemStyle,
                            barWidth: opt.barWidth,
                            barMaxWidth: opt.barMaxWidth,
                            data: 'xy' == axis.position ? tmp.matrix : tmp.values,
                            yAxisIndex: opt.yAxisIndex
                        });
                    }
                }
                return series;
            };

            echarts.markDirectedPoint = function (points, format) {
                var directedPoint = [];
                for (var i in points) {
                    if (1 == i) continue;
                    directedPoint.push([format(points[i - 1]), format(points[i])]);
                }
            };

            return echarts
        })();

        return NAUR;
    }
);