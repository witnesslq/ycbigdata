$(function() {
    var URL = 'http://a.yinchuanopendata.com/index.php';
    var config = {
        timetype: '1',
        is_open_share: '1', // 使用途径1.开发2.共享
        sjtype: '1' // 1.目录2.接口
    };
    /**
     * 给radio绑定事件
     */
    $("input[type='radio']").on('ifChecked', function(event) {
        //ifCreated 事件应该在插件初始化之前绑定 
        switch (event.target.getAttribute('groupindex')) {
            case '1':
                console.log('使用途径触发事件');
                config.is_open_share = event.target.value;
                drawchart(config);
                break;
            case '2':
                console.log('数据类别触发事件');
                config.sjtype = event.target.value;
                drawchart(config);
                break;
            case '3':
                console.log('日期触发事件');
                config.timetype = event.target.value;
                drawchart(config);
                break;
            default:
                break;
        }
    });
    /**
     * 初始化icheck
     */
    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' // optional
    });
    var chartOne = echarts.init(document.getElementById('chart'));
    var chartOption = {
        title: {
            text: '数据集下载量/访问量 TOP10',
            bottom: 6,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            right: 20,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true,
                    optionToContent: function(opt) {
                        var axisData = opt.yAxis[0].data; //坐标数据
                        var series = opt.series; //折线图数据
                        var tdHeads = '<td  style="padding: 0 10px"></td>'; //表头
                        var tdBodys = ''; //数据
                        series.forEach(function(item) {
                            //组装表头
                            tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                        });
                        var table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center;user-select: text;-webkit-touch-callout: text; -webkit-user-select: text;-khtml-user-select: text;-moz-user-select: text;-ms-user-select: text;"><tbody><tr>${tdHeads} </tr>`;
                        for (var i = 0, l = axisData.length; i < l; i++) {
                            for (var j = 0; j < series.length; j++) {
                                //组装表数据
                                tdBodys += `<td>${ series[j].data[i]}</td>`;
                            }
                            table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                            tdBodys = '';
                        }
                        table += '</tbody></table>';
                        return table;
                    }
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: 60,
            bottom: 38,
            containLabel: true
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 次'
            },
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: []
        },
        series: []
    };

    drawchart(config);

    function drawchart(config) {
        chartOne.showLoading({
            text: '数据获取中',
            effect: 'whirling'
        });
        $.ajax({
            type: "POST",
            url: URL + "/ShareApi/selxx",
            data: config,
            success: function(data) {
                var echartData = JSON.parse(data);
                chartOption.legend.data = echartData.lastxx.legend;
                chartOption.yAxis.data = echartData.lastxx.y;
                var series = echartData.lastxx.series;
                $.map(series, function(item) {
                    item.type = 'bar';
                });
                chartOption.series = series;
                chartOne.hideLoading();
                chartOne.setOption(chartOption);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {}
        });
    }
});