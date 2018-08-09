<template>
    <div class="container">
        <form name="search-form">
            <div class="search-input">
                <span class="search-icon"><icon type="search" size="20"/></span>
                <input type="text" placeholder="搜索音乐" v-model.trim="songName">
                <span  @click="clearInput" class="search-clear"><icon type="clear" size="20"/></span>
            </div>
        </form>
        <!-- <button @click="clearInput">取消</button> -->
        <!-- <div>{{songName}}</div> -->
        <div>
            <ul class="songs" v-for="item in songSearchs" :key="item.id">
                <a :href="songPage+item.id">
                    <li class="each-song">
                        <p>{{item.name}}</p>
                        <p>{{item.artists[0].name}}</p>    
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
import { get,post} from '../../utils/http'
const delay = (function () {
    let timer = 0;
    return function (callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
export default {
    data() {
        return {
            msg:'搜索',
            // searchSong:{
            //     songName:'',
            // }
            songPage:'/pages/play/main?id=',
            songName:'',
            songSearchs:[]
        }
    },
    watch: {
        songName() {
            delay(() => {
                this.fetchData();
            }, 1500)
        }
    },
    // computed: {
    //     songUrl () {
    //     return '/pages/play/main?id=' + this.book.id
    //     }
    // },
    methods: {
        async fetchData() {
            let res = await post('/musicSoul/search',{keywords:this.songName})
            this.songSearchs = res.result.songs;
            console.log(this.songSearchs)
        },
        clearInput () {
            this.songName = '';
            this.songSearchs = [];
            // wx.hideKeyboard();
        }
    }
}
</script>

<style scoped>
.container {
    width: 650rpx;
    margin: 0 auto;
    /* display: flex;
    justify-content: center;
    align-content: center; */
}
.search-input {
    width:650rpx;
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
    /* border: 1px solid red; */
}
.search-input .search-icon icon {
    /* vertical-align: middle; */
    /* display: inline-block; */
    /* float: left; */
    /* top: 10px; */
    position: absolute;
    /* top: 50%; */
    margin-left: 17px;
    margin-top: 13px;
    /* z-index: 1; */
}
.search-input .search-clear icon {
    position: absolute;
    /* margin-right: 17px; */
    float:right;
    margin-top: 13px;
    /* margin-right: 17px; */
    right: 15px;
    top:0px;
    z-index: 99;
    /* touch-action: none */
}
/* .search-input .search-clear {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid red;
} */
.search-input input {
    /* display:inline-block; */
    /* width:650rpx; */
    /* float: left; */
    padding-left: 45px;
    background-color: #ddf0ed;
    height: 45px;
    border-radius: 5px;
    /* z-index: 2; */
}
.songs {
    margin-top: 10px;
    font-size: 35rpx;
    color: #688eaf;
    /* color: #7fa7ca; */
}
.each-song {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddf0ed;
}
.each-song p:nth-child(2) {
    margin-top: 5px;
    font-size: 30rpx;
}
</style>
