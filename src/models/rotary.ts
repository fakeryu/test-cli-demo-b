export class Rotary {
  ruleId ? : string;
  areaId: string;
  ruleName: string = '';
  rotateMode: number = 1;
  rotateStep: number = 3;
  validPeriod: string = '1,2,3,4,5,6,0';
  skipHoliday: number = 0;
  startTime: string = '';
  endTime: string = '';
  beginDate: string = '';
  remark: string = '';
  beginNum: number = 1;
  dayList: Array < any > = [{
    sequence: 1,
    showUl:false
  }, {
    sequence: 2,
    showUl:false
  }, {
    sequence: 3,
    showUl:false
  }];
  groupPersonList: Array < any > = [];
  condPermuteDTO: Array < any > = [];
}
