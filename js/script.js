$(document).ready(function() {

    //start of saving user state
window.charts=[] ; // windows .charts is to make it global to be accesable every where
    window.charts.push({
   name:"",
   symbol:"",
    position:{},
    size:{}
});
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
window.renderChart = function (chartObj){
        console.log(chartObj);
        var id = makeid();
    var html = $('<div class="wrapper" data-symbol="'+chartObj.symbol+'" style="top:'+chartObj.position.top+'px;left:'+chartObj.position.left+'px;height:'+chartObj.size.height+'px;width:'+chartObj.size.width+'px;" >\n' +
        '    <div class="popup-header" id="popup-header">\n' +
        '        <span class="popup-WrapperClose" >&times;</span>\n' +
        '        <span class="popup-WrapperMini"  >-</span>\n' +
        '    </div>\n' +
        '    <div class="tradingview-widget-container" style="height:'+chartObj.size.height+'px;width:'+chartObj.size.width+'px; " >\n' +
        '  <div id="'+id+'" style="height:'+chartObj.size.height+'px; width:'+chartObj.size.width+'px;"></div>\n' +
        '  <script type="text/javascript">\n' +
        '    window.td = new TradingView.widget(\n' +
        '      {\n' +
        '        "autosize": true,\n' +

        '        "symbol": "'+chartObj.symbol+'",\n' +
        '        "interval": "5",\n' +
        '        "timezone": "Etc/UTC",\n' +
        '        "theme": "dark",\n' +
        '        "style": "1",\n' +
        '        "locale": "fa_IR",\n' +
        '        "toolbar_bg": "#f1f3f6",\n' +
        '        "enable_publishing": false,\n' +
        '        "allow_symbol_change": true,\n' +
        '        "container_id": "'+id+'"\n' +
        '      }\n' +
        '    );\n' +
        '\n' +
        '  </script>\n' +
        '</div>\n' +
        '\n' +
        '</div>');
    // html.find('.wrapper').css("top","200px");
    $('body').append(html);
    html.draggable().resizable({

        handles: "n, e, s, w , ne, se, sw, nw" ,
        stop: function(e, ui) {
            console.log(window.td);
            window.charts = [];
            $('.wrapper').each(function(position,element){
                var chart = {};
                var el = $(element);
                chart.position = el.position();
                // chart.size = element.size();
                chart.size = {width:"100px",height:"100px"};
                chart.symbol = el.attr('data-symbol');
                window.charts.push(chart);
            });
            Cookies.set('charts', JSON.stringify(window.charts));
        }
    });
};
    var charts = Cookies.get('charts');

    if(charts){
        console.log(JSON.parse(charts));
        window.charts = JSON.parse(charts);
        window.charts.forEach(function(item){
            window.renderChart(item);

        })
    }
    else {
        window.charts.push({symbol: "KRAKEN:XRP", position: {top: "10px" , left:"0"} ,size:{height:"150px", width:"50px"}});
        window.charts.push({symbol: "COINBASE:BTCUSD", position: {top: "50px" , left:"50px"} ,size:{height:"150px", width:"50px"}});
        window.renderChart(window.charts[0]);
        window.renderChart(window.charts[1]);
        window.renderChart(window.charts[2]);
    }
//end of user state savivg


    // $("#wrapper").draggable().resizable({
    //     handles: "n, e, s, w" ,
    //     stop: function(e, ui) {
    //         console.log(window.td);
    //         Cookies.set('charts', JSON.stringify(charts));
    //     }
    // });
    // $("#second-wrapper").draggable().resizable({
    //     handles: "n, e, s, w",
    //     stop: function(e, ui) {
    //         console.log(Cookies.get("charts"))
    //         console.log(JSON.parse(Cookies.get("charts")))
    //         // window.td.create()
    //     }
    // });
    // $("#third-wrapper").draggable().resizable({
    //     handles: "n, e, s, w",
    //     stop: function(e, ui) {
    //         console.log(window.td3)
    //         // window.td.create()
    //     }
    // });

    $(".popup-WrapperClose").mousedown(function(){
        $("#wrapper").remove();
    });
        $(".popup-WrapperClose1").mousedown(function(){
            $("#second-wrapper").remove();
    });
    $(" .popup-WrapperClose2").mousedown(function(){
        $("#third-wrapper").remove();
    });

    $('.popup-WrapperMini').click( function() {
        $(".tradingview-widget-container").slideToggle();
        console.log('hiding...')

    });
    $('.popup-WrapperMini1').click( function() {
        $(".tradingview-widget-container1").slideToggle();
        console.log('hiding...')

    });
    $('.popup-WrapperMini2').click( function() {
        $(".tradingview-widget-container2").slideToggle();
        console.log('hiding...')

    });





});


$(function() {

    $('[data-popup-open]').on('click', function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });


    $('[data-popup-close]').on('click', function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
});



