;
(function($) {
    $('#table').bootstrapTable({
        data: [{
            id: 1,
            name: 'Item 1',
            price: '$1'
        }, {
            id: 2,
            name: 'Item 2',
            price: '$2'
        }, {
            id: 3,
            name: 'Item 3',
            price: '$3'
        }]
    });
})(jQuery);

function imageFormatter(value, row, index) {
    // console.log(row);
    return '';

}

function actionFormatter(value, row, index) {
    var a = '<button onclick="aaaa(' + index + ')">test</button>';
    return a;
}

function aaaa(index) {
    console.log(index);
}