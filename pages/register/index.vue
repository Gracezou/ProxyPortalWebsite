<template>
  <div class="register_warpper">
    <div class="register_box">
      <div class="register_title">{{ $t('register.registerTitle') }}</div>
      <div class="register_sub_title">{{ $t('register.registerSubTitle') }}</div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon>
        <el-form-item prop="email">
          <el-input class="login_input" v-model="form.email" :placeholder="$t('register.registerEmailPlaceholder')"
            auto-complete="new-password" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="login_input" v-model="form.password"
            :placeholder="$t('register.registerPasswordPlaceholder')" show-password auto-complete="new-password" />
        </el-form-item>
      </el-form>
      <div class="police_box">
        <el-checkbox size="large" v-model="checked"></el-checkbox>
        <p>
          {{ $t('register.registerPolicy') }}
          <span @click="gotoTermsAndConditions"> {{ $t('register.termsAndConditions') }}</span>
          {{ $t('register.and') }}
          <span @click="gotoRefundPolicy"> {{ $t('register.refundPolicy') }}</span>
        </p>
      </div>
      <el-button v-loading="loading" class="register_btn" type="primary" :disabled="registerable"
        @click="registerHandler">
        {{ $t('register.createAccount') }}
      </el-button>
      <div class="tips_group">
        <p class="tips">{{ $t('register.haveAccount') }}</p>
        <p class="register" @click="gotoLoginHandler">{{ $t('register.loginNow') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import http from '@/api/http';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive } from 'vue';
const form = reactive({
  email: '',
  password: ''
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Length should be 6', trigger: 'blur' }
  ]
})
const loading = ref(false)
const checked = ref(false)
const registerable = ref(true)
watchEffect(() => {
  console.log(checked.value, 'checked')
  console.log(form, 'form')
  if (ruleFormRef.value) {
    ruleFormRef.value.clearValidate()
    ruleFormRef.value.validate().then((valid) => {
      console.log(valid, 'valid')
      registerable.value = !valid && checked.value
    })
  }
})
onMounted(() => {
  ruleFormRef.value && ruleFormRef.value.clearValidate()
})
const registerHandler = () => {
  console.log(form)
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    http.post('/v1/website/sign_in', form).then((res: any) => {
      console.log(res, 'login')
      setToken(res.Xtoken)
      const userInfo = jwtParse(res.Xtoken)
      setUserInfo(JSON.stringify(userInfo))
      router.push('/admin/overview')
    }).finally(() => {
      loading.value = false
    })
  })
}
const router = useRouter()
const gotoLoginHandler = () => router.push('/login')
const gotoTermsAndConditions = () => router.push('/help/terms')
const gotoRefundPolicy = () => router.push('/help/refund')

</script>

<style lang="scss">
.register_warpper {
  height: calc(100vh - 84px);
  background: url('~/assets/image/login/bg.png') no-repeat center / 100% 100%;
  position: relative;

  p.forgot {
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    color: #316BFF;
    margin-top: 10px;
    margin-bottom: 48px;
  }

  .el-button {
    width: 370px;
    height: 48px;
    font-size: 20px;
    margin-bottom: 24px;
    border-radius: 10px;
  }

  .police_box {
    display: flex;
    margin-bottom: 24px;

    .el-checkbox {
      height: fit-content;
      margin-top: 4px;
    }

    p {
      font-size: 14px;
      color: #7F7F7F;
      margin-left: 10px;
    }

    span {
      color: #316BFF;
      cursor: pointer;
    }

  }

}

.register_box {
  width: 436px;
  height: 640px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 25px 30px;
  box-sizing: border-box;
  position: absolute;
  top: 55px;
  left: 156px;
  display: flex;
  flex-direction: column;
}

.register_title {
  font-size: 28px;
  line-height: 40px;
  color: #000;
  margin-bottom: 17px;
  text-align: center;
}

.register_sub_title {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 33px;
  color: #7F7F7F;
}

.login_input {
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  height: 48px;
  box-shadow: 5px 5px 10px 0px #95CEE6;

  .el-input__wrapper {
    border: none;
    box-shadow: none;
  }
}

.tips_group {
  display: flex;
  align-items: center;

  p {
    font-size: 14px;
    line-height: 22px;
    color: #7F7F7F;
    padding-right: 12px;
  }

  .register {
    color: #316BFF;
    cursor: pointer;
  }
}
</style>
