import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
  },
  async init() {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(event) {
    wx.navigateTo({
      url: '/pages/goods/list/index' + "?categoryId=" + event.detail.item.categoryId,
    });
  },
  onLoad() {
    this.init(true);
  },
});
