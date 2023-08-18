/*
 * @Author: berg yu
 * @Date: 2023-08-18 15:34:42
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-18 16:50:37
 * @Description: 表类
 */
import service from '~/utils/request'
import { Page } from '../models/page'
import { ElMessage } from 'element-plus'

interface Col {
  prop: string
  label: string
  type?: string
  width?: string | number
}

interface TableArg {
  pm?: Page // 分页模型
  url?: string // 数据请求地址
  method?: string // 请求方法
  value?: Array<any> | any // 数据
  cols?: Array<Col> // 表头
  params?: any // 查询参数
  selection?: any // 选中的行
  fromBack?: boolean // 是否从后端拿数据
  clearSelection?: boolean // 是否自动清除选中数据
  isDynamic?: boolean // 是否动态表头
  colsFn?: Function // 列处理函数,仅当isDynamic为true时起作用
  callBack?: Function // 回调函数
}

export class WNewTable {
  public fromBack: boolean
  public clearSelection: boolean
  public isDynamic: boolean
  public pm: Page
  public url: string
  public method: string
  public value: Array<any> | any
  public cols: Array<Col>
  public params: any
  public selection: any
  public colsFn: Function
  public callBack: Function

  constructor(public arg: TableArg) {
    this.pm = arg.pm || new Page()
    this.url = arg.url || ''
    this.method = arg.method || 'POST'
    this.value = arg.value || []
    this.cols = arg.cols || []
    this.params = arg.params || {}
    this.fromBack = arg.fromBack === false ? arg.fromBack : true
    this.clearSelection =
      arg.clearSelection === false ? arg.clearSelection : true
    this.isDynamic = arg.isDynamic || false
    this.colsFn = <Function>arg.colsFn
    this.callBack = <Function>arg.callBack
  }

  /**
   * 查询
   * @param param 查询参数
   * @param tb 表格组件
   */
  public query(param?: {}, tb?) {
    this.pm.current = 1
    this.params = param
    this.loadData(tb)
  }

  /**
   * 刷新
   * @param tb 表格组件
   */
  public refresh(tb?) {
    this.pm.current = 1
    this.loadData(tb)
  }

  /**
   * 加载数据
   * @param tb 表格组件
   */
  public loadData(tb?) {
    switch (this.method) {
      case 'POST':
        service.post(this.url, this.paramsMerge()).then((res) => {
          if (res['success'] === false) {
            ElMessage.error(res['msg'])
            return
          }
          if (this.fromBack) {
            this.sucessFn(res, tb)
            if (
              Object.prototype.toString.call(this.callBack) ===
              '[object Function]'
            ) {
              this.callBack(this)
            }
          } else {
            this.json_sucessFn(res, tb)
          }
        })
        break
      default:
        service.get(this.url, this.paramsMerge()).then((res) => {
          if (this.fromBack) {
            this.sucessFn(res, tb)
          } else {
            this.json_sucessFn(res, tb)
          }
        })
    }
  }

  /**
   * 请求成功后数据处理,静态数据
   * @param res 响应
   * @param tb  表格组件
   */
  private json_sucessFn(res: any, tb) {
    const value = res.rows.filter((ele) => {
      // 模拟搜索
      let isReturn = true
      if (this.params.searchText) {
        isReturn = JSON.stringify(ele).includes(this.params.searchText)
      }
      return isReturn
    })
    const pageNo = this.pm.current || 1
    const pageSize = this.pm.size || 1
    const total = value.length
    const start = (pageNo - 1) * pageSize
    const end = pageNo * pageSize > total ? total : pageNo * pageSize
    this.value = value.slice(start, end)
    this.pm.current = pageNo // 当前页
    this.pm.size = pageSize // 每页大小
    this.pm.total = total // 总记录数
    this.pm.pages =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1
    if (this.clearSelection) {
      this.selection = null
    }
  }

  /**
   * 请求成功后数据处理,动态数据
   * @param res 响应
   * @param tb  表格组件
   */
  private sucessFn(res: any, tb?) {
    let pageNo
    let pageSize
    let total

    if (this.isDynamic) {
      pageNo = res.data.page.current
      pageSize = res.data.page.size
      total = res.data.page.total
      this.dynamicHandle(res.data)
    } else {
      pageNo = res.data.current ? res.data.current : res.data.current
      pageSize = res.data.size ? res.data.size : res.data.size
      total = res.data.total
      this.value = res.data.records
      // 为每行数据添加序号字段
      this.value.forEach((ele, index) => {
        ele.rownumber = index + pageSize * (pageNo - 1) + 1
      })
    }
    this.pm.current = pageNo // 当前页
    this.pm.size = pageSize // 每页大小
    this.pm.total = total // 总记录数
    this.pm.pages =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1
    if (this.clearSelection) {
      this.selection = null
    }
  }

  /**
   * 表头动态变化的处理方法
   * rows格式：
   * [{
      dynamicDataList:[{
        itemName:'',//中文名
        itemValue:''//值
      }]
    }]
   */
  private dynamicHandle(rows: any) {
    let _cols = []
    const _rows = []
    if (Array.isArray(rows.page.records)) {
      for (let i = 0; i < rows.page.records.length; i++) {
        if (i === 0) {
          // 生成表头
          _cols = this.generateCols(rows.title)
        }
        // 生成行数据
        // const row = this.generateRow(rows[i], _cols);
        // if (Object.keys(row).length > 0) {
        //   _rows.push(row);
        // }
      }
      if (this.colsFn && _cols.length > 0) {
        // 根据需要处理表头数据
        _cols = this.colsFn(_cols)
      }
      this.cols = _cols
      this.value = rows.page.records
    } else {
      this.value = []
    }
  }

  /**
   * 根据数据动态生成行数据
   * @param dynamicDataList 动态数据
   * @param cols 表头数据
   */
  private generateRow(dynamicDataList: Array<any>, cols: Array<any>) {
    const row = {}
    if (typeof dynamicDataList === 'object') {
      for (let i = 0; i < dynamicDataList.length; i++) {
        row[cols[i]['prop']] = dynamicDataList[i][cols[i]['prop']]
      }
    }
    return row
  }

  /**
   * 根据数据动态生成表格表头
   * @param dynamicDataList 动态数据
   */
  private generateCols(dynamicDataList: Array<any>) {
    const headers = []
    // if (typeof dynamicDataList === 'object') {
    //   for (const iterator of dynamicDataList) {
    //     headers.push({
    //       prop: new DynamicHeadersPipe().transform(iterator),
    //       label: iterator
    //     })
    //   }
    //   // for (let i = 0; i < dynamicDataList.length; i++) {
    //   //   // 生成表头
    //   //   headers.push({
    //   //     prop: `key${i}`,
    //   //     label: dynamicDataList[i]['itemName']
    //   //   });
    //   // }
    // }
    return headers
  }

  /**
   * 参数合并
   */
  private paramsMerge() {
    let params = this.params ? this.params : {}
    params = Object.assign(params, {
      page: {
        current: this.pm.current,
        size: this.pm.size
      }
    })
    return params
  }

  /**
   * 翻页处理
   * @param $event 翻页事件
   */
  public onPage($event) {
    //点击翻页
    this.pm.current = $event
    this.loadData()
  }

  /**
   * 每页大小
   * @param $event 页面大小
   */
  public onSize($event) {
    //点击翻页
    this.pm.size = $event
    this.loadData()
  }
}
