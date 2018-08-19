const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  const {
    albumName,
    albumDes,
    openId,
    creator
  } = ctx.request.body
  //专辑名和描述不能为空
  if (!albumName || !albumDes) {
    ctx.state = {
      code: -1,
      data: {
        msg: '不能为空'
      }
    }
  } else if (openId) {

    const findRes = await mysql('albums').select().where({
      openId: openId,
      albumName: albumName
    })
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: '名称已存在'
        }
      }
      // return
    } else {
      try {
        await mysql('albums').insert({
          albumName,
          albumDes,
          openId,
          creator
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
            msg: e.sqlMessage
          }
        }
      }
    }
  }
}
