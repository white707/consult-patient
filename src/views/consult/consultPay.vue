<script setup lang="ts">
import cpNavBar from '@/components/cpNavBar.vue'
import {
  showToast,
  ActionSheet as VanActionSheet,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Checkbox as VanCheckbox,
  SubmitBar as VanSubmitBar,
  Button as VanButton,
  showConfirmDialog,
  showDialog,
  showLoadingToast,
} from 'vant'
import cpIcon from '@/components/cpIcon.vue'
import type { ConsultOrderPreData, PartialConsult } from '@/types/consulet'
import { createConsultOrder, getConsultOrderPayUrl, getConsultOrderPre } from '@/services/cosnult'
import { onMounted, ref } from 'vue'
import { useConsultStore } from '@/stores'
import type { Patient } from '@/types/user'
import { getPatientDetail } from '@/services/user'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const store = useConsultStore()
const router = useRouter()
//获取预支付信息
const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType,
  })
  payInfo.value = res.data
}
//获取患者详情
const patient = ref<Patient>()
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  patient.value = res.data
}

type key = keyof PartialConsult

onMounted(() => {
  //生成订单信息不完整时，提示用户完善信息
  const validKeys: key[] = [
    'illnessTime',
    'illnessDesc',
    'depId',
    'illnessType',
    'type',
    'consultFlag',
    'patientId',
  ]
  const valid = validKeys.every((key) => store.consult[key] !== undefined)
  if (!valid)
    return showDialog({
      title: '温馨提醒',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false,
    }).then(() => {
      router.push('/')
    })
  loadData()
  loadPatient()
})

const agree = ref(false)
const show = ref(false)
const loading = ref(false)
const orderId = ref('')
const submit = async () => {
  if (!agree.value) return showToast('请同意支付协议')
  //发送生成订单的请求
  loading.value = true
  const res = await createConsultOrder(store.consult)
  loading.value = false
  store.clear()
  orderId.value = res.data.id
  //   console.log(orderId.value)
  show.value = true
}
const payType = ref<0 | 1>()

//用户引导
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})

const onClose = () => {
  return showConfirmDialog({
    title: '确认关闭吗？',
    message: '关闭后将无法继续支付,无法获得医生回复',
    confirmButtonText: '继续支付',
    cancelButtonText: '狠心离开',
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
const pay = async () => {
  if (payType.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({
    message: '正在跳转支付...',
    duration: 0,
  })
  const res = await getConsultOrderPayUrl({
    orderId: orderId.value,
    paymentMethod: payType.value,
    payCallback: 'http://localhost:5173/room',
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <div class="consult-pay-page" v-if="payInfo && patient">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"
      />
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <van-submit-bar
      @click="submit"
      button-type="primary"
      :price="payInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      :loading="loading"
    />
    <!-- 支付方式选择-支付抽屉 -->
    <van-action-sheet
      :closeable="false"
      :before-close="onClose"
      v-model:show="show"
      title="支付方式选择"
      :close-on-popstate="false"
    >
      <div class="content">
        <div class="pay-type">
          <p class="amount">￥{{ payInfo.actualPayment.toFixed(2) }}</p>
          <van-cell-group>
            <van-cell title="微信支付" @click="payType = 0">
              <template #icon><cp-icon name="consult-wechat" /></template>
              <template #extra><van-checkbox :checked="payType === 0" /></template>
            </van-cell>
            <van-cell title="支付宝支付" @click="payType = 1">
              <template #icon><cp-icon name="consult-alipay" /></template>
              <template #extra><van-checkbox :checked="payType === 1" /></template>
            </van-cell>
          </van-cell-group>
          <div class="btn">
            <van-button @click="pay" type="primary" round block>立即支付</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
