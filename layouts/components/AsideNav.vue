<template>
  <el-aside width="340px" class="aside_wrapper">

    <el-menu :default-active="defaultRoute" router>
      <el-menu-item index="/admin/overview">
        <el-image src="/icon/nav/Overview.svg" />
        <span>{{ $t('menu.overview') }}</span>
      </el-menu-item>
      <el-divider />
      <el-menu-item-group :title="$t('menu.proxy')">
      </el-menu-item-group>
      <el-menu-item index="/admin/api">
        <el-image src="/icon/nav/api.svg" />
        <span>{{ $t('menu.apiMenu') }}</span>
      </el-menu-item>
      <el-menu-item index="/admin/user">
        <el-image src="/icon/nav/userAuth.svg" />
        <span>{{ $t('menu.userAuth') }}</span>
      </el-menu-item>
      <el-menu-item index="/admin/account">
        <el-image src="/icon/nav/subAccount.svg" />
        <span>{{ $t('menu.subAccount') }}</span>
      </el-menu-item>

      <el-menu-item index="/admin/allow">
        <el-image src="/icon/nav/IPAllowlist.svg" />
        <span>{{ $t('menu.ipAllowList') }}</span>
      </el-menu-item>
      <el-divider />
      <el-menu-item-group :title="$t('menu.products')" />

      <el-sub-menu index="/admin/dynamic">
        <template #title>
          <el-image src="/icon/nav/Residential.svg" />
          <span>{{ $t('menu.dynamicProxy') }}</span>
        </template>
        <el-menu-item index="/admin/dynamic/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/dynamic/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/admin/rotating">
        <template #title>
          <el-image src="/icon/nav/rotatingDatacenter.svg" />
          <span>{{ $t('menu.rotatingDataCenterProxy') }}</span>
        </template>
        <el-menu-item index="/admin/rotating/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/rotating/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/admin/residential">
        <template #title>
          <el-image src="/icon/nav/staticResidential.svg" />
          <span>{{ $t('menu.staticResidentialProxy') }}</span>
        </template>
        <el-menu-item index="/admin/residential/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/residential/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
        <el-menu-item index="/admin/residential/proxy">{{ $t('menu.manageProxy') }}</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/admin/datacenter">
        <template #title>
          <el-image src="/icon/nav/staticdatacenter.svg" />
          <span>{{ $t('menu.staticDataCenterProxy') }}</span>
        </template>
        <el-menu-item index="/admin/datacenter/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/datacenter/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
        <el-menu-item index="/admin/datacenter/proxy">{{ $t('menu.manageProxy') }}</el-menu-item>

      </el-sub-menu>

    </el-menu>
  </el-aside>
</template>

<script setup lang='ts'>
import { getToken, getUserInfo } from '@/utils/storage';
// 获取默认路由
const route = useRoute()
const defaultRoute = computed(() =>
  route.path
)
onMounted(() => {
  if (!getToken() || !getUserInfo()) {
    return navigateTo('/login')
  }
})
</script>

<style lang="scss" scoped>
.aside_wrapper {
  height: calc(100vh - 84px);
  background-color: #fff;
  padding: 15px 14px;
  border-right: #D7D7D7 1px solid;

  .el-image {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .el-divider {
    margin: 15px 0;
  }

  .el-menu {
    border-right: none;
    --el-menu-item-font-size: 16px;
    --el-menu-level-padding: 35px;
  }

  .el-menu-item,
  .el-sub-menu {
    color: #555555;
  }

  .el-sub-menu {
    font-weight: 600;
  }

  .el-menu-item {
    font-weight: 400;
  }

}
</style>
