const header = {}

function baseRequest(url, method, data) {

	return new Promise((reslove, reject) => {

		uni.request({
			url: url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				let {
					code,
					data
				} = res.data
				if (code == 200) {
					reslove(data);
				} else if (code == 400) {
					reslove(data.msg);
				} else {
					reject(data.msg || '系统错误');
				}
			},
			fail: (err) => {
				reject('请求失败', err);
			}
		})
	});
}

export default baseRequest;
