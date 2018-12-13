$(document).ready(function() {
    date = new Date();
    
    var arrStrings = {
        '0':'周日被我射熄火了，所以今天是周一',
        '1':'你走了真好，不然总担心你会留下来吃饭',
        '2':'你看到我的小熊了吗？',
        '3':'来听我唱段情歌一曲歌词太经典 我的震音假音早已太熟练 然而情歌总唱不厌',
        '4':'喜欢我别遮脸任由途人发现 尽管唱用心把这情绪歌中染',
        '5':'来唱情歌由从头再一遍 如情浓有点泪流难避免',
        '6':'音阶起跌拍子改变 每首歌是每张脸',
        '7':'长恨人心不如水 等闲平地起波澜',
        '8':'宁知楚客思公子，北望长吟澧有兰。',
        '9':'你到底在什么样的地方 你是不是我想象的模样',
        '10':'再多焖炖 都要新鲜绽放',
        '11':'任由平淡也不要再多的愁肠',
        '12':'粗茶淡饭也都会很香',
        '13':'我执祈愿 我的爱情 像做菜一样',
        '14':'什么时候再加进真心的煎熬 才能甘甜久长 有没有配方',
        '15':'请告诉我 如果爱情 像道菜一样 盼须多少 念该放几两',
        '16':'守住寂寞 油盐酱醋 各有主张 这都成 我所有信仰',
        '17':'你说的 满堂盛宴不如我面强 日子不用浮夸卖相',
        '18':'遇到你就有了家',
        '19':'知道吗 我想要大大的厨房',
        '20':'人生太苦给你颗糖',
        '21':'maxiaobo.top',
        /*'22':'',
        '23':'',
        '24':'',
        '25':'',
        '26':'',
        '27':'',
        '28':'',
        '29':'',
        '30':'',
        '31':'',
        '32':'',
        '33':'',
        '34':'',
        '35':'',
        '36':'',
        '37':'',
        '38':'',
        '39':'',
        '40':'',
        '41':'',
        '42':'',*/
    }
    var res = getRan();
    //console.log(res+":"+arrStrings['08']); 
    //$('#content').text(arrStrings[res]);
    
    var str= arrStrings[res]
    //文字编码转换
    str = utf16to8(str)

    generateQRcode("content", str, "#FFFFFF", "#000000", "256", "256");
});
function getRan(){
    tail = parseInt(date.getTime().toString().substring(10, 12));

    if(tail < 21){
        return (tail - 0);
    }
    if(20 < tail &&  tail < 40){
        return (tail - 20);
    }
    if(40 < tail &&  tail < 61){
        return (tail - 40);
    }
    if(60 < tail &&  tail < 81){
        return (tail - 60);
    }
    if(80 < tail ){
        return (tail - 80);
    }
}
/* 
* 将文字编码由utf-16转为utf-8
*/
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
