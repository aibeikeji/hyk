var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        fwxy: !0,
        radioItems: []
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value);
        for (var a = this.data.radioItems, e = 0, o = a.length; e < o; ++e) a[e].checked = a[e].id == t.detail.value, 
        a[e].checked && this.setData({
            zfmoney: a[e].money,
            zfts: a[e].days
        });
        this.setData({
            radioItems: a
        });
    },
    formSubmit: function(t) {
        var a = this.data.xtxx.vip_qx, e = getApp().getOpenId, o = t.detail.formId, n = wx.getStorageSync("UserData").id, i = parseFloat(this.data.zfmoney), s = this.data.zfts;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: o
            },
            success: function(t) {
                console.log(t);
            }
        }), null == s && (s = 0), console.log(n), console.log("form发生了submit事件，携带数据为：", t.detail.value, a, i, s);
        var l = this.data.xtxx;
        console.log(l, e);
        var c = "", r = !0;
        if ("" == t.detail.value.radiogroup) c = "请选择购买有效期类型"; else {
            r = !1;
            var u = getCurrentPages();
            console.log(u), "1" == a && 0 == i ? (console.log("免费"), app.util.request({
                url: "entry/wxapp/UpdTimeOrder",
                cachetime: "0",
                data: {
                    user_id: n,
                    form_id: o,
                    money: i,
                    day: s
                },
                success: function(t) {
                    if (console.log(t.data), "下单失败" != t.data) {
                        if (wx.showModal({
                            title: "提示",
                            content: "会员卡续费成功"
                        }), 1 < u.length) u[u.length - 2].changeData();
                        setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3);
                    }
                    2 == t.data && wx.showToast({
                        title: "提交失败请重试",
                        icon: "loading",
                        duration: 1e3
                    });
                }
            })) : "1" == a && 0 < i && (console.log("开通期限要付费", i), app.util.request({
                url: "entry/wxapp/UpdTimeOrder",
                cachetime: "0",
                data: {
                    user_id: n,
                    money: i,
                    day: s,
                    form_id: o
                },
                success: function(t) {
                    console.log(t), "下单失败" != t.data && app.util.request({
                        url: "entry/wxapp/pay4",
                        cachetime: "0",
                        data: {
                            openid: e,
                            money: i,
                            order_id: t.data
                        },
                        success: function(t) {
                            console.log(t), wx.requestPayment({
                                timeStamp: t.data.timeStamp,
                                nonceStr: t.data.nonceStr,
                                package: t.data.package,
                                signType: t.data.signType,
                                paySign: t.data.paySign,
                                success: function(t) {
                                    (console.log(t), wx.showModal({
                                        title: "提示",
                                        content: "会员卡续费成功"
                                    }), 1 < u.length) && u[u.length - 2].changeData();
                                    setTimeout(function() {
                                        wx.navigateBack({});
                                    }, 1e3);
                                },
                                complete: function(t) {
                                    "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                                        title: "取消支付",
                                        icon: "loading",
                                        duration: 1e3
                                    });
                                }
                            });
                        }
                    });
                }
            }));
        }
        1 == r && wx.showModal({
            title: "提示",
            content: c
        });
    },
    onLoad: function(t) {
        var e = this;
        app.getUserInfo(function(t) {
            console.log(app.globalData), e.setData({
                userInfo: t
            });
            var a = wx.getStorageSync("UserData").id;
            console.log(a);
        });
        var a = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(a.toString()), this.setData({
            date: a,
            start: a
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), "2" == t.data.is_sms && e.setData({
                    isdx: !1
                }), e.setData({
                    xtxx: t.data
                }), wx.setStorageSync("xtxx", t.data), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                }), wx.setNavigationBarTitle({
                    title: t.data.link_name + "会员卡续费"
                });
            }
        }), app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    url: t.data
                }), getApp().imgurl = t.data;
            }
        }), app.util.request({
            url: "entry/wxapp/VipSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    radioItems: t.data
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