// pages/my/my.js
import BookModel from './../../models/book.js'
const bookModel = new BookModel() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    myBooksCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyfavor()
  },

  getMyfavor () {
    bookModel.getMyFavor().then((data) => {
      console.log(data)
      this.setData({
        classics: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  userAuthorized () {
    let _this = this
    wx.getSetting({
      success: function (data) {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (data) {
              _this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo (e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo
      })
    }
  },

  onJumpToAbout: function(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  getMyBookCount () {
    bookModel.getMyBookCount().then((data) => {
      this.setData({
        myBooksCount: data.count
      })
    })
  }
})