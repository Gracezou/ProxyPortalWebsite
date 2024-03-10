<template>
  <div class="logo_wrapper">
    <img src="~/assets/image/rubyproxy_logo.png" alt="logo" />
    <img class="logo_icon" src="~/assets/image/ruby_stone_log.png" alt="logo_icon" />
  </div>
</template>

<style scoped lang="scss">
.logo_wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
  }

  .logo_icon {
    position: absolute;
    top: 8px;
    left: -20px;
    width: 30px;
    height: 30px;
  }
}
</style>
