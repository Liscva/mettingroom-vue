import {reactive, inject, provide, Ref,readonly } from 'vue';
import {getCache, removeAllCache, setCache} from "utils/cache";

export interface User {
    status: string | null,
    userInfo: UserInfo|null
}


export interface UserInfo {
    userCode: number|null,
    userName: string | null,
    userEmail: string | null,
    userPhone: number | null,
    createTime: string|null,
    securityInfo: SecurityInfo
}

export interface SecurityInfo {
  tokenName: string,
  tokenValue: string,
  loginId: string
}


export type UserContext = {
    userState: Ref<User>;
    setLoginUser: (userInfo: UserInfo) => void;
    loginOut:(callback:Function|null) =>void;
};

const symbol = Symbol();

export const useUserProvide = () => {

    const userState = reactive<User>({
        status: getCache("userInfo", true) ? "login" : "unlogin",
        userInfo: getCache("userInfo", true)
    });
    const setLoginUser = (userInfo: UserInfo) => {
        setCache("userInfo", JSON.stringify(userInfo));
        setCache("tokenName", userInfo.securityInfo.tokenName);
        setCache(userInfo.securityInfo.tokenName, userInfo.securityInfo.tokenValue);
        userState.userInfo = userInfo
        userState.status = 'login';
    }
    const loginOut = (callback:Function|null) => {
        removeAllCache();
        userState.userInfo = null;
        userState.status = 'unlogin';
        if(callback){
            callback();
        }
    }
    provide(symbol, {
        userState,
        setLoginUser,
        loginOut
    });
};

export const useUserInject = () => {
    const context = inject<UserContext>(symbol);

    if (!context) {
        throw new Error(`useUserInject must be used after useUserProvide`);
    }

    return readonly(context);
};

