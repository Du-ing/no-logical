var need_List=require('../data/need-datas.js');
var app=getApp()
Page({
  data: {
    latitude:0,//位置纬度
    longitude:0,//位置经度
    imgs:[],//图片路径
    imgNum:0,//图片数量
    helpTypes:["类型1","类型2","类型3"],//求助类型选择
    moneyList:[1,3,5,10,20,50,100],//打赏
    place:null,//求助位置
    type:null,//求助类型
    date:null,//时间限制
    money:null,
    detail:"",//详细描述
    username:'',
    avatarUrl:'',
    uid:'',
    user:'',
    id:5,
    addlist:need_List.needList,
  },
  onLoad:  function (){    
    var that=this;
    wx.getStorage({
      key: 'user',
    success:function(res){
      that.setData({
      uid:res.data.uid
      })
      // console.log(that.data.uid)
    }
  })
},

  chooseImg:function(){
    let addImgs = this.data.imgs;
    let num = addImgs.length;
    let that = this;
    wx.chooseImage({
      count: 9 - num,
      sizeType:['original','compressed'],
      success:function(res){
        addImgs = addImgs.concat(res.tempFilePaths);
        num = addImgs.length;
        that.setData({
          imgs: addImgs,
          imgNum: num
        });
      }
    });

  },
  choosePlace:function(){
    let that = this;
    wx.getLocation({
      success:function(res){
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
        });
      }
    })
    wx.chooseLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      success:function(res){
        //console.log(res); 
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude,
          place:res.address
        });
      }
    });
  },
  chooseType:function(e){
    let types = this.data.helpTypes;
    //console.log(e);
    let index = e.detail.value;
    this.setData({
      type: types[index]
    });
  },
  chooseDate:function(e){
    //console.log(e);
    this.setData({
      date: e.detail.value
    });
  },
  chooseMoney:function(e){
    let moneys = this.data.moneyList;
    //console.log(e);
    let index = e.detail.value;
    this.setData({
      money: moneys[index]
    });
  },
  inputDetail:function(e){
    //console.log(e);
    this.setData({
      detail: e.detail.value
    });
  },
  submitdata:function(e){
  //   //数据上传服务端
  //   var that=this;
  //   var title=e.detail.value.title;
  //   var type=that.data.helpTypes[Number(e.detail.value.type)];
  //   var time=e.detail.value.time;
  //   var reward=that.data.moneyList[Number(e.detail.value.reward)];
  //   var main=e.detail.value.main;
  //   var photo=that.data.imgs
  //   console.log(photo)
  //   var place=that.data.place;
  //   need_List.needList.push({needId:app.globalData.messageid,oneName:main,peopic:'/images/touxiang .png', name:"徐德贵",dats:time,forwanner:title,pic:photo[0],honrnum:reward,location:place,detail:main})
  //   var iden=app.globalData.messageid+1
  //  app.globalData.messageid=iden
  //   wx.setStorage({
  //     data: need_List,
  //     key: 'need_List',
  //     success: function(res){
  //       wx.switchTab({
  //         url:"../help/index?need_List="+need_List,
  //       })
  //     }
  //   })
  // 数据上传服务端
  let that = this;
  let helpid = '';
  let title=e.detail.value.title;
  let uid=that.data.uid
  wx.request({
    url: 'https://duing.site/help/addHelp',
    method: 'POST',
    data:{
      helpid:10000,
      userid:uid,
      title:title,
      site:that.data.place,
      type:that.data.type,
      startime:new Date().getTime(),
      endtime:that.data.date,
      reward:that.data.money,
      content:that.data.detail,
      status:0,
    },
    success(res){
      console.log(res);
      helpid = res.data.helpid;
      for(let i = 0; i < that.data.imgs.length; i++){
        wx.uploadFile({
          url: 'https://duing.site:/help/uploadFile',
          filePath: that.data.imgs[i],
          name: 'uploadfile',
          formData:{
            helpid:helpid,
            index:i + 1,
          },
          success(res){
            console.log(res);
            wx.showToast({
              title: '发表成功！',
            })
            wx.switchTab({
              url:"/pages/help/index"
            })
          },
          fail(res){
            wx.showToast({
              title: '请添加图片素材！',
            })
          }
        })
      }

},

})

    //要延时执行的代码
     
  },
  
})
