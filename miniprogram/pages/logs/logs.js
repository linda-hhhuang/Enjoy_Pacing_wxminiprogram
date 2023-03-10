// logs.ts
// const util = require('../../utils/util.js')
import {
  formatTime
} from '../../utils/util'

Page({
  data: {
    eats: (wx.getStorageSync('eats') || []).map((eat) => {
      console.log("eat", eat)
      return {
        date: eat.id
      }
    }),
  },
  // onShow() {
  //   this.setData({
  //     eats: 
  //   })
  // },
})