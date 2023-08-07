export class User {
  id: string; // 用户id
  jobNo: string; // 工号
  oldPwd: string; // 旧密码
  password: string; // 密码
  newp: string; // 新密码
  confirmP: string; // 确认密码
  realName: string; // 真实姓名
  userName: string; // 用户名
  sex: string; // 性别代码
  sexName: string; // 性别名称
  phone: string; // 联系电话
  jobTitle: string; // 职称
  roleName: any; // 角色
  roleId: any; // 角色ID
  departName: string; // 科室
  updateTime: string; // 更新时间
  remark: string;
  accountId: string; // 账号Id
  accountName: string; // 账号名称
  loginName: string; // 登录名
  description: string;
  authCode: string; // 验证码

  constructor(data: any = {}) {
    this.id = data.id;
    this.jobNo = data.jobNo;
    this.password = data.password;
    this.newp = data.newp;
    this.confirmP = data.confirmP;
    this.realName = data.realName;
    this.userName = data.userName;
    this.sex = data.sex;
    this.sexName = data.sexName;
    this.phone = data.phone;
    this.jobTitle = data.jobTitle;
    this.roleName = data.roleName;
    this.departName = data.departName;
    this.updateTime = data.updateTime;
    this.remark = data.remark;
    this.accountName = data.accountName;
    this.accountId = data.accountId;
    this.loginName = data.loginName;
    this.description = data.description;
    this.authCode = data.authCode;
  }
}
