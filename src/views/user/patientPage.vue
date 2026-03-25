<script setup lang="ts">
import cpNavBar from '@/components/cpNavBar.vue'
import cpIcon from '@/components/cpIcon.vue'
import { getPatientList, addPatient } from '@/services/user'
import { onMounted, ref } from 'vue'
import type { PatientList, Patient } from '@/types/user'
import CpRadioButton from '@/components/cpRadioButton.vue'
import {
  Popup as VanPopup,
  Form as VanForm,
  Field as VanField,
  Checkbox as VanCheckbox,
  type FormInstance,
  showToast,
  showConfirmDialog,
} from 'vant'
import { computed } from 'vue'
import { nameRule, identifyRule } from '@/types/rules'

const list = ref<PatientList>([])
const loadlist = async () => {
  const res = await getPatientList()
  //   console.log(res)
  list.value = res.data
}
onMounted(() => {
  loadlist()
})
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
]

//控制弹窗显示隐藏
const show = ref(false)
const showPopup = () => {
  patient.value = { ...initpatient }
  show.value = true
}
// const gender = ref(1)

const initpatient: Patient = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1,
}

const patient = ref<Patient>({ ...initpatient })
//支持复选框
const defaultFlag = computed({
  get: () => (patient.value.defaultFlag === 1 ? true : false),
  set: (value) => (patient.value.defaultFlag = value ? 1 : 0),
})

//进行提交
const form = ref<FormInstance>()
const onSubmit = async () => {
  // 验证表单 validate方法进行校验
  await form.value?.validate()
  //对性别进行校验，取出身份证倒数第二位%2是否为0，0为男，1为女
  const gender = Number(patient.value.idCard.slice(-2, -1)) % 2
  if (gender !== patient.value.gender) {
    await showConfirmDialog({
      title: '提示',
      message: '性别与身份证号不一致是否继续提交？',
    })
  }
  //添加患者
  await addPatient(patient.value)
  //添加成功后，刷新列表
  showToast('添加成功')
  loadlist()
  show.value = false
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in list" :key="item.id">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon"><cp-icon name="user-edit" /></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>

      <div class="patient-add" v-if="list.length < 6" @click="showPopup">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
      <!-- 使用popup组件 -->
      <van-popup position="right" v-model:show="show">
        <cp-nav-bar
          @click-right="onSubmit"
          title="添加患者"
          right-text="保存"
          :back="() => (show = false)"
        ></cp-nav-bar>
        <van-form autocomplete="off" ref="form">
          <van-field
            :rules="nameRule"
            v-model="patient.name"
            label="真实姓名"
            placeholder="请输入真实姓名"
          />
          <van-field
            :rules="identifyRule"
            v-model="patient.idCard"
            label="身份证号"
            placeholder="请输入身份证号"
          />
          <van-field label="性别" class="pb4">
            <!-- 单选按钮组件 -->
            <template #input>
              <cp-radio-button :options="options" v-model="patient.gender"></cp-radio-button>
            </template>
          </van-field>
          <van-field label="默认就诊人">
            <template #input>
              <van-checkbox v-model="defaultFlag" :icon-size="18" round />
            </template>
          </van-field>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}

.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>
