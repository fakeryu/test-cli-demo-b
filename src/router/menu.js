/*
 * @Author: berg yu
 * @Date: 2023-08-08 15:03:39
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 17:28:45
 * @Description: 菜单
 */

export const menuConfig = [
  {
    icon: "House",
    index: "/home",
    title: "首页",
  },
  {
    icon: "Box",
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
      {
        index: "/robot/task-statistics",
        title: "机器人任务统计",
      },
    ],
  },
  {
    icon: "Document",
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
