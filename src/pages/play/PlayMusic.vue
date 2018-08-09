<template>
  <div class="container">
    <div class="song-card">
      <div class="song-img">
        <img :src="imgUrl" alt="" mode="aspectFill">
      </div>
      <div class="song-detail">
        <p>{{songName}}</p>
        <p>{{songAuthor}}</p>
      </div>
      <div class="song-control">
        <div class="prev">
          <img src="/static/img/play-prev-none.svg" alt="">
        </div>
        <div @click="pause" v-if="playing" class="play-pause">
          <img src="/static/img/music_pause_button.svg" alt="">
        </div>
        <div @click="play" v-else class="play-pause">
          <img src="/static/img/music_play_button.svg" alt="">
        </div>
        <div class="next">
          <img src="/static/img/play-next-none.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    post
  } from '../../utils/http'
  let audio = wx.createInnerAudioContext();
  // audio.src = "http://music.163.com/song/media/outer/url?id=5179544.mp3";
  export default {
    data() {
      return {
        songid: '',
        songdetail: {},
        imgUrl: '',
        songName: '',
        songAuthor: '',
        playing: false,
      }
    },

    methods: {
      play() {
        audio.play();
        this.playing = true;
        console.log("点了播放");
      },
      pause() {
        audio.pause();
        this.playing = false;
      },
    },
    async mounted() {
    //   this.songid = 40147557
      this.songid = this.$root.$mp.query.id
      audio.src = `http://music.163.com/song/media/outer/url?id=${this.songid}.mp3`;

      let res = await post('/musicSoul/songdetail', {
        id: this.songid
      })
      this.songdetail = res.songs[0];
      this.imgUrl = this.songdetail.al.picUrl;
      this.songName = this.songdetail.name;
      this.songAuthor = this.songdetail.ar[0].name;
      console.log(this.songdetail)
      // this.getDetail()
      // this.getComments()
      // const userinfo = wx.getStorageSync('userinfo')
      // console.log('userinfo', userinfo)
      // if (userinfo) {
      //   this.userinfo = userinfo
      // }
    }
  }

</script>

<style scoped>
  .container {
    width: 580rpx;
    margin: 0 auto;
  }

  /* .song-card {
    height: 860rpx;
    margin-top: 100rpx;
    border-radius: 5px;
    box-shadow: 1px -2px rgb(219, 215, 215);
} */

  .song-img img {
    height: 560rpx;
    width: 100%;
    /* width: 580rpx; */
    border-radius: 5px 5px 0 0;
  }

  .song-detail {
    text-align: center;
    color: rgb(59, 66, 71);
  }

  .song-detail p:nth-child(1) {
    font-size: 23px;
  }

  .song-detail p:nth-child(2) {
    font-size: 19px;
  }

  .song-control {
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 20px;
    /* text-align: center; */
    /* vertical-align: middle; */
  }

  .song-control div {
    margin: 0 17px 0 17px;
  }

  .song-control .prev img {
    width: 35px;
    height: 35px;
  }

  .song-control .prev {
    margin-top: 8px;
  }

  .song-control .next {
    margin-top: 8px;
  }

  .song-control .play-pause {
    /* z-index: 99; */
  }

  .song-control .play-pause img {
    width: 50px;
    height: 50px;
  }

  .song-control .next img {
    width: 35px;
    height: 35px;
  }


  .song-card {
    display: inline-block;
    /* *display: inline; */
    height: 860rpx;
    margin-top: 100rpx;
    width: 580rpx;
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    border: 1px solid #eee;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    position: relative;
  }

  .song-card:before {
    -webkit-transform: skew(-15deg) rotate(-6deg);
    -moz-transform: skew(-15deg) rotate(-6deg);
    transform: skew(-15deg) rotate(-6deg);
    left: 15px;
  }

  .song-card:after {
    -webkit-transform: skew(15deg) rotate(6deg);
    -moz-transform: skew(15deg) rotate(6deg);
    transform: skew(15deg) rotate(6deg);
    right: 15px;
  }

  .song-card:before,
  .song-card:after {
    width: 70%;
    height: 55%;
    content: ' ';

    -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

    position: absolute;
    bottom: 10px;
    z-index: -1;
  }

</style>
