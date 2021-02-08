// pages/pagemy/adddetail.js
Page({
  data: {
  city:"",
  avatarUrl:'',
  uid:'',
  nickname:'',
  sex:'',
  city:'',
  job:'',
  fans:0,
  focu:0,
  intergal:0,
  },
  formSubmit: function (e) {  //表单提交绑定事件
    var city=e.detail.value.city
    var job=e.detail.value.job
    let that=this
    let username=that.data.nickname
    let avatarUrl=that.data.avatarUrl
    let sex=that.data.sex
    let userid=that.data.uid
    console.log(userid)
    console.log(city)
    if(city!='' && job!=''){
    wx.request({//post请求
      url: 'https://duing.site/user/registerUser',
      method:"POST",
      header: {
          'content-type': 'application/json' // 默认值
      },
      data: {
        userid:userid,
        headimg:avatarUrl,
        username:username,
        gender:sex,
        address:city,
        job:job,
        fans:0,
        focus:0,
        integral:0,
      },
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          title: '注册成功',
          icon:'success'        })
        wx.setStorage({
          data: city,
          key: 'city',
          success: function(res){
          }
        })
        wx.setStorage({
          data: job,
          key: 'job',
          success: function(res){
            wx.reLaunch({
              url: '/pages/index/index',
            })
            }
        })
      },
      fail:function(err){
        console.log(err);
      }
    })
  }
  else{
    wx.showToast({
      title: '请完整填写信息！',
      icon:'loading',
    })
  }

   
        

    
    // if (e.detail.value.username.length == 0 || e.detail.value.password.length == 0) {
    //   wx.showToast({
    //     title: '用户名或密码不得为空!',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)

    // }  else {
    //   wx.request({  //后台交互
    //     url: 'http://localhost/xxxx/zzzz/user_login',
    //     //指向方法, 本地用http:\\...   线上必须是https:\\...
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },   //标明格式, 必不可少
    //     method: "POST",   //传递数据类型
    //     data: { login_info: e.detail.value.username, password: e.detail.value.password },   //传输数据
    //     success: function (res) {   //返回信息,类似于ajax-json交互
    //       if (res.data.status == 1) {
    //         wx.showToast({
    //           title: 'success',
    //           icon: 'success',
    //           duration: 1500
    //         }),
    //           getApp().globalData.userInfo = res.data.username;
    //           //将信息存储到app.js的全局变量里,方便以后调用,
    //           wx.navigateTo({
    //           url: '../reg/reg'
    //           })   //跳转下一页面
    //       } else {
    //         wx.showToast({
    //           title:'failed',
    //           icon: 'success',
    //           duration: 1000
    //         })
    //       }
    //     }
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'user',
    success:function(res){
      that.setData({
      avatarUrl:res.data.avatarUrl,
      nickname:res.data.nickname,
      uid:res.data.uid,
      sex:res.data.sex,
      })
      // console.log(that.data.avatarUrl)
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