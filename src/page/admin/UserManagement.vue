<template>
  <el-input
      v-model="userName"
      placeholder="请输入姓名模糊查询"
      class="input-with-select"
      style="width: 250px"
  >
    <template #append>
      <el-button icon="el-icon-search" @click="requestUserList"></el-button>
    </template>
  </el-input>
  <el-button-group style="float: right">
    <el-button @click="userAddDialogshow">新建用户</el-button>
    <el-button @click="userEditDialogshow">修改用户</el-button>
    <el-popconfirm
        confirm-button-text="是"
        cancel-button-text="否"
        :icon="InfoFilled"
        icon-color="red"
        @confirm="deleteManagerUser"
        title="是否确认删除选中用户?"
    >
      <template #reference>
        <el-button type="danger">删除用户</el-button>
      </template>
    </el-popconfirm>

  </el-button-group>
  <el-table
      ref="tableForm"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"/>
    <el-table-column property="userAccount" label="登录账号" width="120"/>
    <el-table-column property="userName" label="姓名" width="120"/>
    <el-table-column property="userPhone" label="手机号" width="120"/>
    <el-table-column property="userEmail" label="邮箱" show-overflow-tooltip/>
    <el-table-column label="创建时间" width="120">
      <template #default="scope">{{ scope.row.createTime }}</template>
    </el-table-column>
  </el-table>

  <el-dialog
      v-model="addUserDialogVisible"
      title="用户新增"
      width="520px"
      destroy-on-close
      center
  >
    <UserAddDialog
        :onClose="onClose"
        :onSubmitSuccess="onSubmitSuccess"
    />
  </el-dialog>
  <el-dialog
      v-model="editUserDialogVisible"
      title="用户修改"
      width="520px"
      destroy-on-close
      center
  >
    <UserEditDialog
        :currEditUser="currSelectUser"
        :onClose="onClose"
        :onSubmitSuccess="onSubmitSuccess"
    />
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref, toRefs} from 'vue'
import {findUserList,deleteUser} from "@/api/user";
import {ElMessage} from "element-plus";
import { InfoFilled } from '@element-plus/icons'
import {Respose} from "@/utils/request";
import UserAddDialog from "./userManager/UserAddDialog.vue";
import UserEditDialog from "./userManager/UserEditDialog.vue";

export default defineComponent({
  name: 'UserManagement',
  components: {UserAddDialog,UserEditDialog},
  setup() {
    const tableData = ref([])
    const searchForm = reactive({
      userName: null
    })
    const multipleSelection = ref([]);
    const tableForm = ref<any>(null)
    const addUserDialogVisible = ref<boolean>(false);
    const editUserDialogVisible = ref<boolean>(false);
    const currSelectUser = ref(null);


    const handleSelectionChange = (val: any) => {
      multipleSelection.value = val
    }
    const requestUserList = () => {
      findUserList({...searchForm}).then((res: Respose) => {
        if (res.code === '200') {
          tableData.value = res.data;
        } else {
          tableData.value = [];
        }
      })
    }

    const deleteManagerUser = () => {
      const selectUserList = multipleSelection.value;
      if(selectUserList&&selectUserList.length>0){
        deleteUser({userAccount:selectUserList.toString()}).then((res: Respose) => {
          if (res.code === '200') {
            ElMessage({
              message: '删除成功！',
              type: 'success'
            })
            requestUserList();
          }
        })
      }else{
        ElMessage({
          message: '请至少选择一个用户删除！',
          type: 'error'
        })
      }
    }

    onBeforeMount(() => {
      requestUserList();
    })


    const userAddDialogshow = () => {
      addUserDialogVisible.value = true;
    }
    const userEditDialogshow = () => {
      const selectUserList = multipleSelection.value;
      if(selectUserList&&selectUserList.length===1){
        currSelectUser.value = selectUserList[0];
        editUserDialogVisible.value = true;
      }else{
        ElMessage({
          message: '只能选择一个用户进行修改！',
          type: 'error'
        })
      }

    }
    const closeDialog = ()=>{
      addUserDialogVisible.value = false;
      editUserDialogVisible.value = false;
    }
    const onClose = ()=>{
      closeDialog();
    }
    const onSubmitSuccess = () =>{
      requestUserList();
      closeDialog();
    }

    return {
      onClose,
      onSubmitSuccess,
      userAddDialogshow,
      userEditDialogshow,
      deleteManagerUser,
      InfoFilled,
      ...toRefs(searchForm),
      requestUserList,
      tableForm,
      handleSelectionChange,
      tableData,
      addUserDialogVisible,
      editUserDialogVisible,
      currSelectUser
    }
  }
})
</script>

<style scoped>

</style>