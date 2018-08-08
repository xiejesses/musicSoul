module.exports = async (ctx) => {
    let dd = {
        name:'js',
        age:22
    }
    ctx.state.data = {
        dd,
        msg:'dd数据'
    }
    // let str = ctx.query;
    // ctx.state.data = {
    //     name: str.name
    // }
    // console.log(str)
}