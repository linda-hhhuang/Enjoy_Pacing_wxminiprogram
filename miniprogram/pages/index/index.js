// index.ts
// 获取应用实例

export const initDish = {
  delete: false,
  /** 菜名 */
  name: '',
  /** 菜评分 */
  rate: '0',
  /** 收藏 */
  like: false,
  /** 菜评价 */
  evaluation: '',
  /** 菜单项价格 */
  price: '',
  id: "0"
}

export const initEat = {
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
  dishes: [initDish],
  id: "0"
}


Page({
  data: {},
  // 事件处理函数
  bindLogTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  bindEatTap() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../eat/eat',
      })
    }, 600)

  },
  onLoad() {

  },
  getUserProfile() {},
  getUserInfo(e) {}
})