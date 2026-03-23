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
export { mobileRules, passwordRules, codeRule }
