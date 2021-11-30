import api from './index';
//生态状况评价数据  数据获取
export function getStzkpjData(params,adress){
    var proxyUrl = "/hjcczz/stzkpj/stzkpjData";
    return api.post(proxyUrl, params);

}

//数据结果更新
export function resultDataUpdate(params){
    var proxyUrl = "/hjcczz/update/resultDataUpdate";
    return api.post(proxyUrl, params);
}

//环境监测总站缓存
export function resultMapDataUpdate(params){
    var proxyUrl = "/hjcczz/update/resultMapDataUpdate";
    return api.post(proxyUrl, params);
}

export function getHjjczzDataCache(params){
    var proxyUrl = "/hjcczz/update/getHjjczzDataCache";
    console.log("proxyUrl",proxyUrl);
    return api.post(proxyUrl, params);
}

export function getHcJson(params){
    var proxyUrl = "/hjcczz/update/getHcJson";
    console.log("proxyUrl",proxyUrl);
    return api.post(proxyUrl, params);
}


export function getHjjczzMapDataCache(params){
    var proxyUrl = "/hjcczz/update/getHjjczzMapDataCache";
    console.log("proxyUrl",proxyUrl);
    return api.post(proxyUrl, params);
}

//到StzkbhController
export function getStzkbhData(params){
    var proxyUrl = "/hjcczz/stzkbh/stzkbhData";
    return api.post(proxyUrl, params);
}
export function stzkbhDataUpdate(params){
    var proxyUrl = "/hjcczz/stzkbhUpdate/resultDataUpdate";
    return api.post(proxyUrl, params);
}

export function getStzkbhDataCache(params){
    var proxyUrl = "/hjcczz/stzkbhUpdate/getHjjczzDataCache";
    return api.post(proxyUrl, params);
}

export function getExcelDataCache(params){
    var proxyUrl = "/hjcczz/util/ReadExcel";
    return api.post(proxyUrl, params);
}

export function getStzkbhGrid1DataCache(params){
    var proxyUrl = "/hjcczz/stzkbhUpdate/grid1DataUpdate";
    return api.post(proxyUrl, params);
}

export function getStzkpjDataCache(params){
    var proxyUrl = "/hjcczz/stzkpj/stzkQlLypjData";
    return api.post(proxyUrl, params);
}


//LEE-二期 读取后台数据（要写要改）
//获取某行政区数据
export function getXzqData(params){
    // var proxyUrl = "/hjcczz/xykhUpdate/getXzqData";
    var proxyUrl = "/hjcczz/xykhUpdate/getXzqData";
    return api.post(proxyUrl, params);
}
//获取某年份数据
export function getYearData(params){
    var proxyUrl = "/hjcczz/xykhUpdate/getYearData";
    return api.post(proxyUrl, params);
}
//获取某年份某行政区数据
export function getEIsoloData(params){
    var proxyUrl = "/hjcczz/xykhUpdate/getEIsoloData";
    return api.post(proxyUrl, params);
}
//获取县域考核某监测点位监测数据
export function getJcsjData(params){
    var proxyUrl = "/hjcczz/xykhUpdate/getJcsjData";
    return api.post(proxyUrl, params);
}


