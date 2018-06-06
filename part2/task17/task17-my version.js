/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: 'day'
}

var formgratime = document.getElementById("form-gra-time");
var cityselect = document.getElementById("city-select");
var aqichartwrap = document.getElementsByClassName("aqi-chart-wrap")[0];

/**
 * 渲染图表
 */
function renderChart() {
  var color = '';
  var text = '';
  for(var items in chartData){
    color = '#' + Math.floor(Math.random()*0xFFFFFF).toString(16);
    // var text += '<div style="background:'+ color + '";height:"'+ chartData[items] + 'px;"></div>';
    text += '<div title="'+items+":"+chartData[items]+'" style="height:'+chartData[items]+'px; background-color:'+color+'"></div>';
  }
  // text = '<div title="2016-01-01:69" style="height:69px; background-color:#7a6b72"></div><div title="2016-01-02:11" style="height:11px; background-color:#70ce21"></div><div title="2016-01-03:304" style="height:304px; background-color:#2ce3dd"></div><div title="2016-01-04:272" style="height:272px; background-color:#515e14"></div><div title="2016-01-05:73" style="height:73px; background-color:#1c942d"></div><div title="2016-01-06:308" style="height:308px; background-color:#b07628"></div><div title="2016-01-07:229" style="height:229px; background-color:#131246"></div><div title="2016-01-08:317" style="height:317px; background-color:#c411dc"></div><div title="2016-01-09:22" style="height:22px; background-color:#74e3d8"></div><div title="2016-01-10:79" style="height:79px; background-color:#7765da"></div><div title="2016-01-11:206" style="height:206px; background-color:#f3a05a"></div><div title="2016-01-12:376" style="height:376px; background-color:#ce3946"></div><div title="2016-01-13:454" style="height:454px; background-color:#18dfd7"></div><div title="2016-01-14:185" style="height:185px; background-color:#fe0d04"></div><div title="2016-01-15:320" style="height:320px; background-color:#64d660"></div><div title="2016-01-16:3" style="height:3px; background-color:#ece386"></div><div title="2016-01-17:57" style="height:57px; background-color:#9eb8c7"></div><div title="2016-01-18:117" style="height:117px; background-color:#33ad92"></div><div title="2016-01-19:462" style="height:462px; background-color:#a9a047"></div><div title="2016-01-20:286" style="height:286px; background-color:#b32c69"></div><div title="2016-01-21:479" style="height:479px; background-color:#733ec4"></div><div title="2016-01-22:71" style="height:71px; background-color:#668a39"></div><div title="2016-01-23:311" style="height:311px; background-color:#e0073a"></div><div title="2016-01-24:276" style="height:276px; background-color:#29d2d3"></div><div title="2016-01-25:272" style="height:272px; background-color:#6a1bfd"></div><div title="2016-01-26:112" style="height:112px; background-color:#bcb152"></div><div title="2016-01-27:192" style="height:192px; background-color:#75d1b2"></div><div title="2016-01-28:109" style="height:109px; background-color:#e922ca"></div><div title="2016-01-29:73" style="height:73px; background-color:#67cded"></div><div title="2016-01-30:362" style="height:362px; background-color:#a5d6de"></div><div title="2016-01-31:255" style="height:255px; background-color:#57c433"></div><div title="2016-02-01:460" style="height:460px; background-color:#3c5e0a"></div><div title="2016-02-02:132" style="height:132px; background-color:#a9da9a"></div><div title="2016-02-03:266" style="height:266px; background-color:#15feae"></div><div title="2016-02-04:225" style="height:225px; background-color:#9008f"></div><div title="2016-02-05:310" style="height:310px; background-color:#533ea1"></div><div title="2016-02-06:137" style="height:137px; background-color:#4ca39"></div><div title="2016-02-07:412" style="height:412px; background-color:#315a7"></div><div title="2016-02-08:404" style="height:404px; background-color:#6b19c2"></div><div title="2016-02-09:208" style="height:208px; background-color:#990bbb"></div><div title="2016-02-10:50" style="height:50px; background-color:#6a24e"></div><div title="2016-02-11:69" style="height:69px; background-color:#11ae16"></div><div title="2016-02-12:6" style="height:6px; background-color:#bf169f"></div><div title="2016-02-13:239" style="height:239px; background-color:#b7db5f"></div><div title="2016-02-14:102" style="height:102px; background-color:#d7464e"></div><div title="2016-02-15:360" style="height:360px; background-color:#2ffbf5"></div><div title="2016-02-16:320" style="height:320px; background-color:#e01124"></div><div title="2016-02-17:175" style="height:175px; background-color:#8be7cd"></div><div title="2016-02-18:466" style="height:466px; background-color:#9107da"></div><div title="2016-02-19:65" style="height:65px; background-color:#c5ad95"></div><div title="2016-02-20:87" style="height:87px; background-color:#1141df"></div><div title="2016-02-21:190" style="height:190px; background-color:#6b31f5"></div><div title="2016-02-22:91" style="height:91px; background-color:#2c1c8f"></div><div title="2016-02-23:367" style="height:367px; background-color:#8aaa54"></div><div title="2016-02-24:169" style="height:169px; background-color:#f40cad"></div><div title="2016-02-25:160" style="height:160px; background-color:#6515cf"></div><div title="2016-02-26:350" style="height:350px; background-color:#b232c3"></div><div title="2016-02-27:280" style="height:280px; background-color:#4032cd"></div><div title="2016-02-28:207" style="height:207px; background-color:#5077cd"></div><div title="2016-02-29:12" style="height:12px; background-color:#3b9670"></div><div title="2016-03-01:398" style="height:398px; background-color:#44e6a9"></div><div title="2016-03-02:177" style="height:177px; background-color:#b36cb0"></div><div title="2016-03-03:358" style="height:358px; background-color:#d40807"></div><div title="2016-03-04:432" style="height:432px; background-color:#baf482"></div><div title="2016-03-05:172" style="height:172px; background-color:#5ce4d6"></div><div title="2016-03-06:74" style="height:74px; background-color:#1aaa78"></div><div title="2016-03-07:188" style="height:188px; background-color:#a6a30b"></div><div title="2016-03-08:175" style="height:175px; background-color:#bb8cc5"></div><div title="2016-03-09:224" style="height:224px; background-color:#a58449"></div><div title="2016-03-10:440" style="height:440px; background-color:#8488e8"></div><div title="2016-03-11:128" style="height:128px; background-color:#4e1dda"></div><div title="2016-03-12:483" style="height:483px; background-color:#f79791"></div><div title="2016-03-13:34" style="height:34px; background-color:#f6907a"></div><div title="2016-03-14:315" style="height:315px; background-color:#19ec51"></div><div title="2016-03-15:454" style="height:454px; background-color:#6e6c40"></div><div title="2016-03-16:16" style="height:16px; background-color:#6bb6d5"></div><div title="2016-03-17:14" style="height:14px; background-color:#f0f4e4"></div><div title="2016-03-18:331" style="height:331px; background-color:#c76552"></div><div title="2016-03-19:133" style="height:133px; background-color:#f00e8b"></div><div title="2016-03-20:154" style="height:154px; background-color:#c6fd3a"></div><div title="2016-03-21:212" style="height:212px; background-color:#8ce8dd"></div><div title="2016-03-22:251" style="height:251px; background-color:#9569be"></div><div title="2016-03-23:186" style="height:186px; background-color:#4c81ed"></div><div title="2016-03-24:204" style="height:204px; background-color:#3bc3e8"></div><div title="2016-03-25:241" style="height:241px; background-color:#346b2e"></div><div title="2016-03-26:355" style="height:355px; background-color:#8638ff"></div><div title="2016-03-27:39" style="height:39px; background-color:#2d8743"></div><div title="2016-03-28:260" style="height:260px; background-color:#e0542"></div><div title="2016-03-29:475" style="height:475px; background-color:#4e0b30"></div><div title="2016-03-30:386" style="height:386px; background-color:#28955"></div><div title="2016-03-31:488" style="height:488px; background-color:#6bc1e6"></div>'
  aqichartwrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (this.value == pageState.nowGraTime){
      return;
  }
  else{
    pageState.nowGraTime = this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (this.value == pageState.nowSelectCity){
      return;
  }
  else{
    pageState.nowSelectCity = this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var pageradio = formgratime.getElementsByTagName("input");
  for (var i = 0;i < pageradio.length;i++){  
    pageradio[i].addEventListener("click",graTimeChange,false)
  }                                                                                                                                                                                                                                                                                                                                                                        
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var text = "";
  cityselect.innerHTML = "";
  for (var city in aqiSourceData){
    text += "<option>"+ city + "</option>";
  }
  cityselect.innerHTML = text;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  cityselect.addEventListener("change",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowcitydata = aqiSourceData[pageState.nowSelectCity]; 
  if(pageState.nowGraTime == 'day'){
    chartData = nowcitydata;
  }

  if(pageState.nowGraTime == "week"){
    chartData = {};
    var count = 0;
    var daycount = 0;
    var weekcount = 0;
    for (var items in nowcitydata){
      count += nowcitydata[items];
      daycount ++;
      if((new Date(items)).getDay() == 6){
        weekcount ++;
        var week_average = Math.floor(count / daycount);
        chartData['第'+ weekcount +'周'] = week_average;
        count = 0;
        daycount = 0;
      }
    }
    if (daycount != 0){
      weekcount++;
      week_average = Math.floor(count / daycount);
      chartData['第'+ weekcount +'周'] = week_average;
    }
  }

  if(pageState.nowGraTime == "month"){
    chartData = {};
    var month = 0;
    var count = 0;
    var daycount = 0;
    var monthcount = 0;
    for (var items in nowcitydata){
      count += nowcitydata[items];
      daycount ++;
      if((new Date(items)).getMonth() !== monthcount){
        monthcount ++;
        var month_average = Math.floor(count / daycount);
        chartData['第'+ monthcount +'月'] = month_average;
        count = 0;
        daycount = 0;
      }
    }
    if (monthcount != 0){
      monthcount++;
      month_average = Math.floor(count / daycount);
      chartData['第'+ monthcount +'月'] = month_average;
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}


init();
