import { config,baseUrl } from '../../config/index';

/** 获取商品详情页评论数 */
function mockFetchGoodDetailsCommentsCount(spuId = 0) {
  const { delay } = require('../_utils/delay');
  const {
    getGoodsDetailsCommentsCount,
  } = require('../../model/detailsComments');
  return delay().then(() => getGoodsDetailsCommentsCount(spuId));
}

/** 获取商品详情页评论数 */
export function getGoodsDetailsCommentsCount(spuId = 0) {
  if (config.useMock) {
    return mockFetchGoodDetailsCommentsCount(spuId);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}

/** 获取商品详情页评论 */
function mockFetchGoodDetailsCommentList(spuId = 0) {
  const { delay } = require('../_utils/delay');
  const { getGoodsDetailsComments } = require('../../model/detailsComments');
  return delay().then(() => getGoodsDetailsComments(spuId));
}

/** 获取商品详情页评论 */
export function getGoodsDetailsCommentList(spuId = 0) {
  if (config.useMock) {
    return mockFetchGoodDetailsCommentList(spuId);
  }
  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/comments',
      data: {
        productId: spuId
      },
      header: {
        'content-type': 'application/json'
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const spuList = [];
          const array = res.data.data.list
          for (let index = 0; index < array.length; index++) {
            const spu = {};
          }
          resolve(
            array
          )
        } else {
          reject(res)
        }
      }
    })
  });
}
