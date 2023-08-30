import { APP_CONFIG } from '~/app-config'
import { encryption, decryption } from '../utils/crypto'
import service, { getDynamicUrl } from '../utils/request'
/**
 * 登录
 */
function loginFun(user, loginType, encrypt = false) {
  // localStorage.clear();
  sessionStorage.clear()
  let params = {}
  if (loginType === 1) {
    // 账号密码登录
    params = {
      loginName: user.loginName,
      password: user.password,
      systemType: APP_CONFIG.systemType,
      loginMode: '1'
    }
  } else {
    params = {
      acceptor: user.phone,
      loginName: user.authCode,
      systemType: APP_CONFIG.systemType,
      loginMode: '8'
    }
  }
  if (encrypt) {
    params = encryption(params)
  }
  return service.post(encrypt ? 'encryptLogin' : 'login', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 注销
 */
function logoutFunc() {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`您确认要退出${APP_CONFIG.systemName}?`, '退出系统', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        service
          .get('logout', {
            params: {
              accessToken: sessionStorage.getItem('access_token'),
              systemType: APP_CONFIG.systemType
            }
          })
          .then((res) => {
            sessionStorage.clear()
            ElMessage.success(`退出成功!`)
            // 退出登录总是成功-避免因token失效不能退出
            resolve(true)
            // location.href = location.host + '/#/login';
            // localStorage.clear();
          })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function getAuthCodeFunc(phoneNumber) {
  service.post(getDynamicUrl('sendCode', phoneNumber)).then(
    (res) => {
      if (!res['success']) {
        ElMessage.error('获取验证码失败!')
      }
    },
    (err) => {
      ElMessage.error(err.error.msg)
    }
  )
}

/**
 * 判断用户是否存在角色
 * @param bspRoles 角色信息
 */
function hasRolesFunc(bspRoles) {
  return Array.isArray(bspRoles) && bspRoles.length > 0
}

/**
 * 修改密码
 * @param data
 * @returns
 */
function changePswFunc(data) {
  return service
    .post('changePassword', {
      mobileNum: data.phone,
      pwd: data.newp
    })
    .then((res) => {
      if (res['success']) {
        return true
      } else {
        ElMessage.error(res['msg'])
        return false
      }
    })
}

export { changePswFunc, loginFun, logoutFunc, getAuthCodeFunc, hasRolesFunc }
