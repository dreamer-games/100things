//index.js
//获取应用实例
const data_default = require('../../data/index.js');
const appInstance = getApp();
const data_things = data_default.inner
const BASE_URL = "http://photo.zhuxiaolun.com/100things/";

function get_url(val){
  return BASE_URL + val + '.png'
}

for (var item in data_things) {
  var item = data_things[item];
  item['url'] = get_url(item['index']);
  item['status'] = false;
  item['name'] = item['name'].split('/n')
}

Page({
  data: {
    data_arr:data_things,
    select_list:[],
    total:0
  },

  item_click: function(event){
    var item_id = event.currentTarget.dataset.item;
    var select_list = this.data.select_list;
    var data_arr = this.data.data_arr;
    var total = this.data.total;
    var index = select_list.indexOf(item_id);
    data_arr[item_id - 1]['status'] =! data_arr[item_id - 1]['status'];
    
    if(index != -1) {
      select_list.splice(index, 1);

      this.setData({
        data_arr: data_arr,
        select_list: select_list,
        total: total-1,
      })} else {
      select_list.push(item_id);
      
      this.setData({
        data_arr: data_arr,
        select_list: select_list,
        total:total + 1
      })
    }
  },

  userInfoHandler: function(e) {
    if(this.data.total === 0) {
      wx.showToast({
        title: '请至少勾选一件事',
        icon:'none',
        duration:2000
      })
    } else {
      if(e.detail.userInfo) {
        appInstance.globalData.select_list = this.data.select_list;
        appInstance.globalData.userInfo = e.detail.userInfo;
        wx.navigateTo({
          url: '/pages/result/index',
        })
      } else {
          wx.showToast(
            {
              title: '请打开允许访问头像权限',
              icon:'none',
              duration:2000
            })
      }
    }
  },
});