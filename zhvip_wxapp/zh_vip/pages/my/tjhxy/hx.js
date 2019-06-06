var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log(o);
        var n = decodeURIComponent(o.scene).split(",");
        console.log(n);
        var t = n[0], e = n[1];
        this.setData({
            yhqid: t,
            yhquid: e
        }), app.getUserInfo(function(o) {
            console.log(app.globalData), app.userlogin();
        });
    },
    hx: function() {
        var o = wx.getStorageSync("UserData").id, n = this.data.yhqid, t = this.data.yhquid;
        console.log("扫码人的id", o, "优惠券id", n, "优惠券所有者id", t), null == o || null == t ? wx.showModal({
            title: "",
            content: "请登录商家后台核销"
        }) : app.util.request({
            url: "entry/wxapp/IsHx",
            cachetime: "0",
            data: {
                user_id: o,
                coupons_id: n
            },
            success: function(o) {
                console.log(o), 1 == o.data ? wx.showModal({
                    title: "提示",
                    content: "确定核销此券吗？",
                    success: function(o) {
                        o.confirm ? (console.log("用户点击确定"), app.util.request({
                            url: "entry/wxapp/hxCoupons",
                            cachetime: "0",
                            data: {
                                coupons_id: n,
                                user_id: t
                            },
                            success: function(o) {
                                console.log(o), 1 == o.data ? (wx.showToast({
                                    title: "核销成功",
                                    icon: "success",
                                    duration: 1e3
                                }), setTimeout(function() {
                                    wx.switchTab({
                                        url: "../../index/index"
                                    });
                                }, 1e3)) : wx.showToast({
                                    title: "请重试",
                                    icon: "loading",
                                    duration: 1e3
                                });
                            }
                        })) : o.cancel && (console.log("用户点击取消"), wx.switchTab({
                            url: "../../index/index"
                        }));
                    }
                }) : (wx.showModal({
                    title: "提示",
                    content: "您没有核销权限哦"
                }), setTimeout(function() {
                    wx.switchTab({
                        url: "../../index/index"
                    });
                }, 2e3));
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