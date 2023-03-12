import {
  formatTime
} from '../../utils/util'
import Message from 'tdesign-miniprogram/message/index';
import {
  initEat,
  initDish
} from '../index/index'

Page({
  data: {
    eatData: [],
    searchType: 0,
    searchInput: "",
    searchDate: [],
    datetime: "所有时间",
    datetimeVisible: false,
    importVisible: false,
    importData: "",
    currentTime: Date.now()
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
  onSearchTypeChange(e) {
    this.setData({
      searchType: e.detail.value,
      searchInput: "",
      seatchDate: "",
      eatData: (wx.getStorageSync('eats') || []).map((item) => {
        return {
          ...item,
          time: item.time ? formatTime(new Date(parseInt(item.time))) : '未填写时间',
        }
      })
    });
  },
  onSearchInputChange(e) {
    console.log("onSearchInputChange", e)
    this.setData({
      searchInput: e.detail.value,
      eatData: (wx.getStorageSync('eats') || []).filter((item) =>
        JSON.stringify(item).includes(e.detail.value.trim())
      ).map((item) => {
        return {
          ...item,
          time: item.time ? formatTime(new Date(parseInt(item.time))) : '未填写时间',
        }
      })
    })
  },
  showPicker(e) {
    this.setData({
      datetimeVisible: true,
    });
  },
  hidePicker() {
    this.setData({
      datetimeVisible: false,
    });
  },
  onTimeConfirm(e) {
    const {
      value
    } = e.detail;
    console.log('confim', value);

    this.setData({
      seatchDate: value,
      eatData: (wx.getStorageSync('eats') || []).filter((item) =>
        item.time >= value[0] && item.time <= value[1]
      ).map((item) => {
        return {
          ...item,
          time: item.time ? formatTime(new Date(parseInt(item.time))) : '未填写时间',
        }
      })
    });
    this.hidePicker();
  },
  onItemClick: function (e) {
    console.log("onItemClick", e.currentTarget.dataset.id)
    let url = '../eat-edit/eat-edit';
    url += '?type=check'
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
    eat.find(i => i.id == e.currentTarget.dataset.id).delete = true

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
  onEdit: function (e) {
    console.log("onEdit", e.currentTarget.dataset.id)
    let url = '../eat-edit/eat-edit';
    url += '?type=edit'
    if (typeof e.currentTarget.dataset.id === 'string') {
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
  },
  onExport() {
    wx.setClipboardData({
      // data: JSON.stringify((wx.getStorageSync('eats') || []).filter((item) => !item.delete)),
      data: JSON.stringify((wx.getStorageSync('eats') || [])),
    })
  },
  onImport() {
    console.log("onImport")
    this.setData({
      importVisible: true,
    });
  },
  onImportCancel() {
    console.log("onImportCancel")
    this.setData({
      importVisible: false,
    });
    wx.clearStorageSync()
  },
  onImportDataChange(e) {
    console.log("onImportDataChange", e.detail.value)
    this.setData({
      importData: e.detail.value,
    });
  },
  onImportConfirm: function (e) {
    console.log("onImportConfirm", this.data.importData)
    const eat = wx.getStorageSync("eats") || []
    const prevLength = eat.length
    let newData = JSON.parse(String(this.data.importData))
    newData = newData.map((item, index) => {
      return {
        ...initEat(),
        ...item,
        id: String(prevLength + index)
      }
    })
    eat.unshift(...newData)
    wx.setStorageSync('eats', eat)
    this.onShow()
    this.setData({
      importVisible: false,
    });
  },
  onImportVisibleChange(e) {
    this.setData({
      importVisible: e.detail.visible,
    });
  },
})
