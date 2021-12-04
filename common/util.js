/***
 * 获取时间戳
 */
function getTimStamp() {
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	return timestamp;
}
/***
 * 生成随机数
 */
function getNonce() {
	var t = '';
	for (var i = 0; i < 12; i++) {
		t += Math.floor(Math.random() * 10);
	}
	return t;
}
/**
 * 获取32位随机数
 * ***/
function getnoncestr() {
	let len = len || 32;
	var $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var maxPos = $chars.length;
	var pwd = '';
	for (var i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

/**
 * 解析url中的参数
 */
function UrlParamHash(url) {
	var params = {},
		h;
	var hash = url.slice(url.indexOf("?") + 1).split("&");
	for (var i = 0; i < hash.length; i++) {
		h = hash[i].split("=");
		if (h.length > 1) {
			params[h[0]] = h[1];
		} else {
			params[h[0]] = "";
		}
	}
	return params;
}

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
const Debounce = (fn, t) => {
	const delay = t || 500
	let timer
	return function() {
		const args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			timer = null
			fn.apply(this, args)
		}, delay)
	}
}

/**
 * 函数节流 (某函数在指定时间间隔内执行，如：每1秒执行一次)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
function throttle(fn,  delay = 1000) {
  let prevTime = Date.now();
  return function () {
    let curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this, arguments);
      prevTime = curTime;
    }
  };
}


/**
 *获取几个月前的输入日期
 *{param:DateTime} date 输入日期(YYYY-MM-DD)
 *{param:number } monthNum 月数
 */
function GetPreMonthDay(date, monthNum) {
	var dateArr = date.split('-');
	var year = dateArr[0]; //获取当前日期的年份
	var month = dateArr[1]; //获取当前日期的月份
	var day = dateArr[2]; //获取当前日期的日
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中月的天数
	var year2 = year;
	var month2 = parseInt(month) - monthNum;
	if (month2 <= 0) {
		var absM = Math.abs(month2);
		year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
		month2 = 12 - (absM % 12);
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if (day2 > days2) {
		day2 = days2;
	}
	if (month2 < 10) {
		month2 = '0' + month2;
	}
	var t2 = year2 + '-' + month2 + '-' + day2;
	return t2;
}

function 



module.exports = {
	getTimStamp,
	getNonce,
	getnoncestr,
	UrlParamHash,
	GetPreMonthDay
}
