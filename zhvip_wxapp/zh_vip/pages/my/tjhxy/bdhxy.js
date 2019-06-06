var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log(o);
        var n = decodeURIComponent(o.scene);
        this.setData({
            hxmuserid: n
        }), app.getUserInfo(function(o) {
            console.log(app.globalData), app.userlogin();
        });
    },
    bdhxy: function() {
        var n = wx.getStorageSync("UserData").id, e = this.data.hxmuserid;
        console.log("扫描人用户id:", n, "核销码的用户id:", e), wx.showModal({
            title: "提示",
            content: "确定绑定为核销员吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/AddVerification",
                    cachetime: "0",
                    data: {
                        user_id: e,
                        verification_clerk: n
                    },
                    success: function(o) {
                        console.log(o), 1 == o.data && (wx.showToast({
                            title: "绑定成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.switchTab({
                                url: "../../index/index"
                            });
                        }, 1e3));
                    }
                })) : o.cancel && (console.log("用户点击取消"), wx.switchTab({
                    url: "../../index/index"
                }));
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