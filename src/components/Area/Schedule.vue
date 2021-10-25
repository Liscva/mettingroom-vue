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

export default defineComponent({
  name: 'Schedule',
  components: {ReserveForm},
  setup: () => {
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
      closeDialog();
    }
    return {reserveMetting, reserveDialogVisible,onClose,onSubmitSuccess};
  }
})
</script>

<style scoped>

</style>
