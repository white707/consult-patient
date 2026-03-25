//验证规则
const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
]
const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^[a-zA-Z0-9_]{6,12}$/, message: '请输入6-12位字母、数字或下划线' },
]
const codeRule = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '请输入6位数字验证码' },
]
const nameRule = [
  { required: true, message: '请输入姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '请输入2-10位中文字符' },
]
const identifyRule = [
  { required: true, message: '请输入身份证号' },
  {
    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '请输入正确的身份证号',
  },
]
export { mobileRules, passwordRules, codeRule, nameRule, identifyRule }
