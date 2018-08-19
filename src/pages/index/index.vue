<template>
  <div>
    <div class="top-search-form">
      <a href="/pages/search/main" hover-class="none">
        <div class="search-input">
          <span class="search-icon">
            <icon type="search" size="20" />
          </span>
          <div>
            <span>搜索音乐</span>
          </div>
        </div>
      </a>
    </div>
    <div class="top-navbar">
      <block v-for="(item,index) in tabs" :key="index">
        <div :id="index" :class="{'active-bar':activeIndex == index}" class="navbar-item" @click="tabClick">
          <div class="weui-navbar__title">{{item}}</div>
        </div>
      </block>
    </div>
    <div>
      <swiper :style="{ height: swiper_height + 'rpx' }" :current="activeIndex" duration="300" @change="switchTab" class="tab-content">
        <swiper-item class="item">
          <Album :key='listData.id' v-for='listData in indexalbums' :album='listData'></Album>
          <p class="text-footer" v-if='!more'>END</p>
          <!-- <div class="load" id="load" v-if="listDatas.length">{{loadTips}}</div> -->
        </swiper-item>
        <swiper-item>
          <div v-if='userinfo.openId'>
            <div class="user-center">
              <div class="user-br">
                <img :src="userinfo.avatarUrl" alt="" mode="aspectFill">
                <!-- <img src="http://p3.music.126.net/jxKCtRmDaA9YBPfOV8WUDw==/3389794349690837.jpg" alt="" mode="aspectFill"> -->
              </div>
              <div class="user-info">
                <div class="user-avatar">
                  <!-- <img src="http://p3.music.126.net/jxKCtRmDaA9YBPfOV8WUDw==/3389794349690837.jpg" alt="" mode="aspectFill"> -->
                  <img :src="userinfo.avatarUrl" alt="" mode="aspectFill">
                </div>
                <div class="user-name">{{userinfo.nickName}}</div>
              </div>
              <div class="create">
                <a href="/pages/create/main" hover-class="none">
                  <img src="/static/img/create.svg" alt="">
                </a>
              </div>
            </div>

            <div class="user-album">
              <div class="user-share-album">
                <p class="my-share">我的分享</p>
                <!-- <div class="album-list"> -->
                <div v-for="albumlist in albumlists" :key="albumlist.id">
                  <a :href="playAlbumUrl + albumlist.id" hover-class="none">
                    <div class="album-list">
                      <div v-if="albumlist.pic" class="album-pic">
                        <img :src="albumlist.pic" alt="" mode="aspectFill">
                      </div>
                      <div v-else class="no-album-pic"></div>
                      <div class="album-name">
                        <p>{{albumlist.albumName}}</p>
                        <p>{{albumlist.songNum}} 首</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="notLogin">
            <p>空空如也</p>
            <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">登录</button>
          </div>
        </swiper-item>



      </swiper>
    </div>

  </div>
</template>
<script>
  import Album from '../../components/Album'
  import config from '../../config'
  import qcloud from 'wafer2-client-sdk'
  import {
    get,
    post
  } from '../../utils/http'
  export default {
    components: {
      Album,
    },
    data() {
      return {
        activeIndex: 0,
        tabs: ['首页', '我的'],
        windowHeight: 0,
        baseItemHeight: 695,
        swiper_height: 0,
        loadTips: '上拉加载更多',
        albumlists: [],
        indexalbums: [],
        // listDatas:[],
        userinfo: {},
        page: 0,
        more: true,
        // config:{
        //   loginUrl: 'http://localhost:5858/musicSoul/login',
        //   userUrl: 'http://localhost:5858/musicSoul/user'
        // }
      }
    },
    computed: {
      playAlbumUrl() {
        return '/pages/playalbum/main?id='
      }
    },
    methods: {
      tabClick(e) {
        console.log(e);
        this.activeIndex = e.currentTarget.id;
      },
      switchTab(e) {
        console.log(e)
        // this.activeIndex = 1
        this.activeIndex = e.target.current
      },

      doLogin: function () {
        const session = qcloud.Session.get()
        qcloud.setLoginUrl(config.loginUrl);
        // qcloud.setLoginUrl('http://localhost:5858/musicSoul/login');
        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          qcloud.loginWithCode({
            success: res => {
              this.userinfo = res;
              wx.setStorageSync('userinfo', res)
              console.log(this.userinfo);
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              })
              // this.setData({ userInfo: res, logged: true })
              // util.showSuccess('登录成功')
            },
            fail: err => {
              console.error(err)
              wx.showModal({
                title: '登录错误',
                // content: e.mp.detail.errMsg,
                content: err.message,
                showCancel: false
              })
              // util.showModel('登录错误', err.message)
            }
          })
        } else {
          // 首次登录
          qcloud.login({
            success: res => {
              this.userinfo = res;
              wx.setStorageSync('userinfo', res)
              console.log(this.userinfo);
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              })
              this.getuseralbums();
              // 从其他页面来的，登录成功跳回该页面
              //跳回要刷新（未解决），要不然拿不到新的数据
              //   wx.navigateBack({
              // delta: 1
              // })
            },
            fail: err => {
              console.error(err)
              wx.showModal({
                title: '登录错误',
                // content: e.mp.detail.errMsg,
                content: err.message,
                showCancel: false
              })
              // util.showModel('登录错误', err.message)
            }
          })
        }
      },


      async getuseralbums() {
        const albumlists = await get('/musicSoul/albumlist', {
          openId: this.userinfo.openId
        })
        this.albumlists = albumlists.list
        console.log("albumlists:")
        console.log(albumlists.list)
      },

      async getindexalbums(init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        const indexalbums = await get('/musicSoul/albumlist', {
          page: this.page
        })

        if (indexalbums.list.length < 3 && this.page > 0) {
          this.more = false
          console.log(this.more)
        }
        if (init) {
          this.indexalbums = indexalbums.list
          this.autoHeight();
          wx.stopPullDownRefresh()
          console.log("this.indexalbums 11")
          console.log(this.indexalbums)
        } else {
          // 下拉刷新，不能直接覆盖indexalbums 而是累加
          this.indexalbums = this.indexalbums.concat(indexalbums.list)
          this.autoHeight();
          console.log("this.indexalbums 22")
          console.log(this.indexalbums)
        }

        wx.hideNavigationBarLoading()
      },

      // getData() {
      //   let _item = {
      //     img: 'http://p3.music.126.net/hC-YGyr2cC0E_K_4Vfkztg==/109951163095172063.jpg',
      //     albumname: '那年追过的王力宏',
      //     describe: '从童年时代起就听王力宏的歌，他给了我太多的回忆',
      //     creator: 'jesses'
      //   }
      //   wx.showLoading();
      //   this.loadTips = '加载中...';
      //   setTimeout(() => {
      //     for (var i = 0; i < 5; i++) {
      //       this.listDatas.push(_item);
      //       this.listDatas[i].id = i;
      //     }
      //     this.loadTips = '上拉加载更多';
      //     this.autoHeight()
      //     wx.hideLoading();
      //   }, 1000)

      // },
      autoHeight() {
        if (this.indexalbums.length) {
          let num = this.indexalbums.length;
          this.swiper_height = this.baseItemHeight * num;
          console.log(this.swiper_height);
        } else {
          this.swiper_height = 600;
        }

      },
    },
    //   onPullDownRefresh () {
    //     this.getList(true)
    //     this.getTop()
    //   },
    // onReachBottom() {
    //   console.log("到底了");
    //   this.getData();
    // },
    onReachBottom() {
      if (!this.more) {
        // 没有更多了
        return false
      }
      this.page = this.page + 1
      this.getindexalbums()
    },
    onPullDownRefresh() {
      this.getindexalbums(true)
    },
    mounted() {
      this.getindexalbums(true)
      // this.getList(true)
      // this.getTop()
      // let userinfo = wx.getStorageSync('userinfo')
      // if (userinfo) {
      //   this.userinfo = userinfo;
      //   console.log("缓存" + this.userinfo)
      // }
    },
    onShow() {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo;
        this.getuseralbums();
        console.log("缓存" + this.userinfo.openId)
      }
    },
    onLoad(option) {
      console.log(option.activeIndex)
      this.activeIndex = option.activeIndex;
    }
  }

