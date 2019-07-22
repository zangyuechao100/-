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
      observer: 'loadMore'
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
    loading: false,
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel () {
      this.initialize()
      this.triggerEvent('onCancel')
    },
    onConfirm (event) {
      this._showResult()
      this._showLoadingCenter()
      const word = event.detail.value || event.detail.text
      this.setData({
        q: word
      })
      bookModule.search(0, word).then((res) => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
        this._hideLoadingCenter()
      })
    },
    onDelete () {
      this.initialize()
      this._closeResult()
      this.setData({
        q: ''
      })
    },
    loadMore () {
      if (!this.data.q || this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        const length = this.getCurrentStart()
        bookModule.search(length, this.data.q).then((res) => {
          this.setMoreData(res.books)
          this.unLocked()
        }).catch(() => {
          this.unLocked()
        })
      }
    },
    _showResult () {
      this.setData({
        searching: true
      })
    },
    _showLoadingCenter () {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter () {
      this.setData({
        loadingCenter: false
      })
    },
    _closeResult () {
      this.setData({
        searching: false
      })
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
