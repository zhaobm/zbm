//页面图表与数据变量名的映射关系
var SthjzFieldArr = {
     "sthjzs":"barSthjzsData",
     "tdxpzs":"barTdfgxpData",
     "swfdzs":"barSwfdzsData",
     "swmdzsleft":"SwmdzsLeftData",
     "swmdzsright":"SwmdzsRightData",
     "eizs":"lineEIZSData",
     "wrfhzs":"pieHjfhzsData",
     "zbfgzs":"barZbfgzsData",
     "tdly":"barTdlyxzData",
    // "eitj":"weathers",

};
//数据库字段与页面指标中文的映射关系
var stzkpjTableArr = {
     "sthjzs":{"swfdzs":"生物丰度","zbfgzs":"植被覆盖","swmdzs":"水网密度","tdxpzs":"土地胁迫","wrfhzs":"污染负荷"},
     "tdxpzs":{"tdxpz":"土地胁迫值","tdxpzs":"土地胁迫指数"},
     "swfdzs":{"sjzlz":"生境质量值","sjzlzs":"生境质量指数","swdyxzs":"生物多样性指数","swfdzs":"生物丰度指数"},
     "swmdzsleft":{"hlcd":"河流长度","hkmj":"水域面积","szyl":"水资源量",},
     "swmdzsright":{"hlzs":"河流指数","hkzs":"水域指数","szyzs":"水资源指数",},
     "sthjzlei":{},
     "ei":{"sthjzkzsei":"EI指数","pjjg":"EI分级(环境限制)"},
     "hjxzzs":{"hjxzzs":"环境限制指数"},
     "gdp":{"gdp":"GDP","gdpzb":"GDP全省占比",},
     "rktj":{"rk":"人口","rkzb":"占比",},
     "wrfhzs":{"codpfl":"COD","adpfl":"氨氮","eyhlpfl":"SO2","yfcpfl":"烟尘","dyhwpfl":"氮氧","gtfqwdql":"固废",},
     "zbfgzs":{"zbfgzs":"植被覆盖指数","ndvi":"NDVI指数"},
     "tdly":{"ldmj":"林地","gdmj":"耕地","cdmj":"草地","symj":"水域","jzydmj":"建设用地","wlytdmj":"未利用"},
     // "eitj":{"ei2016":"EI2016","ei2017":"EI2017","eibh":"△EI","pjjg2017":"评价结果","bhfj":"变化分级",},
};
var stzkmapTableArr = {
     "ei":{},
     "gdp":{},
     "rktj":{},
     "area":{},
};
var stzkbhTableArr = {
    // "tdly":{"ldmj":"林地","gdmj":"耕地","cdmj":"草地","symj":"水域","ncjmyd":"居民用地","wlytdmj":"未利用","wlydfqz":"未利用地分权重"},
    "tdly":{"ldmj":"林地","gdmj":"耕地","cdmj":"草地","symj":"水域","jzydmj":"建设用地","wlytdmj":"未利用"},
    "eizs":{"ei2016":"EI2016","ei2017":"EI2017",},
    "eitj":{"ei2016":"EI2016","ei2017":"EI2017","eibh":"△EI","pjjg2017":"评价结果","bhfj":"变化分级",},
    "zbfgzs":{"zbfgzs":"植被覆盖指数"},
    "tdxpzs":{"tdxpz":"土地胁迫值","tdxpzs":"土地胁迫指数"},
    "sthjzscz":{"swfdzs":"生物丰度","zbfgzs":"植被覆盖","swmdzs":"水网密度","tdxpzs":"土地胁迫","wrfhzs":"污染负荷",'sthjzkzsei':"生态环境状态指数EI"},
}


export default{
    stzkpjTableArr,
    SthjzFieldArr,
    stzkbhTableArr,
     stzkmapTableArr
}