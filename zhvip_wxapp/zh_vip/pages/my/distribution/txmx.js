var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        tabs: [ "待审核", "已通过", "已拒绝" ],
        activeIndex: 0
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    reLoad: function() {
        var s = this, t = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/YjtxList",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var a = [], n = [], e = [], o = 0; o < t.data.length; o++) "1" == t.data[o].status && a.push(t.data[o]), 
                "2" == t.data[o].status && n.push(t.data[o]), "3" == t.data[o].status && e.push(t.data[o]);
                console.log(a, n, e), s.setData({
                    dsh: a,
                    ytg: n,
                    yjj: e
                });
            }
        });
    },
    onLoad: function(t) {
        this.reLoad();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad();
    },
    onReachBottom: function() {}
});