const userInfo = {
  avatarUrl: 'https://img2.woyaogexing.com/2023/05/05/dd28c352d5a167221830edb010ddb4d3.jpg',
  nickName: '季晨正 🌟',
  phoneNumber: '17366463550',
  gender: 2,
};
const countsData = [
  {
    num: 2,
    name: '积分',
    type: 'point',
  },
  {
    num: 10,
    name: '优惠券',
    type: 'coupon',
  },
];

const orderTagInfos = [
  {
    orderNum: 0,
    tabType: 5,
  },
  {
    orderNum: 0,
    tabType: 10,
  },
  {
    orderNum: 0,
    tabType: 40,
  },
  {
    orderNum: 0,
    tabType: 0,
  },
];

const customerServiceInfo = {
  servicePhone: '4006336868',
  serviceTimeDuration: '每周三至周五 9:00-12:00  13:00-15:00',
};

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = () => ({
  userInfo,
  countsData,
  orderTagInfos,
  customerServiceInfo,
});
