var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var e = this, t = wx.getStorageSync("UserData").id;
        console.log(t), app.util.request({
            url: "entry/wxapp/Jfmx",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(n) {
                console.log(n);
                var t = n.data;
                e.setData({
                    score: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(n) {
                console.log(n), e.setData({
                    integral: n.data.integral
                });
            }
        });
    },
    tzjfsc: function() {
        wx.redirectTo({
            url: "integral"
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