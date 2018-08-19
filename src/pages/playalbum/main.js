import Vue from 'vue'
import PlayAlbum from './PlayAlbum'

const app = new Vue(PlayAlbum)
app.$mount()

export default{
  config:{
    navigationBarTitleText:'播放专辑',
    // enablePullDownRefresh:true
  }
  
}