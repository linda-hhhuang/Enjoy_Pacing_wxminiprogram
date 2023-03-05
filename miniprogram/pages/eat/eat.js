import {
  formatTime
} from '../../utils/util'

Page({
  data: {
    eatData: [],
  },
  onLoad() {
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
    let url = '../eat-edit/eat-edit';
    url += '?type=edit'
    if (e.currentTarget.dataset.id) {
      url += '&id=' + String(e.currentTarget.dataset.id)
    }
    wx.navigateTo({
      url: url
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