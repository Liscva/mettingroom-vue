<template>
  <el-input
      v-model="areaName"
      placeholder="请输入会议室模糊查询"
      class="input-with-select"
      style=" width: 250px"
  >
    <template #append>
      <el-button icon="el-icon-search" @click="requestRoomList"></el-button>
    </template>
  </el-input>
  <el-button-group style="float: right">
    <el-button @click="roomAddDialogshow">新建会议室</el-button>
    <el-button @click="roomEditDialogshow">修改会议室</el-button>
    <el-popconfirm
        confirm-button-text="是"
        cancel-button-text="否"
        :icon="InfoFilled"
        icon-color="red"
        @confirm="deleteManagerUser"
        title="是否确认删除选中用户?"
    >
      <template #reference>
        <el-button type="danger">删除会议室</el-button>
      </template>
    </el-popconfirm>
  </el-button-group>
  <el-table
      ref="tableForm"
      :data="roomList"
      style="width: 100%"
      @selection-change="roomSelectChange"
  >
    <el-table-column type="selection" width="55"/>
    <el-table-column property="areaId" label="会议室ID" width="120"/>
    <el-table-column property="areaName" label="会议室名称" width="120"/>
    <el-table-column property="areaExplication" label="会议室说明" width="240"/>
    <el-table-column label="创建时间" width="120">
      <template #default="scope">{{ scope.row.createTime }}</template>
    </el-table-column>
  </el-table>

  <el-dialog
      v-model="addRoomDialogVisible"
      title="添加会议室"
      width="520px"
      destroy-on-close
      center
  >
    <RoomAddDialog
        :onClose="onClose"
        :onSubmitSuccess="onSubmitSuccess"
    />
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref, toRefs} from 'vue'
import {findAreaList} from "@/api/area";
import {ElMessage} from "element-plus";
import { InfoFilled } from '@element-plus/icons'
import {Respose} from "@/utils/request";
import RoomAddDialog from "./roomManager/RoomAddDialog.vue";

export default defineComponent({
  name: 'RoomManagement',
  components: {RoomAddDialog},
  setup() {
    const roomList = ref([])
    const searchForm = reactive({
      areaName: null,
    })
    const dialog = reactive({
      addRoomDialogVisible :false,
      editRoomDialogVisible :false
    })
    const roomSelection = ref([]);
    const tableForm = ref<any>(null)


    const roomSelectChange = (val: any) => {
      roomSelection.value = val
    }
    const requestRoomList = () => {
      findAreaList({...searchForm}).then((res: Respose) => {
        if (res.code === 200) {
          roomList.value = res.data;
        } else {
          roomList.value = [];
        }
      })
    }
    onBeforeMount(() => {
      requestRoomList();
    })

    const closeDialog = ()=>{
      dialog.addRoomDialogVisible = false;
      dialog.editRoomDialogVisible = false;
    }
    const onClose = ()=>{
      closeDialog();
    }
    const onSubmitSuccess = () =>{
      requestRoomList();
      closeDialog();
    }
    const roomAddDialogshow = ()=>{
      dialog.addRoomDialogVisible = true;
    }
    const roomEditDialogshow = ()=>{
      dialog.editRoomDialogVisible = true;
    }

    return {
      onClose,
      onSubmitSuccess,
      InfoFilled,
      ...toRefs(searchForm),
      ...toRefs(dialog),
      tableForm,
      roomSelectChange,
      roomList,
      requestRoomList,
      roomAddDialogshow,
      roomEditDialogshow
    }
  }
})
</script>

<style scoped>

</style>