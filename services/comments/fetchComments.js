import { config } from '../../config/index';

/** 获取商品评论 */
function mockFetchComments(parmas) {
  const { delay } = require('../_utils/delay');
  const { getGoodsAllComments } = require('../../model/comments');
  return delay().then(() => getGoodsAllComments(parmas));
}

/** 获取商品评论 */
export function fetchComments(parmas) {
  console.log(parmas);
  return mockFetchComments(parmas);
  
  // return new Promise((resolve) => {
  //   wx.request({
  //     url: baseUrl + '/comments',
  //     data: {
  //       productId: spuId,
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     complete: (res) => {
  //       if (res.statusCode >= 200 && res.statusCode < 300) {
      
  //         const commentList = [];
  //         const array = res.data.data.list
  //         for (let index = 0; index < array.length; index++) {
  //           const comment = {};
  //           comment['userName'] = array[index].userName;
  //           comment['userHeadUrl'] = array[index].userImage;
  //           comment['commentScore'] = array[index].commentScore;
  //           comment['commentContent'] = array[index].content;
  //           commentList.push(comment);
  //         }
  //         resolve(
  //           commentList
  //         )
  //       } else {
  //         reject(res)
  //       }
  //     }
  //   })
  // });
}
