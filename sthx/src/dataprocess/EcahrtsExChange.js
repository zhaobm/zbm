function normalBarExchange(name,data){
    var xAxisData = [];
    var yAxisData = [];
    for(var key in data){
        xAxisData.push(key);
        yAxisData.push(parseFloat(data[key]));
    }
    var Data ={xAxis:xAxisData,yAxis:yAxisData};
    return Data;
}
function normalLineExchange(name,data){
    var xAxisData = [];
    var yAxisData = [];
    var OriColor = [240,155,96];
    for(var key in data){
        xAxisData.push(key);
        yAxisData.push(parseFloat(data[key]));
    }
    var Data ={xAxis:xAxisData,yAxis:yAxisData,color:OriColor};
    return Data;
}

function normalPieExchange(name,data){
    var dataArr = [];
    for(var key in data){
        var innerData = {};
        innerData["value"] = parseFloat(data[key]);
        innerData["name"] = key;
        dataArr.push(innerData);
    }
    var Data = {};
    Data["dataArr"] = dataArr;
    return Data;
}


function weatherExchange(name,data){
    var weathers = [];
    for(var key in data){
        var innerData = {};
        innerData["name"] = key;
        innerData["value"] = data[key];
        innerData["unite"] = "";
        weathers.push(innerData);
    }
    return weathers;
}

export default{
    normalBarExchange,
    normalLineExchange,
    normalPieExchange,
    weatherExchange,
}