<template>
  <Auth/>
  <el-container>
    <el-header>
      <el-row>
        <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4"/>
        <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
          <el-image
              style="width: 200px; height: 60px"
              :src="logo"
              fit="contain"
          />
          <div style="float: right;padding:5px 0;">
            <Area></Area>
            <el-button type="round" @click="goAdminPage">后台</el-button>
            <el-divider direction="vertical"/>
            <el-button type="round" @click="goLogin">登出</el-button>
          </div>
        </el-col>
        <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4"/>
      </el-row>
    </el-header>
    <el-container style="height: 89vh; border: 1px solid #eee">
      <el-aside>
        <el-affix :offset="120">
          <el-card :body-style="{padding: '10px'}">
            <UserInfo class="animate__animated" :class="{animate__bounceInDown:true}"/>
          </el-card>
        </el-affix>
      </el-aside>
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <Calendar class="animate__animated" :class="{animate__bounceInDown:true}"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <Event/>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Login from '@/components/LoginForm/Index.vue';
import UserInfo from '@/components/UserInfo/Index.vue';
import Calendar from "@/components/Calendar/Calendar.vue";
import Event from "@/page/event/Event.vue";
import Auth from "@/page/Auth.vue";
import Area from "@/components/Area/Index.vue";
import {useRouter} from 'vue-router';
import Schedule from "@/components/Area/Schedule.vue";
import {useUserInject} from "@/context";

export default defineComponent({
  name: 'Home',
  components: {
    Schedule,
    Area,
    Event,
    Calendar,
    Login,
    UserInfo,
    Auth
  },
  setup() {
    const {loginOut} =useUserInject();
    const logo = ref(
        '/images/logo.png'
    )
    const router = useRouter();
    const goAdminPage = () => {
      router.push("/admin");
    }
    const goLogin = ()=>{
      loginOut(()=>{
        router.push("/login");
      })
    }
    return {goAdminPage, logo,goLogin};
  }
})
</script>

<style scoped>
.el-aside {
  width: 70px;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 50px;
}
</style>
