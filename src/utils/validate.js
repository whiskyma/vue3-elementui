//检验用户名
export function validatName(str) {
	const reg = /^[0-9a-zA-Z]{6,12}$/;
	return reg.test(str);
}

//检验password
export function validatPwd(str) {
  	const reg = /^[0-9a-zA-Z]{6,12}$/;
  	return reg.test(str);
}

//检验yzm
export function validatYzm(str) {
  	const reg = /^\d{4,6}$/;
  	return reg.test(str);
}

//检验手机号
export function validaPhone(str) {
	const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
	return reg.test(str);
}

//检验微信号
export function validaWechat(str) {
	const reg = /^([a-zA-Z\d])+$/;
	return reg.test(str);
}

//检验QQ号
export function validaQQ(str) {
    const reg = /^\d+$/;
    return reg.test(str);
}

//检验真实姓名
export function validaRealName(str) {
	const reg = /^[\u4e00-\u9fa5]|[a-zA-z\d]{2,}$/;
	return reg.test(str);
}

//检验登录密码
export function validaLoginPwd(str) {
	const reg = /^[a-zA-Z\d]{6,12}$/;
	return reg.test(str);
}

//检验提款密码
export function validaDrawPwd(str) {
	const reg = /^[0-9]{6}$/;
	return str && reg.test(str);
}

//检验银行卡号
export function validaBankNo(str) {
	const reg = /^[0-9]{14,19}$/;
	return reg.test(str);
}

//检验护照和身份证
export function validaSfz(str) {
    const reg = /^[a-zA-Z\d]{8,19}$/;
    return reg.test(str);
}


