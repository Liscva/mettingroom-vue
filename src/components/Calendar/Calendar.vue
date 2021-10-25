<template>
  <el-calendar v-model="calendarDate">
    <template #dateCell="{data}">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }} {{ reserveState.currUserReserveDayList.indexOf(data.day)>-1 ? '✔️' : '' }}
      </p>
    </template>
  </el-calendar>
</template>

<script lang="ts">
import {defineComponent, toRefs, computed, ref, onBeforeMount, watch, reactive} from 'vue';
import {useReserveInject, useUserInject} from "@/context";
import {getCurrUserReserveDayList} from "@/api/reserve";
import {getYearAndMonth, getYearAndMonthAndDay} from "utils/date";
import {UserInfo} from "@/context/user";

export default defineComponent({
  name: 'Calendar',
  setup: () => {
    const calendarDate = ref<Date>(new Date())
    const {setCurrUserReserveDayList, setCurrUserReserveMonth,setCurrUserReserveDay, reserveState} = useReserveInject();
    const {userState} = useUserInject();
    const requestCurrUserReserveDayList = (month: string) => {
      if(userState.userInfo){
        const userInfo:UserInfo = userState.userInfo;
        getCurrUserReserveDayList({
          month: month,
          userCode: userInfo.userCode
        }).then((res) => {
          if (res.code === '200') {
            setCurrUserReserveDayList(res.data);
          }
        })
      }
    }

    watch(calendarDate, (val, old) => {
      if(val){
        const month = getYearAndMonth(val);
        requestCurrUserReserveDayList(month);
        setCurrUserReserveMonth(month);
        setCurrUserReserveDay(getYearAndMonthAndDay(val));
      }
    })

    onBeforeMount(() => {
      const month = getYearAndMonth(new Date());
      setCurrUserReserveMonth(month);
      requestCurrUserReserveDayList(month);
    })
    return {
      reserveState,
      calendarDate,
      requestCurrUserReserveDayList
    }
  }
})
</script>

<style scoped>
.is-selected {
  color: #1989FA;
}
</style>
