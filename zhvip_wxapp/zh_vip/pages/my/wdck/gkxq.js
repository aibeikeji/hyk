var app = getApp();

Page({
    data: {
        total: 0,
        showModal: !1,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1"
    },
    qrmd: function() {
        this.setData({
            showModal: !0
        });
    },
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    form_save: function(t) {
        console.log(t);
        var a = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: a
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    onLoad: function(t) {
        var o = this, a = wx.getStorageSync("UserData").id;
        console.log(t, a), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), o.setData({
                    xtxx: t.data,
                    url: getApp().imgurl,
                    jf_proportion: t.data.jf_proportion
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                }), wx.setNavigationBarTitle({
                    title: t.data.link_name
                }), "1" == t.data.is_yue ? o.setData({
                    kqyue: !0
                }) : o.setData({
                    kqyue: !1
                }), "1" == t.data.is_jf && "1" == t.data.is_jfpay ? o.setData({
                    kqjf: !0
                }) : o.setData({
                    kqjf: !1
                });
            }
        }), app.util.request({
            url: "entry/wxapp/NumCardInfo",
            cachetime: "0",
            data: {
                card_id: t.xqid
            },
            success: function(t) {
                console.log(t.data), o.setData({
                    info: t.data,
                    total: t.data.money
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                if (console.log("用户信息", t.data), null != t.data.discount) var a = t.data.discount; else a = 100;
                o.setData({
                    userInfo: t.data,
                    discount: a,
                    integral: t.data.integral
                });
            }
        });
    },
    radioChange1: function(t) {
        console.log("radio1发生change事件，携带value值为：", t.detail.value), "wxzf" == t.detail.value && this.setData({
            zffs: 1,
            zfwz: "微信支付",
            btntype: "btn_ok1"
        }), "yezf" == t.detail.value && this.setData({
            zffs: 2,
            zfwz: "余额支付",
            btntype: "btn_ok2"
        }), "jfzf" == t.detail.value && this.setData({
            zffs: 3,
            zfwz: "积分支付",
            btntype: "btn_ok3"
        });
    },
    formSubmit: function(a) {
        var o = this;
        console.log("form发生了submit事件，携带数据为：", a.detail.formId);
        var e = getApp().getOpenId, i = this.data.info.money, t = this.data.info.id, n = wx.getStorageSync("UserData").id;
        if (console.log(e, i, n, t), "yezf" == a.detail.value.radiogroup) {
            var s = Number(this.data.userInfo.wallet), l = Number(this.data.total);
            if (console.log(s, l), s < l) return void wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            });
        }
        var r = 0;
        if ("jfzf" == a.detail.value.radiogroup) {
            var d = Number(this.data.integral) / Number(this.data.jf_proportion), u = Number(this.data.total);
            if (r = (u * Number(this.data.jf_proportion)).toFixed(2), console.log(d, u, r), 
            d < u) return void wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            });
        }
        if ("wxzf" != a.detail.value.radiogroup || 0 != i) {
            if ("yezf" == a.detail.value.radiogroup) var c = 2;
            if ("wxzf" == a.detail.value.radiogroup) c = 1;
            if ("jfzf" == a.detail.value.radiogroup) c = 3;
            console.log("是否余额", c, r), "" == a.detail.formId ? wx.showToast({
                title: "没有获取到formid",
                icon: "loading",
                duration: 1e3
            }) : (this.setData({
                zfz: !0
            }), app.util.request({
                url: "entry/wxapp/PayNumCard",
                cachetime: "0",
                data: {
                    user_id: n,
                    money: i,
                    form_id: a.detail.formId,
                    card_id: t,
                    pay_type: c,
                    jf: r
                },
                success: function(t) {
                    console.log(t), o.setData({
                        zfz: !1,
                        showModal: !1
                    }), "下单失败" != t.data ? "yezf" == a.detail.value.radiogroup ? (console.log("余额支付流程"), 
                    wx.showToast({
                        title: "购买成功"
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "wdck"
                        });
                    }, 1e3)) : "jfzf" == a.detail.value.radiogroup ? (console.log("积分支付流程"), wx.showToast({
                        title: "购买成功"
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "wdck"
                        });
                    }, 1e3)) : (console.log("微信支付流程"), app.util.request({
                        url: "entry/wxapp/pay5",
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
                                    console.log(t), wx.showToast({
                                        title: "购买成功",
                                        duration: 1e3
                                    }), setTimeout(function() {
                                        wx.redirectTo({
                                            url: "wdck"
                                        });
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
                    })) : wx.showToast({
                        title: "下单失败",
                        icon: "loading"
                    });
                }
            }));
        } else wx.showModal({
            title: "提示",
            content: "0元买单请选择其他方式支付"
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