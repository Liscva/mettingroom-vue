// 引入封装好的插件
import request from '@/utils/request'

export function findAreaList(opt:object) {
    return request({
        url: '/api/mrArea/findAreaList.htm',
        method: 'get',
        params: opt
    })
}

export function increaseArea(opt: {
    areaName:string,
    areaExplication:string
}) {
    return request({
        url: '/api/mrArea/increaseArea.htm',
        method: 'post',
        data: opt
    })
}


