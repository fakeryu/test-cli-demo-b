<!--
 * @Author: berg yu
 * @Date: 2022-07-06 09:14:19
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-14 15:51:06
 * @Description: 请填写简介
-->
<template>
  <div class="container">
    <div class="first__header">
      <div class="first__select first__select-year">
        选择年：
        <el-date-picker
          type="year"
          value-format="YYYY"
          placeholder="请选择"
          v-model="queryParams.year"
          @change="query()"
        />
      </div>

      <div class="first__select first__select-hos">
        医院：
        <el-select
          v-model="queryParams.hospitalId"
          placeholder="请选择"
          @change="query()"
        >
          <el-option
            v-for="item in hosOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <hr class="first__hr" />
    <div class="first__content">
      <div class="first__nums">
        <div class="first__nums-left">
          <div class="first__nums-block">
            <div>机器人总数<br />{{ analyseData.robotNum }}</div>
          </div>
          <div class="first__nums-block">
            <div>机器人任务总数<br />{{ analyseData.taskNum }}</div>
          </div>
        </div>
        <div class="first__nums-right">
          <div class="first__nums-analyse">
            <div class="first__nums-analyse-item">
              手术记录总数 {{ analyseData["scheduleNum"] }} 个
            </div>
            <div class="first__nums-analyse-item">
              任务处理比率 {{ analyseData["taskRate"] }}
            </div>
            <div class="first__nums-analyse-item">
              机器人利用率 {{ analyseData["robotUseRate"] }}
            </div>
          </div>
          <div class="first__nums-progress">
            <div class="first__nums-progress-item">
              进行中
              <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="
                  (analyseData.runningNum / analyseData.taskNum) * 100
                "
                :format="formatProgress"
              />
            </div>
            <div class="first__nums-progress-item">
              已完成
              <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="
                  (analyseData.completedNum / analyseData.taskNum) * 100
                "
                status="success"
                :format="formatDone"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="first__charts">
        <div class="first__charts-left">
          <BaseChartsVue
            :height="'400px'"
            :width="'700px'"
            :options="optionsBar"
          ></BaseChartsVue>
        </div>
        <div class="first__charts-right">
          <BaseChartsVue
            :height="'400px'"
            :width="'700px'"
            :options="optionsPie"
          ></BaseChartsVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated, onUnmounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import BaseChartsVue from "../components/BaseCharts.vue";
import service from "../utils/request";
import { ElMessage } from "element-plus";

const store = useStore();
const appConfig = store.state.appConfig;
const queryParams = reactive({
  year: "",
  hospitalId: "",
});
const analyObj = { a: 1, b: 2, c: 3 };
const hosOptions = reactive([]);
const optionsBar = reactive({
  type: "bar",
  title: {
    text: "机器人任务总数科室排行",
  },
  legend: {
    display: false,
  },
  bgColor: "#fbfbfb",
  labels: ["周一", "周二", "周三", "周四", "周五"],
  datasets: [
    {
      // fillColor: "rgba(241, 49, 74, 0.5)",
      data: [234, 278, 270, 190, 230],
    },
  ],
});
const optionsPie = reactive({
  type: "pie",
  title: {
    text: "机器人任务总数机构排行",
  },
  legend: {
    position: "bottom",
  },
  bgColor: "#fbfbfb",
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      data: [334, 278, 190, 235, 260, 200, 141],
    },
  ],
});

const analyseData = reactive({
  robotNum: "1",
  taskNum: "1",
  scheduleNum: "1",
  taskRate: "1",
  robotUseRate: "1",
  runningNum: "1",
  completedNum: "1",
  deptRank: {
    mapKey: {},
  },
  taskRank: {
    mapKey: {},
  },
});

const formatProgress = (percentage) => {
  return analyseData.runningNum;
};
const formatDone = (percentage) => {
  return analyseData.completedNum;
};

const query = () => {
  service.post("indexPage", queryParams).then(
    (res) => {
      if (res.success) {
        analyseData.data = res.data;
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

service.post("hospitalPage", { status: 1, page: { size: 999 } }).then((res) => {
  let ar = res.data?.records.map((item) => {
    return { value: item.hospitalId, label: item.hospitalName };
  });
  hosOptions.splice(0, 0, ...ar);
});

query(); //初始化查询
onActivated(() => {});
onDeactivated(() => {});
onUnmounted(() => {
  console.log("first销毁组件");
});
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .first__content {
    height: 100%;
    .first__nums {
      display: flex;
      height: 300px;
      margin-bottom: 10px;
      .first__nums-left {
        width: 400px;
        font-size: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .first__nums-block {
          background: url(../assets/img/home/robot/robot1.svg) no-repeat center;
          background-size: 100% 100%;
          color: #fff;
          display: flex;
          height: 130px;
          width: 350px;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          span {
            vertical-align: middle;
          }
        }
      }

      .first__nums-right {
        width: calc(100% - 400px);
        .first__nums-analyse {
          height: 50%;
          text-align: center;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .first__nums-analyse-item {
            width: 32%;
            height: 130px;
            line-height: 130px;
            font-size: 25px;
            text-align: center;
            background: white;
            box-shadow: 10px 10px 5px #a0a0a0;
          }
        }
        .first__nums-progress {
          height: 50%;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .first__nums-progress-item {
            font-size: 15px;
            .el-progress--line {
              display: inline-block;
              vertical-align: middle;
              width: 95%;
            }
          }
        }
      }
    }
    .first__charts {
      height: calc(100% - 300px);
      background: khaki;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .first__charts-left {
        width: 50%;
        height: 100%;
      }
      .first__charts-right {
        width: 50%;
        height: 100%;
      }
    }
  }
}
.first__hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
.first__select {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 20px;

  .el-select {
    vertical-align: middle;
  }
}
.first__select-hos {
  margin-left: 50px;
}
</style>
