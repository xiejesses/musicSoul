
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {albumName, albumDes, openId, creator} = ctx.request.body
    if (openId) {
        try {
            await mysql('albums').insert({
                albumName, albumDes, openId, creator
            })
            ctx.state.data = {
                // title,
                code: 1,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '创建失败:' + e.sqlMessage
                }
            }
        }

    }
}
