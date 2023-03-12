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
        ...initEat,
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
/** 
[{
  restaurantName: '何止料理',
  like: false,
  rate: 2.5,
  time: 1675483200000,
  price: '61',
  coordinate: '',
  evaluation: '食欲2',
  dishes: [{
    delete: false,
    name: '玉子烧拉普拉斯',
    rate: '0',
    like: false,
    evaluation: ' 不喜欢（ 可能是黑蒜味接受不了, 里面加了菜也不太喜欢)',
    price: '',
    id: "0"
  }, {
    delete: false,
    name: '金枪鱼牛油果拌饭',
    rate: '3',
    like: false,
    evaluation: '不错 好少吃牛油果拌饭 可以的， 分量大.',
    price: '',
    id: "1"
  }],
}, {
  restaurantName: '辣可可',
  like: false,
  rate: 3,
  time: 1675656000000,
  price: '别人请吃饭',
  coordinate: '深圳湾公司楼下',
  evaluation: '炒黄牛肉很好吃， 值， 其他的一般。',
  dishes: [],
}, {
  restaurantName: '脆鲜生脆皖鱼火锅',
  like: true,
  rate: 3.5,
  time: 1676455200000,
  price: '别人请吃饭',
  coordinate: '深圳湾公司楼下',
  evaluation: '鱼很好吃， 适合多人吃， 注意吃到后面会腻， 土豆泥好吃， 推介小料不错， 鱼排一般， 价格略高',
  dishes: [],
}, {
  restaurantName: '太食兽泰国菜',
  like: true,
  rate: 4,
  time: 1676714400000,
  price: '190',
  coordinate: '后海',
  evaluation: '好吃， 爽，有点特色，总体很贵，性价比还是相对低。',
  dishes: [{
    delete: false,
    name: '虾饼',
    rate: '2',
    like: false,
    evaluation: '推荐菜，感觉一般吧， 没啥特色但是料足。',
    price: '',
    id: "0"
  }, {
    delete: false,
    name: '芒果饭',
    rate: '3',
    like: false,
    evaluation: '好吃，热椰汁，咸甜口糯米饭',
    price: '',
    id: "1"
  }, {
    delete: false,
    name: '酸辣虾',
    rate: '3.5',
    like: true,
    evaluation: '推荐！ 不辣很香， 就是略贵,且晚上拉肚子了不知道有没有关系。。。',
    price: '',
    id: "2"
  }, {
    delete: false,
    name: '话梅冬瓜饮料',
    rate: '2.5',
    like: true,
    evaluation: '网上有人推荐，感觉一般吧',
    price: '',
    id: "3"
  }]
}]
*/