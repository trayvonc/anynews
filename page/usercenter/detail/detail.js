// posts.js


Page({
  data: {
    title: '话题详情',
    collectText:"收藏",
    detail: {},
    replies:{},
    hidden: true,
    modalHidden: true,
    focus: false,
    inputValue: '',
    commentTitle:'',
    // avatarUrl:"",
    // nickName:""
  },
  confirm: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    //console.log("输入框", this.data.inputValue)
  },
  subminttap:function(){
    if (this.data.inputValue!=''){
      var that=this;
    //入库：
    //console.log(e)
    //console.log("采集到的值", this.data.inputValue)
    const db = wx.cloud.database()
    var app = getApp();
    var commentTitle = app.globalData.commentTitle;
    
    db.collection('userComment').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        title: commentTitle,
        comment: this.data.inputValue,
        // iconurl: this.avatarUrl,
        due: new Date(),
        zanNum:0,
        tags: [
          'cloud',
          'userComment'
        ],
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        //显示成功
        wx.showToast({
          title: '评论成功',
        });
        that.showComment(commentTitle);
        // this.setData({
        //   'inputValue': ''
        // })
      }
    })
    }else{
      wx.showToast({
        title: '输入后再提交吧',
        image: '../../../image/bad.png',
        duration: 1500
      });
    }
  },

  onLoad: function (options) {

    /**
     * 获取用户信息
     */
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       avatarUrl: res.userInfo.avatarUrl,
    //       nickName: res.userInfo.nickName,
    //     })
    //   }
    // });
    // console.log(this.avatarUrl)
    //this.fetchData(options.id);
    var app = getApp();
    var commentTitle = app.globalData.commentTitle;
    var that=this;
    that.setData({
      commentTitle:commentTitle
    })
    this.showComment(commentTitle);
    
  },
  showComment:function(title){
    var that = this;
    const db = wx.cloud.database();
    
    db.collection('userComment').where({
      title: title
    }).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log("信息内容", res.data)
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            var str1 = res.data[i].due + "";
            var str2 = str1.substr(0, 10);
            that.setData({
              [`replies[${i}].content`]: res.data[i].comment,
              [`replies[${i}].id`]: "e"+i,
              [`replies[${i}].zanNum`]: res.data[i].zanNum,
              [`replies[${i}].time`]: str2,
              [`replies[${i}]._id`]: res.data[i]._id,
            })
          }

        }
        console.log("评论内容", that.data.replies)

      }
    })
     
  },

  // 获取数据
  fetchData: function (id) {
    var that = this;
    var ApiUrl = Api.topic +'/'+ id +'?mdrender=false';
    that.setData({
      hidden: false
    });
    Api.fetchGet(ApiUrl, (err, res) => {
      res.data.create_at = util.getDateDiff(new Date(res.data.create_at));
      res.data.replies = res.data.replies.map(function (item) {
          item.create_at = util.getDateDiff(new Date(item.create_at));
          item.zanNum = item.ups.length;
          return item;
      })
      that.setData({ detail: res.data });
      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
  },

  // 收藏文章
  collect: function(e) {
    var that = this;
    var ApiUrl = Api.collect;
    var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var id = e.currentTarget.id;
    if(!id) return;
    if(!accesstoken){
      that.setData({ modalHidden: false });
      return;
    }

    Api.fetchPost(ApiUrl, { accesstoken:accesstoken, topic_id:id }, (err, res) => {
      if(res.success){
          var detail = that.data.detail;
          detail.is_collect = true;
          that.setData({
            collectText: "取消收藏",
            detail: detail
          });
      }
    })
  },

  // 点赞
  reply: function(e) {
    console.log(e);
    var that = this;
    //var accesstoken = wx.getStorageSync('CuserInfo').accesstoken;
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    var zanNum=this.data.replies[index].zanNum+1;
    var that=this;
    that.setData({
      [`replies[${index}].zanNum`]:zanNum,
    })
    var id = this.data.replies[index]._id;
    console.log("ididididididi",id)
    const db=wx.cloud.database();
    db.collection('userComment').doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        zanNum: zanNum
      },
      success(res) {
        console.log(res.data)
      }
    })
    

    // var ApiUrl = Api.reply(id);
    // if(!id) return;
    // if(!accesstoken){
    //   that.setData({ modalHidden: false });
    //   return;
    // }

    // Api.fetchPost(ApiUrl, { accesstoken:accesstoken }, (err, res) => {
    //   if(res.success){
    //     var detail = that.data.detail;
    //     var replies = detail.replies[index];

    //     if(res.action === "up"){
    //       replies.zanNum = replies.zanNum + 1;
    //     }else{
    //       replies.zanNum = replies.zanNum - 1;
    //     }

    //     that.setData({ detail: detail });

    //   }
    // })

  },

  // 关闭--模态弹窗
  cancelChange: function() {
    this.setData({ modalHidden: true });
  },
  // 确认--模态弹窗
  confirmChange: function() {
    this.setData({ modalHidden: true });
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }

})
