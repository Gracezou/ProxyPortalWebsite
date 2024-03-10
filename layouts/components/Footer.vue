<script setup lang='ts'>
import LogoComp from '~/layouts/components/LogoComp.vue';
const links = [
  { name: 'AdsPower', href: 'https://share.adspower.net/LunaProxy' },
  { name: 'TKWOSAI', href: 'https://tkwosai.com/' },
  { name: '跨境服務商評論5840', href: 'https://5840.cn' },
  { name: 'ZVCARD出海導航', href: 'https://www.zvcard.com/' },
  { name: '跨境谷', href: 'https://kuajinggu.com/' },
  { name: 'FB帳號網', href: 'https://www.fbdlz.com/' },
  { name: 'MBBrowser', href: 'https://www.mbbrowser.com' },
  { name: 'VMLogin', href: 'https://vmlogin.cc/?ref=lunaproxy' },
  { name: 'YunLogin', href: 'https://www.yunlogin.com/' },
  { name: '深圳的阳', href: 'http://www.shenzhendeyang.com/' },
  { name: '比特指纹浏览器', href: 'https://www.bitbrowser.cn/' },
  { name: 'Clonbrowser', href: 'https://www.clonbrowser.com/?p=lunaproxy' },
  { name: 'MuLogin', href: 'https://www.mulogin.com/?ref=luna' },
  { name: 'xlogin', href: 'https://xlogin.us/?sub=lunaproxy' },
  { name: 'IDENTORY', href: 'https://identory.com/?utm_source=lunaproxy&utm_medium=affiliate' },
  { name: 'hubstudio', href: 'https://www.hubstudio.cn/?hub=LunaProxy' },
  { name: 'superali.top', href: 'https://superali.top/' },
  { name: 'SEO Bots', href: 'https://pay.seospace.net/agents/blackfriday?id=ctK2gwPwfgI%3D' },
  { name: 'DNY123', href: 'https://www.dny123.com/' },
  { name: 'AMZ123', href: 'https://www.amz123.com' },
  { name: 'Drainage script', href: 'https://www.facebook18.com' },
  { name: 'ikj168', href: 'https://www.ikj168.com' },
  { name: "Saibo's notes", href: 'https://www.saiboyy.com/' },
  { name: 'AMZMM', href: 'https://www.amzmm.com' },
  { name: 'Hangguo123', href: 'https://www.hangguo123.com' },
  { name: 'DTKJ.NET', href: 'https://123.dtkj.net/?sid=4414.html' },
  { name: '跨境都知道導航', href: 'https://www.kjdzd.com/' },
  { name: 'TSCHROME', href: 'http://www.tschrome.cn/' },
  { name: 'GoLink海外回國加速器', href: 'https://www.golinkcn.com/' },
  { name: 'Incogniton Browser', href: 'https://incogniton.com/' },
  { name: 'alayu-browser', href: 'https://www.alayu.com/' },
  { name: 'Nest Browser', href: 'https://nestbrowser.com/?utm_source=lunaproxy&utm_medium=blogroll' },
  { name: 'snswhy', href: 'https://www.snswhy.com/' },
  { name: 'Partnershare', href: 'https://www.partnershare.cn/?ref=lunaproxy' },
  { name: 'Genlogin', href: 'https://affiliate.genlogin.com/Yci8UYR5SaRA0MUv' },
  { name: 'IDENTORY', href: 'https://identory.com/?utm_source=lunaproxy&utm_medium=affilate' },
  { name: '懂跨境', href: 'https://www.dongkuajing.com/' },
  { name: 'See More', href: '/partner' }
];

const pricingInfo = {
  title: 'footer.pricingTitle',
  child: [
    { name: 'footer.pricingDynamic', href: undefined },
    { name: 'footer.pricingRotating', href: undefined },
    { name: 'footer.pricingStatic', href: undefined },
    { name: 'footer.pricingDataCenter', href: undefined },
  ]
}
const aboutUsInfo = {
  title: 'footer.aboutUsTitle',
  child: [
    { name: 'footer.terms', href: '/help/terms' },
    { name: 'footer.refund', href: '/help/refund' },
    { name: 'footer.privacy', href: '/help/privacy' },
    { name: 'footer.aml', href: '/help/aml' },
    { name: 'footer.shipping', href: '/help/shipping' },
  ]
}

const getProxiesInfo = {
  title: 'footer.getProxiesTitle',
  child: [
    { name: 'footer.api', href: undefined },
    { name: 'footer.user', href: undefined },
  ]
}
const moreInfo = {
  title: 'footer.moreTitle',
  child: [
    { name: 'footer.faq', href: undefined },
    { name: 'footer.contactUs', href: undefined },
    { name: 'footer.public', href: undefined },
  ]
}

