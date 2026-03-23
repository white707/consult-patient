<script setup lang="ts">
import CpNavBar from '../../components/cpNavBar.vue'
import CpIcon from '../../components/cpIcon.vue'
import {
  Icon as VanIcon,
  Form as VanForm,
  Field as VanField,
  Checkbox as VanCheckbox,
  Button as VanButton,
  Divider as VanDivider,
  showToast,
  showSuccessToast,
  type FormInstance,
} from 'vant'
import { login as loginPassword } from '@/services/user'
import { onUnmounted, ref } from 'vue'
import { useUserStore } from '@/stores'
import { mobileRules, passwordRules, codeRule } from '@/types/rules'
import { useRouter, useRoute } from 'vue-router'
import { sendCode, loginByCode } from '@/services/user'

const mobile = ref('')
const password = ref('')
const agree = ref(false)
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  if (!agree.value) return showToast('请先同意用户协议和隐私条款')
  //进行登录（合并验证码登录）
  const res = isPasswordLogin
    ? await loginPassword(mobile.value, password.value)
    : await loginByCode(mobile.value, code.value)
  store.setUser(res.data)
  showSuccessToast('登录成功')
  router.replace((route.query.returnUrl as string) || '/user')
}
//短信登陆信息切换
const isPasswordLogin = ref(true)
const code = ref('')
//发送验证码
const time = ref(0)
const form = ref<FormInstance>()
let timer: number
const onSend = async () => {
  //验证倒计时，和手机号
  if (time.value > 0) return showToast('请稍后再发送')
  await form.value?.validate('mobile')
  const res = await sendCode(mobile.value, 'login')
  console.log(res)
  showToast('验证码发送成功')
  time.value = 60
  //开始倒计时
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
onUnmounted(() => {
  clearInterval(timer)
})
//密码的可见切换
const isShow = ref(false)
</script>

<template>
  <div class="login-page">
    <CpNavBar right-text="注册" @click-right="$router.push('/register')"></CpNavBar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPasswordLogin ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPasswordLogin = !isPasswordLogin">{{
          isPasswordLogin ? '短信验证码登录' : '密码登录'
        }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" ref="form">
      <van-field
        name="mobile"
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPasswordLogin"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
      >
        <template #button>
          <cpIcon :name="`login-eye-${isShow ? 'on' : 'off'}`" @click="isShow = !isShow"></cpIcon>
        </template>
      </van-field>
      <van-field v-else :rules="codeRule" v-model="code" placeholder="短信验证码" type="password">
        <template #button>
          <span @click="onSend" class="btn-send">{{
            time > 0 ? `${time}秒后重新发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button @click="login" native-type="submit" block round type="primary"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
      <!-- <CpIcon name="consult-alipay"></CpIcon> -->
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
