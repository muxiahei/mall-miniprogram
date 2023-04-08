import { baseUrl } from '../../config/index';

/** 获取商品详情 */
export function fetchGood(ID = 0) {
  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/spus/' + ID,
      header: {
        'content-type': 'application/json'
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(
            res.data.data
          )
        } else {
          reject(res.data.data)
        }
      }
    })
  });
}
