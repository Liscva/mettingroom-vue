import {reactive, inject, provide, Ref,readonly } from 'vue';
import {getCache, removeCache, setCache} from "utils/cache";
import {Debounced} from "utils/debounced";

export interface User {
    status: string | null,
    userInfo: UserInfo|null
}


export interface UserInfo {
    userCode: number|null,
    userName: string | null,
    userEmail: string | null,
    userPhone: number | null,
    createTime: string|null
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
        userState.userInfo = userInfo
        userState.status = 'login';
    }
    const loginOut = (callback:Function|null) => {
        removeCache("userInfo");
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
    const debouncedLoginOut: Function = new Debounced().use(loginOut, 500);
    return {debouncedLoginOut}
};

export const useUserInject = () => {
    const context = inject<UserContext>(symbol);

    if (!context) {
        throw new Error(`useUserInject must be used after useUserProvide`);
    }

    return readonly(context);
};

