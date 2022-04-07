<template>
  <el-form ref="reserveForm" :model="form" label-width="120px">
    <el-form-item label="会议室：">
      <el-select v-model="form.areaId" placeholder="请选择预约的会议室" style="width: 300px;">
        <el-option :label="item.areaName" :value="item.areaId" v-for="item in areaState.areaList"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预约日期：">
      <el-date-picker
          v-model="form.day"
          type="date"
          placeholder="请选择日期"
          style="width: 300px;"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDate"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="预约时间：">
      <el-col :span="11">
        <el-time-select
            placeholder="起始时间"
            v-model="form.startTime"
            :start='chooseStartTime'
            step='00:30'
            style="width: 147px"
            :end="chooseEndTime">
        </el-time-select>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-select
            placeholder="结束时间"
            v-model="form.endTime"
            :start='form.startTime'
            step='00:30'
            style="width: 147px"
            :end='chooseEndTime'>
        </el-time-select>
      </el-col>
    </el-form-item>
    <el-form-item label="预约详情：">
      <el-input v-model="form.reserveTodo" type="textarea" style="width: 300px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startReserve">提交预约</el-button>
      <el-button @click="close">取消预约</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref, toRefs} from 'vue';
import {queryMrConfigByConfigCode} from "@/api/sysConfig";
import {useAreaInject, useReserveInject, useUserInject} from '@/context';
import {reserveMettingRoom} from "@/api/reserve";
import {ElMessage} from "element-plus";

interface IReserveForm {
  areaId: string |null;
  day: string | null;
  startTime: string | null;
  endTime: string | null;
  reserveTodo: string | null;
}

export default defineComponent({
  name: 'ReserveForm',
  props: {
    onClose: Function,
    onSubmitSuccess: Function,
    startTimeP: String,
    endTimeP: String
  },
  setup: (props) => {
    const {onClose, onSubmitSuccess,startTimeP,endTimeP} = props;
    const {areaState} = useAreaInject();
    const {userState} = useUserInject();
    const {reserveState} =useReserveInject();
    const store = reactive({
      form: {
        areaId: areaState.currAreaId,
        day: reserveState.currUserReserveDay,
        startTime: startTimeP,
        endTime: endTimeP,
        reserveTodo: null
      } as IReserveForm,
      rules: {
        areaId: [
          {required: true, message: '请选择区域', trigger: 'blur'},
        ],
      },
      reserveForm: ref<any>(null),
    });

    const chooseStartTime = ref<string>('');
    const chooseEndTime = ref<string>('');
    onBeforeMount(() => {
      queryMrConfigByConfigCode("mettingBeginTime").then(res => {
        chooseStartTime.value = res.data.configValue;
      })
      queryMrConfigByConfigCode("mettingEndTime").then(res => {
        chooseEndTime.value = res.data.configValue;
      })
    })
    const startReserve = () => {
      store.reserveForm.validate().then((valid: boolean) => {
        if (valid) {
          reserveMettingRoom({
            areaId: store.form.areaId,
            reserveTodo: store.form.reserveTodo,
            dayTimeDto: {
              day: store.form.day,
              startTime: store.form.startTime,
              endTime: store.form.endTime
            },
            reserveUser: {
              ...userState.userInfo
            }
          }).then((res) => {
            if (res.code === 200) {
              ElMessage({
                message: '预约成功',
                type: 'success'
              });
              if (onSubmitSuccess) {
                onSubmitSuccess();
              }
            }
          })
        }
      });
    }

    const disabledDate = (time:Date) => {
      const today = new Date();
      today.setTime(today.getTime() - 24 * 60 * 60 * 1000);
      return time.getTime() < today.getTime()
    }
    const close = () => {
      if(onClose){
        onClose();
      }
    }

    return {
      areaState,
      startReserve,
      ...toRefs(store),
      chooseEndTime, chooseStartTime,
      disabledDate,
      close
    }
  }
})
</script>

<style scoped>
</style>