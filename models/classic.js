import Http from './../util/http.js'

class Classic extends Http {
    getLatest (sCallback) {
      this.request({
        url: 'classic/latest',
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index) + '', res)
          sCallback(res)
          this._setLastestIndex(res.index)
        }
      })
    }

    getClassic (index, nextOrPrevious, sCallback) {
      let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
      let classic = wx.getStorageSync(key)
      if (!classic) {
        this.request({
          url: `classic/${index}/${nextOrPrevious}`,
          success: (res) => {
            wx.setStorageSync(this._getKey(res.index) + '', res)
            sCallback(res)
          }
        })
      } else {
        sCallback(classic)
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