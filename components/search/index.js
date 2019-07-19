// components/search/index.js
import KeywordModel from './../../models/keyword.js'
import BookModule from './../../models/book.js'
import paginationBec from './../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModule = new BookModule()
Component({
  behaviors: [paginationBec],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_load_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel () {
      this.triggerEvent('onCancel')
    },
    onConfirm (event) {
      const word = event.detail.value || event.detail.text
      this.setData({
        searching: true,
        q: word
      })
      this.initialize()
      bookModule.search(0, word).then((res) => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
      })
    },
    onDelete () {
      this.setData({
        searching: false,
        q: ''
      })
    },
    _load_more () {
      if (!this.data.q || this.data.loading) {
        return
      }
      if (this.hasMore()) {
        this.setData({
          loading: true
        })
        const length = this.getCurrentStart()
        bookModule.search(length, this.data.q).then((res) => {
          this.setMoreData(res.books)
          this.setData({
            loading: false
          })
        })
      }
    }
  },

  attached () {
    let historyWords = keywordModel.getHistory()
    this.setData({
      historyWords
    })
    keywordModel.getHot().then((res) => {
      this.setData({
        hotWords: res.hot
      })
    })
  }
})
