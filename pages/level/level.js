// pages/level/level.js
Page({
  data: {
    rpx2px: 0,
    page_height: 0,
    page_background_color: '',
    
    level_select_scroll_height: 0,
    level_select_scroll_top: 0,

    level_select_list_height: 0,
    level_select_list_margin_top: 0,
    level_select_list_margin_bottom: 0,

    levelSelectList: [
      {
        text: "入门级",
        image1: "/images/level/level0.png",
        image2: "/images/level/level5.png",
        id1: "0",
        id2: "5"
      },
      {
        text: "初级",
        image1: "/images/level/level1.png",
        image2: "/images/level/level6.png",
        id1: "1",
        id2: "6"
      },
      {
        text: "中级",
        image1: "/images/level/level2.png",
        image2: "/images/level/level7.png",
        id1: "2",
        id2: "7"
      },
      {
        text: "高级",
        image1: "/images/level/level3.png",
        image2: "/images/level/level8.png",
        id1: "3",
        id2: "8"
      },
      {
        text: "骨灰级",
        image1: "/images/level/level4.png",
        image2: "/images/level/level9.png",
        id1: "4",
        id2: "9"
      }],
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

        level_select_scroll_height: window_height * 0.8,
        level_select_scroll_top: window_height * 0.1,

        level_select_list_height: window_height * 0.13,
        level_select_list_margin_top: (window_height * 0.8 - 26 - window_height * 0.13 * 5) / 10,
        level_select_list_margin_bottom: (window_height * 0.8 - 26 - window_height * 0.13 * 5) / 10,
      })
    } catch (e) {
      log(e)
      wx.showToast({
        title: '初始化界面出错',
      })
    }
  },
})