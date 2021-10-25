/**
 * 根据key获取localStorage里面的是数据
 * @param key key值
 * @param serialize 是否序列化
 */
export const getCache = (key: string, serialize?: boolean) => {
    const cache = localStorage.getItem(key) || null;
    if (cache && serialize) {
        return JSON.parse(cache);
    }
    return cache;
}

/**
 * 设置缓存
 * @param key  键
 * @param value 值
 */
export const setCache = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

/**
 * 清除缓存
 * @param key  键
 * @param value 值
 */
export const removeCache = (key: string) => {
    localStorage.removeItem(key);
}
