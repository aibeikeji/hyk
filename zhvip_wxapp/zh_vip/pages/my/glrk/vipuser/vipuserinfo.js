var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        console.log(n), this.setData({
            uid: n.uid
        });
    },
    onReady: function() {},
    onShow: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: o.data.uid
            },
            success: function(n) {
                console.log(n), o.setData({
                    userinfo: n.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});