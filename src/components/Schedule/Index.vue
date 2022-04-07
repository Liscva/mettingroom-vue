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
    />
  </el-dialog>
  <el-button type="primary" @click="reserveMetting">预约</el-button>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'
import ReserveForm from "@/components/ReserveForm/Index.vue";
import {useAreaInject, useReserveInject, useUserInject} from "@/context";
import {getCurrUserReserveDayList} from "@/api/reserve";
import {UserInfo} from "@/context/user";

export default defineComponent({
  name: 'Schedule',
  components: {ReserveForm},
  setup: () => {
    const {reserveState,setCurrUserReserveDayList} = useReserveInject();
    const {userState} = useUserInject();
    const {areaState} = useAreaInject();
    const reserveDialogVisible = ref<boolean>(false);
    const reserveMetting = () => {
      reserveDialogVisible.value = true;
    }
    const closeDialog = ()=>{
      reserveDialogVisible.value = false;
    }
    const onClose = ()=>{
      closeDialog();
    }
    const onSubmitSuccess = () =>{
      if(userState.userInfo){
        const userInfo:UserInfo = userState.userInfo;
        if(userInfo.userCode&&areaState.currAreaId){
          getCurrUserReserveDayList({
            month: reserveState.currUserReserveMonth,
            userCode: userInfo.userCode,
            areaId: areaState.currAreaId
          }).then((res) => {
            if (res.code === 200) {
              setCurrUserReserveDayList(res.data);
            }
          })
        }
      }
      closeDialog();
    }
    return {reserveMetting, reserveDialogVisible,onClose,onSubmitSuccess};
  }
})
</script>

<style scoped>

</style>
