$(function () {
    /**
     * 给radio绑定事件
     */
    $("input[type='radio']").on('ifChecked', function (event) {
        //ifCreated 事件应该在插件初始化之前绑定 
        switch (event.target.getAttribute('groupindex')) {
            case '1':
                console.log('使用途径触发事件');
                break;
            case '2':
                console.log('使用方式触发事件');
                break;
            case '3':
                console.log('数据类别触发事件');
                break;
            case '4':
                toggleDisable(event.target.value);
                break;
            case '5':
                console.log('时间查看触发事件');
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
    var option = {
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
                    readOnly:true,
                    optionToContent:function(opt){
                        var axisData = opt.yAxis[0].data; //坐标数据
                        var series = opt.series; //折线图数据
                        var tdHeads = '<td  style="padding: 0 10px"></td>'; //表头
                        var tdBodys = ''; //数据
                        series.forEach(function (item) {
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
            data: ['下载量', '访问量']
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
            data: ['数据集01', '数据集02', '数据集03', '数据集04', '数据集05', '数据集06']
        },
        series: [{
                name: '下载量',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '访问量',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };

    chartOne.setOption(option);
    // $.ajax({
    //     type: "GET",
    //     url: "http://172.16.1.232:8088/echarts/get/1/0",
    //     data: {},
    //     success: function (data) {},
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //     }
    // });

});