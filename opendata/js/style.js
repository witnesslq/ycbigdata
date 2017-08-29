/**
 * Created by wicep-hd1 on 2017/8/21.
 */
$(function () {
    var dateData=new Date();
    var nowYear=dateData.getFullYear(),nowMonth=dateData.getMonth();
    function creatYear(yearBegin,yearEnd) {
        var yearHtml='';
        for(var i=yearBegin;i<yearEnd;i++){
            yearHtml+='<option value='+i+'>'+
                    i+'年'+
                    '</option>';
        }
        yearHtml+='<option selected = selected value='+yearEnd+'>'+
            yearEnd+'年'+
            '</option>';
        return yearHtml;
    }
    function creatMonth(year) {
        var monthHtml='';
        var month=new Date(year,0,0).getMonth();
        for(var i=1;i<=month+1;i++){
            monthHtml+='<option value='+i+'>'+
                i+'月'+
                '</option>';
        }
        return monthHtml;
    }
    function creatDay(year,month) {
        var dayHtml='';
        var day=new Date(year,month,0).getDate();
        for(var i=1;i<=day;i++){
            dayHtml+='<option value='+i+'>'+
                i+'日'+
                '</option>';
        }
        return dayHtml;
    }
    $('#year').append(creatYear(1920,nowYear));
    $('#month').append(creatMonth(2017));
    $('#day').append(creatDay(2017,1));
    $('#year').change(function () {
        nowYear= $('#year option:selected').val();
        $('#month').html(creatMonth(nowYear));
        $('#day').html(creatDay(nowYear,1));
    })
    $('#month').change(function () {
        nowMonth= $('#month option:selected').val();
        $('#day').html(creatDay(nowYear,nowMonth));
    })

    var mySwiperyytp = new Swiper('#yytp',{
//pagination: '.pagination',
        loop:true,
        grabCursor: false,
        paginationClickable: true,
        autoplay:5000,
        nextButton:'#yytp-right',
        prevButton:'#yytp-left'
    });

    var mydL=$('#myd span').length;
    $('#myd span').each(function (index) {
        $(this).click(function () {
            for(var i=0;i<index+1;i++){
                $('#myd span').eq(i).css({background:' url("images/myd-icon_03.png") no-repeat center'});
            }
            for(var i=index+1;i<mydL;i++){
                $('#myd span').eq(i).css({background:' url("images/myd-icon_05.png") no-repeat center'});
            }
        })
    })

})