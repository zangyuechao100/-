import Http from './../util/http.js'

class Classic extends Http {
    getLatest (sCallback) {
      this.request({
        url: 'classic/latest',
        success: (res) => {
          sCallback(res)
        }
      })
    }
}

export default Classic