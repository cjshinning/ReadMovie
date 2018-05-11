// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  data: {
    movies: {},
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },

  onLoad: function (options) {
    var categary = options.categary
    this.setData({
      navigateTitle: categary
    })

    var dataUrl = ''
    switch(categary){
      case '正在热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters'
        break
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon'
        break
      case '豆瓣Top250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250'
        break
    }
    this.data.requestUrl = dataUrl
    util.http(dataUrl, this.processDoubanData)
  },

  onScrollLower: function(event){
    // console.log('加载更多')
    // ?start=0&count=3
    // console.log(this.data.totalCount)
    const nextUrl = this.data.requestUrl + '?start='+this.data.totalCount+'&count=20'
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  processDoubanData(movieDouban){
    // console.log(data)
    var movies = []
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.covertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    // this.data.totalCount += 20
    var totalMovies = {}

    // 如果要绑定新加载的数据据，那么需要痛旧有的数据合并在一起
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies
      // this.data.isEmpty= false
      this.setData({
        isEmpty: false
      })
    }
    this.setData({
      movies: totalMovies
    })
    this.setData({
      totalCount: this.data.totalCount + 20
    })
    wx.hideNavigationBarLoading()
  },

  onReady: function(){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  onShow: function(){
  }
  
})