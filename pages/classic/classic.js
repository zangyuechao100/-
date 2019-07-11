// pages/classic/classic.js
import Classic from './../../models/classic.js'
import LikeModel from './../../models/like.js'
let classic = new Classic()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: {},
    lastest: true,
    first: false,
    likeCount: 0,
    likeStatus: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classic.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function (e) {
    let behavior = e.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  onNext: function () {
    this.updateClassic('next')
  },

  onPrevious: function () {
    this.updateClassic('previous')
  },

  updateClassic (nextOrPrevious) {
    let index = this.data.classicData.index
    classic.getClassic(index, nextOrPrevious,(res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        lastest: classic.isLastest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },

  _getLikeStatus (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})