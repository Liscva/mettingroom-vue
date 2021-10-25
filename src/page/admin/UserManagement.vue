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
    <el-button @click="userAddDialogshow">新建</el-button>
    <el-button>修改密码</el-button>
    <el-button autofocus="false">删除</el-button>
  </el-button-group>
  <el-table
      ref="tableForm"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"/>
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
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, reactive, ref, toRefs} from 'vue'
import {findUserList} from "@/api/user";
import {Respose} from "@/utils/request";
import UserAddDialog from "@/page/admin/userManager/UserAddDialog.vue";

export default defineComponent({
  name: 'UserManagement',
  components: {UserAddDialog},
  setup() {
    const tableData = ref([])
    const searchForm = reactive({
      userName: null
    })
    const multipleSelection = ref(null);
    const tableForm = ref<any>(null)
    const addUserDialogVisible = ref<boolean>(false);

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

    onBeforeMount(() => {
      requestUserList();
    })


    const userAddDialogshow = () => {
      addUserDialogVisible.value = true;
    }
    const closeDialog = ()=>{
      addUserDialogVisible.value = false;
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
      ...toRefs(searchForm),
      requestUserList,
      tableForm,
      handleSelectionChange,
      tableData,
      addUserDialogVisible
    }
  }
})
</script>

<style scoped>

</style>