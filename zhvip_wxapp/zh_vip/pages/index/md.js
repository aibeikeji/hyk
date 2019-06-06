var qqmapsdk, app = getApp(), QQMapWX = require("../../utils/qqmap-wx-jssdk.js"), util = require("../../utils/util.js");

Page({
    data: {
        listarr: [ "代金券", "折扣券" ],
        activeIndex: 0,
        focus: !0,
        disabled: !0,
        qlq: !0,
        djq: [],
        zkq: [],
        discounttext: "0",
        checkboxChange: [],
        radioChange: "",
        isyhq: !1,
        yhqnum: 0,
        kdje: 0,
        yhqname: "",
        total: 0,
        showModal: !1,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1",
        marqueePace: 1,
        marqueeDistance: 0,
        size: 14,
        interval: 20
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
    scrolltxt: function() {
        var e = this, o = e.data.length, i = e.data.windowWidth, s = setInterval(function() {
            var t = o + i, a = e.data.marqueeDistance;
            a < t ? e.setData({
                marqueeDistance: a + e.data.marqueePace
            }) : (e.setData({
                marqueeDistance: 0
            }), clearInterval(s), e.scrolltxt());
        }, e.data.interval);
    },
    qrmd: function() {
        if (0 == this.data.xfje) return wx.showModal({
            title: "提示",
            content: "消费金额不能为0哦~"
        }), !1;
        this.setData({
            showModal: !0
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
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    qlq: function() {
        console.log(this.data), 0 != this.data.xfje ? this.setData({
            qlq: !1
        }) : wx.showToast({
            title: "请输入消费金额",
            icon: "loading",
            duration: 1e3
        });
    },
    qdzz: function() {
        this.setData({
            qlq: !0
        });
    },
    hqjd: function(t) {
        this.setData({
            focus: !0
        });
    },
    sqjd: function(t) {
        console.log(t.detail.value), this.setData({
            focus: !1
        });
    },
    jstotal: function() {
        console.log(this.data);
        var t = (Number(this.data.xfje) - Number(this.data.discounttext)).toFixed(2);
        -1 !== this.data.checkboxChange.indexOf("quan") ? (t = (t - Number(this.data.kdje)).toFixed(2), 
        console.log("选择了优惠券"), this.setData({
            isyhq: !0
        })) : (console.log("没有选择券"), this.setData({
            isyhq: !1
        })), t <= 0 && (t = 0), this.setData({
            total: t
        });
    },
    checkboxChange: function(t) {
        this.setData({
            checkboxChange: t.detail.value
        }), this.jstotal(), console.log("checkbox发生change事件，携带value值为：", t.detail.value);
    },
    radioChange: function(t) {
        this.setData({
            radioChange: t.detail.value
        }), console.log("radio发生change事件，携带value值为：", t.detail.value);
    },
    xzq: function(t) {
        if (console.log(t.currentTarget.dataset, this.data.xfje), Number(t.currentTarget.dataset.full) > this.data.xfje) return wx.showModal({
            title: "提示",
            content: "您的消费金额不满足此优惠券条件"
        }), !1;
        this.setData({
            activeradio: t.currentTarget.dataset.rdid,
            yhqnum: 1,
            yhqfull: t.currentTarget.dataset.full,
            yhqname: t.currentTarget.dataset.type,
            yhqkdje: t.currentTarget.dataset.kdje
        }), "代金券" == t.currentTarget.dataset.type && this.setData({
            kdje: t.currentTarget.dataset.kdje
        }), "折扣券" == t.currentTarget.dataset.type && this.setData({
            kdje: ((1 - .1 * Number(t.currentTarget.dataset.kdje)) * Number(this.data.xfje)).toFixed(2)
        }), this.jstotal();
    },
    bindinput: function(t) {
        var a = Number(parseFloat(t.detail.value).toFixed(2));
        "NaN" == a.toString() && (a = 0), console.log(t.detail.value, t.detail.value.split(".").length, a, this.data.yhqfull, this.data.yhqname, this.data.yhqkdje), 
        Number(a) < Number(this.data.yhqfull) && (wx.showModal({
            title: "温馨提示",
            content: "您的消费金额发生了改变，请重新选择优惠券"
        }), this.setData({
            isyhq: !1,
            radioChange: "",
            yhqnum: 0,
            kdje: 0,
            yhqfull: "",
            yhqname: "",
            yhqkdje: "0",
            activeradio: "abc"
        }));
        "折扣券" == this.data.yhqname ? (console.log(this.data.yhqname), this.setData({
            kdje: ((1 - .1 * Number(this.data.yhqkdje)) * Number(a)).toFixed(2)
        })) : console.log(this.data.yhqname), console.log(a, this.data);
        var e = 1 - Number(this.data.discount) / 100;
        console.log(e);
        var o = (Number(a) * e).toFixed(2);
        this.setData({
            discounttext: o,
            xfje: Number(a)
        }), "" != t.detail.value && t.detail.value.split(".").length <= 2 ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        }), this.jstotal();
    },
    tabClick: function(t) {
        var a = t.currentTarget.id;
        console.log(a), this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    yuan: function() {
        console.log("yuan");
        wx.showModal({
            title: "会员等级说明",
            content: this.data.userInfo.details,
            showCancel: !1
        });
    },
    ji: function() {
        console.log("ji"), wx.showModal({
            title: "积分规则",
            content: "1积分可抵一元，最高可抵订单金额50%",
            showCancel: !1
        });
    },
    lqyhq: function(t, a) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/MyCoupons2",
            cachetime: "0",
            data: {
                user_id: t,
                store_id: a
            },
            success: function(t) {
                console.log("优惠券信息", t.data);
                for (var a = t.data, e = [], o = [], i = 0; i < a.length; i++) "1" == a[i].type && "2" == a[i].state && e.push(a[i]), 
                "2" == a[i].type && "2" == a[i].state && o.push(a[i]);
                console.log(e, o), s.setData({
                    djq: e,
                    zkq: o
                });
            }
        });
    },
    formSubmit: function(t) {
        var e = this, o = getApp().getOpenId;
        console.log("form发生了submit事件，携带数据为：", t.detail.value.radiogroup);
        var i = t.detail.formId, a = wx.getStorageSync("UserData").id, s = wx.getStorageSync("mdid"), n = this.data.xfje, l = this.data.total, r = this.data.discounttext, d = this.data.mdinfo.name;
        if (this.data.isyhq) var u = this.data.radioChange, c = this.data.kdje; else u = "", 
        c = 0;
        if (console.log(o, i, a, s, "总价", n, "实付", l, "zhe", r, "quan", c, "优惠券id", u, d), 
        "yezf" == t.detail.value.radiogroup) {
            var h = Number(this.data.userInfo.wallet), f = Number(this.data.total);
            if (console.log(h, f), h < f) return void wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            });
        }
        var g = 0;
        if ("jfzf" == t.detail.value.radiogroup) {
            var p = Number(this.data.integral) / Number(this.data.jf_proportion), m = Number(this.data.total);
            if (g = (m * Number(this.data.jf_proportion)).toFixed(2), console.log(p, m, g), 
            p < m) return void wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            });
        }
        if ("yezf" == t.detail.value.radiogroup) var w = 2;
        if ("wxzf" == t.detail.value.radiogroup) w = 1;
        if ("jfzf" == t.detail.value.radiogroup) w = 3;
        console.log("是否余额", w), "" == i ? wx.showToast({
            title: "没有获取到formid",
            icon: "loading",
            duration: 1e3
        }) : (this.setData({
            zfz: !0
        }), "yezf" == t.detail.value.radiogroup ? (console.log("余额支付流程"), app.util.request({
            url: "entry/wxapp/addorder",
            cachetime: "0",
            data: {
                price: n,
                money: l,
                store_id: s,
                user_id: a,
                pay_type: w,
                preferential: r,
                preferential2: c,
                coupons_id: u
            },
            success: function(t) {
                console.log(t);
                var a = t.data;
                e.setData({
                    zfz: !1,
                    showModal: !1
                }), "下单失败" != t.data ? (wx.showToast({
                    title: "支付成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../my/wdzd"
                    });
                }, 1e3), app.util.request({
                    url: "entry/wxapp/Print",
                    cachetime: "0",
                    data: {
                        order_id: a
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                        openid: o,
                        form_id: i,
                        store_name: d,
                        money: l + "元"
                    },
                    success: function(t) {
                        console.log(t), wx.showToast({
                            title: "支付成功",
                            duration: 2e3
                        });
                    }
                })) : wx.showToast({
                    title: "支付失败",
                    icon: "loading"
                });
            }
        })) : "jfzf" == t.detail.value.radiogroup ? (console.log("积分支付流程"), app.util.request({
            url: "entry/wxapp/addorder",
            cachetime: "0",
            data: {
                price: n,
                money: l,
                store_id: s,
                user_id: a,
                pay_type: w,
                preferential: r,
                preferential2: c,
                coupons_id: u,
                jf: g
            },
            success: function(t) {
                console.log(t);
                var a = t.data;
                e.setData({
                    zfz: !1,
                    showModal: !1
                }), "下单失败" != t.data ? (wx.showToast({
                    title: "支付成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../my/wdzd"
                    });
                }, 1e3), app.util.request({
                    url: "entry/wxapp/Print",
                    cachetime: "0",
                    data: {
                        order_id: a
                    },
                    success: function(t) {
                        console.log(t);
                    }
                }), app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                        openid: o,
                        form_id: i,
                        store_name: d,
                        money: l + "元"
                    },
                    success: function(t) {
                        console.log(t), wx.showToast({
                            title: "支付成功",
                            duration: 2e3
                        });
                    }
                })) : wx.showToast({
                    title: "支付失败",
                    icon: "loading"
                });
            }
        })) : (console.log("微信支付流程"), 0 == l ? (wx.showModal({
            title: "提示",
            content: "0元买单请选择其他方式支付"
        }), e.setData({
            zfz: !1
        })) : app.util.request({
            url: "entry/wxapp/addorder",
            cachetime: "0",
            data: {
                price: n,
                money: l,
                store_id: s,
                user_id: a,
                pay_type: w,
                preferential: r,
                preferential2: c,
                coupons_id: u,
                form_id: i
            },
            success: function(t) {
                console.log(t);
                t.data;
                "下单失败" != t.data && app.util.request({
                    url: "entry/wxapp/pay",
                    cachetime: "0",
                    data: {
                        openid: o,
                        money: l,
                        order_id: t.data
                    },
                    success: function(t) {
                        console.log(t), e.setData({
                            zfz: !1,
                            showModal: !1
                        }), wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log(t.data), console.log(t), console.log(i);
                            },
                            complete: function(t) {
                                console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                                    title: "取消支付",
                                    icon: "loading",
                                    duration: 1e3
                                }), "requestPayment:ok" == t.errMsg && (wx.showToast({
                                    title: "支付成功",
                                    duration: 2e3
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "../my/wdzd"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                });
            }
        })));
    },
    onLoad: function(t) {
        console.log(this.data);
        var o = this, a = getApp().imgurl, e = wx.getStorageSync("mdid");
        console.log(e);
        var i = wx.getStorageSync("UserData").id;
        console.log(i), o.lqyhq(i, e), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: i
            },
            success: function(t) {
                if (console.log("用户信息", t.data), null != t.data.discount) var a = t.data.discount; else a = 100;
                o.setData({
                    userInfo: t.data,
                    discount: a,
                    integral: t.data.integral
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
                id: e
            },
            success: function(t) {
                console.log("门店信息", t.data), o.setData({
                    mdinfo: t.data
                }), wx.setNavigationBarTitle({
                    title: "欢迎光临" + t.data.name
                });
                var a = t.data.announcement.length * o.data.size, e = wx.getSystemInfoSync().windowWidth;
                console.log(a, e), o.setData({
                    length: a,
                    windowWidth: e
                }), o.scrolltxt();
            }
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), o.setData({
                    xtxx: t.data,
                    url: a,
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