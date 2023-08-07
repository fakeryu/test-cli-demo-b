export class FirstPage {
	extId: string; // 扩展表主键ID
	hospId: string; // 医院主键Id
	hospName: string; // 医院名称
	address: string; // 医院地址
	hospLogo: any; // 医院logo
	legalPerson: string; // 负责人
	reserve: string; // 简介
  constructor(data: any = {}) {
		this.extId = data.extId;
		this.hospId = data.hospId;
		this.hospName = data.hospName;
		this.address = data.address;
		this.hospLogo = data.hospLogo;
		this.legalPerson = data.legalPerson;
		this.reserve = data.reserve;
  }

}
