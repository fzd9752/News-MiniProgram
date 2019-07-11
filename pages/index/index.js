//index.js
//获取应用实例
const app = getApp()
const types = {
  "国内": "gn",
  "国际": "gj",
  "财经": "cj",
  "娱乐": "yl",
  "军事": "js",
  "体育": "ty",
  "其他": "other"
}
Page({
  data: {
    typeList: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    currentTab: 0,
    type: "gn",
    news: [1 , 2, 3],
  },
  
  //事件处理函数
  onLoad: function () {
    console.log('Load index page.')
    this.getNewsList()

  },

  tabBarTap: function (e) {
    let idx = e.currentTarget.dataset.idx
    let cn = this.data.typeList[idx]
    this.setData({
      currentTab: idx,
      type: types[cn]
    })
    console.log(this.data.type)
    this.getNewsList()
  },

  getNewsList(callback) {
    wx.request({
      url: "https://test-miniprogram.com/api/news/list",
      data: {
        type: this.data.type
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNewsList(result) {
    let news = []
    for (let i = 0; i < result.length; i += 1) {
      let date = new Date(Date.parse(result[i].date))
      news.push({
        id: result[i].id,
        title: result[i].title,
        firstImage: result[i].firstImage,
        sourcetime: result[i].source + "  " + `${("0" + date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}`
      })
    } 
    this.setData ({
      news: news
    })
  }
})


