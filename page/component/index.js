//遗留问题：id为数字开头，163和36kr无法跳转
//cbo点击下一页无法回翻

Page({
  data: {
    userInfo:{},
    isScroll: true,
    list: [
      {
        id: 'weibo',
        name: '微博',
        open: false,   //模块是否展开
        pages: {},     //获取所有页面，后面应该扩展为pages1，pages2等
        shows:{},      //显示在下拉菜单中的量
        hot:{},        //热量
        hotname:'热度:',   //热榜名称
        pagedirect:0,       //下拉框所在页，一开始为第0页，通过增减进行翻页
        disabled1:true,
        disabled2:true,
        len:0,
        pos:0,
        newtag:{},
        iid:{},
        right:{},
        img_name:'weibo.png'
      },
      {
        id: 'baidu',
        name: '百度',
        open: false,
        pages: {},
        shows: {},
        hot: {}, 
        hotname: '热度：',
        pagedirect: 0, 
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 1,
        img_name: 'baidu_crop.png'
      },
      {
        id: 'zhihu',
        name: '知乎',
        open: false,
        shows: {},
        pages: {},
        hotname: '热度:',
        hot: {}, 
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 2,
        img_name: 'zhihu_full.png'
      },
      {
        id: '360',
        name: '360搜索',
        open: false,
        pages: {},
        shows: {},
        hotname: '实时热搜:',
        hot:{},
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 3,
        img_name: '360_long.png'
      },
      {
        id: '163',
        name: '网易新闻',
        open: false,
        pages: {},
        shows: {},
        hotname: '时间:',
        hot: {}, 
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 4,
        img_name: '163.png'
      },
      {
        id: 'qdaily',
        name: '好奇心日报',
        open: false,
        pages: {},
        shows: {},
        hotname: '类别:',
        hot: {}, 
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 5,
        img_name: 'qdaily.png'
      },

      {
        id: 'wallstreetcn',
        name: '华尔街见闻',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 6,
        img_name: 'wallstreetcn.png'
      },

      
    // ],
    // list1:[
      {
        id: 'guokr',
        name: '果壳',
        open: false,
        pages: {},
        shows: {},
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 7,
        img_name: 'guokr.png'
      },
      {
        id: '36kr',
        name: '36氪',
        open: false,
        pages: {},
        shows: {},
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 8,
        img_name: '36kr.png'
      },
      {
        id: 'yc',
        name: 'YC',
        open: false,
        pages: {},
        shows: {},
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 9,
        img_name: 'yc.ico'
      },
      {
        id: 'cnbeta',
        name: 'cnBeta',
        open: false,
        pages: {},
        shows: {},
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 10,
        img_name: 'cnbeta.png'
      },
      {
        id: 'songshuhui',
        name: '科学松鼠会',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 11,
        img_name: 'songshuhui_small.png'
      },
    // ],
    // list2:[
      {
        id: 'v2ex',
        name: 'v2ex',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 12,
        img_name: 'v2ex.png'
      },
      {
        id: 'toutiaoio',
        name: '开发者头条',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 13,
        img_name: 'toutiaoio_color.jpeg'
      },
      {
        id: 'juejin',
        name: '掘金',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 14,
        img_name: 'juejin.png'
      },
      {
        id: 'oschina',
        name: '开源中国',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 15,
        img_name: 'oschina_color.png'
      },
    // ],
    // list3:[
      {
        id: 'thepaper',
        name: '澎湃',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 16,
        img_name: 'thepaper.png'
      },
      {
        id: 'pearvideo',
        name: '梨视频',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 17,
        img_name: 'pearvideo.png'
      },
      {
        id: 'mtime',
        name: '时光网',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 18,
        img_name: 'mtime.png'
      },
      {
        id: 'bilibili',
        name: '哔哩哔哩',
        open: false,
        pages: {},
        shows: {},
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 19,
        img_name: 'bilibili.ico'
      },
    // ],
    // list4:[
      {
        id: 'zol',
        name: '中关村在线',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 20,
        img_name: 'zol.png'
      },
      {
        id: 'smzdm',
        name: '什么值得买',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 21,
        img_name: 'smzdm.png'
      },
      {
        id: 'autohome',
        name: '汽车之家',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 22,
        img_name: 'autohome_beta.png'
      },
      {
        id: 'jiemian',
        name: '界面',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 23,
        img_name: 'jiemian_color.png'
      },
    // ],
    // list4:[
      {
        id: 'gamesky',
        name: '游明星空',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 24,
        img_name: 'gamesky.png'
      },
      {
        id: 'steam',
        name: 'steam',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '在线:',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 25,
        img_name: 'steam.png'
      },
      {
        id: 'cbo',
        name: 'CBO票房',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '实时(万):',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 26,
        img_name: 'cbo_short.png'
      },
      {
        id: 'cbo1',
        name: '即将上映',
        open: false,
        pages: {},
        shows: {},
        hot: {},
        hotname: '上映日期:',
        pagedirect: 0,
        disabled1: true,
        disabled2: true,
        len: 0,
        pos: 26,
        img_name: 'cbo_short.png'
      }
    ],
    //最大左滑距离
    delBtnWidth: 120,
    toView: '',


  },//卡片打开或闭合的状态
  widgetsToggle: function (e) {
    //console.log(e)
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
      //标签页关闭状态初始化
      if(list[i].open==false){
        list[i].pagedirect=0;
        list[i].disabled1=true;
        list[i].disabled2=true;
      }else{
        list[i].disabled2 = false;
      }
    }
    this.setData({
      list: list
    });

    //发送请求
    var that = this;
    //console.log(this.data.list);
    //找出open
    var id = e.currentTarget.id, list = this.data.list,open;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        open = list[i].open;
    }
    }
    if (open == true){
    //显示加载动画
    wx.showLoading({
      title: '加载中',
      mask:true
    });
      wx.showNavigationBarLoading();

    //展开词条，获取数据，加载词条内容
      
      //暂时都只获取第一分类
      var subs=0;
      var pos = this.judgement(e.currentTarget.id);
      var id = e.currentTarget.id;
      //即将上映特殊化
      if(pos==27){
        subs=1;
        id="cbo";
      }
      //进行请求
      this.requestSite(that, 0,id, subs, pos);
      // var pagedirect = this.data.list[pos].pagedirect;
      // this.requestSite(that, pagedirect, e.currentTarget.id, subs, pos);
    }


    let wordindex = e.currentTarget.id;

    this.setData({
      toView: wordindex,
    })
    console.log(this.data.toView)
    
  },
  judgement:function(a){

    if (a == "weibo")
      return 0;
    else if (a == "baidu")
      return 1;
    else if (a == "zhihu")
      return 2;
    else if (a == "360")
      return 3;
    else if (a == "163")
      return 4;
    else if (a == "qdaily")
      return 5;
    else if (a == "wallstreetcn")
      return 6;
    else if (a == "guokr")
      return 7;
    else if (a == "36kr")
      return 8;
    else if (a == "yc")
      return 9;
    else if (a == "cnbeta")
      return 10;
    else if (a == "songshuhui")
      return 11;
    else if (a == "v2ex")
      return 12;
    else if (a == "toutiaoio")
      return 13;
    else if (a == "juejin")
      return 14;
    else if (a == "oschina")
      return 15;
    else if (a == "thepaper")
      return 16;
    else if (a == "pearvideo")
      return 17;
    else if (a == "mtime")
      return 18;
    else if (a == "bilibili")
      return 19;
    else if (a == "zol")
      return 20;
    else if (a == "smzdm")
      return 21;
    else if (a == "autohome")
      return 22;
    else if (a == "jiemian")
      return 23;
    else if (a == "gamesky")
      return 24;
    else if (a == "steam")
      return 25;
    else if (a == "cbo")
      return 26;
    else if (a == "cbo1")
      return 27;
  },

  //按钮处理事件
  tapButton:function(event){
    
    var that=this;
    //去除后缀leftt和right
    var str = event.currentTarget.id.slice(0, event.currentTarget.id.length - 5);
    var pos = this.judgement(str);
    //区分左右
    var str1 = event.currentTarget.id.slice(event.currentTarget.id.length - 5, event.currentTarget.id.length);
    //console.log(str1);
        
    //获取当前页码
    var pagedirect=this.data.list[pos].pagedirect;
    //console.log(pagedirect);
    //console.log(event);
    
    //页面是打开状态
    if(this.data.list[pos].open==true){
    switch(str1){
      case "leftt":
        pagedirect--;
        this.setData({
          [`list[${pos}].pagedirect`]: pagedirect
        })
        this.showdata(pagedirect,pos);
        break;
      case "right":
        pagedirect++;
        this.setData({
          [`list[${pos}].pagedirect`]: pagedirect
        })
        this.showdata(pagedirect,pos);
        break;
    }
      //当pagedirect为0时禁止前翻页
      if (pagedirect == 0) {
        this.setData({
          [`list[${pos}].disabled1`]: true,
          [`list[${pos}].disabled2`]: false,
        })
      } //当pagedirect为最大时禁止后翻页
      else if (pagedirect >= (that.data.list[pos].len / 7) - 1)
      {
        this.setData({
          [`list[${pos}].disabled2`]: true,
          [`list[${pos}].disabled1`]: false,
        })
      } else{
      {
        this.setData({
          [`list[${pos}].disabled1`]: false,
          [`list[${pos}].disabled2`]: false,
        })
      }

    }
    }
    //console.log(event);
  },

  onLoad:function(options){
    //获取用户openid
    const cloud = require('wx-server-sdk')
    wx.cloud.init() //初始化
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        //console.log('callFunction test result: ', res)
        // this.setData({
        //   'userInfo':res.result.event.userInfo
        // })
        getApp().globalData.openid = res.openid;
      }
    })
    var app=getApp()
    console.log("index获取到的", app.globalData.openid)
  },

  requestSite: function (that,pagedirect,key,subs,pos) {
    wx.request({
      url: 'https://www.anyknew.com/api/v1/sites/'+key,
      method: 'get',
      success: function (res) { //请求成功
        var details = res.data.data.site.subs[subs].items;
        that.setdata(details,pagedirect,pos);

      },
      fail: function () {
        wx.showToast({
          title: '服务器异常',
          image:'../../image/bad.png',
          duration: 1500
        })
      },
      complete: function () { //请求完成的时候，不管请求成功还是失败
        wx.hideLoading();
        wx.hideNavigationBarLoading()
      }
    })

  },

  //初始化条目
  setdata:function(data,pagedirect,pos){
    //存数据
    var that=this;
    that.setData({
      [`list[${pos}].pages`]: data,
      [`list[${pos}].len`]:data.length
    })
    console.log("请求");
    //展示10条
    this.showdata(pagedirect,pos);
  },

  //显示条目
  showdata: function (pagedirect,pos){
    //根据pagedirect页号展示数据（存入shows）
    var i=pagedirect*7;
    //console.log(this.data.list[pos].pages);
    console.log("设置页面",pagedirect);
    console.log("总页数", this.data.list[pos].len / 7);
    console.log("pos",pos)
    if (pagedirect <= (this.data.list[pos].len / 7-1)){
    for(let m=0;m<7;m++){
    this.setData({
      //展示10条数据,如何实现数据数量调整？？？？list[index]
        [`list[${pos}].shows[${m}]`]: this.data.list[pos].pages[i + m].title,
        [`list[${pos}].hot[${m}]`]: this.data.list[pos].pages[i + m].ext.replace(/\s*/g, ""),   //去除字符串中所有的空格
        [`list[${pos}].newtag[${m}]`]: this.data.list[pos].pages[i + m].new_tag,
        [`list[${pos}].iid[${m}]`]: this.data.list[pos].pages[i + m].iid,
        [`list[${pos}].right[${m}]`]: 0,
    })
      //console.log(this.data.list[pos].shows[i + m])
    }
    }else{
      //console.log(this.data.list[0].shows)
      
      //计算出剩余条数
      var remain = this.data.list[pos].len % 7
      //删除不需要的show
      var tmp=this.data.list[pos].shows.splice(remain,7-remain);
      this.setData({
        [`list[${pos}].shows`]:tmp
      })  
      
      //填充剩余内容
      for (let m = 0; m < remain; m++) {
        //console.log("m",m)
        this.setData({
          //展示remain条数据
          [`list[${pos}].shows[${m}]`]: this.data.list[pos].pages[i + m].title,
          [`list[${pos}].hot[${m}]`]: this.data.list[pos].pages[i + m].ext.replace(/\s*/g, ""),
          [`list[${pos}].newtag[${m}]`]: this.data.list[pos].pages[i + m].new_tag,
          [`list[${pos}].iid[${m}]`]: this.data.list[pos].pages[i + m].iid,
          [`list[${pos}].right[${m}]`]: 0,
        })
      }

    }
    
  },
