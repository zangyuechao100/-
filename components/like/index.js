// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/dislike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike (event) {
      let like = this.properties.like
      let count = this.properties.count

      count = like ? (count - 1) : (count + 1)
      this.setData({
        count,
        like: !like
      })

      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      })
    }
  }
})
