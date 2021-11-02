// 防抖(ts)
export class Debounced {
    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     * @param immediate 是否默认执行一次(第一次不延迟)
     */
    public use = (func: Function, delay: number, immediate: boolean = false): Function => {
        let timer: number | undefined
        return ( ...args: any) => {
            if (immediate) {
                func.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
                immediate = false
                return
            }
            clearTimeout(timer)
            // @ts-ignore
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}