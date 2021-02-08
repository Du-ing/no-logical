App({
  globalData: {
    avatarUrl:"",
    username:"",
    uid:'',
    sex:'',
    tlelnth:10,
  },
  onLaunch: function () {
    // let user=[];
    // let that=this
    // wx.login({
    //   success: res => {
    //     // console.log(res.code); // 先login得到code
    //     if (res.code) {
    //       // 将url中的appid和secret换成自己的  （可以在开发平台查看）
    //       var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx173095cd37bec6c9&secret=d03c75579efd795d9c5b7ce4930d1329&js_code='+ res.code +'&grant_type=authorization_code';
    //       wx.request({
    //         url: url,
    //         method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
    //         success: function (res) {
    //           // res.data.openid 即为所求openid
    //           that.globalData.uid=res.data.openid
    //           // console.log(that.globalData.uid)
    //           wx.getSetting({
    //             success: res => {
    //               if (res.authSetting['scope.userInfo']) {
    //                 wx.getUserInfo({
    //                   success: res => {
    //                     that.globalData.avatarUrl=res.userInfo.avatarUrl,
    //                     that.globalData.username=res.userInfo.nickName,
    //                     that.globalData.sex=res.userInfo.gender
    //                   user.push({uid:that.globalData.uid,avatarUrl:that.globalData.avatarUrl,
    //                   nickname:that.globalData.username,sex:that.globalData.sex})
    //                   // console.log(user)
    //                   // console.log(user[0])
    //                   wx.setStorage({
    //                    data: user[0],
    //                    key: 'user',
    //                   })
    //                   }
    //                 })
    //               }
    //             }
    //           })
    //         }
    //       });
    //     } 
    //     else{
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
   
  }
})