<template>
  <div class="container">
    <swiper :style="{ height: windowHeight + 'px' }" style="margin-top:55px;" :current="activeIndex" duration="300" @change="switchTab" class="tab-content">
    <!-- <swiper style="height:100vh;margin-top:50px" :current="activeIndex" duration="300" @change="switchTab" class="tab-content"> -->
      <swiper-item class="item">
        <div class="box">
          <div class="flex-item">
            <img :src="albuminfo.pic" alt="" mode="aspectFill">
          </div>
          <div class="album-content">
            <p class="album-name">{{albuminfo. albumName}}</p>
            <p class="describe">{{albuminfo.albumDes }}</p>
            <p class="creator">by · {{albuminfo.creator}}</p>
          </div>
          <div class="next-page">
          <img src="/static/img/nextPage.svg" alt="">
        </div>
        </div>
      </swiper-item>
      <swiper-item class="item" v-for="songlist in albuminfo.songdetail" :key="songlist.id">
        <Music @changePlayStatus="changePlayStatus" :songinfo='songlist' :songIdArr='songIdArr' :songid='currentSongId' :currentIndex='currentIndex'></Music>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Music from '../../components/Music'
  import {
    get,
    post
  } from '../../utils/http'

  // let BGM = wx.getBackgroundAudioManager()

  export default {
    components: {
      Music,
    },
    data() {
      return {
        // activeIndex:0,
        userinfo: {},
        albumid: '',
        albuminfo: {},
        songIdArr: [],
        currentSongId: '',
        currentIndex: '',
        cur_songid: '',
        windowHeight:''
      }
    },
    methods: {
      switchTab(e) {
        console.log("当前页：")
        console.log(e)
        this.currentSongId = this.songIdArr[e.target.current - 1];
        this.currentIndex = e.target.current
        // this.activeIndex = 1
        // this.activeIndex = e.target.current

      },
      changePlayStatus(cur_songid) {
        console.log("changePlayStatus");
        console.log(cur_songid);
        this.cur_songid = cur_songid;
        // this.activeIndex = change_index;
        for (let i = 0; i < this.albuminfo.songdetail.length; i++) {
          if (this.albuminfo.songdetail[i].songId !== cur_songid) {
            this.albuminfo.songdetail[i].play_status = 0;
          }
          // if(this.albuminfo.songdetail[i].songId === cur_songid) {
          //   this.albuminfo.songdetail[i].play_status = 1;
          // }
        }
      },
      async getalbumdetail() {
        const albuminfo = await get('/musicSoul/albumdetail', {
          id: this.albumid,
          openId: this.userinfo.openId
        })
        this.albuminfo = albuminfo;
        // let obj = {};
        for (let i = 0; i < albuminfo.songdetail.length; i++) {
          // obj = {};
          // obj.index = i+1;
          // obj.songId = albuminfo.songdetail[i].songId;
          this.songIdArr.push(albuminfo.songdetail[i].songId);
        }
        console.log("this.albuminfo")
        console.log(this.albuminfo)
        for (let i = 0; i < this.albuminfo.songdetail.length; i++) {
          if (this.albuminfo.songdetail[i].songId === this.cur_songid) {
            this.albuminfo.songdetail[i].play_status = 1;
          }
        }
        // console.log("songIdArr")
        // console.log(this.songIdArr)
      },
      // async getlike_status() {
      //     if (this.userinfo.openId) {
      //         const likestatus = await get('/musicSoul/')
      //     }
      // }
    },
    mounted() {
      this.albumid = this.$root.$mp.query.id
      this.getalbumdetail()
      // this.getComments()
      // const userinfo = wx.getStorageSync('userinfo')
      // console.log('userinfo', userinfo)
      // if (userinfo) {
      //   this.userinfo = userinfo
      // }
    },
    onLoad() {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo;
      }
      wx.getSystemInfo({
        success: (res) => {

          this.windowHeight = res.windowHeight
        }
    });
    },
  //   onReady() {
    
  // }
  }

</script>

<style scoped>
  .container {
    width: 650rpx;
    margin: 0 auto;
  }

  .box {
    position: relative;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /* border: 1px solid red; */
    margin-bottom: 15px;
    border-radius: 10px;
    min-height: 500px;
    /* height: auto; */
  }

  /* .box:last-of-type{
    margin-bottom: 0px;
  } */

  /* .box::before,
  .box::after {
    
  } */

  .flex-item {
    border-radius: 10px;
    /* margin-bottom: 5px; */
    /* border: 1px solid red; */
  }

  .flex-item img {
    /* position: relative; */
    height: 300px;
    width: 100%;
    border-radius: 10px 10px 0 0;
  }

  .album-content {
    padding: 10px 20px 20px 20px;
  }

  .album-content .album-name {
    font-size: 25px;
    white-space: nowrap;
    width: 500rpx;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .album-content .describe {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 10px;
    width: 500rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: rgb(59, 66, 71);
  }
  .next-page img {
    width: 35px;
    height: 35px;
  }
  .next-page {
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
  }

</style>
