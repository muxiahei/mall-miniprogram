/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import Toast from 'tdesign-miniprogram/toast/index';

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  properties: {
    src: {
      type: String,
    },
    // sku名称
    title: String,
    // 是否显示
    show: {
      type: Boolean,
      value: false,
    },
    // 限购信息
    limitBuyInfo: {
      type: String,
      value: '',
    },
    isStock: {
      type: Boolean,
      value: true,
    },
    limitMaxCount: {
      type: Number,
      value: 999,
    },
    limitMinCount: {
      type: Number,
      value: 1,
    },
    // sku 列表
    skuList: {
      type: Array,
      value: [],
      observer(skuList) {
        if (skuList && skuList.length > 0) {
          if (this.initStatus) {
            this.initData();
          }
        }
      },
    },
    // 规格参数列表
    specList: {
      type: Array,
      value: [],
      observer(specList) {
        if (specList && specList.length > 0) {
          this.initData();
        }
      },
    },
    outOperateStatus: {
      type: Boolean,
      value: false,
    },
    hasAuth: {
      type: Boolean,
      value: false,
    },
    count: {
      type: Number,
      value: 1,
      observer(count) {
        this.setData({
          buyNum: count,
        });
      },
    },
  },

  initStatus: false,
  // 选中的 Sku
  selectedSku: {},
  // 选中的规格
  selectSpecObj: {},

  data: {
    // 购买数量
    buyNum: 1,
    // 是否选择完整规格
    isAllSelectedSku: false,
  },

  methods: {
    // 初始化数据
    initData() {
      const { skuList } = this.properties;
      const { specList } = this.properties;
      specList.forEach((item) => {
        if (item.specParamList.length > 0) {
          item.specParamList.forEach((subItem) => {
            // 检查库存
            const obj = this.checkSkuStockQuantity(subItem.sppId, skuList);
            subItem.hasStockObj = obj;
          });
        }
      });
      const selectedSku = {};
      specList.forEach((item) => {
        selectedSku[item.spgId] = '';
      });
      this.setData({
        specList,
      });
      this.selectSpecObj = {};
      this.selectedSku = selectedSku;
      this.initStatus = true;
    },

    // 检查商品库存数量
    checkSkuStockQuantity(sppId, skuList) {
      let hasStock = false;
      const array = [];
      skuList.forEach((item) => {
        (item.specInfo || []).forEach((subItem) => {
          if (subItem.sppId === sppId && item.quantity > 0) {
            const subArray = [];
            (item.specInfo || []).forEach((specItem) => {
              subArray.push(specItem.sppId);
            });
            array.push(subArray);
            hasStock = true;
          }
        });
      });
      return {
        hasStock,
        specsArray: array,
      };
    },

    chooseSpecValueId(sppId, spgId) {
      const { selectSpecObj } = this;
      const { skuList, specList } = this.properties;
      if (selectSpecObj[spgId]) {
        selectSpecObj[spgId] = [];
        this.selectSpecObj = selectSpecObj;
      } else {
        selectSpecObj[spgId] = [];
      }
      const itemAllSpecArray = [];
      const itemUnSelectArray = [];
      const itemSelectArray = [];
      specList.forEach((item) => {
        if (item.spgId === spgId) {
          const subSpecValueItem = item.specParamList.find((subItem) => subItem.sppId === sppId);
          let specSelectStatus = false;
          item.specParamList.forEach((n) => {
            itemAllSpecArray.push(n.hasStockObj.specsArray);
            if (n.isSelected) {
              specSelectStatus = true;
            }
            if (n.hasStockObj.hasStock) {
              itemSelectArray.push(n.sppId);
            } else {
              itemUnSelectArray.push(n.sppId);
            }
          });
          if (specSelectStatus) {
            selectSpecObj[spgId] = this.flatten(subSpecValueItem?.hasStockObj.specsArray.concat(itemSelectArray));
          } else {
            const subSet = function (arr1, arr2) {
              const set2 = new Set(arr2);
              const subset = [];
              arr1.forEach((val) => {
                if (!set2.has(val)) {
                  subset.push(val);
                }
              });
              return subset;
            };
            selectSpecObj[spgId] = subSet(this.flatten(itemAllSpecArray), this.flatten(itemUnSelectArray));
          }
        } else {
          // 未点击规格的逻辑
          const itemSelectArray = [];
          let specSelectStatus = false;
          item.specParamList.map(
            // 找到有库存的规格数组
            (n) => {
              itemSelectArray.push(n.hasStockObj.specsArray);
              if (n.isSelected) {
                specSelectStatus = true;
              }
              n.hasStockObj.hasStock = true;
              return n;
            },
          );
          if (specSelectStatus) {
            selectSpecObj[item.spgId] = this.flatten(itemSelectArray);
          } else {
            delete selectSpecObj[item.spgId];
          }
        }
        this.selectSpecObj = selectSpecObj;
      });
      const combatArray = Object.values(selectSpecObj);
      if (combatArray.length > 0) {
        const showArray = combatArray.reduce((x, y) => this.getIntersection(x, y));
        const lastResult = Array.from(new Set(showArray));
        specList.forEach((item) => {
          item.specParamList.forEach((subItem) => {
            if (lastResult.includes(subItem.sppId)) {
              subItem.hasStockObj.hasStock = true;
            } else {
              subItem.hasStockObj.hasStock = false;
            }
          });
        });
      } else {
        specList.forEach((item) => {
          if (item.specParamList.length > 0) {
            item.specParamList.forEach((subItem) => {
              const obj = this.checkSkuStockQuantity(subItem.sppId, skuList);
              subItem.hasStockObj = obj;
            });
          }
        });
      }
      this.setData({
        specList,
      });
    },

    flatten(input) {
      const stack = [...input];
      const res = [];
      while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
          stack.push(...next);
        } else {
          res.push(next);
        }
      }
      return res.reverse();
    },

    getIntersection(array, nextArray) {
      return array.filter((item) => nextArray.includes(item));
    },
    // 选择规格参数
    toChooseItem(e) {
      const { isStock } = this.properties;
      if (!isStock) return;
      // param id
      const { id } = e.currentTarget.dataset;
      // spec id
      const spgId = e.currentTarget.dataset.specid;
      const hasStock = e.currentTarget.dataset.hasstock;
      if (!hasStock) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '该规格已售罄',
          icon: '',
          duration: 1000,
        });
        return;
      }
      let { selectedSku } = this;
      const { specList } = this.properties;
      selectedSku =
        selectedSku[spgId] === id ? { ...this.selectedSku, [spgId]: '' } : { ...this.selectedSku, [spgId]: id };
      specList.forEach((item) => {
        item.specParamList.forEach((valuesItem) => {
          if (item.spgId === spgId) {
            valuesItem.isSelected = valuesItem.sppId === selectedSku[spgId];
          }
        });
      });
      this.chooseSpecValueId(id, spgId);
      const isAllSelectedSku = this.isAllSelected(specList, selectedSku);
      if (!isAllSelectedSku) {
        this.setData({
          selectSkuSellsPrice: 0,
          selectSkuImg: '',
        });
      }
      this.setData({
        specList,
        isAllSelectedSku,
      });
      this.selectedSku = selectedSku;
      this.triggerEvent('change', {
        specList,
        selectedSku,
        isAllSelectedSku,
      });
    },

    // 判断是否所有的sku都已经选中
    isAllSelected(skuTree, selectedSku) {
      const selected = Object.keys(selectedSku).filter((skuKeyStr) => selectedSku[skuKeyStr] !== '');
      return skuTree.length === selected.length;
    },

    handlePopupHide() {
      this.triggerEvent('closeSpecsPopup', {
        show: false,
      });
    },

    specsConfirm() {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('specsConfirm');
    },

    // 加入购物车
    addCart() {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('addCart');
    },

    // 立即购买
    buyNow() {
      const { isAllSelectedSku } = this.data;
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('buyNow', {
        isAllSelectedSku,
      });
    },

    // 总处理
    setBuyNum(buyNum) {
      this.setData({
        buyNum,
      });
      this.triggerEvent('changeNum', {
        buyNum,
      });
    },

    handleBuyNumChange(e) {
      const { value } = e.detail;
      console.log(value)
      this.setData({
        buyNum: value,
      });
      this.triggerEvent('changeNum', {
        buyNum: value,
      });
    },
  },
});
