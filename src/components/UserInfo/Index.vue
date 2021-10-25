<template>
  <el-popover
      placement="right"
      title="用户信息"
      :width="400"
      trigger="hover"
      v-if="userState.userInfo!=null"
  >
    <template #reference>
      <el-avatar> {{ userState.userInfo.userName }}</el-avatar>
    </template>
    <el-descriptions direction="vertical" :column="1" border >
      <el-descriptions-item label="用户名">{{ userState.userInfo.userName }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userState.userInfo.userEmail }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ userState.userInfo.userPhone }}</el-descriptions-item>
    </el-descriptions>
  </el-popover>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useUserInject} from "@/context";

export default defineComponent({
  name: 'UserInfo',
  setup: () => {
    const {userState} = useUserInject();
    return {userState};
  }
})
</script>

<style scoped>
</style>
