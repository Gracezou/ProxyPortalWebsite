# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

3.11
通用：
字体更换

首页：
多语言繁体处理
下拉菜单price高亮效果 / icon背景色/高亮灰色调整/icon更换
动态图更换（但是效果不明显）
best value for money 加粗处理
动态图第四个调整  /问题答案更换

登录：
背景图处理
校验规则增加

overview页面
菜单栏icon更换
start using/recharge 跳转
用户头像删除-留展位
导航栏增加登录状态

3.12
api:
页面翻译
sub account：
精确度调整/时间格式调整

3.14
price 调整
注册页面调整
logout修复


3.15
通用：刷新500问题
官网：
语言切换繁体中文
下拉菜单跳转

overview：
菜单栏icon样式调整

sub account： -clear
Traffic Limit的小数位数精确到两位 (/M)
时间格式处理秒

price -clear
dynamic proxy: 标题调整
菜单栏 二级字体调整
manage proxy
select placeholder
time format
static residential purchase
search input width suitable
 manage proxy delete option

3.17
加载问题解决（多语言后缀还未加）
刷新500目前没出现-部署服务器再试下

增加登录状态拦截/logout显示问题再试试？

首页
繁体中文文案更换
下拉菜单跳转补充

注册拦截加了

overview
仪表盘
subaccount 404
切换tab不请求，增加刷新按钮/ 增加刷新状态
时钟

sub-account
500应该修复 /表单增加 单位m

proxy
autorenew 请求修复
样式同步
下拉框提示语补充
时间显示？
remark保留pop？
