import { orderUrl } from '../../config/index';

/** 改变购物车数据 */
export function changeCartQuantity(cardId, spuId, skuId, quantity) {
  return new Promise((resolve) => {
    wx.request({
      url: orderUrl + '/cart',
      data: {
        cartId: cardId,
        spuId: spuId,
        skuId: skuId,
        productAmount: quantity
      },
      method: "put",
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

