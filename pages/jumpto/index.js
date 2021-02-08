// pages/jumpto/index.js
Page({
 
    data: {
      avatarUrl:'',
      nickname:'',
      commentList: [{
        username: '冷不过人心',
        ComID: '1',
        ComTime: '2019-1-1  20:00',
        ComContent: '评论评论评论',
      }, {
        username: '冷不过人心',
        ComID: '1',
        ComTime: '2019-1-1  20:00',
        ComContent: '评论评论评论',
      }, {
        username: '冷不过人心',
        ComID: '1',
        ComTime: '2019-1-1  20:00',
        ComContent: '评论评论评论',
      }, {
        username: '冷不过人心',
        ComID: '1',
        ComTime: '2019-1-1  20:00',
        ComContent: '评论评论评论',
      }, ],
      ball_height: 2,
      //播放按钮
      display_play: 'none',
      //点击评论隐藏图标
      display_pl: 'block',
      count: 1,
      index_num: 1,
      play: 'none',
      inputValue: '',
      index: 1,
      vid: 0,
      pagey: '',
      vsrc: ['/images/vio.qlv'],
      src: '',
      showimg:[]
   
    },
    /// 单击、双击
    multipleTap: function(e) {
      var that = this
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      that.lastTapTime = currentTime
      if (currentTime - lastTapTime < 300) {
        // 双击触发
        // console.log("double tap")
        clearTimeout(that.lastTapTimeoutFunc);
        // console.log(this.data)
        var that = this;
        // 提交点赞
        var vid = this.data.vid;
        if (this.data.count == '1') {
          that.setData({
            fav: -1,
            not_zan: true,
            count: 2
          })
        } else if (this.data.count == '2') {
          that.setData({
            not_zan: true,
            count: 1
          })
        }
      } else {
        //单击触发
        that.lastTapTimeoutFunc = setTimeout(function() {
          // console.log(that.data)
          // console.log(that.data.index_num)
          that.setData({
            index_num: that.data.index_num + 1
          });
          if (that.data.index_num % 2 == 1) {
            // console.log('播放')
            that.videoContext.play()
            that.setData({
              display_play: 'none'
            })
          } else {
            // console.log('暂停')
            that.videoContext.pause()
            that.setData({
              display_play: 'block'
            })
          }
        }, 300);
      }
   
    },
    onReady: function(res) {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    // 点击图片的点赞事件  这里使用的是同步的方式
    toCollect: function(e) {
      // console.log(e)
      var that = this;
   
      // 提交点赞
      var vid = e.currentTarget.dataset.vid;
      if (this.data.count == 1) {
        that.setData({
          fav: -1,
          not_zan: true,
          count: 2
        })
      } else {
        that.setData({
          fav: 0,
          not_zan: false,
          count: 1
        })
      }
    },
   
    bindPlay: function() {
      this.videoContext.play()
    },
   
    touchstart: function(res) {
      this.setData({
        pagey: res.changedTouches[0].pageY
      })
    },
    touchend: function(res) {
      if (res.changedTouches[0].pageY - this.data.pagey > 100) {
   
        var isZero = this.data.vid == 0
        var id = this.data.vid == 0 ? 0 : this.data.vid - 1
        if (isZero) {
          wx.showToast({
            title: '已是第一个！',
          })
        } else {
          this.setData({
            vid: id,
            index: 1
   
          })
          var that = this
          setTimeout(function() {
            that.bindPlay()
          }, 500)
        }
      } else if (this.data.pagey - res.changedTouches[0].pageY > 100) {
        var islast = this.data.vid == this.data.vsrc.length - 1
        var lid = this.data.vid == this.data.vsrc.length - 1 ? this.data.vsrc.length - 1 : this.data.vid + 1
        if (islast) {
          wx.showToast({
            title: '已是最后一个！',
          })
        } else {
          this.setData({
            vid: lid,
            index: 1
          })
        }
        var that = this
        setTimeout(function() {
          that.bindPlay()
        }, 500)
      }
    },
    bindInputBlur: function(e) {
      this.inputValue = e.detail.value
    },
    bindSendDanmu: function() {
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: getRandomColor()
      })
    },
    // 播放
    bindPlay: function() {
      this.videoContext.play()
      // console.log(11)
    },
    // 暂停播放
    bindPause: function() {
      this.videoContext.pause()
      display_play: 'block'
    },
    //播放结束
    bindend: function() {
      var a = this.data.index
      var a_dow = a + 1
      // console.log(a + 1);
      this.setData({
        index: a_dow,
        vid: this.data.scrollTop_list[parseInt(a_dow)].vid,
        display_play: 'none',
        video: [],
      })
      // 获取视频
      this.tab_video()
      // 获取评论列表
      this.getcomment()
    },
    videoErrorCallback: function(e) {
      // console.log('视频错误信息:')
      // console.log(e.detail.errMsg)
   
    },
   
    //评论
    showModal: function() {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true,
        heighTrue: false,
        video_heighe: 45,
        ball_height: 1,
        display_pl: 'none'
      })
      setTimeout(function() {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    //隐藏对话框
    hideModal: function() {
      // 隐藏遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function() {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false,
          heighTrue: true,
          video_heighe: 100,
          ball_height: 2,
          display_pl: 'block'
        })
      }.bind(this), 200)
    },
  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var index = options.index
    // console.log(index)
    wx.request({
      　　url: 'https://duing.site/home', //服务器地址
      header: {
        　　'content-type': 'application/json'
        　　},
        method: 'GET',
        data: {
          　　},
      　　success: function (res) {
      // 　　console.log(res.data)
      var i=0
      var images=[]
      for(i=0;i<res.data.length;i++){
        images[i]=res.data[i].image
      }
      that.setData({
        showimg:images[index]
      })

      　　}
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
    var that=this
    wx.getStorage({
      key: 'user',
    success:function(res){
    that.setData({
      avatarUrl:res.data.avatarUrl,
      nickname:res.data.nickname,
      })
    }
  })

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

  }
})
//'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" binderror="videoErrorCallback', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181220/0104_1.mp4', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181123/27.mp4', 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" ,binderror="videoErrorCallback', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181220/0104_1.mp4','http://v2018.zhuoxuncn.com/zhuoxunvideo/20181123/27.mp4', 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" binderror="videoErrorCallback', 'http://v2018.zhuoxuncn.com/zhuoxunvideo/20181220/0104_1.mp4', 
/*.comment_border {
  position: absolute;
  height: 330px;
  top: 45%;
  right: 5px;
  text-align: center;
}*/