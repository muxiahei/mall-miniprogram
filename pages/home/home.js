import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    // 轮播图
    imgSrcs: [],
    // 标签页
    tabList: [],
    // 商品列表
    goodsList: [],
    // 商品加载状态
    goodsListLoadStatus: 0,

    // 轮播图相关配置
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
  },
  // 分页信息
  goodListPagination: {
    index: 1,
    num: 20,
  },
  privateData: {
    tabIndex: 0,
  },
  onShow() {
    this.getTabBar().init();
  },
  onLoad() {
    this.init();
  },
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },
  onPullDownRefresh() {
    this.init();
  },
  init() {
    this.loadHomePage();
  },
  // 加载首页
  loadHomePage() {
    wx.stopPullDownRefresh();
    this.setData({
      pageLoading: true,
    });
    console.log("加载首页");
    // 获取数据
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });
  },
  // 标签页切换
  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail.value;
    this.loadGoodsList(true);
  },
  
  onReTry() {
    this.loadGoodsList();
  },
  // 加载商品数据
  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
    this.setData({ goodsListLoadStatus: 1 });
    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 1;
    }
    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });
      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },
  // 点击商品
  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },
  // 添加购物车
  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },
  // 搜索
  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },
  // 轮播图点击
  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
