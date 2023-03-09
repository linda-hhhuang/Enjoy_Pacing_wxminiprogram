const initDish = {
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
  price: ''
}

const initForm = {
  delete: false,
  /** 饭店ID */
  restaurantId: '',
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
  dishes: [initDish]
}
Page({
  data: {
    form: initForm,
    type: "", // add edit
    id: 0,
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
      this.setData({
        id: option.id
      })
    }
    if (option.type == 'edit' && option.id) {
      this.setData({
        form: wx.getStorageSync('eats').find(i => i.restaurantId === option.id)
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
    newDishes[e.currentTarget.dataset.id].name = e.detail.value
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
    newDishes[e.currentTarget.dataset.id].like = e.detail.value
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
    newDishes[e.currentTarget.dataset.id].price = e.detail.value
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
    newDishes[e.currentTarget.dataset.id].rate = e.detail.value
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
    newDishes[e.currentTarget.dataset.id].evaluation = e.detail.value
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
    let newDish = initDish
    newDish.id = newDish.length
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
    console.log("onConfirm", e)
    const eat = wx.getStorageSync("eats") || []
    if (this.data.type === 'edit') {
      eat[this.data.id] = this.data.form
    } else if (this.data.type === 'add') {
      eat.unshift(this.data.form)
    }
    console.log("onConfirm setStorageSync", wx.setStorageSync('eats', eat))
    wx.navigateBack()

  },
  onDelete: function (e) {
    console.log("onDelete", e)
    let newDishes = this.data.form.dishes;
    newDishes[e.currentTarget.dataset.id].delete = true
    this.setData({
      form: {
        ...this.data.form,
        dishes: newDishes
      }
    })
  },
})