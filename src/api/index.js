/*
 * @Author: berg yu
 * @Date: 2022-04-15 18:53:56
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-07 14:09:25
 * @Description: 接口地址
 */
import { CONFIG } from "../../public/config";

const SYS = CONFIG.api + "/" + CONFIG.system;
const AUTH = CONFIG.api + "/" + CONFIG.authSystem;

const API = {
  login: AUTH + "/rmApi/login/bsplogin", // 登录
  encryptLogin: SYS + "/api/common/login", //加密登录
  logout: AUTH + "/rmApi/login/bspLogout", // 退出登录
  updatePassword: AUTH + "/rmApi/userManage/bspAccount/updateAccountPassword", // 修改密码
  bspSystemDict: AUTH + "/rmApi/dict/bspDict/list", // 基础服务数据字典
  // deployVersion: SYS + "/api/common/queryDeployVersion", // 查询是否为私有化部署
  changePassword: SYS + "/api/department/wx/modifyLoginPwd", // 修改密码

  // 全局
  sysDict: SYS + "/api/common/dict/list", // 系统字典

  // 首页
  hospitalInfo: SYS + "/api/hospital/info", // 查询医院信息
  hospitalUpdate: SYS + "/api/hospital/update", // 医院信息编辑

  // 区域
  scheduleArea: SYS + "/api/scheduleArea/listByUser", // 查询操作用户所在租户的所有区域
  saveOrUpdateArea: SYS + "/api/scheduleArea/saveOrUpdateArea", // 新增或修改排班区域
  scheduleAreaListByCompany: SYS + "/api/scheduleArea/listByCompany", // 查询操作用户所在租户的所有区域(供区域管理菜单使用) GET
  scheduleAreaDeptTree: SYS + "/api/scheduleArea/areaDeptTree", // 查询区域部门数
  queryCreatePerson: SYS + "/api/scheduleArea/queryCreatePerson", // 查询登录账户对应的员工信息

  // 专业组
  professionGroupPage: SYS + "/api/professionGroup/page", // 分页查询专业组
  saveOrUpdateGroup: SYS + "/api/professionGroup/saveOrUpdateGroup", // 添加专业组
};

export function DYNAMIC_URLS(urlKey, dynamic) {
  const dynamic_urls = {
    secondPersonList: SYS + "/api/personSecondment/secondPersonList/" + dynamic, // 根据区域查询借调人员列表 GET
  };
  return dynamic_urls[urlKey];
}

export default API;
