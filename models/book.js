import Http from './../util/http.js'

class BookModule extends Http {
  getHotList () {
    return this.request('book/hot_list')
  }
}
  
export default BookModule