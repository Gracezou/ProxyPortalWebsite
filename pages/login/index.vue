<template>
  <div class="login_warpper">
    <div class="login_box" v-loading="loading">
      <div class="login_title">{{ $t('login.loginTitle') }}</div>
      <div class="login_sub_title">{{ $t('login.loginSubTitle') }}</div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" status-icon>
        <el-form-item prop="email">
          <el-input class="login_input" v-model="form.email" :placeholder="$t('login.loginEmailPlaceholder')" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="login_input" v-model="form.password" :placeholder="$t('login.loginPasswordPlaceholder')"
            show-password />
        </el-form-item>
      </el-form>
      <p class="forgot" @click="forgotPasswordHandler">{{ $t('login.forgotPassword') }}</p>
      <el-button class="login_btn" type="primary" @click="loginHandler">{{ $t('login.loginTitle') }}</el-button>
      <div class="tips_group">
        <p class="tips">{{ $t('login.noHaveAccount') }}</p>
        <p class="register" @click="goRegisterHandler">{{ $t('login.signUpNow') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import http from '@/api/http';
import { jwtParse } from '@/utils/form';
import { setToken, setUserInfo } from '@/utils/storage';
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
const loginHandler = () => {
  console.log(form)
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    http.post('/v1/website/login', form).then((res: any) => {
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
const goRegisterHandler = () => {
  router.push('/register')
}

const forgotPasswordHandler = () => {
  loading.value = true
  http.post('/v1/website/forget_password')
    .then(() => ElMessage.success('邮件发送成功'))
    .finally(() => loading.value = false)
}
</script>

<style lang="scss">
.login_warpper {
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

}

.login_box {
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

.login_title {
  font-size: 28px;
  line-height: 40px;
  color: #000;
  margin-bottom: 17px;
  text-align: center;
}

.login_sub_title {
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
