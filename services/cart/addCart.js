import { orderUrl } from '../../config/index';


/** 获取购物车数据 */
export function addCart(params) {

  return new Promise((resolve) => {
    wx.request({
      url: orderUrl + '/cart',
      data: params,
      method: "PUT",
      header: {
        'content-type': 'application/json'
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
        }
      }
    })
  });
}

