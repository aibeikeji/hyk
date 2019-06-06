var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        date: "2016-09-01"
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    dw: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                console.log(e), t.setData({
                    weizhi: e.address,
                    jwd: e.latitude + "," + e.longitude
                });
            },
            fail: function() {
                wx.showModal({
                    title: "警告",
                    content: "您点击了拒绝地理位置授权,无法正常使用功能，点击确定重新获取授权。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.userLocation"], t.dw();
                            },
                            fail: function(e) {}
                        });
                    }
                });
            }
        });
    },
    formSubmit: function(e) {
        var t = wx.getStorageSync("UserData").id;
        console.log(t), console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var a = e.detail.value.xm, o = e.detail.value.sjh, i = e.detail.value.sr, n = e.detail.value.yx, s = e.detail.value.xl, l = e.detail.value.hy, u = e.detail.value.ah, d = e.detail.value.xxdz;
        console.log(a, o, i, n, s, l, u, d);
        var c = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: c
            },
            success: function(e) {
                console.log(e);
            }
        });
        var r = "", f = !0;
        if ("" == a) r = "请填写姓名！"; else if ("" == n) r = "请填写邮箱"; else if ("" == s) r = "请填写学历"; else if ("" == l) r = "请填写行业"; else if ("" == u) r = "请填写爱好"; else if ("" == d) r = "请填写详细地址"; else {
            f = !1;
            var g = getCurrentPages();
            console.log(g), app.util.request({
                url: "entry/wxapp/UpdUser",
                cachetime: "0",
                data: {
                    user_id: t,
                    name: a,
                    tel: o,
                    birthday: i,
                    address: d,
                    email: n,
                    education: s,
                    industry: l,
                    hobby: u
                },
                success: function(e) {
                    console.log(e.data), 1 == e.data ? (wx.showToast({
                        title: "保存成功"
                    }), setTimeout(function() {
                        wx.navigateBack({});
                    }, 1e3)) : 2 == e.data ? wx.showToast({
                        title: "没有任何修改",
                        icon: "loading",
                        duration: 1e3
                    }) : wx.showToast({
                        title: "网络出问题了",
                        icon: "loading",
                        duration: 1e3
                    });
                }
            });
        }
        1 == f && wx.showModal({
            title: "提示",
            content: r
        });
    },
    onLoad: function(e) {
        var t = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(t.toString()), this.setData({
            start: t
        });
        var a = wx.getStorageSync("UserData").id;
        console.log(a);
        var o = this;
        app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(e) {
                console.log("用户信息", e.data), o.setData({
                    userInfo: e.data,
                    date: e.data.birthday,
                    weizhi: e.data.address
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});