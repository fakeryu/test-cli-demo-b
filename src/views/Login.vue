<template>
  <header class="login-header">
    <img
      class="system-logo"
      src="../assets/img/login/logo.png"
      alt="LOGO"
    >{{
      appConfig.systemName
    }}
  </header>
  <div class="login-wrap">
    <div
      v-if="displayType === 'login'"
      class="ms-login"
    >
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="isPrivate ? '登录' : '密码登录'"
          name="passLogin"
        >
          <el-form
            ref="login"
            :model="user"
            :rules="rules"
            label-width="0px"
            class="ms-content"
          >
            <el-form-item prop="loginName">
              <el-input
                v-model="user.loginName"
                placeholder="手机号"
              >
                <template #prepend>
                  <el-button icon="el-icon-user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="user.password"
                type="password"
                placeholder="登录密码"
                @keyup.enter="submitForm(1)"
              >
                <template #prepend>
                  <el-button icon="el-icon-lock" />
                </template>
              </el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                :loading="loading"
                @click="submitForm(1)"
              >
                登录
              </el-button>
              <!-- <div
                class="forget-password"
                v-if="!isPrivate"
                @click="displayType.value = 'reset'"
              >
                <span>忘记密码？</span>
              </div> -->
            </div>
            <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane v-if="!isPrivate" label="验证码登录" name="msgLogin">
          <el-form class="ms-content" role="form" autocomplete="off">
            <el-form-item prop="phone">
              <el-input
                v-model="user.phone"
                placeholder="手机号"
                max="99999999999"
              >
                <template #prepend>
                  <el-button icon="el-icon-user"></el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="authCode" class="msg-ver">
              <el-input
                ref="authCode"
                v-model="user.authCode"
                placeholder="验证码"
                type="number"
                max="99999999999"
                @keyup.enter="submitForm(2)"
                >>
                <template #prepend>
                  <el-button icon="el-icon-lock"></el-button>
                </template>
              </el-input>
              <el-button
                class="verify-btn"
                :class="{ 'verify-disabled': isVerifying }"
                @click="getAuthCode(user.phone)"
                :disabled="isVerifying || !user.phone"
                type="primary"
                >{{
                  isVerifying ? time + "\r\n重新发送" : "发送验证码"
                }}</el-button
              >
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                :class="{ 'btn-disabled': loading }"
                @click="submitForm(2)"
                :disabled="loading"
                >{{ loading ? "登录中..." : "登录" }}</el-button
              >
            </div>
          </el-form>
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <div
      v-if="displayType === 'reset'"
      class="ms-login"
    >
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="密码登录"
          name="passLogin"
        >
          <el-form
            ref="login"
            :model="user"
            :rules="rules"
            label-width="0px"
            class="ms-content"
          >
            <el-form-item prop="loginName">
              <el-input
                v-model="user.loginName"
                placeholder="手机号"
              >
                <template #prepend>
                  <el-button icon="el-icon-user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="user.password"
                type="password"
                placeholder="登录密码"
                @keyup.enter="submitForm(1)"
              >
                <template #prepend>
                  <el-button icon="el-icon-lock" />
                </template>
              </el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                :loading="loading"
                @click="submitForm(1)"
              >
                登录
              </el-button>
            </div>
            <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="验证码登录"
          name="msgLogin"
        >
          <el-form
            class="ms-content"
            role="form"
            autocomplete="off"
          >
            <el-form-item prop="phone">
              <el-input
                v-model="user.phone"
                placeholder="手机号"
                max="99999999999"
              >
                <template #prepend>
                  <el-button icon="el-icon-user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="authCode"
              class="msg-ver"
            >
              <el-input
                ref="authCode"
                v-model="user.authCode"
                placeholder="验证码"
                type="number"
                max="99999999999"
                @keyup.enter="submitForm(2)"
              >
                >
                <template #prepend>
                  <el-button icon="el-icon-lock" />
                </template>
              </el-input>
              <el-button
                class="verify-btn"
                :class="{ 'verify-disabled': isVerifying }"
                :disabled="isVerifying || !user.phone"
                type="primary"
                @click="getAuthCode(user.phone)"
              >
                {{
                  isVerifying ? time + "\r\n重新发送" : "发送验证码"
                }}
              </el-button>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                :class="{ 'btn-disabled': loading }"
                :disabled="loading"
                @click="submitForm(2)"
              >
                {{ loading ? "登录中..." : "登录" }}
              </el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      v-if="displayType === 'change'"
      class="ms-login"
    >
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="密码登录"
          name="passLogin"
        >
          <el-form
            ref="login"
            :model="user"
            :rules="rules"
            label-width="0px"
            class="ms-content"
          >
            <el-form-item prop="loginName">
              <el-input
                v-model="user.loginName"
                placeholder="手机号"
              >
                <template #prepend>
                  <el-button icon="el-icon-user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="user.password"
                type="password"
                placeholder="登录密码"
                @keyup.enter="submitForm(1)"
              >
                <template #prepend>
                  <el-button icon="el-icon-lock" />
                </template>
              </el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                :loading="loading"
                @click="submitForm(1)"
              >
                登录
              </el-button>
            </div>
            <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="验证码登录"
          name="msgLogin"
        >
          <el-form
            class="ms-content"
            role="form"
            autocomplete="off"
          >
            <el-form-item prop="phone">
              <el-input
                v-model="user.phone"
                placeholder="手机号"
                max="99999999999"
              >
                <template #prepend>
                  <el-button icon="el-icon-user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="authCode"
              class="msg-ver"
            >
              <el-input
                ref="authCode"
                v-model="user.authCode"
                placeholder="验证码"
                type="number"
                max="99999999999"
                @keyup.enter="submitForm(2)"
              >
                >
                <template #prepend>
                  <el-button icon="el-icon-lock" />
                </template>
              </el-input>
              <el-button
                class="verify-btn"
                :class="{ 'verify-disabled': isVerifying }"
                :disabled="isVerifying || !user.phone"
                type="primary"
                @click="getAuthCode(user.phone)"
              >
                {{
                  isVerifying ? time + "\r\n重新发送" : "发送验证码"
                }}
              </el-button>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                :class="{ 'btn-disabled': loading }"
                :disabled="loading"
                @click="submitForm(2)"
              >
                {{ loading ? "登录中..." : "登录" }}
              </el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <footer class="login-footer">
    <img
      src="../assets/img/login/version.png"
      class="system-version"
    >
    Copyright © Rivamed Corporation, All Rights Reserved &nbsp;&nbsp;{{
      appConfig.systemVersion
    }}
  </footer>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { User } from "../models/user";
