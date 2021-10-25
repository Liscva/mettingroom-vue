<template>
  <el-divider content-position="left">已预约信息</el-divider>
  <el-row>
    <Log />
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Log from "@/page/event/Log.vue";

export default defineComponent({
  name: 'Event',
  components: { Log}
})
</script>

<style scoped>

</style>
