<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="router_animate">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { ref,defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import {useProvider} from "@/context";

export default defineComponent({
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  data() {
    return {
      locale: zhCn,
    }
  },
  setup(){
    useProvider();
  }
})
</script>

<style>
.router_animate-enter-active {
  animation: rollIn 1s;
}
.router_animate-leave-active {
  animation: rollOut 0.6s;
}
</style>
