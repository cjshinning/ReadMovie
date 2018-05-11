var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },

  onLoad: function(){
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3'
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3'
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3'
    
    this.getMovieListData(inTheatersUrl,'inTheaters','正在热映')
    this.getMovieListData(comingSoonUrl,'comingSoon','即将上映')
    this.getMovieListData(top250Url,'top250','豆瓣Top250')
  },

  onMoreTap: function(event){
    var categary = event.currentTarget.dataset.categary
    wx.navigateTo({
      url: 'more-movie/more-movie?categary=' + categary
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  getMovieListData: function (url, settedKey, categaryTitle){
    var that = this
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categaryTitle)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  onCancelImgTap: function(){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },

  onBindConfirm: function(){
    // console.log('show search')
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function(event){
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + text
    this.getMovieListData(searchUrl, 'searchResult', '')
  },

  processDoubanData: function (movieDouban, settedKey, categaryTitle){
    var movies = []
    for(var idx in movieDouban.subjects){
      var subject = movieDouban.subjects[idx]
      var title = subject.title
      if(title.length>=6){
        title = title.substring(0,6)+'...'
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
    var readyData = {}
    readyData[settedKey] = {
      categaryTitle: categaryTitle,
      movies: movies
    };
    // console.log(readyData)
    this.setData(readyData)
  }
})