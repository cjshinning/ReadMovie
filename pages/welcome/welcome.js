Page({
  onTap: function(event){
    wx.switchTab({
      url: '../posts/post'
    });
    console.log(111)
    // wx.redirectTo({
    //   url: '../posts/post'
    // })
  }
})