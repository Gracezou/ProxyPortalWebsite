<template>
    <div class="covering_map_wrapper">
        <h1>{{ $t('home.coveringTitle') }}</h1>
        <p>{{ $t('home.coveringDesc') }}</p>
        <div class="covering_map">

        </div>
    </div>
</template>
  
<script setup lang='ts'>

</script>
  
<style lang="scss" scoped>
.covering_map_wrapper {
    padding: 20px 40px;
    margin: 0 auto;
    width: 1400px;
    height: 760px;
    background-color: #E9F4F9;
    border-radius: 20px;
    margin-bottom: 50px;
    box-sizing: border-box;

    >h1 {
        margin-top: 25px;
        margin-bottom: 0;
        font-weight: normal;
        font-size: 36px;
        color: #333;
        line-height: 55px;
    }

    >p {
        padding-left: 12px;
        font-size: 16px;
        line-height: 25px;
        color: #374459;
        margin-bottom: 60px;
    }
}

.covering_map {
    height: 560px;
    width: 1320px;
    background-color: #fff;
}
</style>
