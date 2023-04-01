import { config, baseUrl } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export function getCategoryList() {
  if (config.useMock) {
    return mockFetchGoodCategory();
  }
  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/categorys',
      header: {
        'content-type': 'application/json'
      },
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      complete: (res) => {
        console.log(res);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const array = res.data.data
          // const categoryList = []
          // for (let index = 0; index < array.length; index++) {
          //   const element = array[index];
          //   const category = {};
          //   category["groupId"] = element.spuId;
          //   category["name"] = element.categoryName;
          //   category["title"] = element.productName;
          //   categoryList.push(category);
          // }
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
