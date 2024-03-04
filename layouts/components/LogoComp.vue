<template>
  <div class="logo_wrapper">
    <img src="~/assets/image/logo.jpg" alt="logo" />
    <img class="logo_icon" src="~/assets/image/logo_icon.png" alt="logo_icon" />
  </div>
</template>
<style scoped lang="scss">
.logo_wrapper {
  display: flex;
  align-items: center;
  position: relative;

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