//长按复制
  copy: function (e) {
    var that = this;
    //console.log(e);
    wx.setClipboardData({
      data: "https://www.anyknew.com/go/" + that.data.list[e.currentTarget.dataset.aindex].iid[e.currentTarget.dataset.bindex],
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
    //console.log(this.data.list[e.currentTarget.dataset.aindex].iid[e.currentTarget.dataset.aindex]);
    //console.log(this.data.list[e.currentTarget.dataset.aindex].iid);
  },

  drawStart: function (e) {

    var touch = e.touches[0]
    var that=this;
    //console.log(this.data.list[e.currentTarget.dataset.aindex])
    for (var index in this.data.list[e.currentTarget.dataset.aindex].right) {
      //console.log(index)
      this.data.list[e.currentTarget.dataset.aindex].right[index] = 0
    }
    
    this.setData({
      [`list[${e.currentTarget.dataset.aindex}].right`]: this.data.list[e.currentTarget.dataset.aindex].right,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    
    
    var touch = e.touches[0]
    var item = this.data.list[e.currentTarget.dataset.aindex].right[e.currentTarget.dataset.bindex]
    var disX = this.data.startX - touch.clientX
    
    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      //item= disX
      //console.log(disX)
      //一直增大到160
      this.setData({
        [`list[${e.currentTarget.dataset.aindex}].right[${e.currentTarget.dataset.bindex}]`]: 2*disX,
        isScroll: false,
      })
      
    } else {
      //console.log(this.data.list[e.currentTarget.dataset.aindex].right)
      //小幅移动
      this.setData({
        [`list[${e.currentTarget.dataset.aindex}].right[${e.currentTarget.dataset.bindex}]`]: 0,
        isScroll: true,
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.list[e.currentTarget.dataset.aindex].right[e.currentTarget.dataset.bindex]
    if (item >= this.data.delBtnWidth) {
      item = this.data.delBtnWidth
      this.setData({
        [`list[${e.currentTarget.dataset.aindex}].right[${e.currentTarget.dataset.bindex}]`]: 2*this.data.delBtnWidth,
        isScroll: true,
      })
    } else {
      item= 0
      this.setData({
        [`list[${e.currentTarget.dataset.aindex}].right[${e.currentTarget.dataset.bindex}]`]: 0,
        isScroll: true,
      })
    }
  },

  collectItem: function (e) {
    //入库：
    //console.log(e)
    const db = wx.cloud.database()
    db.collection('userCollect').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        title: this.data.list[e.currentTarget.dataset.aindex].shows[e.currentTarget.dataset.bindex],
        url: "https://www.anyknew.com/go/" + this.data.list[e.currentTarget.dataset.aindex].iid[e.currentTarget.dataset.bindex],
        due: new Date(),
        tags: [
          'cloud',
          'userInfo'
        ],
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    //显示收藏成功
    wx.showToast({
      title: '收藏成功',
    });
  },

  commentItem: function (e) {
    //入库：
    //console.log(e)
    wx.navigateTo({
      url: '/page/usercenter/detail/detail'
    })
    //显示收藏成功
    // wx.showToast({
    //   title: '跳转',
    // });
    
    getApp().globalData.commentTitle = this.data.list[e.currentTarget.dataset.aindex].shows[e.currentTarget.dataset.bindex];
  },




   

});