const popularPlacesInfo = {
  title: 'footer.popularPlacesTitle',
  child: [
    { name: 'footer.japan', href: undefined },
    { name: 'footer.germany', href: undefined },
    { name: 'footer.united', href: undefined },
    { name: 'footer.unitedKingdom', href: undefined },
    { name: 'footer.france', href: undefined },
    { name: 'footer.brazil', href: undefined },
    { name: 'footer.canada', href: undefined },
    { name: 'footer.mexico', href: undefined },
  ]
}
const router = useRouter()
const gotoPageHandler = (href: string | undefined) => {
  if (href === undefined) return;
  router.push(href)
}

</script>

<template>
  <div class="home_footer">
    <div class="footer_content">
      <LogoComp class="footer_logo_wrapper" />
      <div class="item">
        <div class="divide_height">
          <p class="links_title">{{ $t('footer.pricingTitle') }}</p>
          <div class="links_list">
            <a class="dynamic_underline" v-for="link in pricingInfo.child" :key="link.name">
              {{ $t(link.name) }}
            </a>
          </div>
        </div>
        <div>
          <p class="links_title">{{ $t('footer.aboutUsTitle') }}</p>
          <div class="links_list">
            <a class="dynamic_underline" v-for="link in aboutUsInfo.child" :key="link.name"
              @click="gotoPageHandler(link.href)">
              {{ $t(link.name) }}
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="divide_height">
          <p class="links_title">{{ $t('footer.getProxiesTitle') }}</p>
          <div class="links_list ">
            <a class="dynamic_underline" v-for="link in getProxiesInfo.child" :key="link.name">
              {{ $t(link.name) }}
            </a>
          </div>
        </div>
        <div>
          <p class="links_title">{{ $t('footer.moreTitle') }}</p>
          <div class="links_list">
            <a class="dynamic_underline" v-for="link in moreInfo.child" :key="link.name">
              {{ $t(link.name) }}
            </a>
          </div>
        </div>
      </div>
      <div class="item">
        <p class="links_title">{{ $t('footer.popularPlacesTitle') }}</p>
        <div class="links_list">
          <a class="dynamic_underline" v-for="link in popularPlacesInfo.child" :key="link.name">
            {{ $t(link.name) }}
          </a>
        </div>
      </div>
    </div>
    <div class="links">
      <p class="links_title">{{ $t('footer.linkTitle') }} </p>
      <div class="links_list">
        <a class="dynamic_underline" v-for="link in links" :key="link.name" :href="link.href" target="_blank">
          {{ link.name }}
        </a>
      </div>
    </div>

    <div class="f-q">
      <p>{{ $t('footer.footerQuestion') }} - <span class="ruby_email">support@rubyproxy.com</span></p>
    </div>
    <div class="fot_bom">
      <p>
        <img src="https://wapi.lunaproxy.com/static/index/img/footer/warn.svg" alt="warn">
        <span>{{ $t('footer.footerWarn') }}</span>
      </p>
      <p>Copyright © 2024 Starlink Information Technology Limited. All Right Reserved.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home_footer {
  width: 1400px;
  margin: 0 auto;
}

.footer_logo_wrapper {
  width: 320px;
  height: 100px;

  .logo_icon {
    width: 48px;
    height: 48px;
  }
}

.footer_content {
  display: flex;
  justify-content: space-between;

  .links_title {
    font-size: 20px;
    color: #7F7F7F;
    margin-bottom: 8px;
  }

  .links_list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dynamic_underline {
    line-height: 25px;
    color: #fff;
    font-size: 16px;
    width: fit-content;
  }

  .divide_height {
    height: 240px;
  }
}

.links {
  display: flex;
  margin-top: 20px;

  .links_title {
    font-size: 14px;
    color: #626A7E;
    margin-right: 30px;
    margin-top: 0;
  }

  .links_list {
    flex: 1;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
  }
}

a.dynamic_underline {
  color: #AAB1C3;
  font-size: 14px;
  font-weight: 300;
  line-height: 100%;
  text-transform: capitalize;
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #18D2AB;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #18D2AB;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

.f-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid #797979;
  border-bottom: 1px solid #797979;
  margin-top: 16px;

  .ruby_email {

    color: #18D2AB;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
    cursor: pointer;
  }
}

.fot_bom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0;
  border-top: 0;

  p {
    color: #6F738F;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    display: flex;
    margin: 0;
  }
}
</style>
