

//柱状图转换函数
//堆叠
function exChangeLineDataDuiDie(jsonArr){
    
    var data = {};
    for(var key in jsonArr[0]){
        data[key] = [];
    }
    for(var i=0;i<jsonArr.length;i++){
        for(var key in jsonArr[i]){
            data[key].push(jsonArr[i][key]);
        }
    }
    console.log("转换完成",data);
    return data;

}
//非堆叠
function exChangeLineData(jsonArr){
    var data = {};
    var xAxisData = new Array();
    var yAxisData = new Array();
    for(var key in jsonArr){
        xAxisData.push(key);
        yAxisData.push(jsonArr[key]);
    }
    data["xAxis"] = xAxisData;
    data["yAxis"] = yAxisData;
    console.log("转换完成",data);
    return data;

}

export default{
    exChangeLineDataDuiDie,
    exChangeLineData
}