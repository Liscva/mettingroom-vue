// 引入封装好的插件
import request from '@/utils/request'


export function reserveMettingRoom(opt:object) {
    return request({
        url: '/api/mrReserve/reserveMettingRoom.htm',
        method: 'post',
        data: opt
    })
}
export function getCurrUserReserveDayList(opt: {
    month: string,
    userCode: number,
    areaId:number
}) {
    return request({
        url: '/api/mrReserve/getCurrUserReserveDayList.htm',
        method: 'get',
        params: opt
    })
}


export function getReserveInfoByDayTime(opt: {
    day:string,
    areaId:number | null
}) {
    return request({
        url: '/api/mrReserveDayTime/getReserveInfoByDayTime.htm',
        method: 'get',
        params: opt
    })
}
