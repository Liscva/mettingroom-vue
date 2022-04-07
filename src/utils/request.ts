import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {ElMessage} from 'element-plus';
import {getCache, removeAllCache} from "utils/cache";

/**
 * 存放所有的请求信息
 **/
let pendingRequest = new Map();

const getRequestKey = (config: AxiosRequestConfig) => {
  let {
    method,
    url,
    params,
    data
  } = config;
  // axios中取消请求及阻止重复请求的方法
  // 参数相同时阻止重复请求：
  // return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
  // 请求方法相同，参数不同时阻止重复请求
  return [method, url,params].join("&");
}

/**
 * 清除所有请求并返回登录页面
 * @param config
 */
const clearPendingRequest = (config: AxiosRequestConfig)=> {
  pendingRequest.forEach((value,key)=>{
    debugger
    value(key);
  })
  pendingRequest.clear();
}

const addPendingRequest = (config: AxiosRequestConfig)=> {
  // console.log(config.url)
  let requestKey = getRequestKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel);
    }
  });
}

/**
 * @description 取消重复请求 **/
const removePendingRequest = (config: AxiosRequestConfig) => {
  let requestKey = getRequestKey(config);
  if (pendingRequest.has(requestKey)) {
    // 如果是重复的请求，则执行对应的cancel函数
    let cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    // 将前一次重复的请求移除
    pendingRequest.delete(requestKey);
  }
}

const instance = axios.create({
    baseURL: '',
    timeout: 120 * 1000,
    withCredentials: true
});

interface Error {
    message: string;
    response: {
        status: number,
        data: any
    };
}

export interface Respose {
    msg: string,
    code: number;
    success: boolean,
    data: any
}

const err = (error: Error) => {
    if (error.message.includes('timeout')) {
        // console.log('error---->',error.config)
        ElMessage({
            message: '请求超时，请刷新网页重试',
            type: 'error'
        });
    }
    if (error.response) {
        const data = error.response.data;
        const token = '';
        if (error.response.status === 403) {
            ElMessage({
                message: 'Forbidden',
                type: 'error'
            });
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            ElMessage({
                message: 'Unauthorized',
                type: 'error'
            });
            if (token) {
                // store.dispatch('Logout').then(() => {
                //     setTimeout(() => {
                //         window.location.reload();
                //     }, 1500);
                // });
            }
        }
    }
    return Promise.reject(error);
};
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    if(!getCache(getCache("tokenName"))){
      clearPendingRequest(config);
    }else{
      // 检查是否存在重复请求，若存在则取消已发的请求
      removePendingRequest(config);
      // 把当前请求信息添加到pendingRequest对象中
      addPendingRequest(config);
    }
    return config;
}, err);

instance.interceptors.response.use((response: AxiosResponse) => {
    const code = Number(response.status);
    if (code === 200) {
        setTimeout(()=>validateResposeData(response.data), 500 )
        return response.data;
    } else {
        ElMessage({
            message: '服务器连接异常！',
            type: 'error'
        });
    }
}, err);

const validateResposeData = (res: Respose) => {
    if (res.code !== 200) {
        ElMessage({
            message: res.msg,
            type: 'error'
        });
        if(res.code>=400&&res.code<=403&&location.href.indexOf("/login")<0&&getCache("userInfo")){
          removeAllCache();
          location.href = "/#/login";
        }

    }
}

export default instance;
