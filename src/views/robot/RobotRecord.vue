<!--
 * @Author: berg yu
 * @Date: 2023-08-09 16:36:57
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 16:27:07
 * @Description: 请填写简介
-->
<template>
  <div class="container">
    <div class="robot-record__header">
      <div class="robot-record__query">
        手术名称：
        <el-input v-model="queryParams.surgeryName" placeholder="请输入" />
      </div>
      <div class="robot-record__query">
        手术类型：
        <!-- multiple
          collapse-tags
          collapse-tags-tooltip -->
        <el-select :clearable="true" v-model="queryParams.surgeryType" :max-collapse-tags="2" placeholder="请选择">
          <el-option v-for="item in surgeryTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="robot-record__query">
        手术医生：
        <el-input v-model="queryParams.surgeryDoctor" placeholder="请输入" />
      </div>
      <div class="robot-record__query">
        手术医院：
        <el-select :clearable="true" v-model="queryParams.hospitalId" placeholder="请选择">
          <el-option v-for="item in hosOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-button type="primary" @click="query()"> 查询 </el-button>
    </div>
    <hr class="robot-record__hr" />
    <div>
      <div class="robot-record__content-btn">
        <el-button type="primary" @click="addRecord()">
          <el-icon>
            <Plus />
          </el-icon> 新增
        </el-button>
        <el-button type="primary" :disabled="!delArr.length" @click="deleteRecord()">
          删除
        </el-button>
      </div>
      <div>
        <BaseTable :tableParams="newDt" :columns="newDt.cols" :tableData="newDt.value" :pageParam="newDt.pm"
          @selectionChange="selectionChange" @currentChange="newDt.onPage($event)" @sizeChange="newDt.onSize($event)">
          <template #custome="{ item }">
            <el-table-column v-if="item.prop == 'operator'" :prop="item.prop" :label="item.label" width="180"
              align="center">
              <template #default="scope">
                <el-button type="text" @click="handleEdit(scope.row)"> <el-icon>
                    <Edit />
                  </el-icon>编辑
                </el-button>
                <el-button type="text" @click="handleDetail(scope.row)"> <el-icon>
                    <View />
                  </el-icon>详情
                </el-button>
                <el-button v-if="scope.row['distributeFlag'] == 0" type="text" @click="distributeRobot(scope.row)">
                  <el-icon>
                    <Box />
                  </el-icon>分配手术机器人
                </el-button>
                <el-button v-else type="text" @click="goTask(scope.row)"> <el-icon>
                    <Search />
                  </el-icon>查看任务
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

  <el-dialog v-model="patchVisible" @close="resetForm(ruleFormRef)" title="手术记录新增or编辑" top="5vh">
    <el-form ref="ruleFormRef" :inline="false" :model="addParams" :rules="rules" label-width="120px" class="demo-ruleForm"
      status-icon>
      <el-form-item label="手术名称" prop="surgeryName">
        <el-input v-model="addParams.surgeryName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="手术类型" prop="surgeryType">
        <el-select value-key="value" placeholder="请选择" v-model="addParams.surgeryType">
          <el-option v-for="item in surgeryTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="手术医生" prop="surgeryDoctor">
        <el-input v-model="addParams.surgeryDoctor" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="addParams.patientName" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="患者身份证号" prop="patientIdCard">
        <el-input v-model="addParams.patientIdCard" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="患者性别/年龄" prop="patientAge" class="record-form__item">
        <el-select value-key="value" placeholder="请选择" v-model="addParams.patentGender">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="addParams.patientAge" type="number" placeholder="请输入患者年龄" />
      </el-form-item>
      <el-form-item label="医院" prop="hospitalId">
        <el-select value-key="value" placeholder="请选择" v-model="addParams.hospitalId">
          <el-option v-for="item in hosOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="科室" prop="department">
        <el-input v-model="addParams.department" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="主要诊断" prop="diagnosis">
        <el-input v-model="addParams.diagnosis" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          placeholder="请输入..." />
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="detailVisible">
    <el-descriptions title="手术信息">
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
      <el-descriptions-item label="手术科室">{{
        showDetail['recordDetail']['department']
      }}</el-descriptions-item>
      <el-descriptions-item label="身份证号">{{
        showDetail['recordDetail']['patientIdCard']
      }}</el-descriptions-item>
      <el-descriptions-item label="主要诊断：">{{
        showDetail['recordDetail']['diagnosis']
      }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="机器人信息" v-if="!!showDetail['recordDetail']['distributeFlag']">
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
  </el-dialog>

  <el-dialog v-model="distributeVisible" width="30%">
    <div class="robot-record__query" style="text-align: center;">
      手术机器人：
      <el-select v-model="distributeRobotId" placeholder="请选择">
        <el-option v-for="item in robotOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :disabled="!distributeRobotId" @click="confirmDistri()">
          确认分配
        </el-button>
        <el-button @click="distributeVisible = false">取消</el-button>
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
import { adeptOptions, genderOptions, surgeryTypeOptions } from '~/api/mock'

type FormInstance = InstanceType<typeof ElForm>

const ruleFormRef = ref<FormInstance>()

const newDt = reactive(
  new WNewTable({
    url: 'surgerySchedulePage',
    method: 'POST',
    fromBack: true,
    cols: [
      {
        prop: 'selection',
        label: '全选'
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
        prop: 'surgeryDoctor',
        label: '手术医生'
      },
      {
        prop: 'patientName',
        label: '患者姓名'
      },
      {
        prop: 'patentGender',
        label: '患者性别/年龄'
      },
      {
        prop: 'department',
        label: '手术科室'
      },
      {
        prop: 'distributeFlag',
        label: '分配机器人状态'
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

const patchVisible = ref(false)
const detailVisible = ref(false)
const distributeVisible = ref(false)

const showDetail: Object = reactive({
  recordDetail: []
})

let addParams = reactive({
  surgeryId: '',
  surgeryName: null,
  surgeryType: '0',
  surgeryDoctor: '',
  patientName: '',
  patientAge: '',
  patentGender: '0',
  hospitalId: '',
  department: '',
  diagnosis: '',
  patientIdCard: '',
})
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入年龄'))
  }
  if (!Number.isInteger(Number(value))) {
    callback(new Error('请输入数字'))
  } else {
    if (value < 0 || value > 150) {
      callback(new Error('年龄输入不符'))
    } else {
      callback()
    }
  }
}
const rules = reactive({
  surgeryName: [{ required: true, message: '请输入手术名称', trigger: 'blur' }],
  surgeryType: [
    {
      required: true
    }
  ],
  surgeryDoctor: [
    {
      required: true,
      message: '请输入手术医生',
      trigger: 'blur'
    }
  ],
  patientName: [
    {
      required: true,
      message: '请输入患者姓名',
      trigger: 'blur'
    }
  ],
  patientAge: [
    {
      validator: checkAge,
      trigger: 'blur',
    }
  ],
  patientIdCard: [
    {
      required: true,
      message: '请输入患者身份证号',
      trigger: 'blur'
    }
  ],
  hospitalId: [
    {
      required: true,
      message: '请选择医院',
      trigger: 'change'
    }
  ], department: [
    {
      required: true,
      message: '请输入科室',
      trigger: 'blur'
    }
  ]
})

const delArr: Array<string> = reactive([]);

const hosOptions: Array<{ value: any, label: any }> = reactive([])
const queryParams = reactive({
  surgeryName: '',
  surgeryDoctor: '',
  surgeryType: '',
  hospitalId: ''
})

service.post('hospitalPage', { status: 1, page: { size: 999 } }).then((res) => {
  let ar = res.data?.records.map((item) => {
    return { value: item.hospitalId, label: item.hospitalName }
  })
  hosOptions.splice(0, 0, ...ar)
})
const robotOptions: Array<{ value: any, label: any }> = reactive([])
const distributeRobotId = ref('');
const distributeRecordId = ref('');

const query = () => {
  const params = clearNoValidProp(queryParams)
  newDt.params = params
  newDt.loadData()
}

const deleteRecord = () => {
  //@ts-ignore
  ElMessageBox({
    title: '删除机器人',
    message: '确认删除选中机器人吗？',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '删除中...'
        service
          .post('removeSurgerySchedule', JSON.stringify(delArr), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(
            (res: Object) => {
              if (res['success']) {
                done()
                instance.confirmButtonLoading = false
                //@ts-ignore
                ElMessage({
                  message: '删除成功',
                  type: 'success'
                })
                query()
              } else {
                done()
                instance.confirmButtonLoading = false
                //@ts-ignore
                ElMessage({
                  message: '删除失败',
                  type: 'error'
                })
              }
            },
            (err: Error) => {
              done()
              instance.confirmButtonLoading = false
              //@ts-ignore
              ElMessage({
                message: err.message,
                type: 'error'
              })
            }
          )
      } else {
        instance.confirmButtonLoading = false
        done()
      }
    }
  })
}
const distributeRobot = (evt) => {
  service
    .post('robotPage', { maintenanceStatus: 0, page: { size: 999 } })
    .then((res) => {
      let ar = res.data?.records.map((item) => {
        return { value: item.robotId, label: item.robotName }
      })
      robotOptions.splice(0, 0, ...ar)
      distributeVisible.value = true;
      distributeRecordId.value = evt.surgeryId;
    })
}

const confirmDistri = () => {
  service.post('surgeryScheduleAllocate', {
    "robotId": distributeRobotId.value,
    "surgeryId": distributeRecordId.value,
  }).then((res) => {
    if (res['success']) {
      //@ts-ignore
      ElMessage({
        message: '分配成功',
        type: 'success'
      })
      distributeVisible.value = false;
      distributeRecordId.value = '';
      query()
    } else {
      //@ts-ignore
      ElMessage({
        message: '删除失败',
        type: 'error'
      })
    }
  }).catch(err => {
    //@ts-ignore
    ElMessage({
      message: err.message,
      type: 'error'
    })
  })
}

const goTask = (evt) => {

}

const selectionChange = (data) => {
  const tranD = data.map((item) => item.robotId)
  delArr.splice(0, delArr.length, ...tranD)
  console.log('selectionChange', delArr)
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const param = clearNoValidProp(addParams)
      service.post('surgeryScheduleChange', param).then(
        (res: Object) => {
          if (res['success']) {
            //@ts-ignore
            ElMessage({
              message: param.robotId ? '编辑成功' : '新增成功',
              type: 'success'
            })
            query()
          } else {
            //@ts-ignore
            ElMessage({
              message: param.robotId ? '编辑失败' : '新增失败',
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
      formEl.resetFields()
      patchVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  patchVisible.value = false
}

const addRecord = () => {
  patchVisible.value = true
}

const handleEdit = (row) => {
  patchVisible.value = true
  nextTick(() => {
    // 避免dialog未渲染完就回显数据
    for (const key in addParams) {
      if (Object.prototype.hasOwnProperty.call(addParams, key)) {
        addParams[key] = row[key]
      }
    }
  })
}

const handleDetail = (row) => {
  detailVisible.value = true
  showDetail['recordDetail'] = row;
  showDetail['recordDetail']['adeptName'] = adeptOptions.find(
    (item) => item.value == row['adeptId']
  )?.label
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

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
