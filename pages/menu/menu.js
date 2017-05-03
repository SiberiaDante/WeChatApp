// pages/menu/menu.js
var app=getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showLoading()
       this.loadData();
  },
  onReady:function(){
    // 页面渲染完成
 
  },
  onShow:function(){
    // 页面显示
    wx.hideLoading()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadData:function(){
    const mthis=this;
    wx.request({
      url: 'https://apicloud.mob.com/v1/cook/category/query',
      data: {key:'1cee55d0111f8'},
      // data:{},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var open='false' ,list=mthis.data.childs
        console.log(res.data.result.childs)
        mthis.setData({
          data:res.data.result.childs
        })
        for(var i=0,len=mthis.data.length;i<len;++i){
            list[i].categoryinfo.open=false;
        }
        console.log(mthis.data)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})