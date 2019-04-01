Page({
  data: {
    delBtnWidth: 160,
    data: {},
    isScroll: true,
    windowHeight: 0,
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
    const db = wx.cloud.database();
    that=this;
    var app = getApp();
    var openid = app.globalData.openid;
    console.log("这是获取到的openid",openid)
    db.collection('userComment').where({
      _openid:openid
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log("信息长度", res.data.length)
        if (res.data.length>0) {
          for (let i = 0; i < res.data.length; i++) {
            that.setData({
              [`data[${i}].content`]: res.data[i].comment,
              [`data[${i}].id`]: res.data[i]._id,
              [`data[${i}].right`]: 0
            })
          }
        }
      }
    })
    //console.log("修改后信息",that.data)
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.data
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.data[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
  },

  delItem: function (e) {
    console.log("删除",e)
    var that = this
    var id = this.data.data[e.currentTarget.dataset.index].id
    const db = wx.cloud.database();
    db.collection('userComment').doc(id).remove({
      success: function (res) {
        console.log(res)
        //同步到data,暂时把标题删掉
        that.setData({
          [`data[${e.currentTarget.dataset.index}].content`]: '',
        })
        //显示删除成功
        wx.showToast({
          title: '删除成功',
        });
      }
    })

    
    
   

 }
})
