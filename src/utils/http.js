//引入配置项
import config from '../config'

//get 请求
export function get (url, data) {
    return request(url, 'GET', data)
}

//post 请求
export function post (url, data) {
    return request(url, 'POST', data)
}

// 封装一个 Promise
function request (url, method, data, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        data,
        method,
        header,
        url: config.host + url,
        success: function (res) {
          console.log(res.data)
          if (res.data.code === 0) {
            resolve(res.data.data)
          } else {
            // showModal('失败', res.data.data.msg)
            reject(res.data)
          }
        }
      })
    })
  }

export function showModal (title, content) {
    wx.showModal({
        title,
        content,
        showCancel: false
    })
}
