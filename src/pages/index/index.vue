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
          <Album :key='listData.id' v-for='listData in listDatas' :album='listData'></Album>
          <div class="load" id="load" v-if="listDatas.length">{{loadTips}}</div>
        </swiper-item>
        <swiper-item>
          <div>
            <span>个人中心</span>
          </div>
        </swiper-item>
      </swiper>
    </div>

  </div>
</template>
<script>
  import Album from '../../components/Album'
  export default {
    components: {
      Album,
    },
    data() {
      return {
        activeIndex: 0,
        tabs: ['首页', '我的'],
        windowHeight: 0,
        baseItemHeight: 800,
        swiper_height: 0,
        loadTips: '上拉加载更多',
        listDatas: [],
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
      getData() {
        let _item = {
          img: 'http://p3.music.126.net/hC-YGyr2cC0E_K_4Vfkztg==/109951163095172063.jpg',
          albumname: '那年追过的王力宏',
          describe: '从童年时代起就听王力宏的歌，他给了我太多的回忆',
          creator: 'jesses'
        }
        wx.showLoading();
        this.loadTips = '加载中...';
        setTimeout(() => {
          for (var i = 0; i < 5; i++) {
            this.listDatas.push(_item);
            this.listDatas[i].id = i;
          }
          this.loadTips = '上拉加载更多';
          this.autoHeight()
          wx.hideLoading();
        }, 1000)

      },
      autoHeight() {
        let num = this.listDatas.length;
        this.swiper_height = this.baseItemHeight * num + 100;
        console.log(this.swiper_height);
      },
    },
    //   onPullDownRefresh () {
    //     this.getList(true)
    //     this.getTop()
    //   },
    onReachBottom() {
      console.log("到底了");
      this.getData();
    },
    mounted() {
      this.getData()
      // this.getList(true)
      // this.getTop()
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

</style>
