<!--
 * @Author: berg yu
 * @Date: 2023-08-09 16:36:57
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-18 16:56:10
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
        <el-input v-model="queryParams.robotCode" placeholder="请输入" />
      </div>
      <div class="robot-message__query">
        运维状态：
        <!-- multiple
          collapse-tags
          collapse-tags-tooltip -->
        <el-select
          :clearable="true"
          v-model="queryParams.maintenanceStatus"
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
        <el-select
          :clearable="true"
          v-model="queryParams.manufacturerId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in orgOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="robot-message__query">
        创建时间：
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="请选择"
        />
      </div>
      <el-button type="primary" size="small" @click="query()"> 查询 </el-button>
    </div>
    <hr class="robot-message__hr" />
    <div>
      <div class="robot-message__content-btn">
        <el-button type="primary" size="small" @click="addRobot()">
          <i class="el-icon-plus" /> 新增
        </el-button>
        <el-button
          type="primary"
          :disabled="!delArr.length"
          size="small"
          @click="deleteData()"
        >
          删除
        </el-button>
      </div>
      <div>
        <BaseTable
          :tableParams="newDt"
          :columns="newDt.cols"
          :tableData="newDt.value"
          :pageParam="newDt.pm"
          @selectionChange="selectionChange"
          @currentChange="newDt.onPage($event)"
          @sizeChange="newDt.onSize($event)"
        >
          <template #operator="slotProps">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(slotProps.scope.row)"
              >编辑
            </el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleDetail(slotProps.scope.row)"
              >查看
            </el-button></template
          >
        </BaseTable>
      </div>
    </div>
  </div>

  <el-dialog v-model="patchVisible" title="机器人新增or编辑">
    <el-form
      ref="ruleFormRef"
      :model="addParams"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="机器人名称" prop="robotName">
        <el-input v-model="addParams.robotName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="机器人型号" prop="robotCode">
        <el-input v-model="addParams.robotCode" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="机器人编码" prop="robotModel">
        <el-input v-model="addParams.robotModel" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="所属机构" prop="manufacturerId">
        <el-select
          @change="manufacturerChange"
          value-key="value"
          placeholder="请选择"
          v-model="addParams.manufacturerId"
        >
          <el-option
            v-for="item in orgOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="擅长手术" prop="adeptId">
        <el-select
          value-key="value"
          placeholder="请选择"
          v-model="addParams.adeptId"
        >
          <el-option
            v-for="item in adeptOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="addParams.remark"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入..."
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog v-model="detailVisible">
    <el-descriptions title="基础信息">
      <el-descriptions-item label="机器人编码：">{{
        showDetail['robotCode']
      }}</el-descriptions-item>
      <el-descriptions-item label="机器人名称：">{{
        showDetail['robotName']
      }}</el-descriptions-item>
      <el-descriptions-item label="机器人型号：">{{
        showDetail['robotModel']
      }}</el-descriptions-item>
      <el-descriptions-item label="所属机构：">{{
        showDetail['manufacturerName']
      }}</el-descriptions-item>
      <el-descriptions-item label="运维状态：">{{
        showDetail['maintenanceStatus']
      }}</el-descriptions-item>
      <el-descriptions-item label="创建时间：">{{
        showDetail['createTime']
      }}</el-descriptions-item>
      <el-descriptions-item label="擅长手术：">{{
        showDetail['adeptName']
      }}</el-descriptions-item>
      <el-descriptions-item label="备注：">{{
        showDetail['remark']
      }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onActivated, onDeactivated, reactive, ref } from 'vue'
import BaseTable from '~/components/BaseTable.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import service from '~/utils/request'
import { clearNoValidProp } from '~/utils/tools'
import type { ElForm } from 'element-plus'
import { Page } from '~/models/page'
import { WNewTable } from '~/service/w-table'

const options = [
  {
    value: 1,
    label: '使用中'
  },
  {
    value: 0,
    label: '空闲'
  }
]

const tableData: Object[] = reactive([])
const pageParam: Page = reactive({
  pages: 1,
  total: 1,
  size: 10,
  current: 1
})
const queryParams = reactive({
  robotCode: '',
  robotName: '',
  robotModel: '',
  manufacturerId: '',
  maintenanceStatus: '',
  createTime: ''
})

