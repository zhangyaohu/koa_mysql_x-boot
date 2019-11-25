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

exports.parseSort = parseSort;
exports.isEmpty = isEmpty;
exports.isName = isName;
exports.isEmail = isEmail;
exports.isPassword = isPassword;
exports.isPhone = isPhone;