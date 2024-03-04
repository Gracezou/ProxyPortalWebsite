<template>
  <div class="excellent_proxy_wrapper">
    <div class="excellent_proxy_body">
      <h1 class="excellent_proxy_title">{{ $t('home.excellentProxyTitle') }}</h1>
      <p class="excellent_proxy_desc">{{ $t('home.excellentProxyDesc') }}</p>
      <div class="excellent_list">
        <div class="excellent_item" v-for="item in excellentInfoList" :key="item.title">
          <el-image :src="item.src" />
          <h1>{{ $t(item.title) }}</h1>
          <p>{{ $t(item.desc) }}</p>
          <div class="excellent_item_list">
            <div class="excellent_item_list_item" v-for="i in item.items" :key="i">
              <el-icon color="#38BDFF" size="15">
                <CircleCheckFilled />
              </el-icon>
              <p>{{ $t(i) }}</p>
            </div>
          </div>
          <el-button size="large" type="primary" @click="gotoDetailHandler">{{ $t('home.buyNow') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { CircleCheckFilled } from '@element-plus/icons-vue';
const excellentInfoList = [
  {
    src: 'images/excellent-proxy/dynamic.svg',
    title: 'home.excellentProxyDynamic',
    desc: 'home.excellentProxyDynamicDesc',
    items: [
      'home.excellentProxyDynamicItem1',
      'home.excellentProxyDynamicItem2',
      'home.excellentProxyDynamicItem3',
      'home.excellentProxyDynamicItem4',
      'home.excellentProxyDynamicItem5',
    ]
  },
  {
    src: 'images/excellent-proxy/static.svg',
    title: 'home.excellentProxyStatic',
    desc: 'home.excellentProxyStaticDesc',
    items: [
      'home.excellentProxyStaticItem1',
      'home.excellentProxyStaticItem2',
      'home.excellentProxyStaticItem3',
      'home.excellentProxyStaticItem4',
      'home.excellentProxyStaticItem5',
    ]
  },
  {
    src: 'images/excellent-proxy/flexible.svg',
    title: 'home.excellentProxyFlexible',
    desc: 'home.excellentProxyFlexibleDesc',
    items: [
      'home.excellentProxyFlexibleItem1',
      'home.excellentProxyFlexibleItem2',
      'home.excellentProxyFlexibleItem3',
      'home.excellentProxyFlexibleItem4',
      'home.excellentProxyFlexibleItem5',
    ]
  },
  {
    src: 'images/excellent-proxy/ISP.svg',
    title: 'home.excellentProxyISP',
    desc: 'home.excellentProxyISPDesc',
    items: [
      'home.excellentProxyISPItem1',
      'home.excellentProxyISPItem2',
      'home.excellentProxyISPItem3',
      'home.excellentProxyISPItem4',
      'home.excellentProxyISPItem5',
    ]
  },
]

const router = useRouter();
const gotoDetailHandler = () => {
  //TODO 判断是否已登录
  return router.push('/login');
}
</script>
  
<style lang="scss" scoped>
.excellent_proxy_wrapper {
  width: 100%;
  height: 770px;
  background-color: #E9F4F9;
  margin-bottom: 110px;
}

.excellent_proxy_body {
  width: 1400px;
  margin: 0 auto;
  padding: 56px 40px 50px 40px;
  box-sizing: border-box;
}

.excellent_proxy_title {
  margin: 0;
  line-height: 55px;
  font-size: 36px;
  color: #081D4D;
  font-weight: normal;
}

.excellent_proxy_desc {
  line-height: 25px;
  font-size: 16px;
  color: #374459;
}

.excellent_list {
  display: flex;
  justify-content: space-between;

  .el-image {
    width: 90px;
    height: 90px;
  }
}

.excellent_item {
  margin-top: 30px;
  width: 300px;
  background-color: #fff;
  padding: 0 14px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  border: 5px solid #fff;
  height: 520px;

  h1 {
    margin-top: 20px;
    margin-bottom: 17px;
    line-height: 30px;
    font-size: 20px;
    color: #333;
    font-weight: normal;
  }

  >p {
    line-height: 20px;
    margin-bottom: 34px;
    font-size: 13px;
    color: #555555;
  }

  .el-button {
    margin: 25px auto;
    width: 140px;
    font-size: 18px;
  }

  &:hover {
    margin-top: 10px;
    border: 5px solid #316BFF;
    height: 540px;
  }
}

.excellent_item_list_item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  >p {
    padding-left: 12px;
    font-size: 13px;
    line-height: 20px;
    color: #555555;
  }
}
</style>
