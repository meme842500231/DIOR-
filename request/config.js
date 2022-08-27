const config = {
	env: 'develop', // develop test product
	baseUrl: '', // 基础域名
	developUrl: 'https://dior-gift-dev.yimlinkapp.com', //开发域名
	testUrl: 'https://uat-gift-register.christiandior.cn', // 测试域名
	productUrl: 'https://gift-register.christiandior.cn', // 产品域名
	requestKeyword: 'api/api/front' // 请求关键字
}

switch (config.env) {
	case 'develop':
		config.baseUrl = config.developUrl
		break
	case 'test':
		config.baseUrl = config.testUrl 
		break
	case 'product':
		config.baseUrl = config.productUrl 
		break
	default:
		config.baseUrl = config.developUrl 
}

export default config
