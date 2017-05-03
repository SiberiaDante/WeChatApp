// pages/menulist/menulist.js
Page({
  data: {
    id: '',
    name: '',
    pageNum: 1,
    menulist: []
  },
  onLoad: function (options) {
    console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    const mthis = this
    mthis.setData({
      id: options.menu_id,
      name: options.menu_name
    })
    wx.setNavigationBarTitle({
      title: '${this.data.name}',
      success: function (res) {
        // success
        console.log(res)
        console.log(this.name)
      }
    })
    this.loadData()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  loadData: function () {
    var mthis = this
    wx.request({
      url: 'http://apicloud.mob.com/v1/cook/menu/search',
      data: { key: '1cee55d0111f8', cid: mthis.data.id, page: mthis.data.pageNum, size: '20' },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // success
        console.log(res)
        mthis.setData({
          menulist: res.data.result.list
        })
        wx.stopPullDownRefresh()
      },
      fail: function (res) {
        // fail
        console.log(res)
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onPullDownRefresh:function(){
    var mthis=this
    wx.showToast({
      title:'刷新成功',
      icon:'success',
      duration:1000
    })
    mthis.setData({
      pageNum:1
    })
    mthis.loadData()
  },
  onReachBottom: function () {
    wx.showToast({
      title:'加载中...',
      icon:'loading',
      duration:1000
    })
    var mthis = this
    mthis.setData({
      pageNum: ++mthis.data.pageNum
    })
    wx.request({
      url: 'http://apicloud.mob.com/v1/cook/menu/search',
      data: { key: '1cee55d0111f8', cid: mthis.data.id, page: mthis.data.pageNum, size: '20' },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // success
         mthis.setData({
          menulist: mthis.data.menulist.concat(res.data.result.list)
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})