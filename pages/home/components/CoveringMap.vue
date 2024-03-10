<template>
    <div class="covering_map_wrapper">
        <h1>{{ $t('home.coveringTitle') }}</h1>
        <p>{{ $t('home.coveringDesc') }}</p>
        <div class="covering_map">
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'north'" src="images/map/map-north-america.png" fit="fill" />
                <!-- <el-image :src="mapUrl" fit="fill" /> -->
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'south'" src="images/map/map-south-america.png" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'asia'" src="images/map/map-asia.png" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'australia'" src="images/map/map-australia.png" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'europe'" src="images/map/map-europe.png" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === 'africa'" src="images/map/map-africa.png" fit="fill" />
            </transition>
            <transition name="el-fade-in-linear">
                <el-image v-if="mapLocation === ''" src="images/map/map-normal.png" fit="fill" />
            </transition>


            <el-icon class="north" @mouseenter="handleMouseEnter('north')" @mouseleave="handleMouseLeave">
                <Location />
            </el-icon>
            <el-icon class="asia" @mouseenter="handleMouseEnter('asia')" @mouseleave="handleMouseLeave">
                <Location />
            </el-icon>
            <el-icon class="australia" @mouseenter="handleMouseEnter('australia')" @mouseleave="handleMouseLeave">
                <Location />
            </el-icon>
            <el-icon class="europe" @mouseenter="handleMouseEnter('europe')" @mouseleave="handleMouseLeave">
                <Location />
            </el-icon>
            <el-icon class="africa" @mouseenter="handleMouseEnter('africa')" @mouseleave="handleMouseLeave">
                <Location />
            </el-icon>
            <el-icon class="south" @mouseenter="handleMouseEnter('south')" @mouseleave="handleMouseLeave">
                <Location />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { Location } from '@element-plus/icons-vue';
const mapLocation = ref('');
const mapUrl = computed(() => {
    switch (mapLocation.value) {
        case 'north':
            return 'images/map/map-north-america.png';
        case 'south':
            return 'images/map/map-south-america.png';
        case 'asia':
            return 'images/map/map-asia.png';
        case 'australia':
            return 'images/map/map-australia.png';
        case 'europe':
            return 'images/map/map-europe.png';
        case 'africa':
            return 'images/map/map-africa.png';
        default:
            return 'images/map/map-normal.png';
    }
});
const handleMouseEnter = (location: string) => {
    mapLocation.value = location;
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
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

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
        color: #fff;
        z-index: 20;
        cursor: pointer;
    }

    .north {
        top: 156px;
        left: 317px;
    }

    .south {
        top: 374px;
        left: 432px;
    }

    .asia {
        top: 195px;
        left: 991px;
    }

    .australia {
        top: 409px;
        left: 1071px;
    }

    .europe {
        top: 115px;
        left: 648px;
    }

    .africa {
        top: 300px;
        left: 724px;
    }
}
</style>
