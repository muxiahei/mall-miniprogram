import { baseUrl } from '../../config/index';

/** 获取商品分类列表 */
export function getCategoryList() {
  return new Promise((resolve) => {
    wx.request({
      url: baseUrl + '/categorys',
      header: {
        'content-type': 'application/json'
      },
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
