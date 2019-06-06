var app = getApp();

Page({
    data: {
        open: !1,
        kong: !0
    },
    onLoad: function(t) {
        var e = this, a = getApp().imgurl, o = wx.getStorageSync("mdid");
        console.log(o);
        var n = wx.getStorageSync("UserData").id;
        console.log(n), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    xtxx: t.data,
                    url: a
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                }), wx.setNavigationBarTitle({
                    title: t.data.link_name
                }), "1" == t.data.is_yue ? e.setData({
                    kqyue: !0
                }) : e.setData({
                    kqyue: !1
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                console.log("用户信息", t.data), e.setData({
                    userInfo: t.data,
                    discount: t.data.discount
                }), "0" == t.data.grade && (wx.showModal({
                    title: "提示",
                    content: "开卡成为会员能享受优惠买单哦~"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../my/login"
                    });
                }, 1500));
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(t) {
                console.log("门店信息", t.data), e.setData({
                    mdinfo: t.data
                }), wx.setNavigationBarTitle({
                    title: "欢迎光临" + t.data.name
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Czhd",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    czhd: t.data
                });
            }
        });
    },
    jsmj: function(t, e) {
        for (var a, o = 0; o < e.length; o++) if (Number(t) >= Number(e[o].full)) {
            a = o;
            break;
        }
        return a;
    },
    bindInput: function(t) {
        console.log(t.detail.value), this.setData({
            czje: t.detail.value
        }), "" != t.detail.value ? this.setData({
            kong: !1
        }) : this.setData({
            kong: !0
        });
    },
    tradeinfo: function() {
        this.setData({
            open: !this.data.open
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail, t.detail.formId);
        var e = getApp().getOpenId, a = t.detail.value.czje, o = this.data.czhd, n = wx.getStorageSync("UserData").id, i = this.data.mdinfo.id;
        if (console.log(o), 0 == o.length) var s = 0; else if (Number(a) >= Number(this.data.czhd[o.length - 1].full)) {
            var c = this.jsmj(a, o);
            console.log(c);
            s = Number(o[c].reduction);
        } else s = 0;
        console.log(e, a, n, s, i), app.util.request({
            url: "entry/wxapp/AddCzOrder",
            cachetime: "0",
            data: {
                user_id: n,
                money: a,
                money2: s,
                store_id: i,
                form_id: t.detail.formId
            },
            success: function(t) {
                console.log(t), "下单失败" != t.data && app.util.request({
                    url: "entry/wxapp/pay2",
                    cachetime: "0",
                    data: {
                        openid: e,
                        money: a,
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
                                console.log(t), wx.showToast({
                                    title: "充值成功",
                                    duration: 1e3
                                }), setTimeout(function() {
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
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});