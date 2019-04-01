App({
  // data: {
  //   openid: {},
  //   nickName:{},
  //   avatarUrl: {}
  // },
  onLaunch: function () {
    console.log('App Launch')
    // wx.getUserInfo({
    //   success: function (res) {
    //     that.setData({
    //       nickName: res.userInfo.nickName,
    //       avatarUrl: res.userInfo.avatarUrl,
    //     })
    //   },
    // })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid:{},
    commentTitle:""
  }
})
