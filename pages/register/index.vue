<template>
  <div class="register_warpper">
    <div class="register_box">
      <div class="register_title">{{ $t('register.registerTitle') }}</div>
      <div class="register_sub_title">{{ $t('register.registerSubTitle') }}</div>
      <el-input class="register_input" v-model="form.username"
        :placeholder="$t('register.registerEmailPlaceholder')"></el-input>
      <el-input class="register_input" v-model="form.password" :placeholder="$t('register.registerPasswordPlaceholder')"
        show-password></el-input>
      <div class="police_box">
        <el-checkbox size="large" v-model="checked"></el-checkbox>
        <p>
          {{ $t('register.registerPolicy') }}
          <span @click="gotoTermsAndConditions"> {{ $t('register.termsAndConditions') }}</span>
          {{ $t('register.and') }}
          <span @click="gotoRefundPolicy"> {{ $t('register.refundPolicy') }}</span>
        </p>
      </div>
      <el-button class="register_btn" type="primary" @click="registerHandler">
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
import { reactive } from 'vue';
const form = reactive({
  username: '',
  password: ''
})
const checked = ref(false)
const registerHandler = () => {
  console.log(form)
}
const router = useRouter()
const gotoLoginHandler = () => router.push('/login')
const gotoTermsAndConditions = () => router.push('/help/terms')
const gotoRefundPolicy = () => router.push('/help/refund')

</script>
  
<style lang="scss" >
.register_warpper {
  height: calc(100vh - 84px);
  background-image: url('images/login/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

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

.register_input {
  width: 100%;
  margin-bottom: 20px;
  padding: 0 8px;
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
