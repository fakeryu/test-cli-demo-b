<template>
  <div class="header">
    <div class="logo">
      <!-- <img class="hos-logo" :src="hospInfo.hospLogo" /> {{ hospInfo.hospName
      }}<span class="hos-logo-font">({{ systemName }})</span> -->
      <img class="hos-logo" src="../assets/img/logo.png" />
      <span class="hos-logo-font">({{ systemName }})</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-show="message"></span>
        </div> -->
        <!-- 用户头像 -->
        <!-- 用户名下拉菜单 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- <el-dropdown
          class="user-name"
          style="display: flex; align-items: center"
          trigger="click"
          @command="handleCommand"
        >
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <!-- <div class="logout-btn">
          <el-icon @click="logout">
            <SwitchButton />
          </el-icon>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { logoutFunc } from "~/service/loginService";
import service from "../utils/request";
import { HospInfo } from "../models/hosp-info";
import { ElMessage } from "element-plus";

export default {
  setup () {
    const username = localStorage.getItem("ms_username");
    const message = 2;

    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    const systemName = store.state.appConfig.systemName;
    let hospInfo = ref(new HospInfo());

    // 用户名下拉菜单选择事件
    const router = useRouter();
    const handleCommand = (command) => {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        router.push("/login");
      } else if (command == "user") {
        router.push("/user");
      }
    };

    const getHospInfo = () => {
      service.get("hospitalInfo").then(
        (res) => {
          if (res.success) {
            let str = `data:image/jpg;base64,${res.data.hospLogo}`;
            res.data.hospLogo = str.replace(/[\r\n]/g, "");
            hospInfo.value = new HospInfo(res.data);
          } else {
            ElMessage.error(res.msg);
          }
        },
        (e) => {
          ElMessage.error(e.error.msg);
        }
      );
    };

    // getHospInfo();

    const logout = () => {
      logoutFunc().then((res) => {
        if (res) {
          router.push("/login");
        }
      });
    };

    return {
      username,
      message,
      collapse,
      handleCommand,
      logout,
      systemName,
      hospInfo,
    };
  },
};
</script>
<style scoped>
.header {
  /* position: relative; */
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  font-size: 22px;
  color: #322e44;
  display: flex;
  justify-content: space-between;
}

.hos-logo {
  width: 100px;
  height: 30px;
}

.hos-logo-font {
  font-size: 10px;
}

.header .logo {
  /* float: left; */
  margin-left: 20px;
  width: 250px;
  display: flex;
  align-items: center;
}

.header-right {
  /* float: right; */
  /* padding-right: 16px; */
}

.header-user-con {
  display: flex;
  height: 48px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #322e44;
}

.btn-bell .el-icon-bell {
  color: #322e44;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-right: 8px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #322e44;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}

.logout-btn {
  cursor: pointer;
  margin: 0 16px 0 20px;
}
</style>
../service/loginService