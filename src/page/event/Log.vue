<template>
  <el-dialog
      v-model="reserveDialogVisible"
      title="会议室预约"
      width="520px"
      destroy-on-close
      center
  >
    <ReserveForm
        :onClose="onClose"
        :onSubmitSuccess="onSubmitSuccess"
        :startTimeP="startTimeP"
        :endTimeP="endTimeP"
    />
  </el-dialog>
  <el-scrollbar>
    <el-timeline v-if="timeLineList.length>0">
      <el-timeline-item :timestamp="item.headTime" placement="top" v-for="item in timeLineList">
        <el-card v-if="!item.free">
          <h4>{{ item.mrReserve.reserveTodo }}</h4>
          <p>{{ `${item.mrReserve.reserveUserName} 提交于 ${item.mrReserve.reserveTime}` }}</p>
        </el-card>
        <el-button type="primary" v-if="item.free&&item.tailTime" @click="()=>speedReserve(item.headTime,item.tailTime)">{{ `快捷预约${item.headTime}-${item.tailTime}` }}</el-button>
      </el-timeline-item>
      <el-timeline-item :timestamp="timeLineList[timeLineList.length-1].tailTime" placement="top">
      </el-timeline-item>
    </el-timeline>
    <el-empty :image-size="400" v-if="timeLineList.length==0" description="该日期预约暂未开放"></el-empty>
  </el-scrollbar>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, watch, ref, reactive} from 'vue'
import {useAreaInject, useReserveInject} from "@/context";
import {getReserveInfoByDayTime} from "@/api/reserve";
import ReserveForm from "@/components/ReserveForm/Index.vue";

interface IReserveInfo {
  reserveAreaId: number;
  reserveId: number;
  reserveTodo: string | null;
  reserveTime: string | null;
  reserveUser: number | null;
  reserveUserName: string | null;
}

interface ItimeLine {
  headTime: string;
  free: boolean;
  mrReserve: IReserveInfo;
  reserveId: number | null;
  tailTime: string | null;
}

export default defineComponent({
  name: 'Log',
  components:{ReserveForm},
  setup() {
    const reserveDialogVisible = ref<boolean>(false);
    const startTimeP=ref<string>('');
    const endTimeP=ref<string>('');
    const {reserveState} = useReserveInject();
    const {areaState} = useAreaInject();
    const timeLineList = ref<ItimeLine[]>([]);
    const requestReserveInfoByDayTime = () => {
      getReserveInfoByDayTime({day:reserveState.currUserReserveDay,areaId: areaState.currAreaId}).then((res) => {
        if (res.code === '200') {
          timeLineList.value = res.data;
        }
      })
    }

    onBeforeMount(() => {
      requestReserveInfoByDayTime();
    })
    watch(() => reserveState.currUserReserveDay, (val, old) => {
      if (val&&areaState.currAreaId) {
        requestReserveInfoByDayTime();
      }
    })
    watch(() => areaState.currAreaId, (val, old) => {
      if (val&&reserveState.currUserReserveDay) {
        requestReserveInfoByDayTime();
      }
    })
    const speedReserve = (startTime: string, endTime: string) => {
      startTimeP.value = startTime;
      endTimeP.value = endTime;
      reserveMetting();
    }

    const reserveMetting = () => {
      reserveDialogVisible.value = true;
    }
    const closeDialog = () => {
      reserveDialogVisible.value = false;
    }
    const onClose = () => {
      closeDialog();
    }
    const onSubmitSuccess = () => {
      requestReserveInfoByDayTime();
      closeDialog();
    }
    return {
      timeLineList,
      reserveDialogVisible,
      reserveMetting,
      onClose,
      onSubmitSuccess,
      speedReserve,
      startTimeP,
      endTimeP
    };
  }
})
</script>

<style scoped>

</style>
