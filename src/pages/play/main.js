import Vue from 'vue'
import PlayMusic from './PlayMusic'

const app = new Vue(PlayMusic)
app.$mount()

export default{
  config:{
    navigationBarTitleText:'播放歌曲',
    // enablePullDownRefresh:true
  }
  
}