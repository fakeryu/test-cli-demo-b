export class HospInfo {

  hospId: string; // 医院ID
  createTime: string; // 创建时间
  hospCode: string;
  hospLogo: any;
  hospName: string;
  updateTime: string; // 更新时间

  constructor(data: any = {}) {
    this.hospId = data.hospId;
    this.createTime = data.createTime;
    this.hospCode = data.hospCode;
    this.hospLogo = data.hospLogo;
    this.hospName = data.hospName;
    this.updateTime = data.updateTime;
  }

}
