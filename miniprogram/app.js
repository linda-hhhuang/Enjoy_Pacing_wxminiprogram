// app.ts
App({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync("eat") || []
    // logs.unshift(Date.now())
    wx.setStorageSync('eats', [{
      restaurantId: '1',
      restaurantName: '大食兽',
      like: false,
      rate: '2',
      time: '1678028991838',
      price: '100',
    }, {
      restaurantId: '2',
      restaurantName: '猪脚饭2',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '3',
      restaurantName: '猪脚饭3',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '4',
      restaurantName: '猪脚饭4',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '5',
      restaurantName: '猪脚饭5',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '6',
      restaurantName: '猪脚饭6',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '7',
      restaurantName: '猪脚饭7',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '8',
      restaurantName: '猪脚饭8',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '9',
      restaurantName: '猪脚饭9',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }, {
      restaurantId: '10',
      restaurantName: '猪脚饭10',
      like: true,
      rate: '3.5',
      time: '1678028991838',
      price: '32.5',
    }])

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})