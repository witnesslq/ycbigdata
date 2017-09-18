$(function() {
    var URL = 'http://a.yinchuanopendata.com/index.php';
    var selected = ['26', '27', '28']; // 下拉选框默认选中项
    var config = {
        timetype: "1", // 1.周2.月3.年
        is_open_share: "1", // 使用途径1.开发2.共享
        yyfs: "2", // 1.下载量2.访问量
        sjtype: "1", // 1.目录2.接口
        lylist: selected.join(',') // 默认选中项
    };
    var selectData = []; // 下拉选框的数据
    var flag = true;
    /**
     * 下拉选框切换
     */
    function toggleDisable(val) {
        if (val == 0) {
            $widget1.multiselect('enable');
            $widget2.multiselect('uncheckAll');
            $widget2.multiselect('disable');
            selectData = [];
        } else {
            $widget2.multiselect('enable');
            $widget1.multiselect('uncheckAll');
            $widget1.multiselect('disable');
            selectData = [];
        }
    }

    function disabledTyperadio(val) {
        // 使用方式触发事件
        if (val == 1) {
            // $('#radio-5').attr('disabled', false);
            // $('#radio-6').attr('disabled', false);
            $('#radio-5').iCheck('enable');
            $('#radio-6').iCheck('enable');
        } else {
            // $('#radio-5').attr('disabled', false);
            // $('#radio-6').attr('disabled', true);
            $('#radio-5').iCheck('check');
            $('#radio-6').iCheck('disable');

        }
    }
    /**
     * 给radio绑定事件
     */
    $("input[type='radio']").on('ifChecked', function(event) {
        //ifCreated 事件应该在插件初始化之前绑定 
        switch (event.target.getAttribute('groupindex')) {
            case '1':
                // console.log('使用途径触发事件', event.target.value);
                config.is_open_share = event.target.value;
                drawecharts(config);
                break;
            case '2':
                // console.log('使用方式触发事件');
                disabledTyperadio(event.target.value);
                config.yyfs = event.target.value;
                drawecharts(config);
                break;
            case '3':
                // console.log('数据类别触发事件');
                config.sjtype = event.target.value;
                drawecharts(config);
                break;
            case '4':
                toggleDisable(event.target.value);
                break;
            case '5':
                // console.log('时间查看触发事件', event.target.value);
                config.timetype = event.target.value;
                drawecharts(config);
                break;
            default:
                break;
        }
        // console.log(config);
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
        header: "你最多可以选择4个选项!",
        checkAllText: "全选",
        uncheckAllText: "全不选",
        noneSelectedText: '请选择',
        selectedText: '# 个被选择',
        show: ["bounce", 200],
        hide: "explode",
        selectedText: function(numChecked, numTotal, checkedItems) {
            var checkValue = $.map(checkedItems, function(item) {
                return item.value;
            });
            return numChecked + '个被选择';
        },
        click: function(event, ui) {
            if ($(this).multiselect("widget").find("input:checked").length > 4) {
                alert("你最多可以选择4个选项!");
                return false;
            }
            selectData = $.map($(this).multiselect("widget").find("input:checked"), function(item) {
                return item.value;
            });
        },
        close: function(event) {
            if (selectData.length > 0) {
                config.lylist = selectData.join(',');
                drawecharts(config);
            } else {
                config.lylist = '';
            }
        }
    });
    /**
     * 初始化下拉选框2
     */
    var $widget2 = $("#select2").multiselect({
        header: "你最多可以选择4个选项!",
        checkAllText: "全选",
        uncheckAllText: "全不选",
        noneSelectedText: '请选择',
        selectedText: '# 个被选择',
        show: ["bounce", 200],
        hide: "explode",
        selectedText: function(numChecked, numTotal, checkedItems) {
            var checkValue = $.map(checkedItems, function(item) {
                return item.value;
            });
            return numChecked + '个被选择';
        },
        click: function(event, ui) {
            if ($(this).multiselect("widget").find("input:checked").length > 4) {
                alert("你最多可以选择4个选项!");
                return false;
            }
            selectData = $.map($(this).multiselect("widget").find("input:checked"), function(item) {
                return item.value;
            });
        },
        close: function(event) {
            if (selectData.length > 0) {
                config.lylist = selectData.join(',');
                drawecharts(config);
            } else {
                config.lylist = '';
            }
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
    var chartOption = {
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
                    readOnly: true,
                    optionToContent: function(opt) {
                        var axisData = opt.xAxis[0].data; //坐标数据
                        var series = opt.series; //折线图数据
                        var tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
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
                magicType: {
                    show: true,
                    type: ['line', 'bar']
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
        xAxis: [{
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }],
        yAxis: [{
            type: 'value',
            name: '',
            // axisLabel: {
            //     formatter: '{value} 次'
            // }
        }],
        series: []
    };

    drawecharts(config);
    // 获取领域下拉选框数据
    $.ajax({
        type: "POST",
        url: URL + "/ShareApi/typelist",
        data: {
            types: 1
        },
        success: function(data) {
            var field = JSON.parse(data);
            $.map(field.alltype, function(item, index) {
                if (item.id == selected[0] || item.id == selected[1] || item.id == selected[2]) {
                    $('#select1').append("<option selected='selected' value='" + item.id + "'>" + item.typename + "</option>");
                } else {
                    $('#select1').append("<option value='" + item.id + "'>" + item.typename + "</option>");
                }
            });
            $("#select1").multiselect('refresh');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {}
    });
    // 获取部门下拉选框数据 
    $.ajax({
        type: "POST",
        url: URL + "/ShareApi/typelist",
        data: {
            types: 2
        },
        success: function(data) {
            var department = JSON.parse(data);
            $.map(department.alltype, function(item, index) {
                $('#select2').append("<option value='" + item.id + "'>" + item.typename + "</option>");
            });
            $("#select2").multiselect('refresh');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {}
    });
    // 获取柱状图的数据
    // timetype: 1, // 1.周2.月3.年
    // is_open_share: 1, // 使用途径1.开发2.共享
    // yyfs: 1, // 1.下载量2.访问量
    // sjtype: 1, // 1.目录2.接口
    // lylist: "1，2，4"
    function drawecharts(config) {
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
                chartOption.xAxis[0].data = echartData.lastxx.x;
                chartOption.yAxis[0].name = echartData.lastxx.y[0].name + '(单位：次)';
                var series = echartData.lastxx.series;
                $.map(series, function(item) {
                    item.type = 'bar';
                });
                chartOption.series = series;
                chartOne.hideLoading();
                chartOne.setOption(chartOption);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                chartOne.hideLoading();
            }
        });
    }

});