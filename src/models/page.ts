/*
 * @Author: berg yu
 * @Date: 2023-08-14 15:20:21
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-18 15:57:36
 * @Description: 分页接口
 */
export class Page {
  pages?: number
  total?: number
  size?: number
  sizes?: Array<number>
  current?: number

  constructor(arg?: Page) {
    if (arg) {
      this.sizes = arg.sizes || [10, 20, 30, 40, 50]
      this.current = arg.current || 1
      this.size = this.sizes[0]
      this.pages = arg.pages || 10
      this.total = arg.total || 10
    } else {
      this.sizes = [10, 20, 30, 40, 50]
      this.current = 1
      this.size = this.sizes[0]
      this.pages = 10
      this.total = 10
    }
  }
}
