import Http from './../util/http.js'

class LikeModel extends Http {
  like (behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    return this.request(url, {
      art_id: artID,
      type: category
    }, 'POST')
  }

  getClassicLikeStatus(artID, category) {
    return this.request(`classic/${category}/${artID}/favor`).then((res) => {
       return res
    })
  }
}

export default LikeModel