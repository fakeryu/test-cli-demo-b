<!--
 * @Author: berg yu
 * @Date: 2023-08-09 16:36:57
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-15 11:46:23
 * @Description: 请填写简介
-->
<template>
  <div class="container">
    <div class="robot-task__header">
      <div class="robot-task__query">
        机器人编码：
        <el-input
          v-model="queryParams.robotName"
          placeholder="请输入"
        />
      </div>
      <div class="robot-task__query">
        手术类型：
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
      <div class="robot-task__query-daterange">
        创建时间：
        <el-date-picker
          v-model="queryParams.createDate"
          style="width: 400px"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </div>
      <div class="robot-task__query">
        机器人名称：
        <el-input
          v-model="queryParams.robotName"
          placeholder="请输入"
        />
      </div>
      <div class="robot-task__query">
        任务状态：
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
      <div class="robot-task__query">
        手术医院：
        <el-select
          v-model="queryParams.org"
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
      <div class="robot-task__query">
        手术医生：
        <el-input
          v-model="queryParams.robotName"
          placeholder="请输入"
        />
      </div>
      <div class="robot-task__query">
        患者年龄：
        <el-input
          v-model="queryParams.robotName"
          placeholder="请输入"
        />
      </div>
      <div class="robot-task__query">
        患者性别：
        <el-select
          v-model="queryParams.org"
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
      <el-button
        type="primary"
        size="small"
        @click="query()"
      >
        查询
      </el-button>
    </div>
    <hr class="robot-task__hr">
    <div>
      <div>
        <BaseTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, reactive } from "vue";
import BaseTable from "../../components/BaseTable.vue";
import { ElMessage } from "element-plus";
import service from "../../utils/request";
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

const query = () => {
  service.post("indexPage", queryParams).then(
    (res) => {
      if (res['success']) {
        // analyseData.data = res.data;
      } else {
        ElMessage({
          message: "请求失败",
          type: "error",
        });
      }
    },
    (err) => {
      ElMessage({
        message: err,
        type: "error",
      });
    }
  );
};
onActivated(() => {});
onDeactivated(() => {});
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .robot-task__header {
    display: inline-flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-wrap: wrap;
    font-size: 15px;
    .robot-task__query {
      width: 440px;
      margin-bottom: 10px;
      .el-input {
        width: 300px;
      }
      .el-select {
        width: 300px;
      }
    }
    .el-button {
      height: 35px;
    }
  }
}
.robot-task__content-btn {
  margin-bottom: 10px;
}

.robot-task__hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
