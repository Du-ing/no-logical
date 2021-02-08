var needsData = require('../data/need-datas')
const {needList}=require('../data/need-datas')
var app = getApp();
var status = true;
Page({
 data: {
  status:status,
  needData:[],
  aneedData:[],
  img:[],
 },
 onLoad: function (option) {
  var that=this
  wx.getStorage({
    key:'user',
    success:function(res){
      // console.log('shuju',res.data)
      that.setData({
        myid:res.data.uid
    })
  }})
  // console.log('myid:',that.data.myid)
  //   wx.getStorage({
  //     key: 'need_List',
  //   success:function(res){
  //   that.setData({
  //     needList:res.data,
  //     preList:needList
  //     });
  //     console.log(needList)
  //   }
  //   })

  var needId = option.id;
  this.data.currentNeedId = needId;
  // console.log(this.data.currentNeedId)
  var needData = needList[needId];
  //this.setData({
  //  needData: needData
  // })
  var that=this;
  wx.request({//get请求
    url: 'https://duing.site/helpHome', //服务器网址
    method:"GET",
    header: {
        'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      let list=res.data
      // console.log('ssm',list)
      // message=res.data.message,
      that.setData({
        needData:list,
        
      })
      that.data.needData.forEach(item => {
        if (that.data.currentNeedId == item.helpid) {
          that.setData({
            aneedData: item,
            helpid:item.helpid
          })
          // console.log(that.data.aneedData)
        }
      })
      // console.log(that.data.needData)
    },
    fail:function(err){
      // console.log(err);
    },
  })
  wx.request({//get请求
    url: 'https://duing.site/help/getHelpImgs?helpid='+that.data.currentNeedId, //服务器网址
    method:"GET",
    header: {
        'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      let list=res.data
      that.setData({
        img:list
      })

    },
    fail:function(err){
      // console.log(err);
    },
  })
  
  
},
preview(event) {
  // console.log(event.currentTarget.dataset.src)
  let currentUrl = event.currentTarget.dataset.src
  wx.previewImage({
    current: currentUrl, // 当前显示图片的http链接
    urls: this.data.img // 需要预览的图片http链接列表
  })
},
swithtotask: function(event) {
  var tes=String(this.data.aneedData.helpid)
  console.log('tes',tes)
  wx.setStorage({
    data:0,
    key:tes,
    success: function(res){
      console.log(res)
    }
      })
  this.submit(); 
  // console.log("触发了点击事件，弹出toast")
  　　　//setData方法可以建立新的data属性，从而起到跟视图实时同步的效果


},
toastHide:function(event){
  // console.log("触发bindchange，隐藏toast")
  status =true
  this.setData({status:status})
},
submit:function(){
  // 数据上传服务端
  let that = this;
  wx.request({
    url: 'https://duing.site/task/addTask',
    method: 'POST',
    data:{
      helpid:that.data.currentNeedId,
      userid:app.globalData.uid,///'oVmIt5xNGnJCRg-Bd3hVKsHgzNco',
     
      status:3,
      topicid:null,
    },
    success(res){
       console.log('请求成功',res)
      // console.log(res);
      that.setData({status:false})　
  
    }
  })},



})