<template>
  <div>
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="container">
      <el-table :data="tableParams['value']" border height="500" class="table" ref="multipleTable"
        header-cell-class-name="table-header" empty-text="暂无数据" @selection-change="handleSelectionChange">
        <template v-for="item of  tableParams['cols'] " :key="item.prop">
          <el-table-column v-if="item.prop == 'selection'" type="selection" align="center" width="55" />
          <template v-else>
            <slot name="custome" :item="item"></slot>
          </template>
        </template>
      </el-table>
      <div class="pagination" v-if="!!pageParam">
        <div>
          共 {{ pageParam.total }} 条记录 第 {{ pageParam.current }} /
          {{ pageParam.pages }} 页
        </div>
        <!-- v-model:page-size="pageParam.size" -->
        <el-pagination v-model:current-page="tableParams['pm']['current']"
          :page-sizes="tableParams['pm']['sizes'] || [10, 20, 30, 40]" :disabled="false" background
          layout="prev, pager, next, sizes, slot" :total="tableParams['pm']['total']" @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
          <!-- <template #default>
            <div key="1">跳转 <el-input style="width: 100px" /></div>
          </template> -->
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Page } from '~/models/page'

defineProps<{
  columns: Coloumn[]
  pageParam?: Page
  tableData: Object[]
  tableParams: Object
}>()

const emits = defineEmits([
  'selectionChange',
  'statusChange',
  'currentChange',
  'sizeChange'
])


const currentPage1 = ref(1)
const pageSize2 = ref(100)

interface Coloumn {
  prop: string
  label: string
  type?: string
  width?: string | number
}

// 表格编辑时弹窗和保存
const editVisible = ref(false)
let form = reactive({
  name: '',
  address: ''
})
let idx = -1
const handleEdit = (index, row) => {
  idx = index
  Object.keys(form).forEach((item) => {
    form[item] = row[item]
  })
  editVisible.value = true
}
const saveEdit = () => {
  editVisible.value = false
  ElMessage.success(`修改第 ${idx + 1} 行成功`)
  Object.keys(form).forEach((item) => {
    // tableData.value[idx][item] = form[item]
  })
}
const handleSelectionChange = (val) => {
  // multipleSelection.value = val
  emits('selectionChange', val)
}
const handleSizeChange = (val: number) => {
  emits('sizeChange', val)
  // console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  emits('currentChange', val)
  // console.log(`current page: ${val}`)
}

const switchStatus = (row) => {
  emits('statusChange', row)
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
~/models/w-table