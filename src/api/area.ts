// 引入封装好的插件
import request from '@/utils/request'

export function findAreaList(opt:object) {
    return request({
        url: '/api/mrArea/findAreaList.htm',
        method: 'get',
        params: opt
    })
}

