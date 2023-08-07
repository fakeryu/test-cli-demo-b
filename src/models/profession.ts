export class Profession {
	professionName: string; // 专业组名称
	professionId: string; // 专业组id
	displayColor: string; // 专业组颜色
	leaderIds: any; // 组长id
	personIds: any; // 组员id
	remark: string; // 备注
  constructor(data: any = {}) {
		this.professionName = data.professionName;
		this.professionId = data.professionId;
		this.displayColor = data.displayColor;
		this.leaderIds = data.leaderIds;
		this.personIds = data.personIds;
		this.remark = data.remark;
  }

}
