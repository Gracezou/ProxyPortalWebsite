<script setup lang="ts">
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { computed } from 'vue';

const locale = computed(() => {
  const language = useCookie('lang') || 'en'
  return language.value === 'zh' ? zhCn : en
})


const route = useRoute()
// 判断当前页面是否是首页
const isHome = computed(() => !route.path.includes('/admin'))
</script>

<template>
  <el-config-provider :locale="locale">
    <NuxtLayout v-if="isHome" name="home">
      <NuxtPage />
    </NuxtLayout>
    <NuxtLayout v-else name="default">
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>