import { loginFun, getAuthCodeFunc } from "../api/loginService";

export default {
  setup() {
    const router = useRouter();

    const login = ref(null);
    let loading = ref(false);

    const activeName = ref("passLogin");
    const user = reactive(new User());
    // const reset = reactive(new User())
    const change = reactive(new User());

    const rules = {
      loginName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      phone: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
      ],
      authCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    };

    let isVerifying = ref(false);
    let time = ref(0);
    let timer;
    let loginErrorTimer;
    let loginErrorTimes = Number(sessionStorage.getItem("loginErrorTimes"));
    let isPrivate = ref(false);
    let displayType = ref("login");

    /**
     * 10分钟后解除锁定
     */
    const removeLockLogin = () => {
      if (loginErrorTimer) {
        clearTimeout(loginErrorTimer);
      }
      loginErrorTimer = setTimeout(() => {
        loginErrorTimes = 0;
        sessionStorage.setItem("loginErrorTimes", String(loginErrorTimes));
      }, 10 * 60 * 1000);
    };

    if (loginErrorTimes > 4) {
      // 处理刷新后延时被中断，session中的loginErrorTimes无法清0
      removeLockLogin();
    }

    // service.get("deployVersion").then(
    //   (res) => {
    //     if (res["success"]) {
    //       isPrivate.value = res.data === 1 ? true : false;
    //       sessionStorage.setItem("isPrivate", String(res.data));
    //     } else {
    //       ElMessage.error(res["msg"]);
    //     }
    //   },
    //   (e) => {
    //     ElMessage.error(e.error.msg);
    //   }
    // );

    const doLogin = (loginType) => {
      if (loginErrorTimes > 4) {
        ElMessageBox.confirm(
          isPrivate.value
            ? "输入错误密码次数超限，账户锁定中。您可稍后再尝试登录!"
            : "输入错误密码次数超限，账户锁定中。您可稍后再尝试登录或使用手机验证码登录!",
          "",
          {
            confirmButtonText: "OK",
            showConfirmButton: false,
            type: "warning",
          }
        );
      } else {
        loginFun(user, loginType, false).then(
          (res) => {
            // res = JSON.parse(decryption(res));
            if (res && res["operateSuccess"]) {
              if (!hasRolesFunc(res.bspRoles)) {
                // this.toastService.showErrorMsg('您的账户不能登录此系统,请联系管理员');
                return false;
              }
              sessionStorage.setItem("access_token", res["accessToken"]);
              sessionStorage.setItem("refresh_token", res["refreshToken"]);
              sessionStorage.setItem("accountId", res["accountId"]);
              sessionStorage.setItem("funcs", JSON.stringify(res["bspFuncs"]));
              sessionStorage.setItem("systemType", res["systemType"]);
              if (res["bspAccount"]) {
                // this.appService.account = new User(res['bspAccount']);
                // sessionStorage.setItem('loginInfo', JSON.stringify(res));
                sessionStorage.setItem("personId", res["bspAccount"].personId);
                sessionStorage.setItem(
                  "accountName",
                  res["bspAccount"].accountName
                );
                sessionStorage.setItem("loginNum", res["bspAccount"].loginNum);
                if (
                  res["bspAccount"].bspUser &&
                  res["bspAccount"].bspUser.name
                ) {
                  sessionStorage.setItem(
                    "userName",
                    res["bspAccount"].bspUser.name
                  );
                } else {
                  sessionStorage.setItem(
                    "accountName",
                    res["bspAccount"].accountName
                  );
                }
                sessionStorage.setItem("isAdmin", res["bspAccount"].isAdmin);
              }
              loginErrorTimes = 0;
              sessionStorage.setItem(
                "loginErrorTimes",
                String(loginErrorTimes)
              );
              if (sessionStorage.getItem("loginNum") === "1") {
                displayType.value = "change";
                change.phone = loginType === 1 ? user.loginName : user.phone;
              } else {
                loading.value = false;
                ElMessage.success("登录成功");
                router.push("/");
              }
            } else {
              loginErrorTimes++;
              sessionStorage.setItem(
                "loginErrorTimes",
                String(loginErrorTimes)
              );
              if (loginErrorTimes === 4) {
                removeLockLogin();
              }
            }
          },
          (err) => {
            loading.value = false;
            ElMessage.error("登录失败");
          }
        )
      }
    };

    const hasRolesFunc = (bspRoles) => {
      return Array.isArray(bspRoles) && bspRoles.length > 0;
    };

    const submitForm = (type) => {
      loading.value = true;

      login.value.validate((valid) => {
        if (valid) {
          // loading.value = false
          doLogin(type);
          //   router.push('/')
        } else {
          return false;
        }
      });
    };

    const handleClick = (tab, event) => {
      console.log(tab, event);
    };

    const verifyCode = (inTime = 120, callback) => {
      isVerifying.value = true;
      time.value = inTime;
      if (time.value != 0) {
        clearTimeout(time.value);
        timer = setTimeout(() => {
          time.value--;
          verifyCode(time.value, callback);
        }, 1000);
      } else {
        if (callback) callback();
        isVerifying.value = false;
      }
    };

    const getAuthCode = (phone) => {
      getAuthCodeFunc(phone);
      verifyCode(120);
    };

    const store = useStore();
    const appConfig = store.state.appConfig;
    store.commit("clearTags");

    return {
      rules,
      login,
      submitForm,
      appConfig,
      activeName,
      handleClick,
      user,
      loading,
      verifyCode,
      time,
      getAuthCode,
      displayType,
      isPrivate,
    };
  },
};
</script>

