# QRcode-js
js generate QRcode
## 生成一维码
1.body标签里面在适当的位置设置一个div来容纳即将生成的一维码。 例如：
`<div id="barcode"></div>`
2.在脚本里面调用函数generateBarcode()
`generateBarcode( div_id, code_str, code_type, bgcolor, color, strip_width, bar_height);`
### 参数说明

- div_id: 用来绑定某个div
- code_str: 需要编辑成一维码的值，例如：12345670
- code_type: 一维码的编码类型，包括：code39,code128
- bgcolor: 一维码的背景颜色，一般为白色#FFFFFF
- color: 一维码字体颜色，一般为黑色#000000
- strip_width: 每一个小条形的宽度，一般为1
- bar_height: 条形码的高度 一般为50

例如：`generateBarcode("barcode", "12345678", "code39", "#FFFFFF", "#000000", "1", "50");`

## 生成二维码
1.body标签里面在适当的位置设置一个div 来容纳即将生成的二维码。 例如：
`<div id="QRcode"></div>`
2.在脚本里面调用函数`generateQRcode()`

`generateQRcode(div_id, code_str, bgcolor, color, strip_width, bar_height);`

### 参数说明

- div_id: 用来绑定某个div
- code_str: 需要编辑成二维码的值，例如：12345670
- bgcolor: 背景色
- color: 前景色
- strip_width: 二维码宽度
- bar_height: 二维码高度

例如：`generateQRcode("", "maxiaobo.top", "#FFFFFF", "#000000", "256", "256");`
