<template>
  <el-form ref="form" :model="formValue" label-width="120px" :rules="rules">
    <el-form-item label="登录名：" prop="userAccount">
      <el-input v-model="formValue.userAccount" placeholder="请输入登录账号" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="登录密码：" prop="userPassword">
      <el-input v-model="formValue.userPassword" placeholder="请输入登录密码" type="password" autocomplete="off" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="二次密码：" prop="userPasswordCheck">
      <el-input v-model="formValue.userPasswordCheck" placeholder="请再次输入登录密码" type="password" autocomplete="off" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="真实姓名：" prop="userName">
      <el-input v-model="formValue.userName" placeholder="请输入真实姓名" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="手机号：" prop="userPhone">
      <el-input v-model="formValue.userPhone" placeholder="请输入手机号" style="width: 300px;" />
    </el-form-item>
    <el-form-item label="邮箱：" prop="userEmail" >
      <el-input v-model="formValue.userEmail" placeholder="请输入邮箱" style="width: 300px;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startAddUser">新增用户</el-button>
      <el-button @click="close">取消新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {ElMessage} from "element-plus";
import {registerUser} from "@/api/user";

interface UserAddForm {
  userAccount: string |null;
  userPassword: string | null;
  userPasswordCheck: string | null;
  userName: string | null;
  userPhone: string | null;
  userEmail: string | null;
}

export default defineComponent({
  name: 'UserAddDialog',
  props: {
    onClose: Function,
    onSubmitSuccess: Function
  },
  setup: (props) => {
    const {onClose, onSubmitSuccess} = props;
    const validatePass = (rule:any, value:string, callback:Function) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== store.formValue.userPassword) {
        callback(new Error("两次输入的密码不一致!"))
      } else {
        callback()
      }
    }
    const store = reactive({
      formValue: {
        userAccount: null,
        userPassword: null,
        userPasswordCheck: null,
        userName: null,
        userPhone: null,
        userEmail:null
      } as UserAddForm,
      rules: {
        userAccount: [
          {required: true, message: '请输入登录账号', trigger: 'blur'},
        ],
        userPassword: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
        ],
        userPasswordCheck: [
          {validator:validatePass, trigger: 'blur'},
        ],
        userName: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'},
        ],
      },
      form: ref<any>(null),
    });
    const close = ()=>{
      if(onClose){
        onClose();
      }
    }

    const startAddUser = () => {
      store.form.validate().then((valid: boolean) => {
        if (valid) {
          registerUser({
            mrUser:{
              userAccount:store.formValue.userAccount,
              userPassword:store.formValue.userPassword,
            },
            mrUserInfo:{
              userName:store.formValue.userName,
              userEmail:store.formValue.userEmail,
              userPhone:store.formValue.userPhone,
            }
          }).then(res=>{
            if(res.code==='200'){
              ElMessage.success({
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
      startAddUser,
      close,
      ...toRefs(store)
    }
  }
})
</script>

<style scoped>
</style>