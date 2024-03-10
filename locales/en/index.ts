// layout
import footer from './footer'
import menu from './menu'
// home
import home from './home'
// auth
import login from './login'
import register from './register'
// policy
import aml from './aml'
import privacy from './privacy'
import refund from './refund'
import shipping from './shipping'
import terms from './terms'
// pricing
import pricing from './pricing'
// admin - proxy
import subAccount from './account'
import allowlist from './allowlist'
import api from './api'
import overview from './overview'
import userauth from './userauth'
// admin - product
import datacenter from './datacenter'
import dynamic from './dynamic'
import isp from './isp'
import residential from './residential'
import rotating from './rotating'
export default {
  common: {
    title: 'Ruby Proxy',
  },
  menu,
  home,
  login,
  register,
  footer,
  terms,
  refund,
  privacy,
  aml,
  shipping,
  pricing,
  // admin - proxy
  overview,
  api,
  allowlist,
  subAccount,
  userauth,
  // admin - products
  datacenter,
  residential,
  dynamic,
  rotating,
  isp
}
