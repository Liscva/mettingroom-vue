// 引入封装好的插件
import request from '@/utils/request'

export function login(opt:object) {
    return request({
        url: '/api/mrUser/login.htm',
        method: 'post',
        data: opt
    })
}

export function findUserList(opt:object) {
    return request({
        url: '/api/mrUser/findUserList.htm',
        method: 'get',
        params: opt
    })
}

export function resetPassword(opt:object) {
    return request({
        url: '/api/mrUser/resetPassword.htm',
        method: 'post',
        data: opt
    })
}


export function registerUser(opt:object) {
    return request({
        url: '/api/mrUser/registerUser.htm',
        method: 'post',
        data: opt
    })
}


