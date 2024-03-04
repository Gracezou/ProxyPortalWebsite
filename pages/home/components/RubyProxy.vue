<template>
  <div class="ruby_proxy_wrapper">
    <div class="ruby_proxy_body">
      <h1 class="ruby_proxy_title">{{ $t('home.rubyProxyTitle') }}</h1>
      <p class="ruby_proxy_desc">{{ $t('home.rubyProxyDesc') }}</p>
      <el-tabs class="ruby_proxy_tabs" v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane v-for="tab in itemList" :key="tab.name" :label="tab.name" :name="tab.name">
          <template #label>
            <div class="custom_tab_title">
              <el-image :src="tab.src" />
              <p class="tab_text">{{ $t(tab.title) }}</p>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-carousel ref="carouselRef" indicator-position="none" arrow="never" :loop="false" :autoplay="false">
        <el-carousel-item :name="item.name" v-for="item in itemList" :key="item.name" class="ruby_proxy_carousel">
          <div class="ruby_proxy_carousel_info">
            <h1>{{ $t(item.title) }}</h1>
            <p>{{ $t(item.desc) }}</p>
          </div>
          <el-button size="large" type="primary" @click="gotoDetailHandler">{{ $t('home.tryItNow') }}</el-button>
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>
  
<script setup lang='ts'>
import type { TabsPaneContext } from 'element-plus';
const activeTab = ref('commerce');

const carouselRef = ref();

const handleClick = (tab: TabsPaneContext) => {
  carouselRef.value && carouselRef.value.setActiveItem(tab.paneName)
}

const itemList = [
  { name: 'commerce', title: 'home.commerce', desc: 'home.commerceDesc', src: 'images/ruby-proxy/commerce.svg' },
  { name: 'seo', title: 'home.seo', desc: 'home.seoDesc', src: 'images/ruby-proxy/seo.svg' },
  { name: 'brand', title: 'home.brand', desc: 'home.brandDesc', src: 'images/ruby-proxy/brand.svg' },
  { name: 'social', title: 'home.social', desc: 'home.socialDesc', src: 'images/ruby-proxy/social.svg' },
  { name: 'market', title: 'home.market', desc: 'home.marketDesc', src: 'images/ruby-proxy/market.svg' },
  { name: 'webScraping', title: 'home.webScraping', desc: 'home.webScrapingDesc', src: 'images/ruby-proxy/webScraping.svg' },
]

const router = useRouter();
const gotoDetailHandler = () => {
  //TODO 判断是否已登录
  return router.push('/login');
}
</script>
  
<style lang="scss" >
.ruby_proxy_wrapper {
  width: 100%;
  height: 770px;
  background-color: #E9F4F9;
  margin-bottom: 90px;

}

.ruby_proxy_body {
  width: 1400px;
  margin: 0 auto;
  padding-top: 26px;
  padding-bottom: 75px;
}

p {
  margin: 0;
  white-space: pre-wrap;
}

.ruby_proxy_title {
  line-height: 55px;
  font-size: 36px;
  color: #081D4D;
  margin-bottom: 18px;
  margin-top: 0;
  padding: 0 38px;
  font-weight: normal;
}

.ruby_proxy_desc {
  line-height: 25px;
  font-size: 16px;
  margin-bottom: 28px;
  color: #374459;
  padding: 0 38px;
}

.ruby_proxy_tabs {
  --el-tabs-header-height: 200px;

  .el-tabs__nav {
    display: flex;
    width: 100%;
    text-align: center;
  }

  .el-tabs__item {
    flex: 1;
  }

  .tab_text {
    line-height: 27px;
    color: #081D4D;
    font-size: 18px;
    padding-bottom: 26px;
  }

  .el-image {
    width: 135px;
    height: 135px;
  }
}

.ruby_proxy_carousel {

  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  box-sizing: border-box;
  align-items: center;

  .ruby_proxy_carousel_info {
    flex: 1;
  }

  .el-button {
    width: 160px;
    height: 50px;
    font-size: 20px;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 10px;
    line-height: 55px;
    font-size: 36px;
    color: #333;
  }

  p {
    line-height: 25px;
    font-size: 16px;
  }
}
</style>
