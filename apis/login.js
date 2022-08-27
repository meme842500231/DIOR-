import request from '@/request'

// 测试登录
export const loginTest = (data = {}) => {
	return request({
		url: 'loginTest',
		data
	})
}
