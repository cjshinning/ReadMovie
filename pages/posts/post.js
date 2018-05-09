var postData = require('../../data/posts-data.js')

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
    // this.data.postList = postData.postList

    this.setData({
      posts_key: postData.postList
    })
  },

  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postid;
    console.log(typeof postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id= ' + postId
    })
  }
})