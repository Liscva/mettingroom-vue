import {reactive, inject, provide, Ref, readonly} from 'vue';

export interface Area {
    currAreaId: string|null,
    currArea: AreaInfo|null
    areaList: AreaInfo[]
}
export interface AreaInfo{
    areaId: string;
    areaName: string;
    areaExplication:string|null;
}

export type AreaContext = {
    areaState: Ref<Area>;
    setCurrAreaId : (currAreaId: string|null) => void;
    setAreaList : (areaInfo: AreaInfo[]) => void;
};

const symbol = Symbol();

export const useAreaProvide = () => {
    // 全部图书
    const areaState = reactive<Area>({
        currAreaId: null,
        currArea: null,
        areaList: []
    });
    const setCurrAreaId = (currAreaId: string|null) => (areaState.currAreaId = currAreaId);
    const setAreaList = (areaList: AreaInfo[]) => ( areaState.areaList = areaList);
    provide(symbol, {
        areaState,
        setCurrAreaId,
        setAreaList
    });
};

export const useAreaInject = () => {
    const context = inject<AreaContext>(symbol);

    if (!context) {
        throw new Error(`useBookListInject must be used after useBookListProvide`);
    }

    return readonly(context);
};

