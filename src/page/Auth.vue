<template>
  <div></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router';
import {useUserInject} from "@/context";


export default defineComponent({
  name: 'Auth',
  setup() {
    const {userState} = useUserInject();
    const router = useRouter();
    let isLogin = userState.status==='login' ? true : false;
    if (!isLogin) {
      router.push("/login");
    }
  }
})
</script>
