<!--
 * @Author: berg yu
 * @Date: 2022-07-06 09:14:19
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 17:40:15
 * @Description: 请填写简介
-->
<template>
	<div class="container">
		<div class="robot-record__header">
			<div class="robot-record__query">
				手术类型：
				<el-select :clearable="true" v-model="queryParams.surgeryType" :max-collapse-tags="2" placeholder="请选择">
					<el-option v-for="item in surgeryTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
			<div class="robot-record__query">
				任务日期：
				<el-date-picker v-model="queryParams.taskDate" type="daterange" value-format="YYYY-MM-DD" range-separator="~"
					start-placeholder="开始日期" end-placeholder="结束日期" />
			</div>
			<el-button type="primary" @click="query()"> 查询 </el-button>
		</div>
		<hr class="first__hr" />
		<div class="first__content">
			<div class="first__charts">
				<div class="first__charts-left">
					<BaseChartsVue :height="'400px'" :width="'700px'" :options="optionsBar"></BaseChartsVue>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onActivated, onDeactivated, onUnmounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import BaseChartsVue from "~/components/BaseCharts.vue";
import service from "~/utils/request";
import { ElMessage } from "element-plus";
import { surgeryTypeOptions } from "~/api/mock";

const store = useStore();
const appConfig = store.state.appConfig;
const queryParams = reactive({
	surgeryType: "",
	taskDate: "",
});

const optionsBar = reactive({
	type: "bar",
	title: {
		text: "机器人任务总数医院排行",
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

const query = () => {
	service.post("indexPage", queryParams).then(
		(res) => {
			if (res.success) {
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

query(); //初始化查询
onActivated(() => { });
onDeactivated(() => { });
onUnmounted(() => {
	console.log("first销毁组件");
});
</script>

<style scoped lang="scss">
.container {
	height: 100%;

	.first__content {
		height: 100%;

		.first__charts {
			height: calc(100% - 300px);
			display: flex;
			justify-content: flex-start;
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

	.robot-record__header {
		display: inline-flex;
		justify-content: flex-start;
		align-items: baseline;
		flex-wrap: wrap;
		font-size: 15px;

    .robot-record__query {
      width: 450px;
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
