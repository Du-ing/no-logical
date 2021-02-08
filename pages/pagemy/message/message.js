// pages/mess/m.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  meslist:[{
    name:"徐凤年",
    mess:"谢谢合作",
    time:"10-29 9:30"
  },
  {
    name:"徐霄",
    mess:"发生什么事了",
    time:"10-29 9:30"
  },
  {
    name:"王安石",
    mess:"任务完成了吗",
    time:"10-29 9:30"
  },
]
  },
  chat:function(){
    wx.navigateTo({
      url: '/pages/pagemy/chat/chat',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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