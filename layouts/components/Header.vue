<script setup lang="ts">
import { getToken, getUserInfo, removeToken, removeUserInfo } from '@/utils/storage';
import { ArrowDown } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import LogoComp from '~/layouts/components/LogoComp.vue';

const isLogin = computed(() => {
  return getToken() && getUserInfo();
});

const username = computed(() => {
  const userStr = getUserInfo();
  if (userStr) {
    const user = JSON.parse(userStr)
    return user.username || user.user_email
  }
  return '';
});
const router = useRouter()
const goOverviewHandler = () => router.push('/admin/overview');
const logoutHandler = () => {
  removeToken()
  removeUserInfo()
  router.replace('/login')
}

const { locale } = useI18n()
const handleChange = (val: string) => {
  locale.value = val
  const cookieLang = useCookie('lang')
  cookieLang.value = locale.value
}
// to home page
const goHomeHandler = () => router.push('/')
// to login page
const goLoginHandler = () => router.push('/login')
// to register page
const goRegisterHandler = () => router.push('/register')
// to pricing page
const gotoPricingHandler = () => router.push('/pricing')
const proxiesDropdownVisible = ref(false)
const proxiesItemList = [
  {
    icon: '/icon/home.svg',
    title: 'menu.residential',
    detail: 'menu.residentialDetail',
    link: '/login'
  },
  {
    icon: '/icon/static.svg',
    title: 'menu.staticData',
    detail: 'menu.staticDataDetail',
    link: '/login'
  },
  // {
  //   icon: ' /icon/static.svg',
  //   title: 'menu.static',
  //   detail: 'menu.staticDetail',
  //   link: '/login'
  // },
  {
    icon: '/icon/datacenter.svg',
    title: 'menu.http',
    detail: 'menu.httpDetail',
    link: '/login'
  },
  {
    icon: '/icon/rotating.svg',
    title: 'menu.proxiesRotating',
    detail: 'menu.rotatingDetail',
    link: '/login'
  },
]

const pricingDropDownVisible = ref(false)
const pricingItemList = [
  {
    icon: '/icon/global.svg',
    title: 'menu.resiDential',
    detail: 'menu.resiDentialDetail',
    unit: 'menu.day',
    price: '$72',
    link: '/login'
  },
  {
    icon: '/icon/static-price.svg',
    title: 'menu.staticResidential',
    detail: 'menu.staticResidentialDetail',
    unit: 'menu.month',
    price: '$5',
    link: '/login'
  },
  // {
  //     icon: ' /icon/rotating.svg',
  //   title: 'menu.rotatingIsp',
  //   detail: 'menu.rotatingIspDetail',
  //   unit: 'menu.GB',
  //   price: '$0.7',
  //   link: '/login'
  // },
  {
    icon: '/icon/database.svg',
    title: 'menu.dedicatedDatacenter',
    detail: 'menu.dedicatedDatacenterDetail',
    unit: 'menu.ip',
    price: '$2.5',
    link: '/login'
  },
  {
    icon: '/icon/database-rotaing.svg',
    title: 'menu.rotatingDatacenter',
    detail: 'menu.rotatingDatacenterDetail',
    unit: 'menu.GB',
    price: '$0.7',
    link: '/login'
  },
]

const getProxiesDropDownVisible = ref(false)
const getProxiesItemList = [
  {
    icon: '/icon/api.svg',
    title: 'menu.api',
    detail: 'menu.apiDetail',
    link: '/login'
  },
  {
    icon: '/icon/user.svg',
    title: 'menu.user',
    detail: 'menu.userDetail',
    link: '/login'
  },
  {
    icon: '/icon/global.svg',
    title: 'menu.global',
    detail: 'menu.globalDetail',
    link: '/login'
  },
]
const getProxiesLastItem = {
  icon: '/icon/chrome.svg',
  title: 'menu.rubyProxy',
  detail: 'menu.rubyProxyDetail',
  link: '/login'
}
</script>

