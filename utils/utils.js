  const parseSort = (param) => {
	if(param) {
		return {
			orderBy: param.slice(1),
		  orderDirection: param.charAt(0)=== '-' ? 'DESC' : 'ASC'
	  }
	}
} 
 const isEmpty = (param) => {
  return param === '' || param === null || param === '{}' || param === 'undefined'
}

const isName = (name) => {
	let regx = /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z\u4e00-\u9fa5-_0-9]{1, 254}[a-zA-Z\u4e00-\u9fa50-9]$/
	return regx.test(name);
}

const isEmail = (email) => {
	let regx = /[a-zA-Z_0-9]+@[a-zA-Z_0-9]{2,6}(\\.[a-zA-Z_0-9]{2,3})+/
	return regx.test(email);
}

const isPassword = (password) => {
	return password.length >= 6;
}

const isPhone = (phone) => {
	let regx = /^1(3|4|5|6|7|8|9)\d{9}$/
	return regx.test(phone);
}

const genUniqueId = () => {
  const firstCount = 12;
  const secondCount = 3;
  const thirdCount = 15;
  let chars = '0123456789abcdef'.split('');
  let fn = () => {
    return chars[Math.floor(Math.random() * 16)]
  };
  let uuid = '';
  for (let i = 0; i < firstCount; i++) {
    uuid += fn()
  }
  uuid += '12345'.split('')[Math.floor(Math.random() * 5)];
  for (let i = 0; i < secondCount; i++) {
    uuid += fn()
  }
  uuid += '89ab'.split('')[Math.floor(Math.random() * 4)];
  for (let i = 0; i < thirdCount; i++) {
    uuid += fn()
  }
  return uuid
}

const formatDate = (val, fmt) => {
		let value = new Date(val);
		var o = {
			"M+" : value.getMonth()+1,                 //月份
			"d+" : value.getDate(),                    //日
			"h+" : value.getHours(),                   //小时
			"m+" : value.getMinutes(),                 //分
			"s+" : value.getSeconds(),                 //秒
			"q+" : Math.floor((value.getMonth()+3)/3), //季度
			"S"  : value.getMilliseconds()             //毫秒
		};
		if(/(y+)/.test(fmt))
			fmt=fmt.replace(RegExp.$1, (value.getFullYear()+"").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("("+ k +")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		return fmt;	
}

exports.parseSort = parseSort;
exports.isEmpty = isEmpty;
exports.isName = isName;
exports.isEmail = isEmail;
exports.isPassword = isPassword;
exports.isPhone = isPhone;
exports.genUniqueId = genUniqueId;
exports.formatDate = formatDate;