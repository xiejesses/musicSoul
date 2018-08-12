import Vue from 'vue'
import createAlbum from './createAlbum'

const app = new Vue(createAlbum)
app.$mount()

export default{
  config:{
    navigationBarTitleText:'创建分享',
    // enablePullDownRefresh:true
    navigationBarBackgroundColor: '#f8f8f8',
    
  }
  
}