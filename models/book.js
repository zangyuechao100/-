import Http from './../util/http.js'

class BookModule extends Http {
  getHotList () {
    return this.request('book/hot_list')
  }

  getMyBookCount () {
    return this.request('book/favor/count')
  }

  getDetail (bid) {
    return this.request(`book/${bid}/detail`)
  }

  getLikeStatus (bid) {
    return this.request(`book/${bid}/favor`)
  }

  getComments (bid) {
    return this.request(`book/${bid}/short_comment`)
  }

  postComment(bid, comment) {
    return this.request(`book/add/short_comment`, {
      book_id:bid,
      content:comment
    }, 'POST')
  }
}
  
export default BookModule