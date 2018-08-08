<template>
  <div class="container">
    <div class="card-song">
      <div class="img">
        <!-- <img :src="music_res[0].artists.img1v1Url" alt=""> -->
         <img src="http://p3.music.126.net/CKcTyKux_UTt0sO_5VWR9w==/16561943649388272.jpg" mode="aspectFill" alt="">
      </div>
      <div>{{ songName }}</div>
      <div>{{ author }}</div>
    </div>
    <!-- <p>{{res.name}}</p> -->
    <!-- <button @click="play">play</button> -->
    <!-- <button @click="pause">pause</button> -->
    <!-- <button @click="getdata">获取数据</button> -->
  </div>
</template>

<script>
import { get,post} from '../../utils/http'
const myaudio = wx.createInnerAudioContext();
export default {
  data () {
    return {
      res:{},
      music_res:[],
      songName:' ',
      author:' ',
      test:'显示'
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
    },
    async getdata () {
      let music_res = await post('/musicSoul/search',{keywords:'有梦不难'})
    this.music_res = music_res.result.songs;
    this.songName = this.music_res[0].name
    this.author = this.music_res[0].artists[0].name
    console.log("歌名"+this.songName)
    console.log("作者"+this.author)
    }
  },
  mounted () {
    // myaudio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    myaudio.src = "http://music.163.com/song/media/outer/url?id=561452911.mp3";
  },

  async created () {
    let music_res = await post('/musicSoul/search',{keywords:'有梦不难'})
    this.music_res = music_res.result.songs;
    this.songName = this.music_res[0].name
    this.author = this.music_res[0].artists[0].name
    console.log("歌名"+this.songName)
    console.log("作者"+this.author)
    // console.log(this.music_res)
    console.log(await get('/musicSoul/demo'));
    this.res = await get('/musicSoul/demo')
    console.log("res:"+this.res.dd.name+this.res.dd.age)
    

  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.card-song {
  width: 550rpx;
  height: 850rpx;
  /* border: 1px solid red; */
  margin-top: 100rpx;
}
.img {
  height: 550rpx;
  width: 550rpx;
   /* border: 1px solid green; */
}
.img img{
  height: 550rpx;
  width: 550rpx;
}
</style>
