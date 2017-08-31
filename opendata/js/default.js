$(function () {
    var chartOne = echarts.init(document.getElementById('chartone'));
    var optionOne = {
        charttype: '堆叠区域图',
        title: {
            text: '搜索引擎，邮件营销展示',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['邮件营销', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            top: 40,
            bottom: 38,
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {
                normal: {}
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        }, {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {
                normal: {}
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        }, {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {
                normal: {}
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        }, {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {
                normal: {}
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }]
    };
    // var chartTwo = echarts.init(document.getElementById('charttwo'));
    var optionTwo = {
        charttype: '富文本标签',
        title: {
            text: '天气情况统计',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 0,
            left: 'center',
            data: ['西凉', '益州', '兖州', '荆州', '幽州']
        },
        series: [{
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [{
                value: 1548,
                name: '幽州'

            }, {
                value: 535,
                name: '荆州'
            }, {
                value: 510,
                name: '兖州'
            }, {
                value: 634,
                name: '益州'
            }, {
                value: 735,
                name: '西凉'
            }],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    var chartThree = echarts.init(document.getElementById('chartthree'));
    var optionThree = {
        charttype: '漏斗图',
        title: {
            text: '用户订单情况访问展示',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
            top: 0,
            left: 'center',
            data: ['展现', '点击', '访问', '咨询', '订单']
        },
        series: [{
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '70%',
            label: {
                normal: {
                    formatter: '{b}预期'
                },
                emphasis: {
                    position: 'inside',
                    formatter: '{b}预期: {c}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7
                }
            },
            data: [{
                value: 60,
                name: '访问'
            }, {
                value: 40,
                name: '咨询'
            }, {
                value: 20,
                name: '订单'
            }, {
                value: 80,
                name: '点击'
            }, {
                value: 100,
                name: '展现'
            }]
        }, {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '70%',
            maxSize: '80%',
            label: {
                normal: {
                    position: 'inside',
                    formatter: '{c}%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    position: 'inside',
                    formatter: '{b}实际: {c}%'
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.5,
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            data: [{
                value: 30,
                name: '访问'
            }, {
                value: 10,
                name: '咨询'
            }, {
                value: 5,
                name: '订单'
            }, {
                value: 50,
                name: '点击'
            }, {
                value: 80,
                name: '展现'
            }]
        }]
    };

    var chartFour = echarts.init(document.getElementById('chartfour'));
    var data = [];
    var dataCount = 10;
    var startTime = +new Date();
    var categories = ['目录A', '目录B', '目录C'];
    // 六种类型，和每种类型对应的颜色
    var types = [{
        name: 'JS Heap',
        color: '#7b9ce1'
    }, {
        name: 'Documents',
        color: '#bd6d6c'
    }, {
        name: 'Nodes',
        color: '#75d874'
    }, {
        name: 'Listeners',
        color: '#e0bc78'
    }, {
        name: 'GPU Memory',
        color: '#dc77dc'
    }, {
        name: 'GPU',
        color: '#72b362'
    }];
var numberi=0;
    // Generate mock data
    echarts.util.each(categories, function (category, index) {
        var baseTime = startTime;
        for (var i = 0; i < dataCount; i++) {
            var typeItem = types[Math.round(Math.random() * (types.length - 1))];
            var duration = Math.round(Math.random() * 10000);
            data.push({
                name: typeItem.name,
                value: [
                    index,
                    baseTime,
                    baseTime += duration,
                    duration
                ],
                itemStyle: {
                    normal: {
                        color: typeItem.color
                    }
                }
            });
            baseTime += Math.round(Math.random() * 2000);
        }
    });

    function renderItem(params, api) {
        var categoryIndex = api.value(0);
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.6;

        return {
            type: 'rect',
            shape: echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
            }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            }),
            style: api.style(),
            onmouseover: () => {

            }
        };
    }


    var optionFour = {
        charttype: '轮廓展示图',
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + ': ' + params.value[3] + ' ms';
            }
        },
        title: {
            text: '目录访问占用时长统计图',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        legend: {
            data: ['bar', 'error']
        },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            bottom: 40,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }, {
            type: 'inside',
            filterMode: 'weakFilter'
        }],
        grid: {
            left: '4%',
            right: '4%',
            top: 20,
            bottom: 88,
            containLabel: true
        },
        xAxis: {
            // min: startTime,
            scale: true,
            // axisLabel: {
            //     formatter: function (val) {
            //         console.log(val, startTime);
            //         return Math.max(0, val - startTime) + ' ms';
            //     }
            // }
        },
        yAxis: {
            data: ['目录A', '目录B', '目录C']
        },
        series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data
        }]
    };
    // console.log('data:', JSON.stringify(data),optionFour);

    
    chartOne.setOption(optionOne);
   
    chartThree.setOption(optionThree);
    chartFour.setOption(optionFour);

    $.ajax({
        type: "GET",
        url: "http://172.16.1.232:8088/echarts/get/-1/0",
        data: {},
        success: function (data) {
            console.log(data.data[1].json);
            var chartTwo = echarts.init(document.getElementById('charttwo'));
            // chartTwo.setOption(data.data[0].json);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });



    // $(window).resize(function () {
    //     chartOne.resize();
    //     // chartTwo.resize();
    //     chartThree.resize();
    //     chartFour.resize();
    // });
});