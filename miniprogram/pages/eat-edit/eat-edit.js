import {
  formatTime
} from '../../utils/util'
const initForm = {
  /** 饭店ID */
  restaurantId: '',
  /** 店名 */
  restaurantName: '',
  /** 喜欢 */
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
    /** 菜名 */
    name: '',
    /** 菜评分 */
    rate: '0',
    /** 喜欢 */
    like: false,
    /** 菜评价 */
    evaluation: '',
    /** 菜单项价格 */
    price: ''
  }]
}
Page({
  data: {
    form: initForm,
    type: "", // add edit
    style: 'border: 2rpx solid rgba(220,220,220,1);border-radius: 12rpx;width:90%;padding: 0 20rpx;',
  },
  onLoad: function (option) {
    if (option.type) {
      this.setData({
        type: option.type
      })
    }
    if (option.id) {
      wx.setNavigationBarTitle({
        title: '这是第 ' + option.id + ' 个食录～',
      })
    }
    if (option.type == 'edit' && option.id) {
      this.setData({
        form: wx.getStorageSync('eats')[option.id]
      })
    }
  },

})