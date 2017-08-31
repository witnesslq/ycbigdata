$(function () {
    var chartOne = echarts.init(document.getElementById('chartone'));
    var chartTwo = echarts.init(document.getElementById('charttwo'));
    var chartThree = echarts.init(document.getElementById('chartthree'));
    var chartFour = echarts.init(document.getElementById('chartfour'));
    var cellSize = [50, 50];
    /** 
     * 获取下一个月 
     * 
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
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
     * 
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

    function getPieSeries(Data,scatter,dateArr, chart) {
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
                    name:  scatter[1],
                    value: parseInt(item[1])
                }, {
                    name:  scatter[2],
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

    function dateBar(option){
        $('#charttwotitle').text(option.charttype)
        var date= option.date+'-01';
        var dateArr=getVirtulData(date, getNextMonth(date));
        chartTwo.setOption(option);
        if (!chartTwo.inNode) {
            setTimeout(function () {
                chartTwo.setOption({
                    series: getPieSeries(option,option.legend.data,dateArr,chartTwo)
                });
            }, 10);
        }
    }
    
    $.ajax({
        type: "GET",
        url: "http://172.16.1.232:8088/echarts/get/-1/0",
        data: {},
        success: function (data) {
            dateBar(data.data[3].json);
            // var date= data.data[3].json.date+'-01';
            // var dateArr=getVirtulData(date, getNextMonth(date));
            // chartTwo.setOption(data.data[3].json);
            // if (!chartTwo.inNode) {
            //     setTimeout(function () {
            //         chartTwo.setOption({
            //             series: getPieSeries(data.data[3].json,data.data[3].json.legend.data,dateArr,chartTwo)
            //         });
            //     }, 10);
            // }
            // var series=getPieSeries(data.data[3].json,data.data[3].json.legend.data,chartTwo);
            // data.data[3].json.series=series;
            // console.log(data.data[3].json);

            
            chartOne.setOption(data.data[0].json);
            //  chartThree.setOption(optionThree);
            //  chartFour.setOption(optionFour);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });

});