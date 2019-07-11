import Http from './../util/http.js'

class LikeModel extends Http {
  like (behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, category, callback) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: callback
    })
  }
}

export default LikeModel