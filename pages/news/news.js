// pages/news/news.js

// swiper to change typebar
var touchDot = 0;
var time = 0;
var interval = "";
var nth = 0;
var nthMax = 5;
var tmpFlag = true;


Page({

  /**
   * Page initial data
   */
  data: {
    id: "",
    ids: [],
    title: "",
    sourcetime: "",
    readCnt: "",
    content: [],

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad (options) {
    this.setData({
      id: parseInt(options.id),
      ids: options.ids.split(',').map(Number),
    })
    nth = this.data.ids.indexOf(this.data.id)
    nthMax = this.data.ids.length
    console.log(this.data.ids)
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
      },
      fail: () => {
        // console.log('server fail')
        wx.showToast({
          title: '服务器走失，请下拉刷新',
        })
      }
    })
  },

  setDetail (result) {
    // console.log(result)
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
  },

  // functions to execute swipper
  touchStart(e) {
    touchDot = e.touches[0].pageX;
    interval = setInterval(function () {
      time++;
    }, 100);
  },

  touchMove(e) {
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot) + " time: " + time);

    // to left  
    if (touchMove - touchDot <= -40 && time < 40) {
      console.log('start swiper')
      let idx = (nth + 1) % nthMax
      console.log(idx)
      console.log(nth)
      if (tmpFlag) {
        tmpFlag = false
        this.setData({
          id: this.data.ids[idx],
        })
        
        nth = idx
        this.getDetail(() => {
          wx.showToast({
            title: '下一篇',
          })
        })
        console.log(this.data.id)
        console.log(nth)
      }
    }
    if (touchMove - touchDot >= 40 && time < 40) {
      console.log('start swiper')
      let idx = (Math.abs(nth + nthMax - 1)) % nthMax
      console.log(idx)
      console.log(nth)
      if (tmpFlag) {
        tmpFlag = false
        this.setData({
          id: this.data.ids[idx],
        })
        nth = idx
        this.getDetail(() => {
          wx.showToast({
            title: '上一篇',
          })
        })
      }
    }
  },
  touchEnd(e) {
    console.log('touch end')
    clearInterval(interval);
    time = 0;
    tmpFlag = true;
  },
}) 

// onLoad(options) {
//   this.setData({
//     id: parseInt(options.id),
//     ids: options.ids.split(',').map(Number),
//   })
//   nth = this.data.ids.indexOf(this.data.id)
//   nthMax = this.data.ids.length
//   this.getDetail()
// },
