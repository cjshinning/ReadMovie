Page({
  onTap: function(event){
    // wx.navigateTo({
    //   url: '../posts/post'
    // });

    wx.redirectTo({
      url: '../posts/post'
    })
    // console.log('execute onContainerTap')
  },

  onSubTap: function(){
    console.log('execute onSubTap')
  },

  onUnload: function(){
    // console.log('welcome page is onUnload')
  },

  onHide: function(){
    // console.log('welcome page is onHide')
  }
})