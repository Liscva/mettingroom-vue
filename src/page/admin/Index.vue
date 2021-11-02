<template>
  <el-row>
    <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4" />
    <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="4" />
            <el-col :span="16" style="height: 60px">
              <el-image
                  style="width: 200px; height: 60px"
                  :src="logo"
                  fit="contain"
              />
              <div style="float: right;padding:5px 0;">
<!--                <el-button type="round">登出</el-button>-->
              </div>
            </el-col>
            <el-col :span="4" />
          </el-row>
        </el-header>
        <el-container style="height: 89vh;">
          <el-aside>
            <el-menu
                @select="onMenuSelect"
                :default-active="currMenu"
                class="el-menu-vertical-demo"
            >
              <el-menu-item index="usermanager">
                <i class="el-icon-menu"></i>
                <template #title>用户管理</template>
              </el-menu-item>
              <el-menu-item index="roommanager">
                <i class="el-icon-menu"></i>
                <template #title>会议室管理</template>
              </el-menu-item>
              <el-menu-item index="systemmanager">
                <i class="el-icon-menu"></i>
                <template #title>系统配置</template>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main>
              <UserManagement v-if="currMenu==='usermanager'"/>
              <RoomManagement v-if="currMenu==='roommanager'"/>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-col>
    <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4" />
  </el-row>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'
import UserManagement from "@/page/admin/UserManagement.vue";
import RoomManagement from "@/page/admin/RoomManagement.vue";

export default defineComponent({
  name: 'AdminPage',
  components: {RoomManagement, UserManagement},
  setup(){
    const logo = ref<string>(
        '/images/logo.png'
    )
    const currMenu = ref<string>('usermanager');
    const onMenuSelect = (val:string)=>{
      currMenu.value = val;
    }
    return {
      onMenuSelect,
      logo,
      currMenu
    }
  }
})
</script>

<style scoped>
.el-aside {
  width: 200px;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
