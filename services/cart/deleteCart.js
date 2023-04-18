import { orderUrl } from '../../config/index';

/** 删除购物车数据 */
export function deleteCart(skuId) {
  return new Promise((resolve) => {
    wx.request({
      url: orderUrl + '/cart/sku/' + skuId,
      method: "DELETE",
      header: {
        'content-type': 'application/json'
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res);
        } else {
          
        }
      }
    })
  });
}

