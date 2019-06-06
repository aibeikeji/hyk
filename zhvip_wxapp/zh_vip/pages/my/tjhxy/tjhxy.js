var app = getApp();

Page({
    data: {},
    sc: function(o) {
        var e = this;
        console.log(o.currentTarget.dataset.uid), wx.showModal({
            title: "提示",
            content: "确定删除此核销员吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/DelVerification",
                    cachetime: "0",
                    data: {
                        id: o.currentTarget.dataset.uid
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            e.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(t) {
        var o = this, e = wx.getStorageSync("UserData").id;
        console.log(e), app.util.request({
            url: "entry/wxapp/HxCode",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t), o.setData({
                    hxm: t.data
                });
            }
        }), this.reLoad();
    },
    reLoad: function() {
        var o = this, t = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/HxList",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    hxylist: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {}
});