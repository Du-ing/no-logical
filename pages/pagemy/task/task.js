// pages/task/t.js
var status = true;
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tid:'',
    hey:1 ,
    tasklist1:[],
    taskinner:[],
    tasklist2:[],
    tasklist:[],
    see:true,
    status:status,
  /*taskinner:[{
  name:"胡乱起的名字",
  id:"856942333",
  place:"四川甘孜",
  mark:30,
  time:"2021-4-8",
  title:"标题标题标题标题标题标题标题标题标题",
  kind:"乡村美食",
  pho:[1,2,3],
  timeres:"2021-12-5日前完成",
  main:"长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容长内容",
  fi:false,
  see:true
  },
]*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindbox3:function(){
  this.setData({
  see:false,
  })
  },
  c:function(){
    this.setData({
      see:true,

   })
  },
  m:function(){
    this.setData({
      see:true
   })
  },
  modal: function (e) {
    var self = this;
    this.setData({ modal: (e && e.currentTarget.dataset.modal) || "", input: self.data.user });
    // 这里对modal的赋值是关键
},
onLoad: function (option) {
 
  var Id = option.id;
  this.setData({helpid:Number(Id)})
  this.requdata();
  console.log('helpid:',this.data.helpid) ;
  console.log('taksiner:',this.data.taskinner)
  var tes=String(this.data.helpid)
  var that=this
  wx.getStorage({ 
    key: tes, 
    success: function(res) 
    { 
      that.setData({
      fi:res.data
    }),
      console.log('123',res.data) }, 
  })

  /*var tasklist2 =JSON.parse(option.tasklist);
  this.setData({tasklist1:tasklist2}) 
  console.log(this.data.tasklist1)
  this.data.currentId = Id;
  console.log('id是:',Number(Id))
  this.setData({
    tid:Id
  })
  console.log(this.data.tid)
  var _this=this;
    const db=wx.cloud.database()
   //// if(!this.jsData.isLoading){
     //// this.jsData.isLoading=true
    db.collection('task').where({
        _openid: 'odrb45R-e_9AshxPod-p7KpgIFoQ'
      })
      .get({
        success:function(res){
          console.log(res.data)
          var i=0
          var pics=[]
          for(i=0;i<res.data.length;i++){
            pics.push({
              id:res.data[i]._id,
              name:res.data[i].peoname,
              date:res.data[i].time,
              detail:res.data[i].content,
              title:res.data[i].title,
              place:res.data[i].place,
              emark:res.data[i].emark,
              oneName:res.data[i].oneName,
              peopic:res.data[i].peopic,
              pic:res.data[i].pic,
              timblk:res.data[i].timblk,
              forId:i,
              fi:res.data[i].fi,
            })
            console.log('先')
           _this.setData({
              tasklist2 : pics[Number(Id)],
            })
          }
        }
      })

      console.log(_this.data.tasklist2)
      /////
///
////
///下面是同步方法
  /*let logs = wx.getStorageSync('misstion_logs') || []

 ////var tasklist1 = logs[Id];
  this.setData({
    tasklist:  logs[Number(Id)]

  })
*/
},
requdata:function(){  
    // 请求数据
    let that = this;
    wx.request({//get请求
      url: 'https://duing.site/task/getTaskDetail?helpid='+that.data.helpid, //服务器网址
      method:"GET",
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('获得的数据是：',res.data)
       
        that.setData({
          taskinner:res.data
        })
       // wx.setNavigationBarTitle({
         // title: that.data.nickname,
        //})
      },
      fail:function(err){
        console.log(err);
      },
    })
    }
  
,
swithtoback: function(event) {
  console.log("触发了点击事件，弹出toast")
  status = false
  this.setData({status:status})　　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果
},
toastHide:function(event){
    console.log("触发bindchange，隐藏toast")
    status =true
    this.setData({status:status})
},
swithtopush: function(e) {
  var tes=String(this.data.helpid)
  
  wx.getStorage({ 
    key: tes, 
    success: function(res) 
    { console.log('123',res.data) }, 
  })
  this.submit();
 /* var id =this.data.tasklist1.id
  var dat = this.data.tasklist;
  var fi = e.target.dataset.fi;
  const db=wx.cloud.database().collection("task")
  db.doc(id).update({
    data:{
      
      fi: fi
    },
    success(res){
      console.log("修改成功", res)
    },
    fail(res){
      console.log("修改失败", res)
    }
  })
  let logs = wx.getStorageSync('misstion_logs') || []
  dat.fi = e.target.dataset.fi
  var n=logs.length-this.data.tasklist.forId
  console.log(logs.length)
  console.log(this.data.tasklist.forId)
  this.setData({
    // 把新的data数组赋值给arrays
    tasklist: dat,
  
    
  })
  logs[n]=this.data.tasklist,
  wx.setStorageSync('misstion_logs', logs)
 /// this.setData({fi:1})
  console.log(n)
  console.log(logs)
  
 */
var Id=this.data.helpid
 wx.navigateTo({
   
    url:  '/pages/askhelp/help?id= ' + Id
 })
},
submit:function(){
  // 数据上传服务端
  let that = this;
  wx.request({
    url: 'https://duing.site/task/submitWork',
    method: 'POST',
    data:{
      helpid:that.data.helpid,
      userid:app.globalData.uid,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
     
      status:5,
      topicid:null,
    },
    success(res){
      console.log('请求成功',res)
      // console.log(res);
      that.setData({
       ////helpid:res.data.helpid
      })
    }
  })},
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
  onPullDownRefresh: function (option) {
    this.requdata();
   /*var Id=this.data.tid
  console.log('id是:',Number(Id))
  var _this=this;
    const db=wx.cloud.database()
   //// if(!this.jsData.isLoading){
     //// this.jsData.isLoading=true
    db.collection('task').where({
        _openid: 'odrb45R-e_9AshxPod-p7KpgIFoQ'
      })
      .get({
        success:function(res){
          console.log(res.data)
          var i=0
          var pics=[]
          for(i=0;i<res.data.length;i++){
            pics.push({
              id:res.data[i]._id,
              name:res.data[i].peoname,
              date:res.data[i].time,
              detail:res.data[i].content,
              title:res.data[i].title,
              place:res.data[i].place,
              emark:res.data[i].emark,
              oneName:res.data[i].oneName,
              peopic:res.data[i].peopic,
              pic:res.data[i].pic,
              timblk:res.data[i].timblk,
              forId:i,
              fi:res.data[i].fi,
            })
            console.log('先')
           _this.setData({
              tasklist2 : pics[Number(Id)],
            })
          }
        }
      })

      console.log(_this.data.tasklist1)
*/
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