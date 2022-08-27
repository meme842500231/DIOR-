import config from './config'

// 请求
const request = async (info = {}) => {
	// console.log(info)
	const [err, res] = await uni.request({
		url: `${config.baseUrl}/${config.requestKeyword}/${info.url}`,
		method: info.method || 'GET',
		data: info.data,
		header: {
			Authorization: uni.getStorageSync('token') || ''
		}
	});
	if (err) return [err, null]
	if (res.data.status !== 200) return [res.data, null]
	return [null, res.data]
}

export default request
