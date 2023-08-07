export class Department {
	extId: string;
	departmentName: string;
	departmentId: string;
	address: string;
	description: string;
	personIds: any;
	mobileNum: any;
  constructor(data: any = {}) {
		this.extId = data.extId;
		this.departmentName = data.departmentName;
		this.departmentId = data.departmentId;
		this.address = data.address;
		this.description = data.description;
		this.personIds = data.personIds;
		this.mobileNum = data.mobileNum;
  }

}
