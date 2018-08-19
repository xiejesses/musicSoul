
const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
    const {id,openId} = ctx.request.query
    const albumdetail = await mysql('albums')
                        .select('albums.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'albums.openId', 'cSessionInfo.open_id')
                        .where('id', id)
                        .first()

    // const songdetail = await mysql('albumsongs')
    //                     .select('albums.*', 'cSessionInfo.user_info')
    //                     .join('cSessionInfo', 'albums.openId', 'cSessionInfo.open_id')
    //                     .where('id', id)
    //                     .first()
    const songdetail = await mysql('albumsongs')
                        .select('albumsongs.*','songs.*')
                        .join('songs','albumsongs.songId','songs.songId')
                        .where('useralbumId',id)
    console.log("songdetail")
    console.log(songdetail)

    let likeArr = [];
    if (openId) {
        const likes = await mysql('likes').select('songId')
                                .where('openId',openId)
        for (let i = 0; i < likes.length; i++) {
            likeArr.push(likes[i].songId)
        }
        console.log("likes")
        console.log(likes);
        console.log("likeArr")
        console.log(likeArr);
    }

    const info = JSON.parse(albumdetail.user_info)
    ctx.state.data = Object.assign({}, albumdetail, {
        // tags: albumdetail.tags.split(','),
        // summary: albumdetail.summary.split('\n'),
        songdetail:songdetail.map(v => {
            // const info = JSON.parse(v.user_info)
            let like_status = likeArr.indexOf(v.songId) === -1? 0:1
            return Object.assign({}, v, {
                like_status: like_status,
                play_status:0
            })
        }),
        user_info: {
            name: info.nickName,
            image: info.avatarUrl
        }
    })

    // songdetail: songdetail.map(v => {
    //     // const info = JSON.parse(v.user_info)
    //     let like_status = likeArr.indexOf(v.songId) === -1? 0:1
    //     return Object.assign({}, v, {
    //         like_status: like_status
    //     })
    // }),


    // await mysql('books')
    //       .where('id', id)
    //       .increment('count', 1)
}

// module.exports = async (ctx) => {
//     const {albumid} = ctx.request.query;

//     const findRes = await mysql('albums').select('').where('id',albumid)

//     if (findRes.length) {
//         ctx.state = {
//             code: 1,
//             data: {
//                 data:findRes[0],
//                 msg: 'success'
//             }
//         }
//         // return
//     }
// }



