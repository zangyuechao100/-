import Http from './../util/http.js'
class KeywordModel extends Http {
    maxLength = 10
    key = 'q'

    getHistory () {
      return wx.getStorageSync(this.key) || []
    }

    getHot () {
      return this.request('/book/hot_keyword')
    }

    addToHistory (keyword) {
      let words = this.getHistory()
      const has = words.includes(keyword)
      if (!has) {
        if (words.length >= this.maxLength) {
          words.pop()
        }
        words.unshift(keyword)
        wx.setStorageSync(this.key, words)
      }
    }
}

export default KeywordModel