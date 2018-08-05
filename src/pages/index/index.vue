<template>
  <div>
    <button @click="play">play</button>
    <button @click="pause">pause</button>
  </div>
</template>

<script>
const myaudio = wx.createInnerAudioContext();
export default {
  data () {
    return {
      
    }
  },

  components: {

  },

  methods: {
    play () {
      myaudio.play();
      console.log("点了播放");
    },
    pause () {
      myaudio.pause();
    }
  },
  mounted () {
    // myaudio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    myaudio.src = "https://music.163.com/#/song?id=561452911";
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    
    

  }
}
</script>

<style scoped>

</style>
