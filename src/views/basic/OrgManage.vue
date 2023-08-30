<!--
 * @Author: berg yu
 * @Date: 2023-08-09 16:36:57
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 17:47:11
 * @Description: 请填写简介
-->
<template>
  <div class="container">
    <div class="robot-record__header">
      <div class="robot-record__query">
        机构名称：
        <el-input v-model="queryParams.manufacturerName" placeholder="请输入" />
      </div>
      <div class="robot-record__query">
        状态：
        <el-select :clearable="true" v-model="queryParams.status" :max-collapse-tags="2" placeholder="请选择">
          <el-option v-for="item in enableOptions" :key="item.value" :label="item.label" :value="item.value" />
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
      </div>
      <div>
        <BaseTable :tableParams="newDt" :columns="newDt.cols" :tableData="newDt.value" :pageParam="newDt.pm"
          @currentChange="newDt.onPage($event)" @sizeChange="newDt.onSize($event)">
          <template #custome="{ item }">
            <el-table-column v-if="item.prop == 'operator'" :prop="item.prop" :label="item.label" width="180"
              align="center">
              <template #default="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑
                </el-button>
                <el-button type="text" icon="el-icon-edit" @click="deleteRecord(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column v-else-if="item.prop == 'status'" :prop="item.prop" :label="item.label" width="180"
              align="center">
              <template #default="scope">
                <el-switch v-model="scope.row.status" active-value="启用" inactive-value="禁用"
                  @change="changeStatus(scope.row, scope.row.status)" />
              </template>
            </el-table-column>
            <el-table-column v-else :prop="item.prop" :label="item.label" :width="item.width || null"
              align="center"></el-table-column>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>

  <el-dialog v-model="patchVisible" @close="resetForm(ruleFormRef)" title="机构新增or编辑" top="10vh">
    <el-form ref="ruleFormRef" :inline="false" :model="addParams" :rules="rules" label-width="120px" class="demo-ruleForm"
      status-icon>
      <el-form-item label="机构名称" prop="hospitalName">
        <el-input v-model="addParams.manufacturerName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="addParams.status" :max-collapse-tags="2" placeholder="请选择">
          <el-option v-for="item in enableOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="addParams.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          placeholder="请输入..." />
      </el-form-item>
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
</template>

<script setup lang="ts">
import { nextTick, onActivated, onDeactivated, reactive, ref } from 'vue'
import BaseTable from '~/components/BaseTable.vue'
import service from '../../utils/request'
import { Page } from '~/models/page'
import { WNewTable } from '~/models/w-table'
import { clearNoValidProp } from '~/utils/tools'
import type { ElForm } from 'element-plus'
import { enableOptions } from '~/api/mock'

type FormInstance = InstanceType<typeof ElForm>

const ruleFormRef = ref<FormInstance>()

const newDt = reactive(
  new WNewTable({
    url: 'manufacturerPage',
    method: 'POST',
    fromBack: true,
    cols: [
      {
        prop: 'manufacturerName',
        label: '医院名称'
      },
      {
        prop: 'updateTime',
        label: '更新日期'
      },
      {
        prop: 'status',
        label: '状态'
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

let addParams = reactive({
  manufacturerId: '',
  manufacturerName: '',
  status: '0',
  remark: ''
})

const rules = reactive({
  manufacturerName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }]
})

const delArr: Array<string> = reactive([]);

const queryParams = reactive({
  manufacturerName: '',
  status: ''
})

const query = () => {
  const params = clearNoValidProp(queryParams)
  newDt.params = params
  newDt.loadData()
}

const deleteRecord = (row) => {
  //@ts-ignore
  ElMessageBox({
    title: '删除机构',
    message: '确认删除该机构吗？',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '删除中...'
        service
          .post('removeManufacturer', JSON.stringify([row.manufacturerId]), {
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
const changeStatus = (row, status) => {
  fixAddParams(row);
  const param = clearNoValidProp(addParams)
  service.post('hospitalChange', param).then(
    (res: Object) => {
      if (!res['success']) {
        ElMessage({
          message: '变更失败',
          type: 'error'
        })
        query()
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


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const param = clearNoValidProp(addParams)
      service.post('manufacturerChange', param).then(
        (res: Object) => {
          if (res['success']) {
            //@ts-ignore
            ElMessage({
              message: param.manufacturerId ? '编辑成功' : '新增成功',
              type: 'success'
            })
            query()
          } else {
            //@ts-ignore
            ElMessage({
              message: param.manufacturerId ? '编辑失败' : '新增失败',
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
  addParams.manufacturerId = ''
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
    fixAddParams(row)
  })
}

const fixAddParams = (row) => {
  for (const key in addParams) {
    if (Object.prototype.hasOwnProperty.call(addParams, key)) {
      addParams[key] = row[key]
    }
  }
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
</style>
