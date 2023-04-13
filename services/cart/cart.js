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
                        goodsPromotionList: [
                          {
                            uid: '88888888205468',
                            saasId: '88888888',
                            storeId: '1000',
                            spuId: '11',
                            skuId: '135691629',
                            isSelected: 0,
                            thumb:
                              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
                            title: '运动连帽拉链卫衣休闲开衫长袖多色运动细绒面料运动上衣',
                            primaryImage:
                              'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
                            quantity: 1,
                            stockStatus: false,
                            stockQuantity: 0,
                            price: '25900',
                            originPrice: '39900',
                            tagPrice: null,
                            tagText: null,
                            roomId: null,
                            specInfo: [
                              {
                                specTitle: '颜色',
                                specValue: '军绿色',
                              },
                              {
                                specTitle: '尺码',
                                specValue: 'S',
                              },
                            ],
                            joinCartTime: '2020-04-24T06:26:48.000+0000',
                            available: 1,
                            putOnSale: 1,
                            etitle: null,
                          },
                          {
                            uid: '88888888205468',
                            saasId: '88888888',
                            storeId: '1000',
                            spuId: '5',
                            skuId: '135691635',
                            isSelected: 0,
                            thumb:
                              'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
                            title:
                              '迷你便携高颜值蓝牙无线耳机立体声只能触控式操作简约立体声耳机',
                            primaryImage:
                              'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
                            quantity: 1,
                            stockStatus: true,
                            stockQuantity: 96,
                            price: '29000',
                            originPrice: '29900',
                            tagPrice: null,
                            tagText: null,
                            roomId: null,
                            specInfo: [
                              {
                                specTitle: '颜色',
                                specValue: '黑色',
                              },
                              {
                                specTitle: '类型',
                                specValue: '简约款',
                              },
                            ],
                            joinCartTime: '2020-06-29T07:55:17.000+0000',
                            available: 1,
                            putOnSale: 1,
                            etitle: null,
                          },
                        ],
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
                invalidGoodItems: [
                  {
                    uid: '88888888205468',
                    saasId: '88888888',
                    storeId: '1000',
                    spuId: '1',
                    skuId: '135691631',
                    isSelected: 1,
                    thumb: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
                    title: '纯色纯棉休闲圆领短袖T恤纯白亲肤厚柔软细腻面料纯白短袖套头T恤',
                    primaryImage:
                      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
                    quantity: 8,
                    stockStatus: true,
                    stockQuantity: 177,
                    price: '26900',
                    originPrice: '31900',
                    tagPrice: null,
                    tagText: null,
                    roomId: null,
                    specInfo: [
                      {
                        specTitle: '颜色',
                        specValue: '白色',
                      },
                      {
                        specTitle: '尺码',
                        specValue: 'S',
                      },
                    ],
                    joinCartTime: '2020-04-28T04:03:59.000+0000',
                    available: 1,
                    putOnSale: 1,
                    etitle: null,
                  },
                ],
                isAllSelected: false,
                selectedGoodsCount: 16,
                totalAmount: '179997',
                totalDiscountAmount: '110000',
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
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const spu = {};
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
  
            spuList.push(spu);
          }
          resp.data.storeGoods[0].promotionGoodsList[0].goodsPromotionList = spuList;

          resolve(resp);
        } else {
        
        }
      }
    })
  });  
}
