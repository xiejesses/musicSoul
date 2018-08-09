import Vue from 'vue'
import Search from './Search'

const app = new Vue(Search)
app.$mount()

export default{
  config:{
    navigationBarTitleText:'搜索',
    // enablePullDownRefresh:true
  }
  
}