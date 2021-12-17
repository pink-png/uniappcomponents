/**
 * 显示loading
 * **/
function showLoading(content) {
	uni.showLoading({
		title: content
	})
}
/**
 * 隐藏loading
 * **/
function hideLoading() {
	uni.hideLoading()
}
/**
 * 提示信息
 * **/
function showModal(title, msg, showCancel) {
	uni.showModal({
		title: title,
		content: msg,
		showCancel: showCancel,
		success: function(res) {

		}
	})
}
/**
 * totast提示信息
 * **/
function showTotast(title, durationTime, icon) {
	uni.showToast({
		title: title,
		duration: durationTime,
		icon: icon
	})
}


/**
 * @param {String} url
 * @return {function}
 * @description navigateTo跳转
 */
function Jump(url) {
	uni.navigateTo({
		url: url
	})
}

/**
 * @param {number} numberpage
 * @return {funtion}
 * @description 返回前面几个层级
 */
function Back(numberpage) {
	uni.navigateBack({
		delta: numberpage
	})
}

module.exports = {
	showLoading,
	hideLoading,
	showModal,
	showTotast,
	Jump,
	Back
}
