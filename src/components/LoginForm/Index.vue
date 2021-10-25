<template>
  <el-card class="box-card" style="width: 400px;" @keyup.enter="submitForm">
    <template #header>
      <div class="card-header">
        <span>会议预约系统</span>
      </div>
    </template>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" >
      <el-form-item label="用户名">
        <el-input v-model="form.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.userPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登陆</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref } from 'vue';
import {login} from "@/api/user";
import {useUserInject} from "@/context";
import {UserInfo} from "@/context/user";

interface LoginForm {
  userAccount: string | number;
  userPassword: string | number;
}
export default defineComponent({
  name: 'LoginForm',
  setup: () => {
    const {setLoginUser} = useUserInject();
    const state = reactive({
      form: {
        userAccount: '',
        userPassword: ''
      } as LoginForm,
      rules: {
        userAccount: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        userPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      loginForm: ref<any>(null)
    });
    const submitForm=()=> {
      state.loginForm.validate().then((valid: boolean) => {
        if (valid) {
          login(state.form).then(res=>{
            if(res.code==='200'){
              const userInfo:UserInfo = res.data;
              setLoginUser(userInfo);
            }
          })
        }
      });
    }
    return { ...toRefs(state),submitForm}
  }
})
</script>

<style scoped>
</style>
