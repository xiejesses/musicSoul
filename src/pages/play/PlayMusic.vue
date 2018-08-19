<template>
  <div class="container">
    <div class="song-card">
      <div class="song-img">
        <!-- <img src="http://p3.music.126.net/ghmbmEQS-IJfZPjdA3KGxg==/82463372084291.jpg" alt="" mode="aspectFill"> -->
        <img :src="imgUrl" alt="" mode="aspectFill">
      </div>
      <div class="song-detail">
        <p>{{songName}}</p>
        <p>{{songAuthor}}</p>
        <!-- <p>I Miss You So Much</p> -->
        <!-- <p>jesses</p> -->

          <div v-if="userinfo.openId" class="love">
            <picker @change="PickerChange" :value="indexPicker" :range="pickerAlbums">
              <img :src="play_status?yesSrc:noSrc" alt="">
              <!-- <img src="/static/img/love_gray.svg" alt=""> -->
            </picker>
          </div>
        <div class="love" v-else  @click="checkLogin"><img src="/static/img/love_gray.svg" alt=""></div>
        
        <!-- <div class="love">
          <img  @click="deleteSong" src="/static/img/love_red.svg" alt="">
        </div> -->
        
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
    <!-- <div>
      <picker @change="PickerSelect" :value="pickerIndex" :range="array"></picker>
    </div> -->
    <!-- <div v-show="showPicker" >
    <picker class="weui-btn" @change="PickerChange" :value="indexPicker" :range="array">
      <button type="default"><img src="/static/img/love_gray.svg" alt=""></button>
    </picker>
  </div> -->
    <!-- <button class="weui-btn" type="default" @click="openConfirm">登录</button> -->
  </div>
</template>

<script>
  import config from '../../config'
  import qcloud from 'wafer2-client-sdk'
  import {
    get,
    post
  } from '../../utils/http'
  let audio = wx.createInnerAudioContext();
  // audio.src = "http://music.163.com/song/media/outer/url?id=5179544.mp3";
  export default {
    data() {
      return {
        userinfo: {},
        songid: '',
        songdetail: {},
        imgUrl: '',
        songName: '',
        songAuthor: '',
        playing: false,
        showPicker: false,
        indexPicker: 1,
        // albumlistsName: [],
        pickerAlbums:[],
        yesSrc:'/static/img/love_red.svg',
        noSrc:'/static/img/love_gray.svg',
        play_status:false
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
      deleteSong() {
        console.log("删除成功！")
      },



      openConfirm() {
        let self = this;
        wx.showModal({
          title: '请先登录！',
          // content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
          confirmText: "登录",
          cancelText: "算了",
          success: function (res) {
            // console.log(res);
            if (res.confirm) {
              console.log('点了去登录');
                 wx.navigateTo({
                  url: '/pages/index/main?activeIndex=1',
                })
                self.getalbums();
            } else {
              console.log('点了算了')
            }
          }
        });
      },
      checkLogin() {
        if (!this.userinfo.openId) {
          this.openConfirm()
        }
      },
      async PickerChange(e) {
        // console.log(e)
        // console.log(e.mp.detail.value);
        console.log('选中的值为：' + this.pickerAlbums[e.mp.detail.value]);
        if (this.pickerAlbums[e.mp.detail.value] == '+新建专辑') {
                  wx.navigateTo({
                    url: '/pages/create/main'
                  })
                }
        const addsongres = await post('/musicSoul/addsong', {
          openId:this.userinfo.openId,
          songId:this.songid,
          songName: this.songName,
          songAuthor: this.songAuthor,
          pic: this.imgUrl,
          userAlbum:this.pickerAlbums[e.mp.detail.value]
        })
        console.log(addsongres);
        if (addsongres.code === 1) {
            // wx.navigateBack({
            // delta: 1
            // })
            wx.showToast({
            title: '添加成功',
            icon: 'success'
            })
            this.play_status = true;
        } else if (addsongres.code === -2) {
          wx.showToast({
            title: addsongres.msg,
            icon: 'success'
            })
        }
        else {
            wx.showModal({
                  title:'添加失败',
                  // content: e.mp.detail.errMsg,
                  content: '请重试！',
                  showCancel: false
                })
        }

      },
      async getalbums() {
        const albumlists = await get('/musicSoul/albumlist', {
          openId: this.userinfo.openId
        })
        console.log(albumlists);
        this.pickerAlbums = [];
        this.pickerAlbums.push('+新建专辑')
        for (let i = 0; i < albumlists.list.length; i++) {
          // let obj = {
          //   albumId:albumlists.list[i].id,
          //   albumName:albumlists.list[i].albumName
          // }
          // this.pickerAlbums.push(obj);
          this.pickerAlbums.push(albumlists.list[i].albumName)
        }
        // this.albumlists = albumlists.list
        console.log(this.pickerAlbums)
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
    },
    onShow() {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo;
        this.getalbums();
        // console.log("缓存" + this.userinfo.openId)
      }
      this.play_status = false;
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

  /* .song-card {
  position: relative;
} */

  .song-card {
    display: inline-block;
    position: relative;
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

  .song-img img {
    height: 560rpx;
    width: 100%;
    /* width: 580rpx; */
    border-radius: 5px 5px 0 0;
  }

  .song-detail {
    /* position: relative; */
    text-align: center;
    color: rgb(59, 66, 71);
  }

  .song-detail p:nth-child(1) {
    font-size: 22px;
    white-space: nowrap;
    width: 500rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px 15px;
  }

  .song-detail p:nth-child(2) {
    font-size: 18px;
    white-space: nowrap;
    width: 450rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px 20px;
  }

  .song-detail .love button,
  img {
    width: 35px;
    height: 35px;
    z-index: 3;
    /* fill: black; */
    /* background-color: red; */
  }

  .song-detail button {
    border: none;
    background: none;
  }

  .song-detail .love {
    position: absolute;
    top: 640rpx;
    right: 0px;
    z-index: 3;
    /* overflow: hidden; */
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

</style>
