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

  attached: function () {
    this._recoverStatus()
    this._monitorSwtich()
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
    },
    _recoverStatus () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwtich () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
  
})
