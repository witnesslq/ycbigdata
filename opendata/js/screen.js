$(function () {
    var chart1 = echarts.init(document.getElementById('chart1'));
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    for (var i = 0; i < 10; i++) {
        xAxisData.push('Class' + i);
        data1.push((Math.random() * 2).toFixed(2));
        data2.push(-Math.random().toFixed(2));
        data3.push((Math.random() * 5).toFixed(2));
        data4.push((Math.random() + 0.3).toFixed(2));
    }

    var itemStyle = {
        normal: {},
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };

    var option1 = {
        charttype: '柱状图',
        title: {
            text: '没有明确的展示内容',
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
            data: ['bar', 'bar2', 'bar3', 'bar4'],
            align: 'left',
            left: 10
        },
        // brush: {
        //     toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        //     xAxisIndex: 0
        // },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {}
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            name: 'X轴',
            silent: false,
            axisLine: {
                onZero: true
            },
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: {
            inverse: true,
            splitArea: {
                show: false
            }
        },
        grid: {
            left: 100
        },
        visualMap: {
            type: 'continuous',
            dimension: 1,
            text: ['High', 'Low'],
            inverse: true,
            itemHeight: 200,
            calculable: true,
            min: -2,
            max: 6,
            top: 60,
            left: 10,
            inRange: {
                colorLightness: [0.4, 0.8]
            },
            outOfRange: {
                color: '#bbb'
            },
            controller: {
                inRange: {
                    color: '#2f4554'
                }
            }
        },
        series: [{
                name: 'bar',
                type: 'bar',
                stack: 'one',
                itemStyle: itemStyle,
                data: data1
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'one',
                itemStyle: itemStyle,
                data: data2
            },
            {
                name: 'bar3',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                data: data3
            },
            {
                name: 'bar4',
                type: 'bar',
                stack: 'two',
                itemStyle: itemStyle,
                data: data4
            }
        ]
    };

    // chartOne.on('brushSelected', renderBrushed);

    // function renderBrushed(params) {
    //     var brushed = [];
    //     var brushComponent = params.batch[0];

    //     for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
    //         var rawIndices = brushComponent.selected[sIdx].dataIndex;
    //         brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
    //     }

    //     chartOne.setOption({
    //         title: {
    //             backgroundColor: '#333',
    //             text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
    //             bottom: 0,
    //             right: 0,
    //             width: 100,
    //             textStyle: {
    //                 fontSize: 12,
    //                 color: '#fff'
    //             }
    //         }
    //     });
    // }
    chart1.setOption(option1);
    $(window).resize(function () {
        chart1.resize();
    });


    var chart2 = echarts.init(document.getElementById('chart2'));
    var option2 = {
        charttype: '极坐标堆叠柱状图',
        title: {
            text: '没有明确展示内容',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        angleAxis: {},
        radiusAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四'],
            z: 10
        },
        polar: {
            radius: '70%',
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a'
        }, {
            type: 'bar',
            data: [2, 4, 6, 8],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a'
        }, {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a'
        }],
        legend: {
            show: true,
            data: ['A', 'B', 'C']
        }
    };

    chart2.setOption(option2);
    $(window).resize(function () {
        chart2.resize();
    });

    var chart3 = echarts.init(document.getElementById('chart3'));
    var option3 = {
        charttype: '基础雷达图',
        title: {
            text: '预算与实际开销展示',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        tooltip: {},
        legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
            // shape: 'circle',
            radius: '65%',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [{
                    name: '销售（sales）',
                    max: 6500
                },
                {
                    name: '管理（Administration）',
                    max: 16000
                },
                {
                    name: '信息技术（Information Techology）',
                    max: 30000
                },
                {
                    name: '客服（Customer Support）',
                    max: 38000
                },
                {
                    name: '研发（Development）',
                    max: 52000
                },
                {
                    name: '市场（Marketing）',
                    max: 25000
                }
            ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: '预算分配（Allocated Budget）'
                },
                {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    name: '实际开销（Actual Spending）'
                }
            ]
        }]
    };

    chart3.setOption(option3);
    $(window).resize(function () {
        chart3.resize();
    });

    var chart4 = echarts.init(document.getElementById('chart4'));
    var option4 = {
        charttype: '仪表盘',
        title: {
            text: '速度，转速，水量展示',
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
            formatter: "{a} <br/>{c} {b}"
        },
        series: [{
                name: '速度',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 220,
                splitNumber: 11,
                radius: '60%',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    backgroundColor: 'auto',
                    borderRadius: 2,
                    color: '#eee',
                    padding: 3,
                    textShadowBlur: 2,
                    textShadowOffsetX: 1,
                    textShadowOffsetY: 1,
                    textShadowColor: '#222'
                },
                title: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    // formatter: function (value) {
                    //     value = (value + '').split('.');
                    //     value.length < 2 && (value.push('00'));
                    //     return ('00' + value[0]).slice(-2) +
                    //         '.' + (value[1] + '00').slice(0, 2);
                    // },
                    textStyle: {       
                        fontWeight: 'bolder',
                        // fontSize:22
                    },
                    // fontWeight: 'bolder',
                    // borderRadius: 3,
                    // backgroundColor: '#444',
                    // borderColor: '#aaa',
                    // shadowBlur: 5,
                    // shadowColor: '#333',
                    // shadowOffsetX: 0,
                    // shadowOffsetY: 3,
                    // borderWidth: 2,
                    // textBorderColor: '#000',
                    // textBorderWidth: 2,
                    // textShadowBlur: 2,
                    // textShadowColor: '#fff',
                    // textShadowOffsetX: 0,
                    // textShadowOffsetY: 0,
                    // fontFamily: 'Arial',
                    // width: 90,
                    // color: '#eee',
                    // rich: {}
                },
                data: [{
                    value: 40,
                    name: 'km/h'
                }]
            },
            {
                name: '转速',
                type: 'gauge',
                center: ['20%', '55%'], // 默认全局居中
                radius: '45%',
                min: 0,
                max: 7,
                endAngle: 45,
                splitNumber: 7,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 12, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 5
                },
                title: {
                    offsetCenter: [0, '-30%'], // x, y，单位px
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                },
                data: [{
                    value: 1.5,
                    name: 'r/min'
                }]
            },
            {
                name: '油表',
                type: 'gauge',
                center: ['77%', '50%'], // 默认全局居中
                radius: '40%',
                min: 0,
                max: 2,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 5,
                    length: 10, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function (v) {
                        switch (v + '') {
                            case '0':
                                return 'E';
                            case '1':
                                return 'Gas';
                            case '2':
                                return 'F';
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 2
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0.5,
                    name: 'gas'
                }]
            },
            {
                name: '水表',
                type: 'gauge',
                center: ['77%', '50%'], // 默认全局居中
                radius: '40%',
                min: 0,
                max: 2,
                startAngle: 315,
                endAngle: 225,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function (v) {
                        switch (v + '') {
                            case '0':
                                return 'H';
                            case '1':
                                return 'Water';
                            case '2':
                                return 'C';
                        }
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 2
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0.5,
                    name: 'gas'
                }]
            }
        ]
    };

    chart4.setOption(option4);
    $(window).resize(function () {
        chart4.resize();
    });

    var chart5 = echarts.init(document.getElementById('chart5'));
    var cellSize = [50, 50];
    var pieRadius = 18;

    function getVirtulData() {
        var date = +echarts.number.parseDate('2017-02-01');
        var end = +echarts.number.parseDate('2017-03-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
        }
        return data;
    }

    function getPieSeries(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                type: 'pie',
                center: center,
                label: {
                    normal: {
                        formatter: '{c}',
                        position: 'inside'
                    }
                },
                radius: pieRadius,
                data: [{
                        name: '工作',
                        value: Math.round(Math.random() * 24)
                    },
                    {
                        name: '娱乐',
                        value: Math.round(Math.random() * 24)
                    },
                    {
                        name: '睡觉',
                        value: Math.round(Math.random() * 24)
                    }
                ]
            };
        });
    }

    function getPieSeriesUpdate(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                center: center
            };
        });
    }

    var scatterData = getVirtulData();

    var option5 = {
        charttype: '日历饼图',
        title: {
            text: '每日活动占比展示',
            bottom: 0,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#999',
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'normal'
            }
        },
        tooltip: {},
        legend: {
            data: ['工作', '娱乐', '睡觉'],
            bottom: 50,
            right: '10%'
        },
        calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
                show: false,
                textStyle: {
                    fontSize: 14
                }
            },
            dayLabel: {
                margin: 20,
                firstDay: 1,
                nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            monthLabel: {
                show: false
            },
            range: ['2017-02']
        },
        series: [{
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        return echarts.format.formatTime('dd', params.value[0]);
                    },
                    offset: [-cellSize[0] / 2 + 8, -cellSize[1] / 2 + 5],
                    textStyle: {
                        color: '#000',
                        fontSize: 12
                    }
                }
            },
            data: scatterData
        }]
    };

    if (!chart5.inNode) {
        var pieInitialized;
        setTimeout(function () {
            pieInitialized = true;
            chart5.setOption({
                series: getPieSeries(scatterData, chart5)
            });
        }, 10);

        chart5.onresize = function () {
            if (pieInitialized) {
                chart5.setOption({
                    series: getPieSeriesUpdate(scatterData, chart5)
                });
            }
        };
    }
    chart5.setOption(option5);
    $(window).resize(function () {
        chart5.resize();
    });


    var chart6 = echarts.init(document.getElementById('chart6'));
    var pathSymbols = {
        reindeer: 'path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z',
        plane: 'path://M1.112,32.559l2.998,1.205l-2.882,2.268l-2.215-0.012L1.112,32.559z M37.803,23.96 c0.158-0.838,0.5-1.509,0.961-1.904c-0.096-0.037-0.205-0.071-0.344-0.071c-0.777-0.005-2.068-0.009-3.047-0.009 c-0.633,0-1.217,0.066-1.754,0.18l2.199,1.804H37.803z M39.738,23.036c-0.111,0-0.377,0.325-0.537,0.924h1.076 C40.115,23.361,39.854,23.036,39.738,23.036z M39.934,39.867c-0.166,0-0.674,0.705-0.674,1.986s0.506,1.986,0.674,1.986 s0.672-0.705,0.672-1.986S40.102,39.867,39.934,39.867z M38.963,38.889c-0.098-0.038-0.209-0.07-0.348-0.073 c-0.082,0-0.174,0-0.268-0.001l-7.127,4.671c0.879,0.821,2.42,1.417,4.348,1.417c0.979,0,2.27-0.006,3.047-0.01 c0.139,0,0.25-0.034,0.348-0.072c-0.646-0.555-1.07-1.643-1.07-2.967C37.891,40.529,38.316,39.441,38.963,38.889z M32.713,23.96 l-12.37-10.116l-4.693-0.004c0,0,4,8.222,4.827,10.121H32.713z M59.311,32.374c-0.248,2.104-5.305,3.172-8.018,3.172H39.629 l-25.325,16.61L9.607,52.16c0,0,6.687-8.479,7.95-10.207c1.17-1.6,3.019-3.699,3.027-6.407h-2.138 c-5.839,0-13.816-3.789-18.472-5.583c-2.818-1.085-2.396-4.04-0.031-4.04h0.039l-3.299-11.371h3.617c0,0,4.352,5.696,5.846,7.5 c2,2.416,4.503,3.678,8.228,3.87h30.727c2.17,0,4.311,0.417,6.252,1.046c3.49,1.175,5.863,2.7,7.199,4.027 C59.145,31.584,59.352,32.025,59.311,32.374z M22.069,30.408c0-0.815-0.661-1.475-1.469-1.475c-0.812,0-1.471,0.66-1.471,1.475 s0.658,1.475,1.471,1.475C21.408,31.883,22.069,31.224,22.069,30.408z M27.06,30.408c0-0.815-0.656-1.478-1.466-1.478 c-0.812,0-1.471,0.662-1.471,1.478s0.658,1.477,1.471,1.477C26.404,31.885,27.06,31.224,27.06,30.408z M32.055,30.408 c0-0.815-0.66-1.475-1.469-1.475c-0.808,0-1.466,0.66-1.466,1.475s0.658,1.475,1.466,1.475 C31.398,31.883,32.055,31.224,32.055,30.408z M37.049,30.408c0-0.815-0.658-1.478-1.467-1.478c-0.812,0-1.469,0.662-1.469,1.478 s0.656,1.477,1.469,1.477C36.389,31.885,37.049,31.224,37.049,30.408z M42.039,30.408c0-0.815-0.656-1.478-1.465-1.478 c-0.811,0-1.469,0.662-1.469,1.478s0.658,1.477,1.469,1.477C41.383,31.885,42.039,31.224,42.039,30.408z M55.479,30.565 c-0.701-0.436-1.568-0.896-2.627-1.347c-0.613,0.289-1.551,0.476-2.73,0.476c-1.527,0-1.639,2.263,0.164,2.316 C52.389,32.074,54.627,31.373,55.479,30.565z',
        train: 'path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z',
        ship: 'path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z',
        car: 'path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-14.185-0.216 c-4.088,0-12.789,0.113-14.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,16.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z'
    };

    var labelSetting = {
        normal: {
            show: true,
            position: 'outside',
            offset: [10, 0],
            textStyle: {
                fontSize: 12
            }
        }
    };


    var option6 = {
        charttype: '象形柱图',
        title: {
            text: '城市出行方式占比',
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
            data: ['2015', '2016']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            containLabel: true,
            left: 20
        },
        yAxis: {
            data: ['reindeer', 'ship', 'plane', 'train', 'car'],
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 30,
                textStyle: {
                    fontSize: 14
                }
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30
                }
            }
        },
        xAxis: {
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [{
            name: '2015',
            type: 'pictorialBar',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['80%', '60%'],
            barCategoryGap: '40%',
            data: [{
                value: 157,
                symbol: pathSymbols.reindeer
            }, {
                value: 21,
                symbol: pathSymbols.ship
            }, {
                value: 66,
                symbol: pathSymbols.plane
            }, {
                value: 78,
                symbol: pathSymbols.train
            }, {
                value: 123,
                symbol: pathSymbols.car
            }]
        }, {
            name: '2016',
            type: 'pictorialBar',
            barGap: '10%',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['80%', '60%'],
            data: [{
                value: 184,
                symbol: pathSymbols.reindeer
            }, {
                value: 29,
                symbol: pathSymbols.ship
            }, {
                value: 73,
                symbol: pathSymbols.plane
            }, {
                value: 91,
                symbol: pathSymbols.train
            }, {
                value: 95,
                symbol: pathSymbols.car
            }]
        }]
    };

    chart6.setOption(option6);
    $(window).resize(function () {
        chart6.resize();
    });

    var chart7 = echarts.init(document.getElementById('chart7'));
    var option7 = {
        charttype: '主题河流图',
        title: {
            text: '没有具体展示内容',
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
                type: 'line',
                lineStyle: {
                    color: 'rgba(0,0,0,0.2)',
                    width: 1,
                    type: 'solid'
                }
            }
        },

        legend: {
            data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD']
        },
        singleAxis: {
            top: 50,
            bottom: 70,
            axisTick: {},
            axisLabel: {},
            type: 'time',
            axisPointer: {
                animation: true,
                label: {
                    show: true
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            }
        },

        series: [{
            type: 'themeRiver',
            itemStyle: {
                emphasis: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            data: [
                ['2015/11/08', 10, 'DQ'],
                ['2015/11/09', 15, 'DQ'],
                ['2015/11/10', 35, 'DQ'],
                ['2015/11/14', 7, 'DQ'],
                ['2015/11/15', 2, 'DQ'],
                ['2015/11/16', 17, 'DQ'],
                ['2015/11/17', 33, 'DQ'],
                ['2015/11/18', 40, 'DQ'],
                ['2015/11/19', 32, 'DQ'],
                ['2015/11/20', 26, 'DQ'],
                ['2015/11/21', 35, 'DQ'],
                ['2015/11/22', 40, 'DQ'],
                ['2015/11/23', 32, 'DQ'],
                ['2015/11/24', 26, 'DQ'],
                ['2015/11/25', 22, 'DQ'],
                ['2015/11/08', 35, 'TY'],
                ['2015/11/09', 36, 'TY'],
                ['2015/11/10', 37, 'TY'],
                ['2015/11/11', 22, 'TY'],
                ['2015/11/12', 24, 'TY'],
                ['2015/11/13', 26, 'TY'],
                ['2015/11/14', 34, 'TY'],
                ['2015/11/15', 21, 'TY'],
                ['2015/11/16', 18, 'TY'],
                ['2015/11/17', 45, 'TY'],
                ['2015/11/18', 32, 'TY'],
                ['2015/11/19', 35, 'TY'],
                ['2015/11/20', 30, 'TY'],
                ['2015/11/21', 28, 'TY'],
                ['2015/11/22', 27, 'TY'],
                ['2015/11/23', 26, 'TY'],
                ['2015/11/24', 15, 'TY'],
                ['2015/11/25', 30, 'TY'],
                ['2015/11/26', 35, 'TY'],
                ['2015/11/27', 42, 'TY'],
                ['2015/11/28', 42, 'TY'],
                ['2015/11/08', 21, 'SS'],
                ['2015/11/09', 25, 'SS'],
                ['2015/11/10', 27, 'SS'],
                ['2015/11/11', 23, 'SS'],
                ['2015/11/12', 24, 'SS'],
                ['2015/11/13', 21, 'SS'],
                ['2015/11/14', 35, 'SS'],
                ['2015/11/15', 39, 'SS'],
                ['2015/11/16', 40, 'SS'],
                ['2015/11/17', 36, 'SS'],
                ['2015/11/18', 33, 'SS'],
                ['2015/11/19', 43, 'SS'],
                ['2015/11/20', 40, 'SS'],
                ['2015/11/21', 34, 'SS'],
                ['2015/11/22', 28, 'SS'],
                ['2015/11/14', 7, 'QG'],
                ['2015/11/15', 2, 'QG'],
                ['2015/11/16', 17, 'QG'],
                ['2015/11/17', 33, 'QG'],
                ['2015/11/18', 40, 'QG'],
                ['2015/11/19', 32, 'QG'],
                ['2015/11/20', 26, 'QG'],
                ['2015/11/21', 35, 'QG'],
                ['2015/11/22', 40, 'QG'],
                ['2015/11/23', 32, 'QG'],
                ['2015/11/24', 26, 'QG'],
                ['2015/11/25', 22, 'QG'],
                ['2015/11/26', 16, 'QG'],
                ['2015/11/27', 22, 'QG'],
                ['2015/11/28', 10, 'QG'],
                ['2015/11/08', 10, 'SY'],
                ['2015/11/09', 15, 'SY'],
                ['2015/11/10', 35, 'SY'],
                ['2015/11/11', 38, 'SY'],
                ['2015/11/12', 22, 'SY'],
                ['2015/11/13', 16, 'SY'],
                ['2015/11/14', 7, 'SY'],
                ['2015/11/15', 2, 'SY'],
                ['2015/11/16', 17, 'SY'],
                ['2015/11/17', 33, 'SY'],
                ['2015/11/18', 40, 'SY'],
                ['2015/11/19', 32, 'SY'],
                ['2015/11/20', 26, 'SY'],
                ['2015/11/21', 35, 'SY'],
                ['2015/11/22', 4, 'SY'],
                ['2015/11/23', 32, 'SY'],
                ['2015/11/24', 26, 'SY'],
                ['2015/11/25', 22, 'SY'],
                ['2015/11/26', 16, 'SY'],
                ['2015/11/27', 22, 'SY'],
                ['2015/11/28', 10, 'SY'],
                ['2015/11/08', 10, 'DD'],
                ['2015/11/09', 15, 'DD'],
                ['2015/11/10', 35, 'DD'],
                ['2015/11/11', 38, 'DD'],
                ['2015/11/12', 22, 'DD'],
                ['2015/11/13', 16, 'DD'],
                ['2015/11/14', 7, 'DD'],
                ['2015/11/15', 2, 'DD'],
                ['2015/11/16', 17, 'DD'],
                ['2015/11/17', 33, 'DD'],
                ['2015/11/18', 4, 'DD'],
                ['2015/11/19', 32, 'DD'],
                ['2015/11/20', 26, 'DD'],
                ['2015/11/21', 35, 'DD'],
                ['2015/11/22', 40, 'DD'],
                ['2015/11/23', 32, 'DD'],
                ['2015/11/24', 26, 'DD'],
                ['2015/11/25', 22, 'DD'],
                ['2015/11/26', 16, 'DD'],
                ['2015/11/27', 22, 'DD'],
                ['2015/11/28', 10, 'DD']
            ]
        }]
    };
    chart7.setOption(option7);
    $(window).resize(function () {
        chart7.resize();
    });
});