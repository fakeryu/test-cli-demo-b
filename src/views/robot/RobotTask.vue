<!--
 * @Author: berg yu
 * @Date: 2023-08-09 16:36:57
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 17:43:27
 * @Description: 请填写简介
-->
<template>
  <div class="container">
    <div class="robot-record__header">
      <div class="robot-record__query">
        机器人编码：
        <el-input v-model="queryParams.robotCode" placeholder="请输入" />
      </div>
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
      <div class="robot-record__query">
        机器人名称：
        <el-input v-model="queryParams.robotName" placeholder="请输入" />
      </div>
      <div class="robot-record__query">
        任务状态：
        <el-select :clearable="true" v-model="queryParams.status" :max-collapse-tags="2" placeholder="请选择">
          <el-option v-for="item in taskOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="robot-record__query">
        手术医院：
        <el-select :clearable="true" v-model="queryParams.hospitalId" :max-collapse-tags="2" placeholder="请选择">
          <el-option v-for="item in hosOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="robot-record__query">
        手术医生：
        <el-input v-model="queryParams.surgeryDoctor" placeholder="请输入" />
      </div>
      <div class="robot-record__query">
        患者年龄：
        <el-input v-model="queryParams.patientAge" placeholder="请输入" />
      </div>
      <div class="robot-record__query">
        患者性别：
        <el-select :clearable="true" value-key="value" placeholder="请选择" v-model="queryParams.patentGender">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button type="primary" @click="query()"> 查询 </el-button>
    </div>
    <hr class="robot-record__hr" />
    <div>
      <div>
        <BaseTable :tableParams="newDt" :columns="newDt.cols" :tableData="newDt.value" :pageParam="newDt.pm"
          @currentChange="newDt.onPage($event)" @sizeChange="newDt.onSize($event)">
          <template #custome="{ item }">
            <el-table-column v-if="item.prop == 'operator'" :prop="item.prop" :label="item.label" width="180"
              align="center">
              <template #default="scope">
                <el-button type="text" @click="handleDetail(scope.row)"><el-icon>
                    <Search />
                  </el-icon> 查看详情
                </el-button>
              </template>
            </el-table-column>
            <el-table-column v-else-if="item.prop == 'distributeFlag'" :prop="item.prop" :label="item.label" width="180"
              align="center">
              <template #default="scope">
                {{ scope.row[item.prop] == 0 ? '未分配' : '已分配' }}
              </template>
            </el-table-column>
            <el-table-column v-else :prop="item.prop" :label="item.label" :width="item.width || null"
              align="center"></el-table-column>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
  <el-dialog v-model="detailVisible" :fullscreen="true" :show-close="false">
    <el-descriptions title="任务信息" size="large">
      <el-descriptions-item label="任务编码：">{{
        showDetail['recordDetail']['taskNo']
      }}</el-descriptions-item>
      <el-descriptions-item label="任务开始时间：">{{
        showDetail['recordDetail']['startTime']
      }}</el-descriptions-item>
      <el-descriptions-item label="任务结束时间：">{{
        showDetail['recordDetail']['endTime']
      }}</el-descriptions-item>
      <el-descriptions-item label="任务状态：">{{
        showDetail['recordDetail']['status']
      }}</el-descriptions-item>
      <el-descriptions-item label="任务创建时间：">{{
        showDetail['recordDetail']['createTime']
      }}</el-descriptions-item>
      <el-descriptions-item v-if="showDetail['recordDetail']['status'] == '已取消'" label="取消原因：">{{
        showDetail['recordDetail']['cancelRemark']
      }}</el-descriptions-item>
    </el-descriptions>
    <hr>
    <el-descriptions title="机器人信息" size="large">
      <el-descriptions-item label="机器人编码：">{{
        showDetail['recordDetail']['robotCode']
      }}</el-descriptions-item>
      <el-descriptions-item label="机器人名称：">{{
        showDetail['recordDetail']['robotName']
      }}</el-descriptions-item>
      <el-descriptions-item label="机器人型号：">{{
        showDetail['recordDetail']['robotModel']
      }}</el-descriptions-item>
      <el-descriptions-item label="所属机构：">{{
        showDetail['recordDetail']['manufacturerName']
      }}</el-descriptions-item>
      <el-descriptions-item label="擅长手术：">{{
        showDetail['recordDetail']['adeptName']
      }}</el-descriptions-item>
    </el-descriptions>
    <hr>
    <el-descriptions title="手术记录信息" size="large">
      <el-descriptions-item label="手术名称：">{{
        showDetail['recordDetail']['surgeryName']
      }}</el-descriptions-item>
      <el-descriptions-item label="手术类型：">{{
        showDetail['recordDetail']['surgeryType']
      }}</el-descriptions-item>
      <el-descriptions-item label="手术医生：">{{
        showDetail['recordDetail']['surgeryDoctor']
      }}</el-descriptions-item>
      <el-descriptions-item label="患者姓名：">{{
        showDetail['recordDetail']['patientName']
      }}</el-descriptions-item>
      <el-descriptions-item label="患者性别：">{{
        showDetail['recordDetail']['patentGender']
      }}</el-descriptions-item>
      <el-descriptions-item label="患者年龄：">{{
        showDetail['recordDetail']['patientAge']
      }}</el-descriptions-item>
      <el-descriptions-item label="手术医院：">{{
        showDetail['recordDetail']['hospitalName']
      }}</el-descriptions-item>
      <el-descriptions-item label="手术科室：">{{
        showDetail['recordDetail']['department']
      }}</el-descriptions-item>
      <el-descriptions-item label="身份证号：">{{
        showDetail['recordDetail']['patientIdCard']
      }}</el-descriptions-item>
      <el-descriptions-item label="主要诊断：">{{
        showDetail['recordDetail']['diagnosis']
      }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <!-- 1、若状态为：”未开始“，显示【开始任务】按钮，隐藏【完成任务】和【取消任务】按钮。
                     0-未开始 1-已取消,2-进行中(开始任务),3-已完成
      2、若任务状态为：”进行中“，显示【完成任务】和【取消任务】按钮，隐藏【开始任务】按钮。

      3、若任务状态为：”已完成“、”已取消“，隐藏【开始任务】、【完成任务】、【取消任务】3个按钮。 -->
      <div class="dialog-footer">
        <span v-if="showDetail['recordDetail']['status'] != '已取消' || showDetail['recordDetail']['status'] != '已完成'">
          <el-button type="primary" v-if="showDetail['recordDetail']['status'] == '未开始'" @click="changeTask('进行中')">
            开始任务
          </el-button>
          <el-button type="success" v-if="showDetail['recordDetail']['status'] == '进行中'" @click="changeTask('已完成')">
            完成任务
          </el-button>
          <el-button type="warning" v-if="showDetail['recordDetail']['status'] == '进行中'" @click="changeTask('已取消')">
            取消任务
          </el-button>
        </span>
        <span class="task-item__back">
          <el-button @click="goBack">
            返回
          </el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onActivated, onDeactivated, reactive, ref } from 'vue'
