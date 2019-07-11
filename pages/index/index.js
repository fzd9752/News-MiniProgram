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
    motto: 'Hello World',
  },
  
  //事件处理函数
  onLoad: function () {
    console.log('Load index page.')

  },

  tabBarTap: function (e) {
    let idx = e.currentTarget.dataset.idx
    let cn = this.data.typeList[idx]
    this.setData({
      currentTab: idx,
      type: types[cn]
    })
    console.log(this.data.type)
  }
})
