<template>
  <div style="display: flex; gap: 20px">
    <el-input
      v-model="search.keyword"
      style="width: 200px"
      placeholder="所搜关键词"
    />
    <el-button type="primary" @click="searchHandler">搜索</el-button>
    <el-button type="primary" @click="addData">新增</el-button>
  </div>
  <div style="height: 50px"></div>
  <div style="width: 650px">
    <el-table border :data="tableData.data" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="like" label="爱好" />
      <el-table-column prop="action">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="numberValidateForm.title"
    width="60%"
    :before-close="beforeClose"
  >
    <el-form
      ref="formRef"
      :model="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input
          v-model.number="numberValidateForm.name"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
      >
        <el-input
          v-model.number="numberValidateForm.age"
          type="text"
          autocomplete="off"
        /> </el-form-item
      ><el-form-item
        label="爱好"
        prop="like"
      >
        <el-input
          v-model.number="numberValidateForm.like"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isOk"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { updateUsr, getList, addUser, delUser } from "./api/index";
const dialogVisible = ref(false);
const search = reactive({
  keyword: "",
});
const dialogRef = ref(null);
const searchHandler = () => {
  console.log("search");
  init();
};
const beforeClose = (done) => {
};
const numberValidateForm = reactive({
  name: "",
  age: "",
  like: "",
  title: "",
});
const tableData = reactive({
  data: [],
});
const addData = () => {
  numberValidateForm.name = "";
  numberValidateForm.age = "";
  numberValidateForm.like = "";
  numberValidateForm.title = "添加";
  dialogVisible.value = true;
};
const handleClick = ({ row }) => {
  console.log("编辑", row);
  dialogVisible.value = true;
  numberValidateForm.name = row.name;
  numberValidateForm.age = row.age;
  numberValidateForm.like = row.like;
  numberValidateForm.title = "编辑";
  numberValidateForm.id = row.id;
};

const handleDelete = async ({ row }) => {
  console.log("删除", row);
  let res = await delUser(row);
  init();
};
const isOk = async () => {
  dialogVisible.value = false;
  if (numberValidateForm.title == "添加") {
    let res = await addUser(numberValidateForm);
    console.log(res);
  } else {
    let data = {
      name: numberValidateForm.name,
      age: numberValidateForm.age,
      id: numberValidateForm.id,
      like: numberValidateForm.like,
    };
    let res = await updateUsr(data);
    console.log(res);
  }
  init();
};
const init = async () => {
  let res = await getList(search);
  console.log(res);
  tableData.data = res || [];
};
init();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
