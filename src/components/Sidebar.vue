<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#1f2e54"
      text-color="#FFFFFF" active-text-color="#FFFFFF" unique-opened router>
      <template v-for="item in menus">
        <template v-if="item.subs && item.subs.length">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu v-if="subItem.subs && subItem.subs.length" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem['index']">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="!collapse" style="font-size: 16px">
          <Fold />
        </el-icon>
        <el-icon v-else style="font-size: 16px">
          <Expand />
        </el-icon>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { generateMenus } from "../utils/forTree";
import { menuConfig } from "../router/menu";

export default {
  setup () {
    const menus = menuConfig;
    // const menus = generateMenus();
    // console.log(menus);

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
      onRoutes,
      collapse,
      collapseChage,
      menus,
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

.sidebar>ul {
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
}</style>
