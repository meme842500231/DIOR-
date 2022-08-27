import config from '@/request/config'

export const upload = async (filePath) => {
	const [err, res] = await uni.uploadFile({
		url: `${config.baseUrl}/${config.requestKeyword}/upload`,
		filePath,
		name: 'file',
		header: {
			Authorization: uni.getStorageSync('token') || ''
		}
	});
	if (err) return [err, null]
	res.data = JSON.parse(res.data)
	if (res.data.status !== 200) return [res.data, null]
	return [null, res.data]
}
