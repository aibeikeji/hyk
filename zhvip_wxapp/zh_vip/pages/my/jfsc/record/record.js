var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = this, n = wx.getStorageSync("xtxx");
        console.log(n), this.setData({
            xtxx: n
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n.link_color
        });
        var a = wx.getStorageSync("UserData").id, e = getApp().imgurl;
        app.util.request({
            url: "entry/wxapp/Dhmx",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(o) {
                console.log(o), t.setData({
                    score: o.data,
                    url: e
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