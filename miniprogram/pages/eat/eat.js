import {
  formatTime
} from '../../utils/util'

Page({
  data: {
    eatData: [],
  },
  onLoad() {
    console.log("eat onload")
    this.setData({
      eatData: (wx.getStorageSync('eats') || []).map((item) => {
        return {
          ...item,
          time: item.time ? formatTime(new Date(parseInt(item.time))) : '未填写时间',
        }
      })
    })
  },
  onShow() {
    console.log("eat onload")
    this.setData({
      eatData: (wx.getStorageSync('eats') || []).map((item) => {
        return {
          ...item,
          time: item.time ? formatTime(new Date(parseInt(item.time))) : '未填写时间',
        }
      })
    })
  },
  onItemClick: function (e) {
    console.log("onItemClick", e.currentTarget.dataset.id)
    let url = '../eat-edit/eat-edit';
    url += '?type=edit'
    if (typeof e.currentTarget.dataset.id === 'string') {
      url += '&id=' + String(e.currentTarget.dataset.id)
    }
    wx.navigateTo({
      url: url
    })
  },
  onDelete: function (e) {
    console.log("onDelete", e.currentTarget.dataset.id)
    const eat = wx.getStorageSync("eats") || []
    eat.find(i => i.id == parseInt(e.currentTarget.dataset.id)).delete = true
    console.log("after Delete", eat[parseInt(e.currentTarget.dataset.id)])

    wx.setStorageSync('eats', eat)
    this.setData({
      eatData: (wx.getStorageSync('eats') || []).map((item) => {
        return {
          ...item,
          time: item.time ? formatTime(new Date(parseInt(item.time))) : '未填写时间',
        }
      })
    })
  },
  onAdd() {
    let url = '../eat-edit/eat-edit';
    url += '?type=add'
    if (this.data.eatData.length > 0) {
      url += '&id=' + String(this.data.eatData.length)
    }
    wx.navigateTo({
      url: url
    })
  }
})