import BaseTable from '~/components/BaseTable.vue'
import service from '../../utils/request'
import { Page } from '~/models/page'
import { WNewTable } from '~/models/w-table'
import { clearNoValidProp } from '~/utils/tools'
import type { ElForm } from 'element-plus'
import { taskOptions, surgeryTypeOptions, adeptOptions } from '~/api/mock'
import { genderOptions } from '~/api/mock'

const newDt = reactive(
  new WNewTable({
    url: 'robotTaskPage',
    method: 'POST',
    fromBack: true,
    cols: [
      {
        prop: 'taskNo',
        label: '任务编号'
      },
      {
        prop: 'surgeryName',
        label: '手术名称'
      },
      {
        prop: 'surgeryType',
        label: '手术类型'
      },
      {
        prop: 'hospitalName',
        label: '手术医院'
      },
      {
        prop: 'robotName',
        label: '机器人名称'
      },
      {
        prop: 'createTime',
        label: '任务创建时间'
      },
      {
        prop: 'status',
        label: '任务状态'
      },
      {
        prop: 'operator',
        label: '操作'
      }
    ],
    pm: new Page({
      current: 1,
      sizes: [10, 20, 30, 40, 50]
    })
  })
)

const detailVisible = ref(false)

const showDetail: Object = reactive({
  recordDetail: []
})

