;
(function($) {
    $('#table').bootstrapTable({
        data: [{
            id: 1,
            name: 'Item 1',
            type: 'type1',
            price: '$1'
        }, {
            id: 2,
            name: 'asdfasdfasdfjklasdfkj;laskdfj;aslkdfja;slkfdjas;ldfkjas;dlkfjas;lkdfjas;dlfkjas;dfkjas;dkfjas;fjkas;d',
            type: 'type2',
            price: '$2'
        }, {
            id: 3,
            name: 'Item 3',
            type: 'type3',
            price: '$3'
        }]
    });


    $("[data-toggle='popover']").popover({
        html: true
    });
    $("[data-toggle='tooltip']").popover({
        trigger: 'hover',
        html: true
    });
})(jQuery);

var mytable = null;

$(':input[name="blankRadio"]').on('click', function() {
    var rows = 10;
    var columns = 10;
    // 根据选中的值 更换不同图片提示
    $('#prompt').attr('data-content', '<div class="prompt-content">' +
        '<div class="prompt-left">' +
        '<div class="prompt-title">填写规范</div>' +
        '<image src="../assets/img/sample-' + $(this).val() + '.png" width="500px"></image>' +
        '</div>' +
        '<div class="prompt-right">' +
        '<div class="prompt-title">效果展示</div>' +
        '<image src="../assets/img/' + $(this).val() + '.png" style="max-width: 500px;"></image>' +
        '</div>' +
        '</div>');
    if (mytable) {
        $('#edittable').html(' ');
    }
    if ($(this).val() === 'type2') {
        rows = 2;
    } else if ($(this).val() === 'type3') {
        rows = 3;
    }
    mytable = $('#edittable').editTable({
        maxRows: rows,
        maxColumn: columns,
        first_row: false,
    });
    $('#data').show();
});

function imageFormatter(value, row, index) {
    // console.log(row);
    return '<image src="../assets/img/icon-' + row.type + '.png" data-toggle="tooltip" data-placement="right" title="<image src=\'../assets/img/' + row.type + '.png\'></image>" width="30px"></image>';

}

function actionFormatter(value, row, index) {
    var btns = '<button class="btn btn-link" onclick="onConfigClick(' + index + ')">编辑</button>' +
        '<button class="btn btn-link" onclick="deleteClick(' + index + ')">删除</button>';
    return btns;
}

function rowStyle(row, index) {
    console.log(index);
}

function onConfigClick(index) {
    var type = 'add';
    if (typeof index !== 'undefined') {
        type = 'edit';
    }
    $('#config_modal_title').text(type === 'add' ? '添加' : '编辑');
    $('#config_modal').modal({
        show: true,
        keyboard: false
    });
    console.log(type);
}

// 配置窗体关闭时触发事件
$('#config_modal').on('hidden.bs.modal', function(e) {
    $('#myform')[0].reset();
});

function deleteClick(index) {
    console.log(index);

}

function onOpenPromptDialog() {
    $('#example').popover({
        show: true,
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })
}


function getType1X(index) {
    if (typeof index === 'undefined') {
        index = 0;
    }
    var data = mytable.getData();
    if (!data.length || data.length === 1) {
        return;
    }
    if (index >= data.length - 1) {
        index = data.length - 1;
    }
    return data[index].splice(1);
}

function getType2Y(index) {
    if (typeof index === 'undefined') {
        index = 0;
    }
    var data = mytable.getData();
    if (!data.length || data.length === 1) {
        return;
    }
    var nData = [];
    for (var i = 0; i < data.length; i++) {
        nData.push(data[i][index]);
    }
    return nData.splice(1);
}

function getType1Option() {
    var data = mytable.getData();
    var length = data.length;
    var x = getType1X();
    var y = getType1Y();
    var y1 = [].concat(y);
    y1.unshift(1);
    var nData = [];
    for (var i = 0; i < length; i++) {
        if (!i) {
            continue;
        }
        var obj = {
            name: y1[i],
            type: 'line',
            stack: '总量',
            areaStyle: {
                normal: {}
            },
            data: getX(i)
        };
        nData.push(obj);
    }
    var option = {
        charttype: '堆叠区域图',
        title: {
            text: '',
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
            data: y
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
            data: x
        }],
        yAxis: [{
            type: 'value'
        }],
        series: nData
    };
    return option;
}

function getType2Option() {
    var data = mytable.getData();
    var length = data[0].length;
    console.log(length);
    var nData = [];
    for (var i = 0; i < length; i++) {
        var obj = {
            value: data[1][i],
            name: data[0][i]
        };
        nData.push(obj);
    }
    var option = {
        charttype: '富文本标签',
        title: {
            text: '',
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
            data: data[0]
        },
        series: [{
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: nData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    return option;
}

function onSaveClick() {
    var type = $('input[name="blankRadio"]:checked').val();
    var option = null;
    switch (type) {
        case 'type1':
            option = getType1Option();
            break;
        case 'type2':
            option = getType2Option();
            break;
        case 'type3':
            option = getType3Option();
            break;
        case 'type4':
            option = getType4Option();
            break;
        case 'type5':
            option = getType5Option();
            break;
        case 'type6':
            option = getType6Option();
            break;
        case 'type7':
            option = getType7Option();
            break;
        case 'type8':
            option = getType8Option();
            break;
        case 'type9':
            option = getType9Option();
            break;
        case 'type10':
            option = getType10Option();
            break;
        case 'type11':
            option = getType11Option();
            break;
        default:
            break;
    }
    console.log(option);
}