var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        tabs: [ "钱包明细", "支付账单" ],
        activeIndex: 0,
        banertext: "钱包明细",
        bdtext: "可用余额(元)",
        issx: !1
    },
    bindDateChange: function(t) {
        var a = this;
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            date: t.detail.value,
            issx: !0
        });
        var e = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: e,
                time: t.detail.value
            },
            success: function(t) {
                console.log("wdzd", t.data), a.setData({
                    zfzd: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/RechargeList",
            cachetime: "0",
            data: {
                user_id: e,
                time: t.detail.value
            },
            success: function(t) {
                console.log("qbmx", t.data), a.setData({
                    qbmx: t.data
                });
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        }), 0 == t.currentTarget.id && this.setData({
            banertext: "钱包明细"
        }), 1 == t.currentTarget.id && this.setData({
            banertext: "支付账单"
        });
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        var a = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(a.toString()), this.setData({
            date: a,
            end: a
        });
        var e = wx.getStorageSync("xtxx");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.link_color
        }), this.reLoad();
    },
    reLoad: function() {
        var a = this, e = getApp().imgurl, t = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("wdzd", t.data), a.setData({
                    zfzd: t.data,
                    url: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/RechargeList",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("qbmx", t.data), a.setData({
                    qbmx: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("用户信息", t.data), a.setData({
                    userInfo: t.data,
                    htext: t.data.wallet
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad(), this.setData({
            issx: !1
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});