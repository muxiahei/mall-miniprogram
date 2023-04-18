import { config, orderUrl } from '../../config/index';
import { mockIp, mockReqId } from '../../utils/mock';

/** 获取购物车mock数据 */
function mockFetchCartGroupData(params) {
  const { delay } = require('../_utils/delay');
  const { genCartGroupData } = require('../../model/cart');

  return delay().then(() => genCartGroupData(params));
}

/** 获取购物车数据 */
export function fetchCartGroupData(params) {
  return new Promise((resolve) => {
    wx.request({
      url: orderUrl + '/cart',
      // data: {
      //   pageCurrent,
      //   pageSize
      // },
      header: {
        'content-type': 'application/json'
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const resp = {
            data: {
                isNotEmpty: true,
                storeGoods: [
                  {
                    storeId: '1000',
                    storeName: '云Mall深圳旗舰店',
                    storeStatus: 1,
                    totalDiscountSalePrice: '9990',
                    promotionGoodsList: [
                      {
                        title: '满减满折回归',
                        promotionCode: 'MERCHANT',
                        promotionSubCode: 'MYJ',
                        promotionId: '159174555838121985',
                        tagText: ['满100元减99.9元'],
                        promotionStatus: 3,
                        tag: '满减',
                        description: '满100元减99.9元,已减99.9元',
                        doorSillRemain: null,
                        isNeedAddOnShop: 0,
                        goodsPromotionList: [],
                        lastJoinTime: '2020-06-29T07:55:40.000+0000',
                      },
                      {
                        title: null,
                        promotionCode: 'EMPTY_PROMOTION',
                        promotionSubCode: null,
                        promotionId: null,
                        tagText: null,
                        promotionStatus: null,
                        tag: null,
                        description: null,
                        doorSillRemain: null,
                        isNeedAddOnShop: 0,
                        goodsPromotionList: [],
                        lastJoinTime: null,
                      },
                    ],
                    lastJoinTime: '2020-06-29T07:55:40.000+0000',
                    postageFreePromotionVo: {
                      title: null,
                      promotionCode: null,
                      promotionSubCode: null,
                      promotionId: null,
                      tagText: null,
                      promotionStatus: null,
                      tag: null,
                      description: null,
                      doorSillRemain: null,
                      isNeedAddOnShop: 0,
                    },
                  },
                ],
                invalidGoodItems: [],
                isAllSelected: false,
                // 商品选择的个数
                selectedGoodsCount: 0,
                // 商品总价
                totalAmount: '0',
                // 商品总优惠价
                totalDiscountAmount: '0',
            },
            code: 'Success',
            msg: null,
            requestId: mockReqId(),
            clientIp: mockIp(),
            rt: 269,
            success: true
          }
          const spuList = [];
          const array = res.data.data;
          // 计算商品总价
          let sum = 0;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const spu = {};
            spu["cartId"] = element.cartId;
            
            spu["uid"] = element.userId;
            spu["saasId"] = "88888888";
            spu["storeId"] = "11";
  
            spu["spuId"] = element.spuId;
            spu["skuId"] = element.skuId;
            spu["isSelected"] = 1;
            spu["thumb"] = element.productInfo.productSpu.image;
            spu["title"] = element.productInfo.productSpu.productName;
            spu["primaryImage"] = element.productInfo.productSpu.image;
            spu["quantity"] = element.productAmount;
  
            spu["stockStatus"] = false;
            spu["stockQuantity"] = element.productInfo.productSku[0].num;
            spu["price"] = element.price;
            spu["originPrice"] = element.productInfo.productSku[0].price;
            spu["tagPrice"] = element.productInfo.productSku[0].price;
            spu["tagText"] = element.productInfo.productSku[0].num;
            spu["roomId"] = element.productInfo.productSku[0].num;
  
            spu["specInfo"] = JSON.parse(element.productInfo.productSku[0].skuSpecifications);
            spu["joinCartTime"] = "2020-04-24T06:26:48.000+0000";
            spu["available"] = 1;
            spu["putOnSale"] = 1;
            spu["etitle"] = null;
  
            sum += Number(spu["price"]) * Number(spu["quantity"])
            spuList.push(spu);
          }
          resp.data.storeGoods[0].promotionGoodsList[0].goodsPromotionList = spuList;

          resp.data.selectedGoodsCount = spuList.length;
          resp.data.totalAmount = sum;
          resolve(resp);
        } else {
        
        }
      }
    })
  });  
}
