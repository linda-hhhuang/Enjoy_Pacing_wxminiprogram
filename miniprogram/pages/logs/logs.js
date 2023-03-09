// logs.ts
// const util = require('../../utils/util.js')
import {
  formatTime
} from '../../utils/util'

Page({
  data: {
    eats: (wx.getStorageSync('eats') || []).map((eat) => {
      console.log("logs", eat)
      return {
        date: eat.restaurantId
      }
    }),
  },
  // onShow() {
  //   this.setData({
  //     eats: 
  //   })
  // },
})