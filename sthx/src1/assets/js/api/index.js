//引入axios
import axios from 'axios'
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;


// 请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 添加响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求'
                break;
            case 401:
                err.message = '未授权，请重新登录'
                break;
            case 403:
                err.message = '拒绝访问'
                break;
            case 404:
                err.message = '请求错误,未找到该资源'
                break;
            case 405:
                err.message = '请求方法未允许'
                break;
            case 408:
                err.message = '请求超时'
                break;
            case 500:
                err.message = '服务器端出错'
                break;
            case 501:
                err.message = '网络未实现'
                break;
            case 502:
                err.message = '网络错误'
                break;
            case 503:
                err.message = '服务不可用'
                break;
            case 504:
                err.message = '网络超时'
                break;
            case 505:
                err.message = 'http版本不支持该请求'
                break;
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else {
        err.message = "连接到服务器失败"
    }
    return Promise.resolve(err.response)
})

axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
}

//设置默认请求头
var instanceJson = axios.create({
    baseURL: 'http://localhost:8013',
    //baseURL: 'http://localhost:8058',
    //baseURL: 'http://127.0.0.1:18902',
});

//创建axios实例，进行网络请求
export default {
    get(url, param) {
        return new Promise((resolve, reject) => {
            instanceJson({
                method: 'get',
                url,
                data:param,
            }).then(res => {
                resolve(res)
            })
        })
    },

    post(url, param) {
        return new Promise((resolve, reject) => {
            /*默认请求头*/
            instanceJson({
                method: 'post',
                url,
                data: param,
            }).then(res => {
                resolve(res)
            })
        })
    },

    get2(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                data: param
            }).then(res => {
                resolve(res)
            })
        })
    }
}

