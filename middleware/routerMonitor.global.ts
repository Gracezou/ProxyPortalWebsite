export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to)
  // if (to.fullPath.includes('admin') && !getToken() && !getUserInfo()) {
  //   return navigateTo('/login')
  // }

  // if (to.fullPath === '/infors') { // 重定向
  //   return navigateTo('/applyCode')
  // }
  // if (to.fullPath === '/login') {  // 停止当前导航
  //   return abortNavigation()
  // }
  // if (to.fullPath === '/comePay/comePay') { // 拒绝当前导航并出现错误
  //   return abortNavigation('禁止进入页面')
  // }
})
