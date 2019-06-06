var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var o = wx.getStorageSync("sjdsjid"), t = this;
        app.util.request({
            url: "entry/wxapp/Consumption",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(n) {
                console.log("门店消费记录", n.data), t.setData({
                    zfzd: n.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});