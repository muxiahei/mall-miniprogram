import { config, baseUrl } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}
/** 获取商品列表 */
export function fetchGoodsList(pageCurrent = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchGoodsList(pageCurrent, pageSize);
  }
  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/spus',
      data: {
        pageCurrent,
        pageSize
      },
      header: {
        'content-type': 'application/json'
      },
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const spuList = [];
          const array = res.data.data.list
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const spu = {};
            spu["spuId"] = element.spuId;
            spu["thumb"] = element.image;
            spu["title"] = element.productName;
            spu["price"] = element.minSalePrice;
            spu["originPrice"] = element.maxLinePrice;
            // spu["tags"] = element.spuId;
            // tags: item.spuTagList.map((tag) => tag.title),
            spuList.push(spu);
          }
          resolve(
            spuList
          )
        } else {
          reject(res)
        }
      }
    })
  });
}
