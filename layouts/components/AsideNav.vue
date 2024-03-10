<template>
  <el-aside width="340px" class="aside_wrapper">

    <el-menu default-active="2" router>
      <el-menu-item index="/admin/overview">
        <el-icon>
          <Monitor />
        </el-icon>
        <span>{{ $t('menu.overview') }}</span>
      </el-menu-item>
      <el-divider />
      <el-menu-item-group :title="$t('menu.proxy')">
      </el-menu-item-group>
      <el-menu-item index="/admin/api">
        <el-icon>
          <Link />
        </el-icon>
        <span>{{ $t('menu.apiMenu') }}</span>
      </el-menu-item>

      <el-menu-item index="/admin/user">
        <el-icon>
          <Link />
        </el-icon>
        <span>{{ $t('menu.userAuth') }}</span>
      </el-menu-item>

      <el-menu-item index="/admin/account">
        <el-icon>
          <Link />
        </el-icon>
        <span>{{ $t('menu.subAccount') }}</span>
      </el-menu-item>

      <el-menu-item index="/admin/allow">
        <el-icon>
          <Link />
        </el-icon>
        <span>{{ $t('menu.ipAllowList') }}</span>
      </el-menu-item>
      <el-divider />
      <el-menu-item-group :title="$t('menu.products')" />

      <el-sub-menu index="/admin/dynamic">
        <template #title>
          <el-icon>
            <Link />
          </el-icon>
          <span>{{ $t('menu.dynamicProxy') }}</span>
        </template>
        <el-menu-item index="/admin/dynamic/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/dynamic/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/admin/rotating">
        <template #title>
          <el-icon>
            <Link />
          </el-icon>
          <span>{{ $t('menu.rotatingDataCenterProxy') }}</span>
        </template>
        <el-menu-item index="/admin/rotating/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/rotating/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
      </el-sub-menu>
      <!-- <el-sub-menu index="/admin/isp">
        <template #title>
          <el-icon>
            <Link />
          </el-icon>
          <span>{{ $t('menu.rotatingIspProxy') }}</span>
        </template>
        <el-menu-item index="/admin/isp/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/isp/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
      </el-sub-menu> -->
      <el-sub-menu index="/admin/residential">
        <template #title>
          <el-icon>
            <Link />
          </el-icon>
          <span>{{ $t('menu.staticResidentialProxy') }}</span>
        </template>
        <el-menu-item index="/admin/residential/purchase">{{ $t('menu.purchaseProxy') }}</el-menu-item>
        <el-menu-item index="/admin/residential/history">{{ $t('menu.paymentHistory') }}</el-menu-item>
        <el-menu-item index="/admin/residential/proxy">{{ $t('menu.manageProxy') }}</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/admin/datacenter">
        <template #title>
          <el-icon>
            <Link />
          </el-icon>
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
import { Link, Monitor } from '@element-plus/icons-vue';

</script>

<style lang="scss" scoped>
.aside_wrapper {
  height: calc(100vh - 84px);
  background-color: #fff;
  padding: 15px 14px;
  border-right: #D7D7D7 1px solid;

  .el-divider {
    margin: 15px 0;
  }

  .el-menu {
    border-right: none;
    --el-menu-item-font-size: 16px;
  }

  .el-menu-item,
  .el-sub-menu {
    font-weight: 600;
    color: #555555;
  }
}
</style>
