const initForm = {
  /** 饭店ID */
  delete: false,
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
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})