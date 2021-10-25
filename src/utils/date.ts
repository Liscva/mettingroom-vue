const seperator = "-";

export const getYearAndMonth = (date: Date): string => {
    if(!date){
        throw new Error(`日期为空，无法转换日期格式`);
    }
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    let monthStr = String(month);
    if (month >= 1 && month <= 9) {
        monthStr = "0" + month;
    }
    return year + seperator + monthStr;
}

export const getYearAndMonthAndDay = (date: Date): string => {
    if(!date){
        throw new Error(`日期为空，无法转换日期格式`);
    }
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    let monthStr = String(month);
    if (month >= 1 && month <= 9) {
        monthStr = "0" + month;
    }
    const day:number = date.getDate();
    let dayStr = String(day);
    if (day >= 0 && day <= 9) {
        dayStr = "0" + day;
    }
    return year + seperator + monthStr + seperator + dayStr;
}