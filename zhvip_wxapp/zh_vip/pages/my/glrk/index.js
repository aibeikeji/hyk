var app = getApp();

Page({
    data: {},
    scan: function(t) {
        var o = wx.getStorageSync("sjdsjid"), e = wx.getStorageSync("acountid");
        wx.scanCode({
            success: function(t) {
                console.log(t);
                var n = "/" + t.path;
                wx.navigateTo({
                    url: n + "&storeid=" + o + "&acountid=" + e
                });
            },
            fail: function(t) {
                console.log("扫码fail");
            }
        });
    },
    tcdl: function() {
        wx.showModal({
            title: "提示",
            content: "确定退出登录吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.removeStorageSync("sjdsjid"), wx.reLaunch({
                    url: "../my"
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(t) {
        var n = wx.getStorageSync("sjdsjid"), o = this;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: n
            },
            success: function(t) {
                console.log("门店信息", t.data), o.setData({
                    mdinfo: t.data
                }), wx.setNavigationBarTitle({
                    title: t.data.name
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Statistical",
            cachetime: "0",
            data: {
                store_id: n
            },
            success: function(t) {
                console.log("账目", t.data), o.setData({
                    zmxx: t.data
                });
            }
        });
    },
    vipuser: function(t) {
        wx.redirectTo({
            url: "vipuser/vipuser"
        });
    },
    jqqd: function(t) {
        wx.showModal({
            title: "提示",
            content: "程序员回家过年了，敬请期待"
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