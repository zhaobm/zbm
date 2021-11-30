import CodeData from './XZQCodeData';

function XZQCodeJoin(Code,Field){
    var CodeEN = CodeData.XianJiCodeEN[Code];
    var name = CodeEN+Field;
    return name;
}

function XZQCodeSplit(){
    
}

export default{
    XZQCodeJoin,
    XZQCodeSplit
}