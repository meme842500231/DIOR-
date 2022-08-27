import request from '@/request'

// 审批申报
export const approvalPut = (data = {}) => {
	return request({
		url: 'approval',
		method: 'PUT',
		data
	})
}

// 申报礼品
export const approvalPost = (data = {}) => {
	return request({
		url: 'approval',
		method: 'POST',
		data
	})
}

// 申报列表
export const approvalList = (data = {}) => {
	return request({
		url: 'approval/list',
		data
	})
}

// 申报详情
export const approvalDes = (id) => {
	return request({
		url: `approval/${id}`,
		data: {}
	})
}
