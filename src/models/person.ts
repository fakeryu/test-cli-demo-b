export class Person {
	accountId: string;
	departmentId: string;
	extId: string;
	personId: string;
	hospId: string;
	mobileNum: string; // 电话号码
	name: string; // 姓名
	sex: string; // 性别
	jobNo: string; // 工号
	email: string; // 邮箱
	position: string; // 职务
	abilityLevel: string; // 能级
	positionalTitle: string;
	professionIds: any; // 专业组
	entryTime: string; // 入职时间
	workingState: string; // 员工状态
  constructor(data: any = {}) {
		this.accountId = data.accountId;
		this.departmentId = data.departmentId;
		this.extId = data.extId;
		this.personId = data.personId;
		this.hospId = data.hospId;
		this.mobileNum = data.mobileNum;
		this.name = data.name;
		this.sex = data.sex;
		this.jobNo = data.jobNo;
		this.email = data.email;
		this.position = data.position;
		this.abilityLevel = data.abilityLevel;
		this.positionalTitle = data.positionalTitle;
		this.professionIds = data.professionIds;
		this.entryTime = data.entryTime;
		this.workingState = data.workingState;
  }

}
