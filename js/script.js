$(document).ready(function() {

    $("#wrapper").draggable().resizable({
        handles: "n, e, s, w" ,
        stop: function(e, ui) {
            console.log(window.td)
            // window.td.create()
        }
    });
    $("#second-wrapper").draggable().resizable({
        handles: "n, e, s, w",
        stop: function(e, ui) {
            console.log(window.td2)
            // window.td.create()
        }
    });
    $("#third-wrapper").draggable().resizable({
        handles: "n, e, s, w",
        stop: function(e, ui) {
            console.log(window.td3)
            // window.td.create()
        }
    });

    $("#popup-WrapperClose").mousedown(function(){
        $("#wrapper").remove();
    });
        $("#popup-WrapperClose1").mousedown(function(){
            $("#second-wrapper").remove();
    });
    $("#popup-WrapperClose2").mousedown(function(){
        $("#third-wrapper").remove();
    });

    $('#popup-WrapperMini').click( function() {
        $(".tradingview-widget-container").slideToggle();
        console.log('hiding...')

    });
    $('#popup-WrapperMini1').click( function() {
        $(".tradingview-widget-container1").slideToggle();
        console.log('hiding...')

    });
    $('#popup-WrapperMini2').click( function() {
        $(".tradingview-widget-container2").slideToggle();
        console.log('hiding...')

    });





});

// function user_state() {
//     var positions = {}
//     $('[data-col_id]').each(function() {
//         positions[$(this).data('col_id')] = $(this).offset()
//     })
//     localStorage.setItem('col_positions', JSON.stringify(positions))
// }

