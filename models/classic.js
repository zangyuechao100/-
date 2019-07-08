import Http from './../util/http.js'

class Classic extends Http {
    getLatest (sCallback) {
      this.request({
        url: 'classic/latest',
        success: (res) => {
          sCallback(res)
          this._setLastestIndex(res.index)
        }
      })
    }

    getClassic (index, nextOrPrevious, sCallback) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          sCallback(res)
        }
      })
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
}

export default Classic