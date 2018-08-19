import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // pages: ['^pages/play/main'],
    // onReachBottomDistance:5,
    // pages: ['^pages/play/main'],
    pages: ['^pages/index/main'],
    // pages: ['^pages/test1/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '乐之魂',
      navigationBarTextStyle: 'black',
      // onReachBottomDistance:10,
    },
    // 'tabBar': {
    //   selectedColor: '#EA5149',
    //   list: [
    //     {
    //       pagePath: 'pages/index/main',
    //       text: '首页',
    //     },
    //     {
    //       pagePath: 'pages/search/main',
    //       text: '搜索',
    //     },
    //     {
    //       pagePath: 'pages/play/main',
    //       text: '播放',
    //     }

    //   ]
    // }
  }

}
