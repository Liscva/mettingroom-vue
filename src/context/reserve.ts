import {reactive, inject, provide, Ref, readonly} from 'vue';
import {getYearAndMonth, getYearAndMonthAndDay} from "utils/date";

export interface ReserveState {
    currUserReserveDayList: string[],
    currUserReserveMonth: string,
    currUserReserveDay: string
}

export type AreaContext = {
    reserveState: Ref<ReserveState>;
    setCurrUserReserveDayList: (currUserReserveDayList: string[]) => void;
    setCurrUserReserveMonth: (currUserReserveMonth: string) => void;
    setCurrUserReserveDay: (currUserReserveDay: string) => void;
};

const symbol = Symbol();

export const useReserveProvide = () => {

    const reserveState = reactive<ReserveState>({
        currUserReserveDayList: [],
        currUserReserveMonth: getYearAndMonth(new Date()),
        currUserReserveDay: getYearAndMonthAndDay(new Date())
    });
    const setCurrUserReserveDayList = (currUserReserveDayList: string[]) => (reserveState.currUserReserveDayList = currUserReserveDayList);
    const setCurrUserReserveMonth = (currUserReserveMonth: string) => (reserveState.currUserReserveMonth = currUserReserveMonth);
    const setCurrUserReserveDay = (currUserReserveDay: string) => (reserveState.currUserReserveDay = currUserReserveDay);
    provide(symbol, {
        reserveState,
        setCurrUserReserveDayList,
        setCurrUserReserveMonth,
        setCurrUserReserveDay
    });
};

export const useReserveInject = () => {
    const context = inject<AreaContext>(symbol);

    if (!context) {
        throw new Error(`useBookListInject must be used after useBookListProvide`);
    }

    return readonly(context);
};

