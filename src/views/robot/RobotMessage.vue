<!--
 * @Author: berg yu
 * @Date: 2023-08-09 16:36:57
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-11 09:10:57
 * @Description: 请填写简介
-->
<template>
  <div class="container">
    <div class="robot-message__header">
      <div class="robot-message__query">
        机器人名称：
        <el-input v-model="queryParams.robotName" placeholder="请输入" />
      </div>
      <div class="robot-message__query">
        机器人编码：
        <el-input v-model="queryParams.robotName" placeholder="请输入" />
      </div>
      <div class="robot-message__query">
        运维状态：
        <el-select
          v-model="queryParams.status"
          multiple
          collapse-tags
          collapse-tags-tooltip
					:max-collapse-tags="2"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="robot-message__query">
        所属机构：
        <el-select v-model="queryParams.org" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="robot-message__query">
        创建时间：
        <el-date-picker
          v-model="queryParams.createDate"
          type="date"
          placeholder="Pick a day"
        />
      </div>
      <el-button type="primary" size="small" @click="query()">查询</el-button>
    </div>
    <hr class="robot-message__hr" />
    <div>
      <div class="robot-message__content-btn">
        <el-button type="primary" size="small" @click="query()">
          <i class="el-icon-plus"></i> 新增</el-button
        >
        <el-button type="primary" size="small" @click="query()">删除</el-button>
      </div>
      <div>
        <BaseTable></BaseTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, reactive } from "vue";
import BaseTable from "../../components/BaseTable.vue";
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
const queryParams = reactive({
  robotName: "",
  robotCode: "",
  status: [],
  org: "",
  createDate: "",
});

const query = () => {};
onActivated(() => {});
onDeactivated(() => {});
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .robot-message__header {
    display: inline-flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-wrap: wrap;
		font-size: 15px;
    .robot-message__query {
      width: 350px;
      margin-bottom: 10px;
      .el-input {
        width: 240px;
      }
      .el-select {
        width: 240px;
      }
    }
    .el-button {
      height: 35px;
    }
  }
}
.robot-message__content-btn {
  margin-bottom: 10px;
}

.robot-message__hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
