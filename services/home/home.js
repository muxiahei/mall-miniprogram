import { config, cdnBase, baseUrl} from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '精选推荐',
          key: 0,
        },
        {
          text: '猜你喜欢',
          key: 1,
        },
        {
          text: '二胎大作战',
          key: 2,
        },
        {
          text: '人气榜',
          key: 3,
        },
        {
          text: '好评榜',
          key: 4,
        },
        {
          text: 'RTX 30',
          key: 5,
        },
        {
          text: 'I',
          key: 6,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve, reject) => {
    const swiper = []
    const tabList = [
      {
        text: '全部',
        key: 0,
      },
      {
        text: '精选推荐',
        key: 1,
      },
      {
        text: '猜你喜欢',
        key: 2,
      },
      {
        text: '二胎大作战',
        key: 3,
      },
      {
        text: '人气榜',
        key: 4,
      },
      {
        text: '好评榜',
        key: 5,
      },
      {
        text: 'RTX 30',
        key: 6,
      },
      {
        text: 'I',
        key: 7,
      },
    ]
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
