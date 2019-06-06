var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        tabs: [ "可用的", "失效的" ],
        activeIndex: 0,
        items1: [],
        items: [],
        startX: 0,
        startY: 0,
        showModal: !1
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    ljsy: function(t) {
        var a = t.currentTarget.dataset.yhqid;
        console.log(t, a), wx.navigateTo({
            url: "hxq?yhqid=" + a
        });
    },
    reLoad: function() {
        var n = this, t = wx.getStorageSync("UserData").id, a = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(t, a), app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var a = t.data, e = [], o = [], s = 0; s < a.length; s++) "1" == a[s].state ? (a[s].isTouchMove = !1, 
                o.push(a[s])) : e.push(a[s]);
                console.log(e, o), n.setData({
                    items1: e,
                    items: o
                });
            }
        });
    },
    onLoad: function(t) {
        var a = getApp().imgurl;
        console.log(a), this.setData({
            url: a
        });
        var e = wx.getStorageSync("xtxx");
        console.log(e), this.setData({
            xtxx: e
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.link_color
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    touchstart1: function(t) {
        this.data.items1.forEach(function(t, a) {
            t.isTouchMove && (t.isTouchMove = !1);
        }), this.setData({
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY,
            items1: this.data.items1
        });
    },
    touchmove1: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.startX, s = a.data.startY, n = t.changedTouches[0].clientX, i = t.changedTouches[0].clientY, c = a.angle({
            X: o,
            Y: s
        }, {
            X: n,
            Y: i
        });
        a.data.items1.forEach(function(t, a) {
            t.isTouchMove = !1, 30 < Math.abs(c) || a == e && (t.isTouchMove = !(o < n));
        }), a.setData({
            items1: a.data.items1
        });
    },
    touchstart: function(t) {
        this.data.items.forEach(function(t, a) {
            t.isTouchMove && (t.isTouchMove = !1);
        }), this.setData({
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY,
            items: this.data.items
        });
    },
    touchmove: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.startX, s = a.data.startY, n = t.changedTouches[0].clientX, i = t.changedTouches[0].clientY, c = a.angle({
            X: o,
            Y: s
        }, {
            X: n,
            Y: i
        });
        a.data.items.forEach(function(t, a) {
            t.isTouchMove = !1, 30 < Math.abs(c) || a == e && (t.isTouchMove = !(o < n));
        }), a.setData({
            items: a.data.items
        });
    },
    angle: function(t, a) {
        var e = a.X - t.X, o = a.Y - t.Y;
        return 360 * Math.atan(o / e) / (2 * Math.PI);
    },
    del: function(t) {
        var a = this, e = t.currentTarget.dataset.yhqid;
        console.log(t, e), wx.showModal({
            title: "提示",
            content: "确认删除此券吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/DelCoupons",
                    cachetime: "0",
                    data: {
                        id: e
                    },
                    success: function(t) {
                        console.log(t.data), 1 == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            a.reLoad();
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    }
});