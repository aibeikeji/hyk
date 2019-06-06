var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(o) {
        var n = this, t = wx.getStorageSync("xtxx");
        console.log(t), this.setData({
            xtxx: t
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.link_color
        }), console.log(o.zdid), app.util.request({
            url: "entry/wxapp/MyOrderInfo",
            cachetime: "0",
            data: {
                order_id: o.zdid
            },
            success: function(o) {
                console.log("zdinfo", o.data), n.setData({
                    zdinfo: o.data,
                    yhze: Number(o.data.preferential) + Number(o.data.preferential2)
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});