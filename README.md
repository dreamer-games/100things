##人生必做的100件小事 小程序版 100things miniprogramme



scan wechat QR code

<img src="/Users/lun/WeChatProjects/miniprogram-4/pages/data/QRCode.jpg" alt="QRCode" style="zoom:67%;text-align:left;" />



欢迎学习参考



遇到的问题

canvas drawimage 遇到bug
示例代码:
wx.getImageInfo({
      src: url,
      success:function(res){
        console.log(res.path)
        ctx.drawImage(res.path,0,0,50,50);
      }})
问题:
Failed to execute 'drawImage' on 'CanvasRenderingContext2D'
微信小程序官方文档没有写清楚
在canvas type='2d'下 应该使用Canvas.createImage()方法
但是在官方文档里只有如下内容 网上所有资料都是旧的:
Image Canvas.createImage()

创建一个图片对象。 支持在 2D Canvas 和 WebGL Canvas 下使用, 但不支持混用 2D 和 WebGL 的方法。

返回值
Image

修改后:
var url=appInstance.globalData.userInfo.avatarUrl;
var img=canvas.createImage();
img.onload=function(){
  ctx.drawImage(img,80,80,120,120);
};
img.src=url;

问题解决！