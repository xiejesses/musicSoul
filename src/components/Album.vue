<template>
  <div v-if="album.pic" class="flex-container">
    <a :href="playAlbumUrl" hover-class="none">
      <div class="box">
        <div class="flex-item"><img :src="album.pic" alt="" mode="aspectFill"></div>
        <div class="album-content">
          <!-- <p class="album-name">中文歌</p> -->
          <p class="album-name">{{album. albumName}}</p>
          <!-- <p class="describe">确实很好听的歌，勾起了很多回忆</p> -->
          <p class="describe">{{album.albumDes }}</p>
          <!-- <p class="creator">by · {{album.creator}}</p> -->
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['album'],
    data() {
      return {
        albumPage: '/pages/playalbum/main?id=',
      }
    },
    computed: {
      playAlbumUrl() {
        return '/pages/playalbum/main?id=' + this.album.id
      }
    },
  }

</script>

<style scoped>
  .flex-container {
    width: 650rpx;
    margin: 0 auto;
  }
  
  .box{
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /* border: 1px solid red; */
    margin-bottom: 15px;
    border-radius: 10px;
    max-height: 340px;
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
    height: 200px;
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
    margin-top: 4px;
    /* padding-bottom: 5px; */
    /* margin-bottom: 50px; */
    width: 520rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: rgb(59, 66, 71);
  }

</style>
