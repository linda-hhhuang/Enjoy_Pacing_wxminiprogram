import {
  formatTime
} from '../../utils/util'

import {
  initEat,
  initDish
} from '../index/index'

Page({
  data: {
    form: initEat(),
    type: "", // add edit check
    datetimeVisible: false,
    datetime: formatTime(new Date(), true),
    disable: false,
  },
  onLoad: function (option) {
    if (option.type) {
      console.log("option.type", option.type)
      this.setData({
        type: option.type,
        disable: option.type === 'check'
      })
    }
    if (typeof option.id === 'string') {
      console.log("option.id", option.id)
      wx.setNavigationBarTitle({
        title: `这是第 ${parseInt(option.id) + 1}  个食录～`,
      })
      this.setData({
        form: {
          ...this.data.form,
          id: option.id
        }
      })
    }
    if ((option.type == 'edit' || option.type == 'check') && typeof option.id === 'string') {
      const currForm = wx.getStorageSync('eats').find(i => i.id == option.id)
      this.setData({
        form: currForm,
        datetime: formatTime(new Date(currForm.time), true),
      })
    }
  },
  onRestaurantNameChange: function (e) {
    console.log("onRestaurantNameChange", e)
    this.setData({
      form: {
        ...this.data.form,
        restaurantName: e.detail.value
      }
    })
  },
  onLikeChange: function (e) {
    console.log("onLikeChange", e)
    this.setData({
      form: {
        ...this.data.form,
        like: e.detail.value
      }
    })
  },
  onCoordinateChange: function (e) {
    console.log("onCoordinateChange", e)
    this.setData({
      form: {
        ...this.data.form,
        coordinate: e.detail.value
      }
    })
  },
  onPriceChagnge: function (e) {
    console.log("onPriceChagnge", e)
    this.setData({
      form: {
        ...this.data.form,
        price: e.detail.value
      }
    })
  },
  onPriceCount: function (e) {
    console.log("onPriceCount", e)
    this.setData({
      form: {
        ...this.data.form,
        price: this.data.form.dishes.map(i => parseFloat(i.price)).reduce((a, b) => a + b, 0)
      }
    })
  },
  onRateChange: function (e) {
    console.log("onRateChange", e)
    this.setData({
      form: {
        ...this.data.form,
        rate: e.detail.value
      }
    })
  },
  onEvaluationChange: function (e) {
    console.log("onEvaluationChange", e)
    this.setData({
      form: {
        ...this.data.form,
        evaluation: e.detail.value
      }
    })
  },
  onDishNameChange: function (e) {
    console.log("onDishNameChange", e)
    let newDishes = this.data.form.dishes;
    const idx = newDishes.findIndex(item => item.id == e.currentTarget.dataset.id)
    newDishes[idx].name = e.detail.value
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  onDishLikeChange: function (e) {
    console.log("onDishLikeChange", e)
    let newDishes = this.data.form.dishes;
    const idx = newDishes.findIndex(item => item.id == e.currentTarget.dataset.id)
    newDishes[idx].like = e.detail.value
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  onDishPriceChagnge: function (e) {
    console.log("onDishPriceChagnge", e)
    let newDishes = this.data.form.dishes;
    const idx = newDishes.findIndex(item => item.id == e.currentTarget.dataset.id)
    newDishes[idx].price = e.detail.value
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  onDishRateChange: function (e) {
    console.log("onDishRateChange", e)
    let newDishes = this.data.form.dishes;
    const idx = newDishes.findIndex(item => item.id == e.currentTarget.dataset.id)
    newDishes[idx].rate = e.detail.value
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  onDishEvaluationChange: function (e) {
    console.log("onDishEvaluationChange", e)
    let newDishes = this.data.form.dishes;
    const idx = newDishes.findIndex(item => item.id == e.currentTarget.dataset.id)
    newDishes[idx].evaluation = e.detail.value
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  onAddDish: function (e) {
    console.log("onAddDish", e)
    let newDishes = this.data.form.dishes;
    let newDish = initDish()
    newDish.id = String(newDishes.length)
    newDishes.push(newDish)
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  onCancel: function (e) {
    wx.navigateBack()
  },
  onConfirm: function (e) {
    console.log("onConfirm", this.data.form)
    const eat = wx.getStorageSync("eats") || []
    if (this.data.type === 'edit') {
      const idx = eat.findIndex(item => item.id == this.data.form.id)
      eat[idx] = this.data.form
    } else if (this.data.type === 'add') {
      eat.unshift(this.data.form)
    }
    wx.setStorageSync('eats', eat)
    wx.navigateBack()
  },
  onDelete: function (e) {
    console.log("onDelete", e)
    let newDishes = this.data.form.dishes;
    const idx = newDishes.findIndex(item => item.id == e.currentTarget.dataset.id)
    newDishes[idx].delete = true
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
  showPicker(e) {
    if (this.data.type === 'check') return
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
      datetime: value,
      form: {
        ...this.data.form,
        time: new Date(value).getTime()
      }
    });
    this.hidePicker();
  },
})