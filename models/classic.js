import Http from './../util/http.js'

class Classic extends Http {
    getLatest () {
      return this.request('classic/latest').then((res) => {
        wx.setStorageSync(this._getKey(res.index) + '', res)
        this._setLastestIndex(res.index)
        return res
      })
    }

    getClassic (index, nextOrPrevious) {
      let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
      let classic = wx.getStorageSync(key)
      if (!classic) {
        return this.request(`classic/${index}/${nextOrPrevious}`).then((res) => {
          wx.setStorageSync(this._getKey(res.index) + '', res)
          return res
        })
      } else {
        return Promise.resolve(classic)
      }
    }

    isFirst (index) {
      return index === 1
    }
  
    isLastest (index) {
      let lastestIndex = this._getLastestIndex('lastest')
      return lastestIndex === index
    }

    _setLastestIndex (index) {
      wx.setStorageSync('lastest', index)
    }

    _getLastestIndex (key) {
      return wx.getStorageSync(key)
    }

    _getKey (index) {
      let key = 'classic-' + index
      return key
    } 
}

export default Classic