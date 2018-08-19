<template>
  <div class="container">
    <div class="submit">
      <div class="intro">
        <p style="font-weight:bold">说明：</p>
        <p>每个专辑最多 10 首歌</p>
        <p>一旦创建成功即表示分享到首页</p>
      </div>
      <div class="user-input">
        <form @submit="formSubmit" @reset="formReset">
          <p>
            <input type="text" name="albumName" placeholder="输入专辑名" >
          </p>
          <p>
            <textarea name="albumDes" placeholder="发表感想" />
          </p>
          <div class="action">
            <p>
              <button type="primary" form-type="submit" style="margin-top:20px">创建</button>
            </p>
            <p>
              <button form-type="reset">取消</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
 import {
    get,
    post
  } from '../../utils/http'
  export default {
    data() {
      return {

      }
    },
    methods: {
      async formSubmit(e) {
        let userinfo = wx.getStorageSync('userinfo')
        console.log(e.mp.detail.value);
        if(!e.mp.detail.value.albumName || !e.mp.detail.value.albumDes) {
          wx.showModal({
                  title:'不能为空',
                  // content: e.mp.detail.errMsg,
                  content: '请重试！',
                  showCancel: false
                })
        } else {
          const res = await post('/musicSoul/addalbum', {
          albumName: e.mp.detail.value.albumName,
          albumDes: e.mp.detail.value.albumDes,
          openId: userinfo.openId,
          creator: userinfo.nickName
        })
        console.log(res);
        if (res.code === 1) {
            wx.navigateBack({
            delta: 1
            })
            wx.showToast({
            title: '创建成功',
            icon: 'success'
            })
        }else {
            wx.showModal({
                  title:res.data.msg,
                  // content: e.mp.detail.errMsg,
                  content: '请重试！',
                  showCancel: false
                })
        }
        }
        
        
        
      },
      // formSubmit (e) {
      //     console.log(e.mp.detail.value);
      // },
      formReset() {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }

</script>

<style scoped>
  input,
  textarea {
    background-color: #fff;
    padding-left: 5px;
    box-shadow: 0px 0px 15px rgba(184, 178, 178, 0.4);
  }

  input {
    height: 100rpx;
    margin-bottom: 20px;
  }

  textarea {
    height: 200rpx;
  }

  .container {

    background: #f8f8f8;
    height: 100vh;
    box-sizing: border-box;
  }

  .submit {
    width: 650rpx;
    margin: 0 auto;
  }

  .intro {
    /* height: 100vh; */
    width: 100%;
    color: rgb(59, 66, 71);
    padding-top: 40px;
    /* text-align: center; */
    /* padding: 30px 40px; */
  }

  .user-input {
    margin-top: 30px;
  }

  .action {
    /* border: 1px solid red; */
  }

  .action button {
    margin-bottom: 10px;
    /* display:flex; */
    /* width: 100rpx; */
    /* float: left; */
  }

</style>
