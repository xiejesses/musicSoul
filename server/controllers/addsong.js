
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openId,songId, songName, songAuthor, pic,userAlbum} = ctx.request.body
    if (songId) {

        const findRes = await mysql('albums').select('id').where({openId:openId,albumName:userAlbum})
        //查出用户添加在该专辑的id
        let useralbumId = findRes[0].id
        

        

        try {
            const findSongRes = await mysql('songs').select('songId').where('songId',songId);
            //判断歌曲表是否有重复
            if(!findSongRes.length) {
                await mysql('songs').insert({
                    songId, songName, songAuthor, pic
                })
            }
            const findalbumSongRes = await mysql('albumsongs').select().where({useralbumId:useralbumId, songId:songId});
            
            
            //判断是否有重复
            if (!findalbumSongRes.length) {
                await mysql('albumsongs').insert({
                    songId, useralbumId,openId
                })
                await mysql('likes').insert({
                    songId,openId
                })
                // await mysql('albumsongs').update('likeStatus','1').where({songId:songId,useralbumId:useralbumId})
                await mysql('albums').where('albums.id',useralbumId).update ({pic})
                await mysql('albums').where('albums.id',useralbumId).increment('songNum', 1);
                // await mysql('albums').insert({pic})
            }
            
            ctx.state.data = {
                // title,
                code: 1,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '添加失败:' + e.sqlMessage
                }
            }
        }

    }
}
