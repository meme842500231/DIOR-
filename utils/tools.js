// 防抖 
export const debounce = (callback, delay = 800) => {
	let timer // 闭包存定时器状态 
	return function() {
		let args = arguments // 携带的参数 
		if (timer) clearTimeout(timer) // 清除定时器 
		timer = setTimeout(() => { // 回调 
			callback.apply(this, args)
		}, delay)
	}
}
