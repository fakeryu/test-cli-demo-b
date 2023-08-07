<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="onRoutes"
             :collapse="collapse"
             background-color="#1f2e54"
             text-color="#FFFFFF"
             active-text-color="#FFFFFF"
             unique-opened
             router>
      <template v-for="item in menus">
        <template v-if="item.subs.length">
          <el-submenu :index="item.index"
                      :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs.length"
                          :index="subItem.index"
                          :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs"
                              :key="i"
                              :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else
                            :index="subItem.index"
                            :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index"
                        :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
      <!-- 折叠按钮 --> 
      <div class="collapse-btn"
           @click="collapseChage">
        <i v-if="!collapse"
           class="el-icon-s-fold"
           style="font-size:16px"></i>
        <i v-else
           class="el-icon-s-unfold"
           style="font-size:16px"></i>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { generateMenus } from "../utils/forTree"

export default {
  setup () {
    const items = [
      {
        icon: "el-icon-lx-home",
        index: "/dashboard",
        title: "系统首页",
      },
      // {
      //   icon: "el-icon-lx-cascades",
      //   index: "/table",
      //   title: "基础表格",
      // },
      // {
      //   icon: "el-icon-lx-copy",
      //   index: "/tabs",
      //   title: "tab选项卡",
      // },
      // {
      //   icon: "el-icon-lx-calendar",
      //   index: "3",
      //   title: "表单相关",
      //   subs: [
      //     {
      //       index: "/form",
      //       title: "基本表单",
      //     },
      //     {
      //       index: "/upload",
      //       title: "文件上传",
      //     },
      //     {
      //       index: "4",
      //       title: "三级菜单",
      //       subs: [
      //         {
      //           index: "/editor",
      //           title: "富文本编辑器",
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   icon: "el-icon-pie-chart",
      //   index: "/charts",
      //   title: "schart图表",
      // },
      // {
      //   icon: "el-icon-lx-global",
      //   index: "/i18n",
      //   title: "国际化功能",
      // },
      // {
      //   icon: "el-icon-lx-warn",
      //   index: "7",
      //   title: "错误处理",
      //   subs: [
      //     {
      //       index: "/permission",
      //       title: "权限测试",
      //     },
      //     {
      //       index: "/404",
      //       title: "404页面",
      //     },
      //   ],
      // },
    ];
    const menus = generateMenus();
    console.log(menus);

    const route = useRoute();

    // 侧边栏折叠
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
    });

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
      collapseChage,
      menus
    };
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 48px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 208px;
}
.sidebar > ul {
  height: 100%;
}
.sidebar-el-menu {
  position: relative;
  .collapse-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 16px 16px 0;
    line-height: 16px;
    cursor: pointer;
    color: white;
  }
}
.el-menu-item.is-active {
  background: #0581f5 !important;
}
</style>
