/*
 * @Author: berg yu
 * @Date: 2023-08-29 10:31:28
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-29 16:38:33
 * @Description: 请填写简介
 */
const adeptOptions = [
	{ value: '1', label: '腔镜手术' },
	{ value: '2', label: '骨科手术' },
	{ value: '3', label: '开颅手术' }
]

const maintainOptions = [
	{
		value: 1,
		label: '使用中'
	},
	{
		value: 0,
		label: '空闲'
	}
]

const surgeryTypeOptions = [
	{
		value: '0',
		label: '急诊'
	},
	{
		value: '1',
		label: '择期'
	}
]
const genderOptions = [
	{
		value: '0',
		label: '男'
	},
	{
		value: '1',
		label: '女'
	}
]
const enableOptions = [
	{
		value: '0',
		label: '禁用'
	},
	{
		value: '1',
		label: '启用'
	}
]
const taskOptions = [
	{
		value: '0',
		label: '未开始'
	},
	{
		value: '1',
		label: '已取消'
	},
	{
		value: '2',
		label: '进行中'
	},
	{
		value: '3',
		label: '已完成'
	}
]


export {
	adeptOptions,
	maintainOptions,
	surgeryTypeOptions,
	genderOptions,
	taskOptions,
	enableOptions
}