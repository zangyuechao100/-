// components/classic/music/index.js
import classicBeh from './../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: './images/player@playing.png',
    playSrc: './images/player@pause.png',
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      this.setData({
        playing: !this.data.playing
      })
      if (this.data.playing) {
        mMgr.title = this.properties.src
        mMgr.src = this.properties.src
      } else {
        mMgr.pause()
      }
    }
  },

  detached: function (event) {
    mMgr.stop()
  }
})
