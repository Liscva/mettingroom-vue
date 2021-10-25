<template>
  <div :style="{backgroundImage:'url('+bjUrl+')'}"
       style="background-size: 100% 100%;width: 100%;height: 100vh">
    <div class="index">
      <el-container>
        <el-main>
          <el-row align="middle" class="row-bg" style="height: 90vh;">
            <el-col :xs="8" :sm="10" :md="12" :lg="15" :xl="18">
<!--              <el-image-->
<!--                  style="width: 200px; height: 60px"-->
<!--                  :src="logo"-->
<!--                  fit="contain"-->
<!--              />-->
            </el-col>
            <el-col :xs="16" :sm="14" :md="12" :lg="9" :xl="6">
              <LoginForm/>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script lang="ts">

import {defineComponent, watch,ref} from 'vue'
import {useRouter} from 'vue-router';
import {useUserInject} from '@/context';
import LoginForm from '../components/LoginForm/Index.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm,
  },
  setup() {
    const {userState} = useUserInject();
    const router = useRouter();
    const bjUrl = ref<string>("/images/bj.jpeg");
    const logo = ref<string>(
        '/images/logo.png'
    )
    const goHome = () => {
      router.push("/");
    }
    watch(() => userState.status, (val, old) => {
      if (val === 'login') {
        goHome();
      }
    })
    if (userState.status === 'login') {
      goHome();
    }
    return {
      bjUrl,
      logo
    }
  }
})
</script>
<style>
body{
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.row-bg {
  padding: 60px 0;
}
.index {
  filter:alpha(Opacity=85);
  -moz-opacity:0.85;
  opacity: 0.85;
}
</style>