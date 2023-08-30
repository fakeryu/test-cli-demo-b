/*
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 16:56:52
 * @Description: 接口地址
 */
import { CONFIG } from '../../public/config'

const SYS = CONFIG.api + '/' + CONFIG.system
const AUTH = CONFIG.api + '/' + CONFIG.authSystem

const API = {
  login: AUTH + '/rmApi/login/bsplogin', // 登录
  encryptLogin: SYS + '/api/common/login', //加密登录
  logout: AUTH + '/rmApi/login/bspLogout', // 退出登录

  // 全局
  sysDict: SYS + '/api/common/dict/list', // 系统字典

  indexPage: SYS + '/robot/home', // 首页统计

  hospitalPage: SYS + '/hospital/page', // 医院page
  hospitalList: SYS + '/hospital/list', // 查询医院
  hospitalChange: SYS + '/hospital/saveOrUpdate', // 新增或更新医院信息
  removeHospital: SYS + '/hospital/remove', // 新增或更新医院信息

  manufacturerPage: SYS + '/manufacturer/page', // 机构page
  manufacturerList: SYS + '/manufacturer/list', // 机构列表
  manufacturerChange: SYS + '/manufacturer/saveOrUpdate', // 新增或更新机构信息
  removeManufacturer: SYS + '/manufacturer/remove', // 新增或更新医院信息

  robotPage: SYS + '/robot/page', // 分页查询机器人列表
  removeRobot: SYS + '/robot/remove', // 删除机器人
  robotChange: SYS + '/robot/saveOrUpdate', // 新增或更新机器人

  robotTaskPage: SYS + '/robotTask/page', // 分页查询机器人任务
  robotTaskChange: SYS + '/robotTask/updateTaskStatus', // 修改任务状态

  surgerySchedulePage: SYS + '/surgerySchedule/page', // 分页查询手术记录列表
  surgeryScheduleChange: SYS + '/surgerySchedule/saveOrUpdate', // 新增或更新手术记录
  removeSurgerySchedule: SYS + '/surgerySchedule/remove', // 根据ID删除手术记录
  surgeryScheduleAllocate: SYS + '/surgerySchedule/addRobotTask' // 分配机器人任务
}

export function DYNAMIC_URLS (urlKey, dynamic) {
  const dynamic_urls = {
    queryRobot: SYS + '/robot/detail/' + dynamic, // 根据ID查看详情
    removeSurgerySchedule: SYS + '/surgerySchedule/remove/' + dynamic // 根据ID删除手术记录
  }
  return dynamic_urls[urlKey]
}

export default API
