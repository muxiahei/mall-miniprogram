import { baseUrl } from '../../config/index';

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
    return mockFetchGoodDetailsCommentsCount(spuId);
  // return new Promise((resolve) => {
  //   resolve('real api');
  // });
}

/** 获取商品详情页评论 */
export function getGoodsDetailsCommentList(spuId = 0) {

  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/comments',
      data: {
        productId: spuId,
        isDetailComment: 1
      },
      header: {
        'content-type': 'application/json'
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // {
          //   spuId: '1722045',
          //   skuId: null,
          //   specInfo: null,
          //   commentContent:
          //     '收到货了，第一时间试了一下，很漂亮特别喜欢，大爱大爱，颜色也很好看。棒棒!',
          //   commentScore: 4,
          //   uid: '88881048075',
          //   userName: 'Dean',
          //   userHeadUrl:
          //     'https://wx.qlogo.cn/mmopen/vi_32/5mKrvn3ibyDNaDZSZics3aoKlz1cv0icqn4EruVm6gKjsK0xvZZhC2hkUkRWGxlIzOEc4600JkzKn9icOLE6zjgsxw/132',
          // },
          const commentList = [];
          const array = res.data.data.list
          for (let index = 0; index < array.length; index++) {
            const comment = {};
            comment['userName'] = array[index].userName;
            comment['userHeadUrl'] = array[index].userImage;
            comment['commentScore'] = array[index].commentScore;
            comment['commentContent'] = array[index].content;
            commentList.push(comment);
          }
          resolve(
            commentList
          )
        } else {
          reject(res)
        }
      }
    })
  });
}
