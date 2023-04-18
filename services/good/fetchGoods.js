import { baseUrl } from '../../config/index';

/** 首页获取商品列表 */
export function fetchGoodsList(params) {
  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/spus',
      data: {
        pageCurrent: params.pageCurrent,
        pageSize: params.pageSize,
        recommendId: params.recommendId
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