<template>
  <ClientOnly>
    <el-affix :offset="0">
      <el-header class="header_wrapper">
        <LogoComp class="header_logo_wrapper" @click="goHomeHandler" />
        <div class="menu_wrapper">
          <div class="menu_item" :class="proxiesDropdownVisible ? 'hover' : ''"
            @mouseenter="proxiesDropdownVisible = true" @mouseleave="proxiesDropdownVisible = false">
            <p class="menu_title">{{ $t('menu.proxies') }}</p>
            <el-icon class="menu_icon">
              <ArrowDown />
            </el-icon>
            <transition name="el-fade-in-linear">
              <div class="menu_dropdown_wrapper" v-show="proxiesDropdownVisible">
                <div class="menu_content">
                  <p>{{ $t('menu.proxiesTitle') }}</p>
                  <el-divider />
                  <div class="content">
                    <div class="dropdown_item hover" v-for="p in proxiesItemList" :key="p.title">
                      <div class="icon_image">
                        <el-image :src="p.icon" />
                      </div>
                      <div class="dropdown_item_content">
                        <p class="dropdown_item_title">{{ $t(p.title) }}</p>
                        <p class="dropdown_item_detail">{{ $t(p.detail) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="menu_item" :class="pricingDropDownVisible ? 'hover' : ''"
            @mouseenter="pricingDropDownVisible = true" @mouseleave="pricingDropDownVisible = false">
            <p class="menu_title">{{ $t('menu.pricing') }}</p>
            <el-icon class="menu_icon">
              <ArrowDown />
            </el-icon>
            <transition name="el-fade-in-linear">
              <div class="menu_dropdown_wrapper" v-show="pricingDropDownVisible">
                <div class="menu_content">
                  <div class="dropdown_title_divider">
                    <div>
                      <p>{{ $t('menu.rotaingPricing') }}</p>
                      <el-divider />
                    </div>
                    <div>
                      <p>{{ $t('menu.staticPricing') }}</p>
                      <el-divider />
                    </div>
                  </div>
                  <div class="content">
                    <div class="dropdown_item hover" v-for="pricing in pricingItemList" :key="pricing.title"
                      @click="gotoPricingHandler">
                      <div class="icon_image">
                        <el-image :src="pricing.icon" />
                      </div>
                      <div class="dropdown_item_content">
                        <p class="dropdown_item_title">{{ $t(pricing.title) }}</p>
                        <p class="dropdown_item_detail">{{ $t(pricing.detail) }}</p>
                      </div>
                      <div class="dropdown_item_price">
                        <p>{{ $t('menu.startFrom') }}</p>
                        <p>{{ pricing.price }}/{{ $t(pricing.unit) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="menu_item" :class="getProxiesDropDownVisible ? 'hover' : ''"
            @mouseenter="getProxiesDropDownVisible = true" @mouseleave="getProxiesDropDownVisible = false">
            <p class="menu_title">{{ $t('menu.getProxies') }}</p>
            <el-icon class="menu_icon">
              <ArrowDown />
            </el-icon>
            <transition name="el-fade-in-linear">
              <div class="menu_dropdown_wrapper" v-show="getProxiesDropDownVisible">
                <div class="menu_content">
                  <div class="dropdown_title_divider">
                    <div>
                      <p>{{ $t('menu.getProxies') }}</p>
                      <el-divider />
                    </div>
                    <div>
                      <p>{{ $t('menu.freeTools') }}</p>
                      <el-divider />
                    </div>
                  </div>
                  <div class="content">
                    <div>
                      <div class="dropdown_item hover" v-for="getProxy in getProxiesItemList" :key="getProxy.title">
                        <div class="icon_image">
                          <el-image :src="getProxy.icon" />
                        </div>
                        <div class="dropdown_item_content">
                          <p class="dropdown_item_title">{{ $t(getProxy.title) }}</p>
                          <p class="dropdown_item_detail">{{ $t(getProxy.detail) }}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="dropdown_item hover">
                        <div class="icon_image">
                          <el-image :src="getProxiesLastItem.icon" />
                        </div>
                        <div class="dropdown_item_content">
                          <p class="dropdown_item_title">{{ $t(getProxiesLastItem.title) }}</p>
                          <p class="dropdown_item_detail">{{ $t(getProxiesLastItem.detail) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="menu_item">
            <p class="menu_title">{{ $t('menu.help') }}</p>
            <el-icon class="menu_icon">
              <ArrowDown />
            </el-icon>
          </div>
        </div>
        <div class="flex-grow" />
        <el-dropdown @command="handleChange">
          <span class="i18n_wrapper">
            <img src="~/assets/image/i18n.svg" alt="logo" />
            {{ $t('menu.language') }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div class="login_wrapper" v-if="isLogin">
          <el-button link @click="goOverviewHandler">{{ username }}</el-button>
          <el-button size="large" class="register" type="primary" @click="logoutHandler">
            {{ $t('login.logout') }}
          </el-button>
        </div>

        <div class="login_wrapper" v-else>
          <el-button link @click="goLoginHandler">{{ $t('menu.login') }}</el-button>
          <el-button size="large" class="register" type="primary" @click="goRegisterHandler">
            {{ $t('menu.register') }}
          </el-button>
        </div>
      </el-header>
    </el-affix>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.header_wrapper {
  display: flex;
  align-items: center;
  padding: 0 70px;
  height: 84px;
  background-color: transparent;

  .el-dropdown {
    height: 40px;
  }
}

.header_logo_wrapper {
  width: 200px;
  height: 84px;
  cursor: pointer;
}

.menu_wrapper {
  padding: 0 55px;
  border-bottom: none;
  flex: 1;
  display: flex;
  height: 100%;
}

.menu_item {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  font-size: 16px;
  color: #555555;
  padding: 0 20px;

  p {
    margin: 0;
    padding: 0 8px;
  }

  .menu_icon {
    transition: all 0.2s ease-in-out;
    font-size: 16px;
  }

  p.menu_title {
    width: fit-content;
    white-space: nowrap;
  }

  &.hover {
    p.menu_title {
      color: #316BFF;
    }

    .menu_icon {
      transition: all 0.2s ease-in-out;
      transform: rotate(180deg);
    }

  }

}

.i18n_wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  select {
    width: 70px;
    height: 30px;
    border: none;
    outline: none;
    background-color: #fff;
  }
}

.login_wrapper {
  display: flex;
  align-items: center;
  padding-left: 100px;

  button {
    color: #555555;
  }

  .register {
    width: 130px;
    margin-left: 25px;
    color: #fff
  }
}

.menu_dropdown_wrapper {
  position: absolute;
  top: 84px;
  left: 0;
  width: 100%;
  background-color: #fff;
  height: 320px;
  padding: 10px 256px;
  color: #555555;
  font-size: 16px;
  box-sizing: border-box;
  z-index: 1001;

  .el-divider {
    margin: 10px 0;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 1000px;
  }

  .dropdown_title_divider {
    display: flex;

    >div {
      width: 420px;
      margin-right: 40px;

    }
  }
}

.dropdown_item {
  width: 420px;
  height: 70px;
  display: flex;
  padding: 6px 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 40px;
  box-sizing: border-box;
  transition: background-color 0.3s ease;

  .icon_image {
    background-color: #e9f4f9;
    height: 40px;
    width: 40px;
    margin-right: 6px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    padding: 5px;
  }

  .dropdown_item_content {
    flex: 1;
  }

  .dropdown_item_title {
    line-height: 25px;
    font-size: 16px;
  }

  .dropdown_item_detail,
  .dropdown_item_price {
    font-size: 12px;
  }

  .dropdown_item_price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 20px;
  }

}

.dropdown_item.hover:hover {
  background-color: #e7e7e7;

  .icon_image {
    background-color: #FFF;
  }
}
</style>
<style>
.el-affix--fixed {
  background-color: #fff;
}
</style>
