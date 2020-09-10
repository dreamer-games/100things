// pages/result/index.js
var appInstance=getApp();
var data_default=require('../data/index.js');
var data_things=data_default.inner;
var list=appInstance.globalData.select_list;
list=Array.from(new Array(55).keys());
var item_account=list.length
var current_height=Math.floor((item_account-1)/4)*190+630;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:current_height,
    width:750,
    height1:current_height,
    width1:750,
    image_url:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    wx.createSelectorQuery()
    .select('#myCanvas')
    .fields({
      node:true,size:true
    })
    .exec(this.init.bind(this))
  },
  init(res){
    
    const canvas=res[0].node;
    const ctx=canvas.getContext('2d');
    const SystemInfo=wx.getSystemInfoSync();
    const rpx=SystemInfo.windowWidth/375;
    var UserInfo=appInstance.globalData.userInfo;
    canvas.width=750*rpx;
    this.setData({
      height:current_height>800?current_height:800,
      width:750
    })
    current_height=current_height>800?current_height:800;
    canvas.height=current_height*rpx;
    ctx.fillStyle='#f6f6f6';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.scale(rpx,rpx)
    ctx.fillStyle='black';
    ctx.textAlign='center';
    ctx.textBaseline='top';
    ctx.font="bold 26px sans-serif";
    ctx.fillText('仑哥',200,208);
    // var url='http://photo.zhuxiaolun.com/100things/1.png';
    var url=appInstance.globalData.userInfo.avatarUrl;
    var img=canvas.createImage();
    img.onload=function(){
      ctx.drawImage(img,140,80,120,120);
    };
    img.src=url;
    ctx.fillStyle='black';
    ctx.textAlign='center';
    ctx.textBaseline='top';
    ctx.font="22px sans-serif";
    ctx.fillText('标记您的100件事',530,210);

    var url='../data/QRCode.jpg';
    var img1=canvas.createImage();
    img1.onload=function(){
      ctx.drawImage(img1,470,80,120,120);
    };
    img1.src=url;

    ctx.fillStyle='black';
    ctx.fillRect(95,264,560,60);
    ctx.fillStyle="white";
    ctx.font="bold 30px sans-serif";
    ctx.textAlign='center'
    ctx.textBaseline='middle'
    ctx.fillText('正在努力的100件事'+item_account+'/100',375,294);
    // list.sort((a,b)=>a-b);

    function onImageLoad(url,cb){
      var img=canvas.createImage();
      img.onload=function(){
        cb(img)
      }
      img.src=url
    }

    var count=0;
    var base_url="http://photo.zhuxiaolun.com/100things/";
    var that=this;
    for (let i=0;i<list.length;i++){
      let index=list[i]
      var url=base_url+(index+1)+'.png';
      onImageLoad(url,function(img){
        var x=i%4;
        var y=Math.floor(i/4);
        ctx.drawImage(img,x*150+95,y*190+370,120,120);
        ctx.fillStyle='black';
        ctx.textAlign='center';
        ctx.font="bold 16px sans-serif";
        var content=data_things[index].name;
        content=content.split('/n');
        for (var j=0;j<content.length;j++){
          ctx.fillText(content[j],x*150+155,y*190+510+20*j);
        }
        if(i==(list.length-1)){
          ctx.fillStyle='skyblue';
          ctx.font="bold 18px sans-serif";
          ctx.fillText('本产品由大梦想家™ bigdreamer.com.cn支持',375,current_height-50)
          ctx.fillText('标记 分享 规划你的人生目标',375,current_height-30)

        }
        count+=1;
        if(count==list.length){
          wx.canvasToTempFilePath({
            x:0,
            y:0,
            width:canvas.width,
            height:canvas.height,
            destWidth:canvas.width,
            destHeight:canvas.height,
            fileType:'jpg',
            canvas: canvas,
            quality: 1,
            success(res){
              // _this.setData({image_url:res.tempFilePath})
              that.setData({image_url:res.tempFilePath});
            },
            fail(res){

            }
          })
        }
    
      })
    }



 
    

  },
  Save_ToAlbum(){
    var that=this;
    wx.getSetting({
      success(res){
        if(!res.authSetting['scope.writePhotosAlbum'])
        {
          
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res){
            
              wx.saveImageToPhotosAlbum({
                filePath: this.data.image_url,
                success(res){
                  wx.showToast({
                    title: '保存成功',
                    icon:'success',
                    duration:2000
                  })
                },
                fail( res){
                }
              })
      
            },
            fail(res){
              wx.showToast({
                title: '请允许保存至相册权限',
                icon:'none',
                duration:2000
              })
              wx.openSetting({
                success: (res) => {},
              })
            }
          })
        }  
        else{
          wx.saveImageToPhotosAlbum({
            filePath: that.data.image_url,
            success(res){
              wx.showToast({
                title: '保存成功',
                icon:'success',
                duration:2000
              })
             
            },
            fail( res){
            }
          })
        
        }
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