</script>
<style scoped>
  .top-search-form a {
    text-decoration: none;
  }

  .search-input {
    width: 650rpx;
    margin: 0 auto;
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
  }

  .search-input .search-icon icon {
    position: absolute;
    margin-left: 17px;
    margin-top: 13px;
  }


  .search-input div {

    color: rgb(156, 160, 163);
    vertical-align: center;
    padding-top: 10px;
    padding-left: 45px;
    background-color: #ddf0ed;
    height: 35px;
    border-radius: 5px;
  }

  .top-navbar {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .navbar-item {
    margin: 0 100rpx 0 100rpx;
  }

  .active-bar {
    padding-bottom: 10px;
    border-bottom: 2px solid #ddf0ed;
  }

  .tab-content {
    margin-top: 20px;
  }

  .user-center {
    width: 650rpx;
    margin: 0 auto;
    /* border-radius: 5px; */
    z-index: 2;
  }

  .user-center .user-br {
    position: relative;
    /* border-radius: 5px; */
    z-index: 2;
  }

  .user-center .user-br img {
    width: 650rpx;
    height: 300rpx;
    /* border-radius: 5px; */
    filter: blur(1.5px);
  }

  .user-info .user-avatar {
    position: absolute;
    top: 130rpx;
    left: 10rpx;
    z-index: 2;
  }

  .user-info .user-avatar img {
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
  }

  .user-info .user-name {
    position: absolute;
    top: 245rpx;
    left: 60rpx;
    color: #fff;
    font-size: 20px;
    z-index: 2;
  }

  .user-center .create {
    position: absolute;
    top: 210rpx;
    right: 55rpx;
    z-index: 2;
  }

  .user-center .create img {
    width: 90rpx;
    height: 90rpx;
  }

  .user-album {
    position: absolute;
    top: 290rpx;
    left: 15rpx;
    /* height: 800rpx; */
    height: auto;
    width: 720rpx;
    margin: auto;
    /* border: 1px solid rgb(216, 210, 210); */
    box-shadow: 0px 0px 15px rgba(184, 178, 178, 0.4);
    border-radius: 10px 15px 0 0;
    z-index: 1;
  }

  .user-share-album {
    margin-top: 15px;
    color: rgb(59, 66, 71);
  }

  .user-share-album .my-share {
    background: #eff1f1;
    padding-left: 10px;
  }

  .album-list {
    display: flex;
    margin: 10px 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eff1f1;
  }

  .album-list:last-of-type {
    border-bottom: none;
  }

  .no-album-pic {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background-color: #ddf0ed;
  }

  .album-pic,
  .album-pic img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .notLogin {
    text-align: center;
    margin-top: 300rpx;
    color: rgb(59, 66, 71);
  }

  .notLogin button {
    width: 200rpx;
    margin-top: 10px;
  }

  .text-footer {
    text-align: center;
    color: rgb(59, 66, 71);
    margin-top: -10px;
  }

</style>
