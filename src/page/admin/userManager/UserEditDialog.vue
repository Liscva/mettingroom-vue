<template>
  <el-form ref="form" :model="formValue" label-width="120px" :rules="rules">
    <el-form-item label="登录名：" prop="userAccount">
      <el-input v-model="formValue.userAccount" disabled style="width: 300px;" />
    </el-form-item>
    <el-form-item label="姓名：" prop="userAccount">
      <el-input v-model="formValue.userName" disabled  style="width: 300px;" />
    </el-form-item>
    <el-form-item label="手机号：" prop="userPhone">
      <el-input v-model="formValue.userPhone" placeholder="请输入手机号" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="邮箱：" prop="userEmail" >
      <el-input v-model="formValue.userEmail" placeholder="请输入邮箱" style="width: 300px;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startEditUser">保存</el-button>
      <el-button @click="close">取消</el-button>
      <el-button @click="resetPwd">密码重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {ElMessage} from "element-plus";
import {editUser,resetPassword} from "@/api/user";

interface UserEditForm {
  userAccount: string;
  userName: string |null;
  userPhone: string | null;
  userEmail: string | null;
}

export default defineComponent({
  name: 'UserEditDialog',
  props: {
    onClose: Function,
    onSubmitSuccess: Function,
    currEditUser: Object
  },
  setup: (props) => {
    const {onClose, onSubmitSuccess,currEditUser} = props;
    const store = reactive({
      formValue: currEditUser as UserEditForm,
      rules: {
        userAccount: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
        ],
      },
      form: ref<any>(null),
    });
    const close = ()=>{
      if(onClose){
        onClose();
      }
    }

    /**
     * 重置密码 为123456
     */
    const resetPwd = () =>{
      const opt = {
        userAccount:store.formValue.userAccount
      }
      resetPassword(opt).then(res=>{
        if(res.code==='200'){
          ElMessage({
            message: '密码重置成功！默认密码为123456',
            type: 'success'
          })
          if(onSubmitSuccess){
            onSubmitSuccess();
          }
        }
      })
    }
    const startEditUser = () => {
      store.form.validate().then((valid: boolean) => {
        if (valid) {
          const opt = {
            userAccount: store.formValue.userAccount,
            userName: store.formValue.userName,
            userPhone: store.formValue.userPhone,
            userEmail: store.formValue.userEmail,
          }
          editUser(opt).then(res=>{
            if(res.code==='200'){
              ElMessage({
                message: '用户修改成功！',
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
      startEditUser,
      close,
      resetPwd,
      ...toRefs(store)
    }
  }
})
</script>

<style scoped>
</style>