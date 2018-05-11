var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id
    var url = app.globalData.doubanBase+'/v2/movie/subject/'+movieId
    util.http(url, this.processDoubanData)
  },

  processDoubanData: function(data){
    console.log(data)
    if(!data){
      return
    }
    var director = {
      avatar:'',
      name:'',
      id:''
    }
    // console.log(data.directors[0])
    if (data.directors[0]!=null){
      if (data.directors[0].avatars != null){
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name
      director.id = data.id
    }
    // director.avatar = data.images.large
    // director.id = data.id

    var movie = {
      movieImg: data.images?data.images.large:'',
      country: data.countries[0],
      originTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      stars: util.covertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }

    this.setData({
      movie: movie
    })
  }
})