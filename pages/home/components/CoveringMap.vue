<template>
    <div class="covering_map_wrapper">
        <h1>{{ $t('home.coveringTitle') }}</h1>
        <p>{{ $t('home.coveringDesc') }}</p>
        <div class="covering_map">
            <!-- <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'north'" :src="map_north_america" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'south'" :src="map_south_america" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'asia'" :src="map_asia" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'australia'" :src="map_australia" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'europe'" :src="map_europe" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'africa'" :src="map_africa" fit="fill" />
            </transition> -->
            <img src="~/assets/image/map/map.svg" alt="">
            <!-- <el-image src="~/assets/image/rubyproxy_logo.png" fit="fill" /> -->
            <!-- <transition name="el-fade-in-linear">
                <el-image src="~/assets/image/rubyproxy_logo.png" fit="fill" />
               <el-image src="~/assets/image/map/map.svg" fit="fill" /> 
            </transition> -->
            <el-popover popper-class="map_pop" transition="el-zoom-in-bottom" placement="right-end" width="200"
                trigger="hover">
                <template #reference>
                    <el-icon class="north">
                        <Location />
                    </el-icon>
                </template>
                <div class="content_wrapper">
                    <h3>North America</h3>
                    <p>Untited States 3,599,080 IPs</p>
                    <p>Canada 2,704,625 IPs</p>
                    <p>Mexico1,389,098 IPs</p>
                </div>
            </el-popover>

            <el-popover popper-class="map_pop" transition="el-zoom-in-bottom" placement="right-end" width="200"
                trigger="hover">
                <template #reference>
                    <el-icon class="asia">
                        <Location />
                    </el-icon>
                </template>
                <div class="content_wrapper">
                    <h3>Asia</h3>
                    <p>South Korea 1,047,582 IPs</p>
                    <p>Malaysia 387,139 IPs</p>
                    <p>Singapore 71,525 IPs</p>
                </div>
            </el-popover>

            <el-popover popper-class="map_pop" transition="el-zoom-in-bottom" placement="left-end" width="200"
                trigger="hover">
                <template #reference>
                    <el-icon class="australia">
                        <Location />
                    </el-icon>
                </template>
                <div class="content_wrapper">
                    <h3>Oceania</h3>
                    <p>Australia 116,391 IPs</p>
                    <p>New Zealand 2,317,876 IPs</p>
                </div>
            </el-popover>

            <el-popover popper-class="map_pop" transition="el-zoom-in-bottom" placement="right-end" width="200"
                trigger="hover">
                <template #reference>
                    <el-icon class="europe">
                        <Location />
                    </el-icon>
                </template>
                <div class="content_wrapper">
                    <h3>Europe</h3>
                    <p>France 308,538 IPs</p>
                    <p>United Kingdom 345,432 IPs</p>
                </div>
            </el-popover>

            <el-popover popper-class="map_pop" transition="el-zoom-in-bottom" placement="left-end" width="200"
                trigger="hover">
                <template #reference>
                    <el-icon class="africa">
                        <Location />
                    </el-icon>
                </template>
                <div class="content_wrapper">
                    <h3>Africa</h3>
                    <p>South Africa 1,047,582 IPs</p>
                    <p>Algeria 1,826,593 IPs</p>
                </div>
            </el-popover>

            <el-popover popper-class="map_pop" transition="el-zoom-in-bottom" placement="left-end" width="200"
                trigger="hover">
                <template #reference>
                    <el-icon class="south">
                        <Location />
                    </el-icon>
                </template>
                <div class="content_wrapper">
                    <h3>South America</h3>
                    <p>Argentina 824,726 IPs</p>
                    <p>Brazil 1,094,862 IPs</p>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { Location } from '@element-plus/icons-vue';
const mapLocation = ref('');
const isInfoBoxVisible = ref(false);
const handleMouseEnter = (location: string) => {
    mapLocation.value = location;
    isInfoBoxVisible.value = true;
};
const handleMouseLeave = () => {
    mapLocation.value = '';
};
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


    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
}

.covering_map {
    height: 560px;
    width: 1320px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #091E2E;
    border-radius: 8px;

    .el-image {
        position: absolute;
        top: 14px;
        left: 124px;
        width: 1075px;
        height: 532px;
        // 切换图片增加过渡
        transition: all 0.3s;
    }

    .el-icon {
        position: absolute;
        font-size: 27px;
        color: #d41010;
        z-index: 20;
        cursor: pointer;
    }

    .north {
        top: 190px;
        left: 450px;
    }

    .south {
        top: 374px;
        left: 505px;
    }

    .asia {
        top: 195px;
        left: 890px;
    }

    .australia {
        top: 370px;
        left: 920px;
    }

    .europe {
        top: 180px;
        left: 670px;
    }

    .africa {
        top: 300px;
        left: 670px;
    }
}
</style>
<style lang="scss">
.map_pop {
    opacity: 0.9;
    --el-popover-bg-color: #F2F2F2;
    --el-border-color-light: #797979;
    color: #333333;
    --el-popover-padding: 10px;

    h3 {
        margin-top: 0;
        font-size: 16px;
        font-family: 'Poppins Medium';
        margin-bottom: 10px;
    }

    p {
        font-size: 13px;
    }
}
</style>
