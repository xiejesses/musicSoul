
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, openId} = ctx.request.query;
    console.log("page: " + page + " openId: " + openId);
    const size = 5
    const mysqlSelect = mysql('albums')
                  .select('albums.*', 'csessioninfo.user_info')
                  .join('csessioninfo', 'albums.openId', 'csessioninfo.open_id')
                  .orderBy('albums.create_time', 'desc')
    let albums;
    if(openId){
        // 根据opid过滤
        albums = await mysqlSelect.where('albums.openId', openId)
    }else{
        // 全部图书 分页
       albums = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    // .orderBy('id','desc')
    ctx.state.data = {
        list: albums.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        }),
        msg:'查询成功'
    }
}
