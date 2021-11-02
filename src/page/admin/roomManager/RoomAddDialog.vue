<template>
  <el-form ref="form" :model="formValue" label-width="120px" :rules="rules">
    <el-form-item label="会议室名称：" prop="userAccount">
      <el-input v-model="formValue.areaName" placeholder="请输入会议室名称" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="会议室说明：" prop="userPassword">
      <el-input v-model="formValue.areaExplication" placeholder="请输入会议室说明"  style="width: 300px;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startAddArea">新增会议室</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {ElMessage} from "element-plus";
import {increaseArea} from "@/api/area";

interface AreaAddForm {
  areaName: string;
  areaExplication: string;
}

export default defineComponent({
  name: 'RoomAddDialog',
  props: {
    onClose: Function,
    onSubmitSuccess: Function
  },
  setup: (props) => {
    const {onClose, onSubmitSuccess} = props;
    const store = reactive({
      formValue: {
        areaName: '',
        areaExplication: '',
      } as AreaAddForm,
      rules: {
        areaName: [
          {required: true, message: '请输入会议室名称', trigger: 'blur'},
        ],
        areaExplication: [
          {required: true, message: '请输入会议室说明', trigger: 'blur'},
        ],
      },
      form: ref<any>(null),
    });
    const close = ()=>{
      if(onClose){
        onClose();
      }
    }

    const startAddArea = () => {
      store.form.validate().then((valid: boolean) => {
        if (valid) {
          const opt = {
            areaName: store.formValue.areaName,
            areaExplication: store.formValue.areaExplication,
          }
          increaseArea(opt).then(res=>{
            if(res.code==='200'){
              ElMessage({
                message: '用户添加成功！',
                type: 'success'
              })
              if(onSubmitSuccess){
                onSubmitSuccess();
              }
            }
          })
        }
      });
    }

    return {
      startAddArea,
      close,
      ...toRefs(store)
    }
  }
})
</script>

<style scoped>
</style>