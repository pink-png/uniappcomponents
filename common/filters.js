export function formatDate(value) {
	let date = new Date(value);
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? ('0' + MM) : MM;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let m = date.getMinutes();
	m = m < 10 ? ('0' + m) : m;
	let s = date.getSeconds();
	s = s < 10 ? ('0' + s) : s;
	return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

export function applyStatus(item) {
	switch (item) {
		case 0:
			return '未处理';
		case 1:
			return '正在电话联系';
		case 2:
			return '电话联系失败';
		case 3:
			return '处理中';
		case 4:
			return '发票已开未寄';
		case 5:
			return '发票已开未取';
		case 6:
			return '发票已取';
		case 7:
			return '国税信息未导入';
		case 8:
			return '需上传手续';
		case 9:
			return '多次联系未果';
		case 555:
			return '审稿中';
		case 666:
			return '等待购报';
		case 777:
			return '提交刊登';
		case 888:
			return '处理完成';
		case 997:
			return '部分待退款';
		case 998:
			return '撤稿待退款';
		case 999:
			return '已退款';
		default:
			return '处理中';
			break;
	}
}
