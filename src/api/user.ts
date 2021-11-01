// 引入封装好的插件
import request from '@/utils/request'

/**
 * 登录
 * {
 *     userAccount 用户名
 *     userPassword 用户登陆密码
 * }
 */
export function login(opt: {
    userAccount: string | number
    userPassword: string | number
}) {
    return request({
        url: '/api/mrUser/login.htm',
        method: 'post',
        data: opt
    })
}

/**
 * 查询用户集合
 * {
 *     userName 用户名，可模糊查询
 * }
 */
export function findUserList(opt: {
    userName: string | null
}) {
    return request({
        url: '/api/mrUser/findUserList.htm',
        method: 'get',
        params: opt
    })
}

/**
 * 重置用户密码
 * {
 *     userAccount 用户登陆名
 * }
 */
export function resetPassword(opt: {
    userAccount: string
}) {
    return request({
        url: '/api/mrUser/resetPassword.htm',
        method: 'post',
        data: opt
    })
}

/**
 * 重置用户密码
 * {
 *     userAccount 用户登陆名字符串
 * }
 */
export function deleteUser(opt: {
    userAccount: string
}) {
    return request({
        url: '/api/mrUser/deleteUser.htm',
        method: 'post',
        data: opt
    })
}


export function registerUser(opt: {
    mrUser: { userAccount: string | null, userPassword: string | null },
    mrUserInfo: { userName: string | null, userEmail: string | null, userPhone: string | null }
}) {
    return request({
        url: '/api/mrUser/registerUser.htm',
        method: 'post',
        data: opt
    })
}

export function editUser(opt: {
    userAccount: string ,
    userName: string | null,
    userEmail: string | null,
    userPhone: string | null
}) {
    return request({
        url: '/api/mrUser/editUser.htm',
        method: 'post',
        data: opt
    })
}



