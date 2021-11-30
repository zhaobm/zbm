import * as api from "../assets/js/api/search.js";
import ExChangeData from "./EchartsDataExChange.js";
import ol from 'openlayers';
import XZQCode from "./XZQCode.js";


async function LoadCenterData(Params){
    let json = require('../assets/js/geojson/sxdsjbjpro1.json')

    var dsjfeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:3857',
        featureProjection : 'EPSG:3857'
    });
    
    

    var echartsData ;
    await api.getGongYeYuanCenterData(Params).then(res=>{
        
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
                var CenterData = resultData.data.GongYeYuanCenterData;
                var jsonArr = [];
                for(var key in CenterData){
                    var jsonObj = {};
                    //市级
                    var XZQCodeSJ = key+"00";
                    for(var i=0;i<dsjfeatures.length;i++){
                        if(XZQCodeSJ == dsjfeatures[i].get("BZ")){
                            jsonObj["xAxis"] = dsjfeatures[i].get("CITY");
                        }
                    }
                    //县级
                    for(var XianJiCode in XZQCode.XianJiCode){
                        if(key == XianJiCode){
                            jsonObj["xAxis"] = XZQCode.XianJiCode[XianJiCode];
                        }
                    }
                    jsonObj["YXData"] = CenterData[key][0][0].count;
                    jsonObj["TCData"] = CenterData[key][1][0].count;
                    jsonObj["GBData"] = CenterData[key][2][0].count;
                    jsonArr.push(jsonObj);
                }
                echartsData = ExChangeData.exChangeLineDataDuiDie(jsonArr);
            }
        }
    });
    return echartsData;
};

//注意，这些方法都是有返回值的。返回的都是echartsData。
//而这个echartsData则是调用了EchatsDataExChange.js中的方法，将数据弄成了表格规定的样式
//随后，诸如LoadLeftBottomData之类的方法，在index1.vue中被调用，其结果直接返回给了对应的表格组件，从而完成了表格数据的更新。
async function LoadLeftBottomData(Params){
    let json = require('../assets/js/geojson/sxdsjbjpro1.json')

    var dsjfeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:3857',
        featureProjection : 'EPSG:3857'
    });

    var echartsData ;
    await api.getGongYeYuanLeftBottomData(Params).then(res=>{
        
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
                
                var Data = resultData.data.GongYeYuanLeftBottomData.GYGLData;
                if(Data){
                    var jsonArr = [];
                    for(var i=0;i<Data.length;i++){
                        //console.log(Data[i]);
                        for(var key in Data[i]){
                            
                            var jsonObj = {};
                            //市级
                            var XZQCodeSJ = key+"00";
                            for(var j=0;j<dsjfeatures.length;j++){
                                if(XZQCodeSJ == dsjfeatures[j].get("BZ")){
                                    jsonObj["xAxis"] = dsjfeatures[j].get("CITY");
                                }
                            }
                            //县级B
                            for(var XianJiCode in XZQCode.XianJiCode){
                                if(key == XianJiCode){
                                    jsonObj["xAxis"] = XZQCode.XianJiCode[XianJiCode];
                                }
                            }

                            jsonObj["RMData"] = Data[i][key].RMData;
                            jsonObj["RYData"] = Data[i][key].RYData;
                            jsonObj["RQData"] = Data[i][key].RQData;
                            jsonObj["RSWZData"] = Data[i][key].RSWZData;
                            jsonObj["RQLJData"] = Data[i][key].RQLJData;
                            jsonObj["YRLYData"] = Data[i][key].YRLYData;
                            
                            jsonArr.push(jsonObj);
                        }
                    }
                    echartsData = ExChangeData.exChangeLineDataDuiDie(jsonArr); 
                }
                
            }

        }

    });
    return echartsData;
}


async function LoadRight1Data(Params){
    let json = require('../assets/js/geojson/sxdsjbjpro1.json')

    var dsjfeatures = (new ol.format.GeoJSON()).readFeatures(json,{
        dataProjection : 'EPSG:3857',
        featureProjection : 'EPSG:3857'
    });
    
    var echartsDataArr = {};
    await api.getGongYeYuanRight1Data(Params).then(res=>{
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
                var GYYR1Data = resultData.data.GongYeYuanLeftBottomData.GYYR1Data;
                
                for(var key in GYYR1Data){
                    var DataObj = {};
                    var XZQData = GYYR1Data[key][0];
                    for(var key1 in XZQData){
                        if(key1.toString() == "SUM(T.HXXYLPFL_HS)"){
                            DataObj["化学需氧量"] = (parseFloat(XZQData[key1])/10000).toFixed(2);
                        }
                        if(key1.toString() == "SUM(T.ADPFL_HS)"){
                            DataObj["氨氮"] = (parseFloat(XZQData[key1])/10000).toFixed(2);
                        }
                        if(key1.toString() == "SUM(T.ZDPFL_HS)"){
                            DataObj["总氮"] = (parseFloat(XZQData[key1])/10000).toFixed(2);
                        }
                        if(key1.toString() == "SUM(T.ZLPFL_HS)"){
                            DataObj["总磷"] = (parseFloat(XZQData[key1])/10000).toFixed(2);
                        }
                        
                    }
                    var XZQCodeSJ = key+"00";
                    var newKey = "";
                    for(var j=0;j<dsjfeatures.length;j++){
                        if(XZQCodeSJ == dsjfeatures[j].get("BZ")){
                            newKey = dsjfeatures[j].get("CITY");
                        }
                    }
                    var chartData = ExChangeData.exChangeLineData(DataObj); 
                    echartsDataArr[newKey] = chartData;
                }
            }
        }
    });
    return echartsDataArr;
}

async function UpdateGYYJSFile(Params,Type){
    var ParamsData = {
        data:Params,
        Type:Type,
    }
    await api.UpdateGYYData(ParamsData).then(res=>{
        var resultData = res.data;
        if(resultData){
            if(resultData.status == "success"){
                alert("更新成功");
            }
            else{
                alert("更新失败");
            }
        }
    });
}



export default{
    LoadCenterData,
    LoadLeftBottomData,
    LoadRight1Data,
    UpdateGYYJSFile,
}
