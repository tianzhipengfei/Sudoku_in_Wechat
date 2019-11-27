//index.js
//获取应用实例
const app = getApp()
const log = console.log.bind(console);

Page({
  data: {
    rpx2px: 0,
    // if you need to convert from rpx to px, then * rpx2px, otherwise / rpx2px
    page_background_color: '#DBEDF3',
    page_height: 0,

    user_info_background_color: '#ffffff',
    user_info_height: 0,
    user_info_width: 0,
    user_info_top: 0,
    user_info_left: 0,

    avatar_height: 0,
    avatar_width: 0,
    avatar_border_radius: 0,
    avatar_top: 0,
    avatar_left: 0,

    user_info_text_height: 0,
    user_info_text_width: 0,
    user_info_text_left: 0,

    user_name_height: 0,
    user_name_width: 0,
    user_name_font_size: 0,

    user_level_height: 0,
    user_level_width: 0,
    user_level_font_size: 0,
    user_level_text: '',

    level_wrapper_height: 0,
    level_wrapper_width: 0,

    cur_level_height: 0,
    cur_level_ratio: 0,
    cur_level_background_color: '',

    cur_level_text: '',

    new_game_background_color: '#ffffff',
    new_game_height: 0,
    new_game_width: 0,
    new_game_top: 0,
    new_game_left: 0,

    new_game_icon_height: 0,
    new_game_icon_width: 0,
    new_game_icon_top: 0,
    new_game_icon_left: 0,

    result_background_color: '#ffffff',
    result_height: 0,
    result_width: 0,
    result_top: 0,
    result_left: 0,

    result_icon_height: 0,
    result_icon_width: 0,
    result_icon_top: 0,
    result_icon_left: 0,

    help_background_color: '#ffffff',
    help_height: 0,
    help_width: 0,
    help_top: 0,
    help_left: 0,

    help_icon_height: 0,
    help_icon_width: 0,
    help_icon_top: 0,
    help_icon_left: 0,

    pk_background_color: '#ffffff',
    pk_height: 0,
    pk_width: 0,
    pk_top: 0,
    pk_left: 0,

    pk_icon_height: 0,
    pk_icon_width: 0,
    pk_icon_top: 0,
    pk_icon_left: 0,

    setting_background_color: '#ffffff',
    setting_height: 0,
    setting_width: 0,
    setting_top: 0,
    setting_left: 0,

    setting_icon_height: 0,
    setting_icon_width: 0,
    setting_icon_top: 0,
    setting_icon_left: 0,

    about_background_color: '#ffffff',
    about_height: 0,
    about_width: 0,
    about_top: 0,
    about_left: 0,

    about_icon_height: 0,
    about_icon_width: 0,
    about_icon_top: 0,
    about_icon_left: 0,
  },
  //事件处理函数
  bindViewTap: function() {

  },

  onLoad: function() {
    this.set_UI_parameters()
  },

  //设置界面的参数
  set_UI_parameters: function() {
    let that = this
    try {
      const res = wx.getSystemInfoSync()
      const window_height = res.windowHeight
      const window_width = res.windowWidth
      const rpx2px = window_width / 750
      that.setData({
        rpx2px: rpx2px,
        page_height: window_height,

        user_info_height: window_height * 0.17,
        user_info_width: window_width * 0.9,
        user_info_top: window_height * 0.06,
        user_info_left: window_width * 0.05,

        avatar_height: window_width * 0.2,
        avatar_width: window_width * 0.2,
        avatar_border_radius: window_width * 0.1,
        avatar_top: (window_height * 0.17 - window_width * 0.2) / 2,
        avatar_left: (window_height * 0.17 - window_width * 0.2) / 2,

        user_info_text_height: window_height * 0.17,
        user_info_text_width: window_width * 0.67 - (window_height * 0.17 - window_width * 0.2),
        user_info_text_left: window_width * 0.03,

        user_name_height: window_height * 0.06,
        user_name_width: window_width * 0.67 - (window_height * 0.17 - window_width * 0.2),
        user_name_font_size: window_height * 0.03,

        user_level_height: window_height * 0.06,
        user_level_width: window_width * 0.67 - (window_height * 0.17 - window_width * 0.2),
        user_level_font_size: window_height * 0.02,

        //just for test, need to change in other function!!!
        user_level_text: '白银',

        level_wrapper_height: window_height * 0.02,
        level_wrapper_width: window_width * 0.57 - (window_height * 0.17 - window_width * 0.2),

        cur_level_height: window_height * 0.02,

        //just for test, need to change in other function!!!
        cur_level_ratio: 1,

        //just for test, need to change in other function!!!
        cur_level_background_color: 'orange',

        //just for test, need to change in other function!!!
        cur_level_text: '48/150',

        new_game_height: window_height * 0.3,
        new_game_width: window_width * 0.44,
        new_game_top: window_height * 0.24,
        new_game_left: window_width * 0.05,

        new_game_icon_height: window_width * 0.2,
        new_game_icon_width: window_width * 0.2,
        new_game_icon_top: (window_height * 0.3 - window_width * 0.2 - 110 * rpx2px) * 0.618,
        new_game_icon_left: window_width * 0.24 * 0.9,

        result_height: window_height * 0.21,
        result_width: window_width * 0.44,
        result_top: window_height * 0.24,
        result_left: window_width * 0.51,

        result_icon_height: window_width * 0.16,
        result_icon_width: window_width * 0.16,
        result_icon_top: (window_height * 0.21 - window_width * 0.16 - 110 * rpx2px) * 0.618,
        result_icon_left: window_width * 0.28 * 0.9,

        help_height: window_height * 0.21,
        help_width: window_width * 0.44,
        help_top: window_height * 0.55,
        help_left: window_width * 0.05,

        help_icon_height: window_width * 0.14,
        help_icon_width: window_width * 0.15,
        help_icon_top: (window_height * 0.21 - window_width * 0.14 - 110 * rpx2px) * 0.618,
        help_icon_left: window_width * 0.29 * 0.85,

        pk_height: window_height * 0.30,
        pk_width: window_width * 0.44,
        pk_top: window_height * 0.46,
        pk_left: window_width * 0.51,

        pk_icon_height: window_width * 0.2,
        pk_icon_width: window_width * 0.182,
        pk_icon_top: (window_height * 0.30 - window_width * 0.2 - 110 * rpx2px) * 0.618,
        pk_icon_left: window_width * 0.258 * 0.85,

        setting_height: window_height * 0.10,
        setting_width: window_width * 0.88 - window_height * 0.10,
        setting_top: window_height * 0.77,
        setting_left: window_width * 0.05,

        setting_icon_height: window_height * 0.066,
        setting_icon_width: window_height * 0.066,
        setting_icon_top: window_height * 0.017,
        setting_icon_left: window_width * 0.58 - window_height * 0.10,

        about_height: window_height * 0.10,
        about_width: window_height * 0.10,
        about_top: window_height * 0.77,
        about_left: window_width * 0.95 - window_height * 0.10,

        about_icon_height: window_width * 0.13,
        about_icon_width: window_width * 0.13,
        about_icon_top: (window_height * 0.10 - window_width * 0.13) / 2,
        about_icon_left: (window_height * 0.10 - window_width * 0.13) / 2,
      })
    } catch (e) {
      log(e)
      wx.showToast({
        title: '初始化界面出错',
      })
    }
  },
})