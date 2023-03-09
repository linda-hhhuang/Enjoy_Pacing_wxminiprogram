const initForm = {
  /** 饭店ID */
  delete: false,
  restaurantId: '',
  /** 店名 */
  restaurantName: '',
  /** 收藏 */
  like: false,
  /** 评分 */
  rate: 1,
  /** 吃饭时间 */
  time: Date.now(),
  /** 总价格 */
  price: '',
  /** 店位置 */
  coordinate: '',
  /** 评价 */
  evaluation: '',
  /** 菜 */
  dishes: [{
    delete: false,
    id: 0,
    /** 菜名 */
    name: '',
    /** 菜评分 */
    rate: '0',
    /** 收藏 */
    like: false,
    /** 菜评价 */
    evaluation: '',
    /** 菜单项价格 */
    price: ''
  }]
}
App({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync("eat") || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('eats', [{
    //   delete: false,
    //   restaurantId: '1',
    //   restaurantName: '大食兽',
    //   like: false,
    //   rate: '2',
    //   time: '1678028991838',
    //   price: '100',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }, {
    //     delete: false,
    //     id: 1,
    //     name: '菜名2',
    //     rate: '1',
    //     like: true,
    //     evaluation: '不错2',
    //     price: '122'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '2',
    //   restaurantName: '猪脚饭2',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '3',
    //   restaurantName: '猪脚饭3',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '4',
    //   restaurantName: '猪脚饭4',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '5',
    //   restaurantName: '猪脚饭5',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '6',
    //   restaurantName: '猪脚饭6',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '7',
    //   restaurantName: '猪脚饭7',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '8',
    //   restaurantName: '猪脚饭8',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '9',
    //   restaurantName: '猪脚饭9',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }, {
    //   delete: false,
    //   restaurantId: '10',
    //   restaurantName: '猪脚饭10',
    //   like: true,
    //   rate: '3.5',
    //   time: '1678028991838',
    //   price: '32.5',
    //   coordinate: '深圳 科苑地铁站',
    //   evaluation: '挺好吃！',
    //   dishes: [{
    //     delete: false,
    //     id: 0,
    //     name: '菜名',
    //     rate: '5',
    //     like: false,
    //     evaluation: '不错',
    //     price: '12'
    //   }]
    // }])
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})