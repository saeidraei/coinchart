$(document).ready(function() {

    //start of saving user state
window.charts=[] ; // windows .charts is to make it global to be accesable every where
var x=window.matchMedia('only screen and (max-device-width: 700px)');


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
        var slideToggleId = makeid();
    var html = $('<div class="wrapper" data-symbol="'+chartObj.symbol+'" style="top:'+chartObj.position.top+'px;left:'+chartObj.position.left+'px;height:'+chartObj.size.height+'px;width:'+chartObj.size.width+'px;" >\n' +
        '    <div class="popup-header" id="popup-header">\n' +
        '        <span class="popup-WrapperClose" >&times;</span>\n' +
        '        <span class="popup-WrapperMini"  >-</span>\n' +
        '    </div>\n' +
        '    <div class="tradingview-widget-container"  id="'+slideToggleId+'" style="height:100%;width:100%;" >\n' +
        '  <div id="'+id+'"   style="height:100%;width:100%; "></div>\n' +
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
    window.saveState = function(){
        window.charts = [];
        $('.wrapper').each(function(position,element){
            // if(window.matchMedia('only screen and (max-device-width: 700px)').matches ){
            //     return;
            // }
            // else if (window.matchMedia('screen').matches){

                var chart = {};
                var el = $(element);
                chart.position = el.position();

                chart.size = {width: el.width(), height: el.height()};
                chart.symbol = el.attr('data-symbol');
                window.charts.push(chart);
            });
        Cookies.set('charts', JSON.stringify(window.charts));
    }
if(window.innerWidth >= 800) {

    html.draggable({

        stop: function (e, ui) {


            window.saveState();
        }
    }).resizable({

        handles: "all",
        stop: function (e, ui) {
            window.saveState();
        }
    });
}
    html.find('.popup-WrapperMini').click( function() {
        $("#"+slideToggleId).slideToggle();
        console.log('hiding...')
    });
    // html.find is used for selecting element in html jquery element
    html.find(".popup-WrapperClose").click(function(event){
        this.closest(".wrapper").remove();
    });
    //closest search for parents of popup-WrapperClose first wrapper which is finded in now available which we remove it down
};
    // var x=;

    var charts = Cookies.get('charts');
    if(charts){
        console.log(JSON.parse(charts));
        window.charts = JSON.parse(charts);
        window.charts.forEach(function(item){
            window.renderChart(item);

        })
    }

//     else if  (window.matchMedia('only screen and (max-device-width: 420px)').matches ){
//         window.charts.push({symbol: "COINBASE:ETHUSD", position: {top: 20, left: 30}, size: {height: 450, width: 300}});
//     window.charts.push({symbol: "COINBASE:BTCUSD", position: {top: 510, left: 30}, size: {height: 450, width: 300}});
//     window.charts.push({symbol: "COINBASE:BTCUSD", position: {top: 1000, left: 30}, size: {height: 450, width: 300}});
//     window.renderChart(window.charts[0]);
//     window.renderChart(window.charts[1]);
//     window.renderChart(window.charts[2]);
// }
    else if (window.matchMedia('screen').matches){
        window.charts.push({symbol: "COINBASE:ETHUSD", position: {top:140 , left:25} ,size:{height:420, width:350}});
        window.charts.push({symbol: "COINBASE:BTCUSD", position: {top:140 , left:400} ,size:{height:420, width:350}});
        window.charts.push({symbol: "BINANCE:EOSUSDT", position: {top:140 , left:770} ,size:{height:420, width:350}});
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

    //


    var myObject =({

        symbol:"",
        position:{top:50 , left:770},
        size:{height:450, width:350}
    });
    window.chooseCrypto = function() {
        var symbolname = document.getElementById("custom-select").value;
        if(symbolname.length>1) {
            myObject.symbol=symbolname;
            window.renderChart(myObject);
        }
    }
    window.refresh = function() {
        $("#refresh").click( function(e){
            e.preventDefault();
            Cookies.remove('charts');
            location.reload();
        });
    }



    // function myFunction(x) {
    //     { // If media query matches
    //         document.body.style.backgroundColor = "yellow";
    //     } else {
    //         document.body.style.backgroundColor = "pink";
    //     }
    // }






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



// setTimeout(function(){
//
//     if(window.innerWidth >= 800) {
//
//         html.draggable({
//
//             stop: function (e, ui) {
//
//
//                 window.saveState();
//             }
//         }).resizable({
//
//             handles: "all",
//             stop: function (e, ui) {
//                 window.saveState();
//             }
//         });
//     }
//
// }, 5000);