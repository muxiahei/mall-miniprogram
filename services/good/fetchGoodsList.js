/* eslint-disable no-param-reassign */
import { config,baseUrl } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const { delay } = require('../_utils/delay');
  const { getSearchResult } = require('../../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      item.desc = '';
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取商品列表 */
export function fetchGoodsList(params) {
  // if (config.useMock) {
  //   return mockFetchGoodsList(params);
  // }
  return new Promise((resolve) => {
    const data =  {
      saasId: null,
      storeId: null,
      pageNum: 1,
      pageSize: 30,
      totalCount: 1,
      spuList: [],
      algId: 0,
    }
    wx.request({
      url: baseUrl + '/spus',
      data: params,
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
          data.spuList = spuList;
          resolve(
            data
          )
        } else {
          reject(res)
        }
      }
    })
  });
}
