/*
 * @Author: berg yu
 * @Date: 2023-08-08 15:03:39
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-10 09:57:25
 * @Description: 菜单
 */

export const menuConfig = [
  {
    icon: "el-icon-house",
    index: "/home",
    title: "首页",
  },
  {
    icon: "el-icon-box",
    index: "/robot",
    title: "机器人管理",
    subs: [
      {
        index: "/robot/message",
        title: "机器人信息",
      },
      {
        index: "/robot/record",
        title: "手术记录",
      },
      {
        index: "/robot/task",
        title: "机器人任务",
      },
    ],
  },
  {
    icon: "el-icon-document",
    index: "/basic",
    title: "基础管理",
    subs: [
      {
        index: "/basic/org-manage",
        title: "机构管理",
      },
      {
        index: "/basic/hos-manage",
        title: "医院管理",
      },
    ],
  },
  // {
  //   icon: "el-icon-lx-global",
  //   index: "/i18n",
  //   title: "国际化功能",
  // }
];
