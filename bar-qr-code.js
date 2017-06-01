/*
  参数注释：
    div_id        : 用来绑定某个div
    code_str      : 需要编辑成一维码的值，例如：12345670
    code_type     : 一维码的编码类型，包括：code39,code128
    bgcolor       : 一维码的背景颜色，一般为白色#FFFFFF
    color         : 一维码字体颜色，一般为黑色#000000
    strip_width   : 每一个小条形的宽度，一般为1
    bar_height    : 条形码的高度 一般为50
    渲染形式      : 由于IE这种存在，渲染形式强制为CSS
*/
function generateBarcode(div_id, code_str, code_type, bgcolor, color, strip_width, bar_height){
  
  var value = code_str;
  var btype = code_type;
  var renderer = "css";

  var settings = {
    output:renderer,
    bgColor: bgcolor,
    color: color,
    barWidth: strip_width,
    barHeight: bar_height
  };
  $('#' + div_id).barcode(code_str, btype, settings);
};

/*
  参数注释：
    div_id        : 用来绑定某个div
    code_str      : 需要编辑成二维码的值，例如：12345670
    bgcolor       : 背景色
    color         : 前景色
    strip_width   : 二维码宽度
    bar_height    : 二维码高度
*/
function generateQRcode(div_id, code_str, bgcolor, color, strip_width, bar_height){
  
  $('#' + div_id).qrcode(code_str, bgcolor, color, strip_width, bar_height);

}

(function( $ ){
  $.fn.qrcode = function(code_str, bgcolor, color, strip_width, bar_height) {
    
    options = { 
      text: code_str,
      background: bgcolor,
      foreground: color,
      width: strip_width,
      height: bar_height
    };
    
    // set default values
    // typeNumber < 1 for automatic calculation
    // correctLevel  : 纠错等级 L : 1, M : 0, Q : 3, H : 2， 默认是H。
    // typeNumber    : 计算模式 小于1的话自动计算，默认是-1
    // render        : 渲染形式，由于IE不给力，强制用"table"形式，不考虑IE8的话可以选用性能更优的"canvas"。

    options = $.extend( {}, {
      render    : "table",
      // width   : 256,
      // height    : 256,
      typeNumber  : -1,
      correctLevel  : QRErrorCorrectLevel.H
      // background      : "#ffffff",
      // foreground      : "#000000"
    }, options);

    var createCanvas  = function(){
      // create the qrcode itself
      var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
      qrcode.addData(options.text);
      qrcode.make();

      // create canvas element
      var canvas  = document.createElement('canvas');
      canvas.width  = options.width;
      canvas.height = options.height;
      var ctx   = canvas.getContext('2d');

      // compute tileW/tileH based on options.width/options.height
      var tileW = options.width  / qrcode.getModuleCount();
      var tileH = options.height / qrcode.getModuleCount();

      // draw in the canvas
      for( var row = 0; row < qrcode.getModuleCount(); row++ ){
        for( var col = 0; col < qrcode.getModuleCount(); col++ ){
          ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
          var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
          var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
          ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
        } 
      }
      // return just built canvas
      return canvas;
    }

    // from Jon-Carlos Rivera (https://github.com/imbcmdth)
    var createTable = function(){
      // create the qrcode itself
      var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
      qrcode.addData(options.text);
      qrcode.make();
      
      // create table element
      var $table  = $('<table></table>')
        .css("width", options.width+"px")
        .css("height", options.height+"px")
        .css("border", "0px")
        .css("border-collapse", "collapse")
        .css('background-color', options.background);
      
      // compute tileS percentage
      var tileW = options.width / qrcode.getModuleCount();
      var tileH = options.height / qrcode.getModuleCount();

      // draw in the table
      for(var row = 0; row < qrcode.getModuleCount(); row++ ){
        var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
        
        for(var col = 0; col < qrcode.getModuleCount(); col++ ){
          $('<td></td>')
            .css('width', tileW+"px")
            .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
            .appendTo($row);
        } 
      }
      // return just built canvas
      return $table;
    }
  

    return this.each(function(){
      var element = options.render == "canvas" ? createCanvas() : createTable();
      $(element).appendTo(this);
    });
  };
})( jQuery );