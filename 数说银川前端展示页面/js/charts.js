$(function () {
    var chartOne = echarts.init(document.getElementById('chartone'));
    var chartTwo = echarts.init(document.getElementById('charttwo'));
    var chartThree = echarts.init(document.getElementById('chartthree'));
    var chartFour = echarts.init(document.getElementById('chartfour'));
    var chartArr = [chartOne, chartTwo, chartThree];
    var chartTitle = ['#chartonetitle', '#charttwotitle', '#chartthreetitle'];
    var cellSize = [50, 50];
    var i = 0;
    var flag = true;
    /** 
     * 获取下一个月月份字符串 
     * @param {String} date 格式为yyyy-mm-dd的日期，如：2014-01-25 
     */
    function getNextMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份  
        var month = arr[1]; //获取当前日期的月份  
        var day = arr[2]; //获取当前日期的日  
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数  
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }
    /**
     * 生成输入月份的所有天数日期
     * @param {String} start 起始日期 '2017-02-01'
     * @param {String} end  结束日期  '2017-03-01'
     */
    function getVirtulData(start, end) {
        var date = +echarts.number.parseDate(start);
        var end = +echarts.number.parseDate(end);
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push(
                [
                    echarts.format.formatTime('yyyy-MM-dd', time)
                ]
            );
        }
        return data;
    }
    /**
     * 生成饼图的位置等配置信息
     * @param {Object} Data  echarts的option数据
     * @param {Array} scatter 饼图各占比的名字
     * @param {Array} dateArr 日期数组
     * @param {Object} chart chart对象
     */
    function getPieSeries(Data, scatter, dateArr, chart) {
        var piedata = echarts.util.map(Data.data, function (item, index) {
            var center = chart.convertToPixel('calendar', dateArr[index]);
            return {
                id: index + 'pie', // 每个饼图的id不一样
                type: 'pie',
                center: center, // center为一个数组，里面设置了每个饼图的位置，位置数据都不一样
                label: {
                    normal: {
                        formatter: '{c}',
                        position: 'inside'
                    }
                },
                radius: 18,
                // 各部分活动的占比
                data: [{
                    name: scatter[0],
                    value: parseInt(item[0])
                }, {
                    name: scatter[1],
                    value: parseInt(item[1])
                }, {
                    name: scatter[2],
                    value: parseInt(item[2])
                }]
            };
        });
        piedata.unshift({
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
                    offset: [-cellSize[0] / 2 + 8, -cellSize[1] / 2 + 5], //cellSize=[50, 50],如果固定的话就写死，单元格的宽高
                    textStyle: {
                        color: '#000',
                        fontSize: 12
                    }
                }
            },
            data: Data.data
        });
        return piedata
    }
    /**
     * 给日历饼图添加数据
     * @param {Object} option 日历饼图的option数据
     */
    function dateBar(option, chart) {
        var date = option.date + '-01';
        var dateArr = getVirtulData(date, getNextMonth(date));
        chart.setOption(option);
        if (!chart.inNode) {
            setTimeout(function () {
                chart.setOption({
                    series: getPieSeries(option, option.legend.data, dateArr, chart)
                });
            }, 10);
        }
    }

    $.ajax({
        type: "GET",
        url: "http://172.16.1.232:8088/echarts/get/1/0",
        data: {},
        success: function (data) {
            if (data.code != 200) {
                console.log(data.msg);
                return;
            }
            var source = data.data;
            for (var index in source) {
                 // 如果后端返回的图表数量超过四个，只显示前四个
                 if (index > 3) {
                    break;
                }
                // type2,3,5,6,7,8只能是小的echarts图表，只有1,4,9,10,11才能为大的图表
                if (source[index].type === 'type1' || source[index].type === 'type4' || source[index].type === 'type9' || source[index].type === 'type10' || source[index].type === 'type11') {
                    if (flag) {
                        $('#chartfourtitle').text(source[index].json.charttype);
                        chartFour.setOption(source[index].json);
                        flag = false;
                    } else {
                        // 将大图放到小图位置
                        if (source[index].type === 'type8') {
                            $(chartTitle[i]).text(source[index].json.charttype);
                            dateBar(source[index].json, chartArr[i]);
                        } else {
                            $(chartTitle[i]).text(source[index].json.charttype);
                            chartArr[i].setOption(source[index].json)
                        }
                        i++;
                    }

                } else {
                    // 小的echarts图标中，type=type8的比较特殊
                    if (source[index].type === 'type8') {
                        $(chartTitle[i]).text(source[index].json.charttype);
                        dateBar(source[index].json, chartArr[i]);
                    } else {
                        $(chartTitle[i]).text(source[index].json.charttype);
                        
                        chartArr[i].setOption(source[index].json)
                    }
                    i++;
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });

});