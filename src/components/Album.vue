<template>
  <div class="flex-content">
    <div class="flex-item">
      <div class="album-card">
        <img style="height:200px" :src="album.img" alt="" mode="aspectFill">
        <p class="album-name">{{album.albumname}}</p>
        <p class="describe">{{album.describe}}</p>
        <p class="creator">by · {{album.creator}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['album'],
    data() {
      return {
        i: ''
      }
    }
  }

</script>

<style scoped>
  .flex-content {
    width: 650rpx;
    margin: 0 auto;
  }

  .flex-item {
    text-align: center;
    color: rgb(59, 66, 71);
    border: 1px solid rgba(177, 171, 171, 0.4);
    border-radius: 5px;
    height: 800rpx;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, .4);
  }

  .flex-item img {
    width: 630rpx;
    border-radius: 5px 5px 0 0;

  }

  .album-card {
    padding: 10rpx;
  }

  .album-name {
    margin-top: 10px;
    font-size: 23px;
  }

  .describe {
    padding: 10px;
    font-size: 17px;
  }

</style>
