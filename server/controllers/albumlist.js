
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, openId} = ctx.request.query;
    console.log("page: " + page + " openId: " + openId);
    const size = 3
    const mysqlSelect = mysql('albums')
                  .select('albums.*', 'cSessionInfo.user_info')
                  .join('cSessionInfo', 'albums.openId', 'cSessionInfo.open_id')
                //   .join('albumsongs','albums.openId','albumsongs.openId')
                  .orderBy('albums.create_time', 'desc')
    // const mysqlSelect = mysql('albums')
    //               .select('albums.*', 'cSessionInfo.user_info')
    //               .join('cSessionInfo', 'albums.openId', 'cSessionInfo.open_id')
    //               .orderBy('albums.create_time', 'desc');

    // const albumPic = await mysql('albumsongs').select('albumsongs.songId').where({openId:openId,useralbumId:})
    //                     .join('songs',)

    let albums;
    // let songlists;
    if(openId){
        // 根据opid过滤
        albums = await mysqlSelect.where('albums.openId', openId)
                                    
        // songlists = await mysql('albumsongs').select().where('openId',openId)

        // console.log(songlists);

    }else{
        // 全部图书 分页
       albums = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    // .orderBy('id','desc')
    console.log(albums);
    ctx.state.data = {
        list: albums.map(v => {
            const info = JSON.parse(v.user_info)
            
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                },
            })
        }),
        // songlists:songlists,
        msg:'查询成功'
    }
    // ctx.state.data = {
    //     list: albums.map(v => {
    //         const info = JSON.parse(v.user_info)
    //         return Object.assign({}, v, {
    //             user_info: {
    //                 nickName: info.nickName
    //             }
    //         })
    //     }),
    //     msg:'查询成功'
    // }
}
