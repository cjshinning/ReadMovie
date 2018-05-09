var postData = require('../../../data/posts-data.js')

Page({
  onLoad: function(option){
    console.log(typeof option)
    console.log(option)
    var postId = option.id
    console.log(postId)
    console.log(postData.postList[0])
    // var postData = postData.postList[postId]
    // this.setData({
    //   posts_key: postData.postList
    // })
    // var postData = posts_key[postId]
    // console.log(this.posts_key)
  }
})