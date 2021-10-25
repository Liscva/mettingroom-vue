<template>
  <el-select v-model="areaState.currAreaId" placeholder="Select">
    <el-option
        v-for="item in areaState.areaList"
        :key="item.areaId"
        :label="item.areaName"
        :value="item.areaId"
    >
    </el-option>
  </el-select>
  <el-divider direction="vertical"/>
  <Schedule />
</template>

<script lang="ts">
import {defineComponent, onBeforeMount} from 'vue'
import {findAreaList} from "@/api/area";
import {Respose} from "utils/request";
import Schedule from "@/components/Area/Schedule.vue";
import { useAreaInject } from '@/context';


export default defineComponent({
  name: 'Area',
  components:{Schedule},
  setup() {
    const { areaState,setCurrAreaId, setAreaList } = useAreaInject();
    const requestAreaList = () => {
      findAreaList({}).then((res: Respose) => {
        if (res.code === '200') {
          if(res.data&&res.data.length>0){
            setCurrAreaId(res.data[0].areaId);
            setAreaList(res.data);
          }else{
            setCurrAreaId(null);
            setAreaList([]);
          }
        }
      })
    }
    onBeforeMount(() => {
      requestAreaList()
    })
    return {
      areaState,
      requestAreaList
    }
  }
})
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>