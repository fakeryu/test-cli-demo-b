<!--
 * @Author: berg yu
 * @Date: 2022-07-06 09:14:19
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-07 14:33:21
 * @Description: 请填写简介
-->
<template>
  <div class="first-page-layout">
    <div class="hospital-edit" @click="drawer = true">医院信息维护</div>
    <div class="welcome-module">
      <img src="../assets/img/welcome.png" alt="欢迎界面" />
      <div>{{ appConfig.systemName }}</div>
    </div>
    <el-drawer
      size="25%"
      v-model="drawer"
      title="I am the title"
      :with-header="false"
    >
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const appConfig = store.state.appConfig;
const drawer = ref(false);
</script>

<style scoped lang="scss">
.first-page-layout {
  position: relative;
  height: 100%;
  text-align: center;
  background-color: #fff;
  .hospital-edit {
    position: absolute;
    top: 20px;
    right: 12px;
    color: #409eff;
    cursor: pointer;
    font-size: 20px;
  }
  .welcome-module {
    display: inline-block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    color: #000;
  }
}

.logo-upload {
  display: flex;
  width: 120px;
  height: 80px;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.ant-upload-text {
  color: #abb2b9;
  margin-top: 15px;
}

.btn-custome {
  border: none;
  border-radius: 20px;
  height: 40px;
}
</style>
