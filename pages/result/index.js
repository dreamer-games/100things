var data_default=require('../../data/index.js');
var data_things=data_default.inner;
var appInstance=getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:800,
    width:750,
    image_url:'',
    status:false,
    loading:true,
    percent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var list=appInstance.globalData.select_list;    
    var item_account=list.length;
    var current_height=Math.floor((item_account - 1) / 4) * 190 + 630;
    current_height=current_height > 800 ? current_height : 800;
    this.setData({
      height:current_height
    });
    // const SystemInfo=wx.getSystemInfoSync();
    var UserInfo=appInstance.globalData.userInfo;
    var new_url='https://photo2.bigdreamer.com.cn/100things/cover.png';
    // let rpx=SystemInfo.windowWidth/375;
    var ctx = wx.createCanvasContext('myCanvas',this);
    ctx.fillStyle='#f6f6f6';
    ctx.fillRect(0,0,750,current_height);
    ctx.fillStyle='black';
    ctx.textAlign='center';
    ctx.textBaseline='top';
    ctx.font="normal bold 24px self-serif";
    ctx.setTextAlign('center');
    ctx.setTextBaseline('top')
    ctx.fillText(UserInfo.nickName,200,208);
    ctx.fillStyle='black';
    ctx.fillRect(95,264,560,60);
    ctx.fillStyle="white";
    ctx.font="normal bold 30px self-serif";
    ctx.textAlign='center'
    ctx.textBaseline='middle'
    ctx.fillText('人生最想做的100件事' + item_account + '/100', 375, 294);
    var count=0;
    var url=appInstance.globalData.userInfo.avatarUrl;
    function draw(){
      ctx.draw(true,function(){
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 750,
          height: current_height,
          destWidth: 750,
          destHeight: current_height,
          fileType: 'png',
          canvasId: 'myCanvas',
          quality: 1,
          success(res) {
            that.setData({ image_url: res.tempFilePath, loading: false });
          },
          fail(res){
          },
        },that)
      });
    }
    wx.getImageInfo({
      src: url,
      success(res) {
        ctx.drawImage(res.path, 140, 80, 120, 120);
        count += 1;
        if(count === list.length+2){
           draw();
        }
      }
    });   
    wx.getImageInfo({
      src: new_url,
      success(res) {
        ctx.drawImage(res.path, 470, 80, 120, 120);
        count += 1;
        if(count ===list.length + 2){
          draw();
        }  
      }
    });
    ctx.font="normal 22px self-serif"
    ctx.setFillStyle('black');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('top')
    ctx.fillText('标记您的100件事',530,210);
    
    function onImageLoad(url,cb){
      wx.getImageInfo({
        src: url,
        success(res){
          cb(res.path);
        },
        fail(error){
        }
      })
     }
    
    var base_url="https://photo2.bigdreamer.com.cn/100things/";
  
    for (let i=0;i<list.length;i++){
      let index=list[i]
      var url=base_url+index+'.png';
      onImageLoad(url,function(img){
        var x=i%4;
        var y=Math.floor(i/4);
        ctx.drawImage(img,x*150+95,y*190+370,120,120);
        ctx.fillStyle='black';
        ctx.textAlign='center';
        ctx.font="normal bold 16px self-serif"
        
        var content=data_things[index-1].name;
        for (var j=0;j<content.length;j++){   
          ctx.fillText(content[j],x*150+155,y*190+505+20*j);
        }
       
        if(i==(list.length-1)){
          ctx.fillStyle='skyblue';
          ctx.font="normal bold 18px self-serif"   
          ctx.fillText('本产品由大梦想家™ bigdreamer.com.cn支持',375,current_height-50)
          ctx.fillText('标记 分享 规划你的人生目标',375,current_height-30)

        }
        count+=1;
        that.setData({
          percent:Math.round((count/(list.length+2))*100)
        })
        if(count==list.length+2){
          draw();
        }
      });
    }

   
  


    
  
  },
  Save_ToAlbum() {
    var that=this;
    wx.getSetting({
      success(res){
        
        if(!res.authSetting['scope.writePhotosAlbum']&&that.data.status)
        {
          wx.openSetting({
            success: (res) => {},
            complete:(res)=>{} 
          })
           
          // wx.showToast({
          //   title: '请打开设置允许保存至相册权限',
          //   icon:'none',
          //   duration:2000
          // })
   
        
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
          wx.showToast({
            title: '请打开设置允许保存至相册权限',
            icon:'none',
            duration:2000
          })
          that.setData({
            status:true
          })
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