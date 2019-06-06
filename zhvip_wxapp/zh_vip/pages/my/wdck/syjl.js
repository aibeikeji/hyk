var app = getApp();

Page({
    data: {
        jzsj: !0
    },
    onLoad: function(o) {
        console.log(o);
        var a = this, t = wx.getStorageSync("xtxx");
        console.log(t), this.setData({
            xtxx: t,
            url: getApp().imgurl
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.link_color
        });
        var n = wx.getStorageSync("UserData").id;
        console.log(n), app.util.request({
            url: "entry/wxapp/MyCardInfo",
            cachetime: "0",
            data: {
                id: o.kid
            },
            success: function(o) {
                console.log(o.data), a.setData({
                    item: o.data,
                    jzsj: !1
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Record",
            cachetime: "0",
            data: {
                user_id: n,
                card_id: o.cid
            },
            success: function(o) {
                console.log(o);
                var t = o.data;
                a.setData({
                    score: t
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