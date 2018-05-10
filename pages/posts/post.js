var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: 'Nov 18 2016',
    title: '正是虾肥蟹壮时'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.postList = postsData.postList

    this.setData({
      posts_key: postsData.postList
    })
  },

  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  // onSwiperItemTap: function (event) {
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId
  //   })
  // },

  onSwiperTap: function (event){
    // target和currentTarget
    // target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
    // target这里指的是image, 而currentTarget指的是swiper组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})