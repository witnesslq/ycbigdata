$(function () {
    var selectDataone = []; // 下拉选框1的数据
    var selectDatatwo = []; // 下拉选框2的数据
    /**
     * 下拉选框切换
     */
    function toggleDisable(val) {
        if (val == 0) {
            $widget1.multiselect('enable');
            $widget2.multiselect('uncheckAll');
            $widget2.multiselect('disable');
            selectDatatwo = [];
        } else {
            $widget2.multiselect('enable');
            $widget1.multiselect('uncheckAll');
            $widget1.multiselect('disable');
            selectDataone = [];
        }
    }
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
    /**
     * 初始化下拉选框1
     */
    var $widget1 = $("#select1").multiselect({
        checkAllText: "全选",
        uncheckAllText: "全不选",
        noneSelectedText: '请选择',
        selectedText: '# 个被选择',
        show: "bounce",
        hide: "explode",
        selectedText: function (numChecked, numTotal, checkedItems) {
            var checkValue = $.map(checkedItems, function (item) {
                return item.value;
            });
            selectDataone = checkValue;
            console.log(selectDataone);
            return numChecked + '个被选择';
        },
        click: function (event, ui) {},
        close: function (event) {
            console.log("下拉选框1关闭触发事件!");
        }
    });
    /**
     * 初始化下拉选框2
     */
    var $widget2 = $("#select2").multiselect({
        checkAllText: "全选",
        uncheckAllText: "全不选",
        noneSelectedText: '请选择',
        selectedText: '# 个被选择',
        show: "bounce",
        hide: "explode",
        selectedText: function (numChecked, numTotal, checkedItems) {
            var checkValue = $.map(checkedItems, function (item) {
                return item.value;
            });
            selectDatatwo = checkValue;
            console.log(selectDatatwo);
            return numChecked + '个被选择';
        },
        click: function (event, ui) {},
        close: function (event) {
            console.log("下拉选框2关闭触发事件!");
        }
    });
    /**
     * 初始化下拉选框2位disable
     */
    $widget2.multiselect('disable');
    /**
     * 初始化echarts
     */
    var chartOne = echarts.init(document.getElementById('chart'));
    var option = {
        title: {
            text: '访问量统计展示',
            bottom: 6,
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            right: 20,
            feature: {
                dataView: {
                    show: true,
                    readOnly:true,
                    optionToContent:function(opt){
                        var axisData = opt.xAxis[0].data; //坐标数据
                        var series = opt.series; //折线图数据
                        var tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
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
                magicType: {
                    show: true,
                    type: ['line','bar']
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
            data: ['健康保障', '社会保障', '公共服务']
        },
        xAxis: [{
            type: 'category',
            data: ['2017-1-1', '2017-1-2', '2017-1-3', '2017-1-4', '2017-1-5', '2017-1-6', '2017-1-7'],
            axisPointer: {
                type: 'shadow'
            }
        }],
        yAxis: [{
            type: 'value',
            name: '访问量',
            axisLabel: {
                formatter: '{value} 次'
            }
        }],
        series: [{
                name: '健康保障',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
            },
            {
                name: '社会保障',
                type: 'bar',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
            },
            {
                name: '公共服务',
                type: 'bar',
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
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