let addParams = reactive({
  robotId: null,
  robotCode: '',
  robotName: '',
  robotModel: '',
  manufacturerId: '',
  maintenanceStatus: 0,
  adeptId: '',
  remark: ''
})

const newDt = reactive(
  new WNewTable({
    url: 'robotPage',
    method: 'POST',
    fromBack: true,
    cols: [
      {
        prop: 'selection',
        label: '全选'
      },
      {
        prop: 'robotCode',
        label: '机器人编码'
      },
      {
        prop: 'robotName',
        label: '机器人名称'
      },
      {
        prop: 'robotModel',
        label: '机器人型号'
      },
      {
        prop: 'manufacturerName',
        label: '所属机构'
      },
      {
        prop: 'maintenanceStatus',
        label: '运维状态'
      },
      {
        prop: 'createTime',
        label: '创建时间'
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

type FormInstance = InstanceType<typeof ElForm>
const rules = reactive({
  robotCode: [{ required: true, message: '请输入机器人编码', trigger: 'blur' }],
  robotName: [
    {
      required: true,
      message: '请输入机器人名称',
      trigger: 'blur'
    }
  ],
  robotModel: [
    {
      required: true,
      message: '请输入机器人型号',
      trigger: 'blur'
    }
  ],
  manufacturerId: [
    {
      required: true,
      message: '请选择所属机构',
      trigger: 'change'
    }
  ],
  adeptId: [
    {
      required: true,
      message: '请选择擅长手术',
      trigger: 'change'
    }
  ]
})
const adeptOptions = [
  { value: 1, label: '腔镜手术' },
  { value: 2, label: '骨科手术' },
  { value: 3, label: '开颅手术' }
]
const ruleFormRef = ref<FormInstance>()
const orgOptions: Array<{ value: string; label: string }> = reactive([])
const patchVisible = ref(false)
const detailVisible = ref(false)
let showDetail: Object = reactive({
  createTime: '',
  robotCode: '',
  robotName: '',
  robotModel: '',
  manufacturerName: '.luettgen',
  maintenanceStatus: '',
  adeptName: '',
  remark: ''
})
service
  .post('manufacturerPage', { status: 1, page: { size: 999 } })
  .then((res) => {
    let ar = res.data?.records.map((item) => {
      return { value: item.manufacturerId, label: item.manufacturerName }
    })
    orgOptions.splice(0, 0, ...ar)
  })

const query = () => {
  const params = clearNoValidProp(queryParams)
  newDt.params = params
  newDt.loadData()
}

const delArr: Array<string> = reactive([])
const deleteData = () => {
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
          .post('removeRobot', JSON.stringify(delArr), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(
            (res: Object) => {
              if (res['success']) {
                done()
                instance.confirmButtonLoading = false
                ElMessage({
                  message: '删除成功',
                  type: 'success'
                })
                query()
              } else {
                done()
                instance.confirmButtonLoading = false
                ElMessage({
                  message: '删除失败',
                  type: 'error'
                })
              }
            },
            (err: Error) => {
              done()
              instance.confirmButtonLoading = false
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
// 删除操作
const handleDelete = (index) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('删除成功')
      // tableData.splice(index, 1)
    })
    .catch(() => {})
}

const manufacturerChange = (val) => {
  addParams.manufacturerId = val
}

const selectionChange = (data) => {
  const tranD = data.map((item) => item.robotId)
  delArr.splice(0, delArr.length, ...tranD)
  console.log('selectionChange', delArr)
}

const addRobot = () => {
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
  nextTick(() => {
    for (const key in showDetail) {
      if (Object.prototype.hasOwnProperty.call(showDetail, key)) {
        if (row[key]) {
          showDetail[key] = row[key]
        }
      }
    }
    showDetail['adeptName'] = adeptOptions.find(
      (item) => item.value == showDetail['adeptId']
    )?.label
    console.log(showDetail)
  })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const param = clearNoValidProp(addParams)
      service.post('robotChange', param).then(
        (res: Object) => {
          if (res['success']) {
            ElMessage({
              message: param.robotId ? '编辑成功' : '新增成功',
              type: 'success'
            })
            query()
          } else {
            ElMessage({
              message: param.robotId ? '编辑失败' : '新增失败',
              type: 'error'
            })
          }
        },
        (err: Error) => {
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
  addParams.robotId = null
  formEl.resetFields()
  patchVisible.value = false
}

onActivated(() => {})
onDeactivated(() => {})
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
