import {baseUrl} from '../../config/index';

/** 获取首页数据 */
export function fetchHome() {

  return new Promise((resolve, reject) => {
    const swiper = [];
    const tabList = [
      {
        text: '全部',
        key: 0,
      }
    ];
    wx.request({
      url: baseUrl + '/recommends',
      // data: param,
      header: {
        'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const array = res.data.data
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const tab = {};
            tab.text = element.recommendName;
            tab.key = element.recommendId;
            tabList.push(tab);
          }
        } else {
          reject(res)
        }
      }
    });
    wx.request({
      url: baseUrl + '/advs/swipers',
      // data: param,
      header: {
        'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      // header: {
      //   "content-type": "application/x-www-form-urlencoded"
      // },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const array = res.data.data
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            swiper.push(element.imgUrl);
          }
          resolve({
            swiper,
            tabList
         })
        } else {
          reject(res)
        }
      }
    })
  });
}