<style scoped lang="scss">
.forget-password {
  width: 100%;
  height: 20px;
  color: #fffefe;
  display: inline-block;
  text-align: right;
  font-size: 12px;
}
.demo-tabs > .el-tabs__content {
  padding: 52px;
  color: #6b778c;
  font-size: 52px;
  font-weight: 600;
}

.login-header {
  height: 100px;
  display: inline-block;
  line-height: 120px;
  font-size: 25px;
  font-weight: bold;
}

.verify-btn {
  position: absolute;
  display: inline-table;
  width: 50%;
  height: 40px;
  vertical-align: middle;
  background: #34c1a8;
  border: 0px solid #14b498;
  //   border-radius: 16px;
  padding: 0;
  color: #ffffff;
  font-size: 12px;
  white-space: break-spaces;

  &:hover {
    background: #00a98d;
    border: 0px solid #14b498;
  }
}

.msg-ver {
  position: relative;
  width: 66% !important;
}

.system-logo {
  display: inline-block;
  margin-right: 10px;
  margin-left: 400px;
}
.login-header > img {
  width: 260px;
  height: 43px;
  vertical-align: sub;
}
.login-wrap {
  position: relative;
  width: 1920px;
  height: 800px;
  background: white url(../assets/img/login/login.jpg) no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
}

.login-footer {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
  font-size: 18px;
}
.login-footer > img {
  width: 100px;
  margin-right: 5px;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 70%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(4, 11, 19, 0.35);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
../service/loginService