// 引入封装好的插件
import request from '@/utils/request'

/**
 * 根据configCode查询系统配置参数
 * @param configCode 系统配置code
 */
export function queryMrConfigByConfigCode(configCode:string) {
    return request({
        url: '/api/mrConfig/queryMrConfigByConfigCode.htm',
        method: 'get',
        // get用params
        params: {configCode}
    })
}
