import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {ElMessage} from 'element-plus';
import {useUserProvide} from "@/context/user";

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
    code: string;
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
    return config;
}, err);

instance.interceptors.response.use((response: AxiosResponse) => {
    const code = Number(response.status);
    if (code === 200) {
        validateResposeData(response.data);
        return response.data;
    } else {
        ElMessage({
            message: '服务器连接异常！',
            type: 'error'
        });
    }
}, err);

const validateResposeData = (res: Respose) => {
    if (res.code !== '200') {
        ElMessage({
            message: res.msg,
            type: 'error'
        });
        if(res.code.startsWith("A022")&&location.href.indexOf("/login")<0){
            const {debouncedLoginOut} = useUserProvide();
            debouncedLoginOut(() => {
                location.href = "/#/login";
            })
        }

    }
}

export default instance;
