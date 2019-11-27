// pages/sudoku/sudoku.js
Page({
  data: {
    page_background_color: '',
    page_height: 0,
  },

  onLoad: function (options) {
    this.set_UI_parameters()
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  
  set_UI_parameters: function () {
    let that = this
    try {
      const res = wx.getSystemInfoSync()
      const window_height = res.windowHeight
      const window_width = res.windowWidth
      const rpx2px = window_width / 750
      that.setData({
        rpx2px: rpx2px,
        page_background_color: '#DBEDF3',
        page_height: window_height,

        
      })
    } catch (e) {
      log(e)
      wx.showToast({
        title: '初始化界面出错',
      })
    }
  },
})