const hosOptions: Array<{ value: any, label: any }> = reactive([])
const queryParams = reactive({
  robotCode: '',
  surgeryType: '',
  taskDate: '',
  robotName: '',
  status: '',
  hospitalId: '',
  surgeryDoctor: '',
  patientAge: '',
  patentGender: ''
})

service.post('hospitalPage', { status: 1, page: { size: 999 } }).then((res) => {
  let ar = res.data?.records.map((item) => {
    return { value: item.hospitalId, label: item.hospitalName }
  })
  hosOptions.splice(0, 0, ...ar)
})

const query = () => {
  const params = clearNoValidProp(queryParams)
  if (params.taskDate && params.taskDate.length) {
    params.taskStartTime = params.taskDate[0];
    params.taskEndTime = params.taskDate[1];
  }
  newDt.params = params
  newDt.loadData()
}

const goBack = () => {
  detailVisible.value = false
  query();
}

const handleDetail = (row) => {
  detailVisible.value = true
  showDetail['recordDetail'] = row;
  showDetail['recordDetail']['adeptName'] = adeptOptions.find(
    (item) => item.value == row['adeptId']
  )?.label
}

/**
 * 
 * @param type 0-未开始 1-已取消,2-进行中(开始任务),3-已完成
 */
const changeTask = (type) => {
  if (type == '已取消') {
    sendService(type);
    return
  }
  if (type == '进行中') {
    //@ts-ignore
    ElMessageBox.confirm(
      '确认完成该任务？',
      '完成任务',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        sendService(type)
      })
    return
  }
  //@ts-ignore
  ElMessageBox.prompt('取消原因', '取消任务', {
    confirmButtonText: '确认取消',
    cancelButtonText: '取消',
    // inputPattern:
    //   /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    // inputErrorMessage: 'Invalid Email',
  })
    .then(({ value }) => {
      sendService(type, value)
    })


}
const sendService = (type, msg?) => {
  const param = clearNoValidProp({
    "taskId": showDetail['recordDetail']['taskId'],
    "robotId": showDetail['recordDetail']['robotId'],
    "surgeryId": showDetail['recordDetail']['surgeryId'],
    "taskNo": showDetail['recordDetail']['taskNo'],
    "status": type,
    "cancelRemark": msg,
  })
  service.post('robotTaskChange', param).then(
    (res: Object) => {
      if (res['success']) {
        //@ts-ignore
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        showDetail['recordDetail']['status'] = type;
        detailVisible.value = false
      } else {
        //@ts-ignore
        ElMessage({
          message: `${type == 1 ? '取消' : type == 2 ? '开始' : '完成'}任务失败`,
          type: 'error'
        })
      }
    },
    (err: Error) => {
      //@ts-ignore
      ElMessage({
        message: err.message,
        type: 'error'
      })
    }
  )
}
onActivated(() => { })
onDeactivated(() => { })
</script>

<style scoped lang="scss">
.container {
  height: 100%;

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

.robot-record__content-btn {
  margin-bottom: 10px;
}

.robot-record__hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

.record-form__item :deep(.el-form-item__content) {
  display: flex;
}

.task-item__back {
  display: inline-block;
  margin-left: 15px;
}
</style>
