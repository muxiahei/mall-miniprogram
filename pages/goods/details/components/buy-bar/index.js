Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: { multipleSlots: true },

  properties: {
    // 商品是否下架
    soldout: {
      type: Boolean,
      value: false,
    },
    jumpArray: {
      type: Array,
      value: [],
    },
    // 是否有库存
    isStock: {
      type: Boolean,
      value: true,
    },
    // 是否开启按钮插槽
    isSlotButton: {
      type: Boolean,
      value: false,
    },
    // 购物车气泡数量
    shopCartNum: {
      type: Number, 
    },
    buttonType: {
      type: Number,
      value: 0,
    },
    minDiscountPrice: {
      type: String,
      value: '',
    },
    minSalePrice: {
      type: String,
      value: '',
    },
  },

  data: {
    fillPrice: false,
  },

  methods: {
    toAddCart() {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('toAddCart');
    },

    toBuyNow(e) {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
      const { url } = e.currentTarget.dataset;
      return this.triggerEvent('toNav', {
        e,
        url,
      });
    },
  },
});
