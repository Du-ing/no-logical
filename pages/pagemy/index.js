//index.js
//获取应用实例
const app = getApp()
const myid = app.globalData.uid;
Page({
  data:{
    focu:0,
    fans:0,
    mark:0,
    id:'',
    mes:0,
    sex:"",
    nickname:"",
    avatarUrl:"",
    userid:"",
    iflogin:true,
    uid:"",
    bu1:"bu",
    bu2:"",
    bu3:"",
    bu4:'',
    city:"",
    job:"",
    ifauth:true,
    condition1:true,
     condition2:false,
     condition3:false,
     condition4:false,
    video:[1,2,3,4,1,1,1,1,1],
    video2:[1,2,3,4,5,1,1,1,1],
    tasklist:[],
    mytasklist:[],
    headimg:'',
    
  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
},
  bt1:function(){
    this.setData({
      bu1:"bu",
      bu2:"",
      bu3:"",
      bu4:"",
      condition1:true,
     condition2:false,
     condition3:false,
     condition4:false,
    })
  },
  
  onLoad: function() {
    this.requdata();
    this.setData({headimg:app.globalData.avatarUrl})
    wx.getStorage({
      key:'user',
      success:function(res){
        console.log(res.data)
      }
    })


    },
    onPullDownRefresh: function () {
      this.requdata()
    },
  changeData:function(){
    this.onShow();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
    onShow: function () {
      let focu;
      let fans;
      let mark;
      let id;
      let that=this

      wx.getStorage({
        key: 'job',
      success:function(res){
      that.setData({
        job:res.data
        });
      }
      })
      wx.getStorage({
        key: 'city',
      success:function(res){
      that.setData({
        city:res.data
        });
      }
      })
      wx.getStorage({
        key: 'user',
      success:function(res){
      that.setData({
        userid:res.data.uid,
        avatarUrl:res.data.avatarUrl,
        nickname:res.data.nickname,
        sex:res.data.sex,
        });
      // console.log(res)
      wx.request({//get请求
        url: 'https://duing.site/user/getUser?userid='+that.data.userid, //服务器网址
        method:"GET",
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          focu=res.data.focus,
          fans=res.data.fans,
          mark=res.data.integral,
          id=res.data.userid,
          // console.log(res.data.avatarUrl)
          // message=res.data.message,
          that.setData({
            fans:fans,
            focu:focu,
            mark:mark,
            id:id,
          })
          if(that.data.iflogin==true){
            wx.getStorage({
              key: 'iflogin',
              success:function(res){
              that.setData({
                iflogin:res.data
                });
                }
              })
          }
          wx.setNavigationBarTitle({
            title: that.data.nickname,
          })
        },
        fail:function(err){
          console.log(err);
        },
      })
      }
      })

  

    },
  login:function(){
    wx.navigateTo({
      url: '/pages/pagemy/login/adddetail',
    })
    wx.setStorage({
      data:false,
      key: 'iflogin',
      success: function(res){
      }
        })
  },
  addlabel:function(){
  wx.navigateTo({
    url: '/pages/pagemy/login/adddetail',
  })
  },
  bt2:function(){
    this.setData({
     bu1:"",
     bu2:"bu",
     bu3:"",
     bu4:"",
     condition2:true,
     condition1:false,
     condition3:false,
     condition4:false
    })
  },
  bt3:function(){
    console.log('myid:',myid)
    this.setData({
     bu1:"",
     bu2:"",
     bu3:"bu",
     bu4:"",
     condition3:true,
     condition2:false,
     condition1:false,
     condition4:false
    })
  },
  bt4:function(){
    this.setData({
     bu1:"",
     bu4:"bu",
     bu3:"",
     bu2:"",
     condition4:true,
     condition3:false,
     condition2:false,
     condition1:false
    })
  },
  bindfocus: function(){
   wx.navigateTo({
      url: '/pages/pagemy/focus/focus',
    })
  },
  bindfans: function(){
    wx.navigateTo({
      url: '/pages/pagemy/focus/fans',
    })
  },
  bindmark:function(){
    wx.navigateTo({
      url: '/pages/pagemy/honormark/honormark',
    })
  },
  bindmess:function(){
    wx.navigateTo({
      url: '/pages/pagemy/message/message',
    })
  },
  bindsev:function(){
    wx.navigateTo({
      url: '/pages/pagemy/service/service',
    })
  },
  bindtask:function(event){
    var Id=event.currentTarget.dataset.helpid
    wx.navigateTo({
      url: "./task/task?id= " + Id
    })
  },
  bindtask2:function(event){
    var Id=event.currentTarget.dataset.helpid
    wx.navigateTo({
      url: "./mytask/mytask?id= " + Id
    })
  },
  adddetial:function(e){
    wx.getStorage({
      key: 'city',
      success: function(res) {
        wx.navigateTo({
          url: '/pages/report/index1',
        })
      },
      fail:function(err){
        wx.showToast({
          title: '请先进行注册',
          icon:"loading",
        })
      },
    })

  },
  adddetial1:function(e){
    wx.getStorage({
      key: 'city',
      success: function(res) {
        wx.navigateTo({
          url: '/pages/askhelp/help',
        })
      },
      fail:function(err){
        wx.showToast({
          title: '请先进行注册',
          icon:"loading",
        })
      },
    })
  },
  requdata:function(){  
    // 请求数据
    let that = this;
    wx.request({//get请求
      url: 'https://duing.site/task/getUserTasks?userid='+app.globalData.uid, ////服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
        var i=0
        var tasklist=[]
        for(i=0;i<res.data.length;i++){
          var tes=String(res.data[i].helpid)
          var res1=res.data[i]
          console.log('1111',res1)
          var fi=wx.getStorageSync(tes)
          tasklist.push({
            reward:res1.reward,
            site:res1.site,
            headimg:res1.headimg,
          helpid:res1.helpid,
           endtime:res1.endtime,
          title:res1.title,
           userid:res1.userid,
           status:res1.status,
           username:res1.username,
           fi:fi,
         })
          /*wx.getStorageSync({ 
            key: tes, 
            success: function(res) 
            {
              console.log('123',res1) ,///}, 
         /// })
          tasklist.push({
           reward:res1.reward,
           site:res1.site,
           headimg:res1.headimg,
         helpid:res1.helpid,
          endtime:res1.endtime,
         title:res1.title,
          userid:res1.userid,
          status:res1.status,
          username:res1.username,
          fi:res.data,
        })
         } })
         */that.setData({
          tasklist:tasklist
        })}
       /* that.setData({
          tasklist:res.data
        })*/

        console.log('任务三',that.data.tasklist)
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })
    /*wx.request({//get请求
      url: 'https://duing.site/help/getUserHelps?userid='+app.globalData.uid, ////服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
       
        that.setData({
          mytasklist:res.data
        })
        console.log('任务三',that.data.tasklist)
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })*/
    }
})
