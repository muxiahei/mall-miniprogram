import Toast from 'tdesign-miniprogram/toast/index';

// 获取单个商品详情
import { fetchGood } from '../../../services/good/fetchGood';
// 获取该商品的活动列表
import { fetchActivityList } from '../../../services/activity/fetchActivityList';
// 获取商品评价评标
import { getGoodsDetailsCommentList, getGoodsDetailsCommentsCount, } from '../../../services/good/fetchGoodsDetailsComments';

// 详情介绍左右的图片
const recLeftImg = `https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/common/rec-left.png`;
const recRightImg = `https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/common/rec-right.png`;

const obj2Params = (obj = {}, encode = false) => {
  const result = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`),
  );
  return result.join('&');
};

Page({
  data: {
    // 选中的sku
    selectItem: {},
    // 商品评论列表
    commentsList: [],
    // 评论统计
    commentsStatistics: {
      badCount: 3,
      commentCount: 20,
      goodCount: 5,
      goodRate: 10,
      hasImageCount: 0,
      middleCount: 2,
    },
    
    // 活动列表
    activityList: [],
    recLeftImg,
    recRightImg,
    // 商品spu信息
    productInfo: {},
    // 商品主图
    primaryImage: '',
    // 已售数量
    soldNum: 0,
    jumpArray: [
      {
        title: '首页',
        url: '/pages/home/home',
        iconName: 'home',
      },
      {
        title: '购物车',
        url: '/pages/cart/index',
        iconName: 'cart',
        showCartNum: true,
      },
    ], 
    // 是否有库存
    isStock: true,
    // 购物车数量
    cartNum: 0,
    // 是否售空
    soldout: false,
    // 按钮类型
    buttonType: 1,
    // 购买的数量
    buyNum: 1,
    selectedAttrStr: '',
    // sku列表
    skuList: [],
    // 选完规格后的sku图片
    specImg: '',
    // 是否显示spu选择框
    isSpuSelectPopupShow: false,
    isAllSelectedSku: false,
    // 购买类型 1：立即购买 2：加入购物车
    buyType: 0,
    // 是否外层加入购物车
    outOperateStatus: false,
    operateType: 0,
    // 选中的 sku 商品价格
    selectSkuSellsPrice: 0,
    maxLinePrice: 0,
    minSalePrice: 0,
    maxSalePrice: 0,
    // 促销活动
    list: [],
    // 是否显示促销说明框
    isShowPromotionPop: false,
    spuId: '',

    // 轮播图相关配置
    navigation: { type: 'fraction' },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000
  },

  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },
  // 显示spu的选择框
  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  toNav(e) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  showCurImg(e) {
    const { index } = e.detail;
    const { images } = this.data.productInfo;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onPageScroll({ scrollTop }) {
    const goodsTab = this.selectComponent('#goodsTab');
    goodsTab && goodsTab.onScroll(scrollTop);
  },

  // 选择商品规格
  chooseSpecItem(e) {
    const { specList } = this.data.productInfo;
    const { selectedSku, isAllSelectedSku } = e.detail;
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku);
  },

  // 获得选择的 sku
  getSkuItem(specList, selectedSku) {
    const { skuList, primaryImage } = this.data;
    const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
    let selectedAttrStr = ` 件  `;
    selectedSkuValues.forEach((item) => {
      selectedAttrStr += `，${item.sppName}  `;
    });
    const skuItem = skuList.filter((item) => {
      let status = true;
      (item.specInfo || []).forEach((subItem) => {
        if (!selectedSku[subItem.spgId] || selectedSku[subItem.spgId] !== subItem.sppId) {
          status = false;
        }
      });
      if (!status) return item;
    });
    console.log("selectedSku");
    console.log(selectedSku);
    console.log("skuItem");
    console.log(skuItem);
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');

    // 参数规格选完之后，设置价格和sku图片
    if (skuItem.length == 1) {
      this.setData({
        selectItem: skuItem[0],
        selectSkuSellsPrice: skuItem[0].price || 0,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      specImg: skuItem.length == 1 && skuItem[0].image ? skuItem[0].image : primaryImage,
    });
  },

  // 获取已选择的sku参数名称
  getSelectedSkuValues(skuTree, selectedSku) {
    const normalizedTree = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue = skuValues.filter((value) => {
          return value.sppId === skuValueId;
        })[0];
        skuValue && selectedValues.push(skuValue);
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.spgId] = treeItem.specParamList;
    });
    return normalizedTree;
  },

  // 设置已经选择的规格参数 selectedAttrStr
  selectSpecsName(selectSpecsName) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },

  addCart() {
    const { isAllSelectedSku } = this.data;
    Toast({
      context: this,
      selector: '#t-toast',
      message: isAllSelectedSku ? '点击加入购物车' : '请选择规格',
      icon: '',
      duration: 1000,
    });
  },

  // 购买
  gotoBuy(type) {
    const { isAllSelectedSku, buyNum } = this.data;
    if (!isAllSelectedSku) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请选择规格',
        icon: '',
        duration: 1000,
      });
      return;
    }
    this.handlePopupHide();
    console.log(this.data.selectItem);
    const query = {
      quantity: buyNum,
      storeId: '1',
      spuId: this.data.spuId,
      goodsName: this.data.productInfo.productName,
      skuId:
        type === 1 ? this.data.skuList[0].skuId : this.data.selectItem.skuId,
      available: true,
      price: this.data.selectItem.price,
      specInfo: this.data.productInfo.specList?.map((item) => ({
        specTitle: item.spgName,
        specValue: item.specParamList[0].sppName,
      })),
      primaryImage: this.data.productInfo.image,
      spuId: this.data.productInfo.spuId,
      thumb: this.data.productInfo.image,
      title: this.data.productInfo.productName,
    };
    console.log(query);
    let urlQueryStr = obj2Params({
      goodsRequestList: JSON.stringify([query]),
    });
    urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
    const path = `/pages/order/order-confirm/index${urlQueryStr}`;
    wx.navigateTo({
      url: path,
    });
  },

  specsConfirm() {
    const { buyType } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },

  // 更改购买数量
  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  },

  closePromotionPopup() {
    this.setData({
      isShowPromotionPop: false,
    });
  },

  promotionChange(e) {
    const { index } = e.detail;
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${index}`,
    });
  },

  showPromotionPopup() {
    this.setData({
      isShowPromotionPop: true,
    });
  },

  // 获取商品详情信息 活动信息
  getDetail(spuId) {
    Promise.all([fetchGood(spuId), fetchActivityList()]).then((res) => {

      const activityList = res[1];
      const productInfo = res[0].productSpu;
      productInfo.images = JSON.parse(productInfo.images);
      productInfo.descript = JSON.parse(productInfo.descript);
      productInfo.specList = JSON.parse(productInfo.specList);
      const skuList = res[0].productSku;
      const primaryImage = productInfo.image;
      const isPutOnSale = productInfo.publishStatus;
      const minSalePrice = productInfo.minSalePrice;
      const maxSalePrice = productInfo.maxSalePrice;
      const maxLinePrice = productInfo.maxLinePrice;
      const soldNum = productInfo.soldNum;

      const skuArray = [];
      skuList.forEach((item) => {
        skuArray.push({
          skuId: item.skuId,
          image: item.image,
          price: item.price,
          quantity: item.num,
          specInfo: JSON.parse(item.skuSpecifications),
        });
      });
      const promotionArray = [];
      activityList.forEach((item) => {
        promotionArray.push({
          tag: item.promotionSubCode === 'MYJ' ? '满减' : '满折',
          label: '满100元减99.9元',
        });
      });
      this.setData({
        productInfo,
        activityList,
        isStock: 1 > 0,
        maxSalePrice: maxSalePrice ? parseInt(maxSalePrice) : 0,
        maxLinePrice: maxLinePrice ? parseInt(maxLinePrice) : 0,
        minSalePrice: minSalePrice ? parseInt(minSalePrice) : 0,
        list: promotionArray,
        skuList: skuArray,
        primaryImage,
        soldout: isPutOnSale === 0,
        soldNum,
      });
    });
  },

  // 获取评论信息
  async getCommentsList(spuId) {
    try {
      const code = 'Success';
      const commentsList = await getGoodsDetailsCommentList(spuId);
      if (code.toUpperCase() === 'SUCCESS') {
        const nextState = {
          commentsList: commentsList.map((item) => {
            return {
              goodsSpu: item.spuId,
              userName: item.userName || '',
              commentScore: item.commentScore,
              commentContent: item.commentContent || '用户未填写评价',
              userHeadUrl: item.isAnonymity
                ? this.anonymityAvatar
                : item.userHeadUrl || this.anonymityAvatar,
            };
          }),
        };
        this.setData(nextState);
      }
    } catch (error) {
      console.error('comments error:', error);
    }
  },
    // 获取评价统计
    async getCommentsStatistics() {
      try {
        const code = 'Success';
        const data = await getGoodsDetailsCommentsCount();
        if (code.toUpperCase() === 'SUCCESS') {
          const {
            badCount,
            commentCount,
            goodCount,
            goodRate,
            hasImageCount,
            middleCount,
          } = data;
          const nextState = {
            commentsStatistics: {
              badCount: parseInt(`${badCount}`),
              commentCount: parseInt(`${commentCount}`),
              goodCount: parseInt(`${goodCount}`),
              /** 后端返回百分比后数据但没有限制位数 */
              goodRate: Math.floor(goodRate * 10) / 10,
              hasImageCount: parseInt(`${hasImageCount}`),
              middleCount: parseInt(`${middleCount}`),
            },
          };
          this.setData(nextState);
        }
      } catch (error) {
        console.error('comments statiistics error:', error);
      }
    },

  onShareAppMessage() {
    // 自定义的返回信息
    const { selectedAttrStr } = this.data;
    let shareSubTitle = '';
    if (selectedAttrStr.indexOf('件') > -1) {
      const count = selectedAttrStr.indexOf('件');
      shareSubTitle = selectedAttrStr.slice(count + 1, selectedAttrStr.length);
    }
    const customInfo = {
      imageUrl: this.data.productInfo.primaryImage,
      title: this.data.productInfo.title + shareSubTitle,
      path: `/pages/goods/productInfo/index?spuId=${this.data.spuId}`,
    };
    return customInfo;
  },

  /** 跳转到评价列表 */
  navToCommentsListPage() {
    wx.navigateTo({
      url: `/pages/goods/comments/index?spuId=${this.data.spuId}`,
    });
  },

  // 初始化数据
  onLoad(query) {
    const { spuId } = query;
    this.setData({
      spuId: spuId,
    });
    this.getDetail(spuId);
    this.getCommentsList(spuId);
    this.getCommentsStatistics(spuId);
  },
});
