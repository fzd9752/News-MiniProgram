// pages/news/news.js
Page({

  /**
   * Page initial data
   */
  data: {
    id: 1552623252486,
    title: "",
    sourcetime: "",
    readCnt: "",
    content: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad (options) {
    // this.setData({
    //   id: options.id,
    // })
    // console.log(this.data.id)
    this.getDetail()
  },

  onPullDownRefresh() {
    console.log("refresh executed!")
    this.getDetail(() => {
      wx.stopPullDownRefresh()
      // console.log('stop refresh')
    })
  },

  getDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id,
      },
      success: res => {
        let result = res.data.result
        this.setDetail(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setDetail (result) {
    console.log(result)
    let date = new Date(Date.parse(result.date))
    let detail = []
    let content = result.content
    for (let i = 0; i < content.length; i += 1) {  
      if (content[i].type==="p")
        detail.push({
          type: content[i].type,
          p: content[i].text
        })
      else
        detail.push({
          type: content[i].type,
          p: content[i].src
        })
           
    }
    this.setData({
      title: result.title,
      sourcetime: result.source + "  " + `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`,
      readCNT: "阅读" + " " + result.readCount,
      content: detail,
    })
    // console.log(this.data.content)
  }
})