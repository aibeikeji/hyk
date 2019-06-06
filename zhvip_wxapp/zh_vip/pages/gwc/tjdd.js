var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        totalprice: 0,
        address: null,
        express_price: 0,
        content: "",
        offline: 0,
        express_price_1: 0,
        name: "",
        mobile: "",
        integral_radio: 1,
        new_total_price: 0,
        show_card: !1,
        payment: 0,
        show_payment: !1,
        send_type: 0,
        total: 0,
        showModal: !1,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1",
        kqyue: !0,
        kqjf: !0,
        listarr: [ "代金券", "折扣券" ],
        activeIndex: 0,
        qlq: !0,
        djq: [],
        zkq: [],
        kdje: 0,
        radioChange: ""
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(e), this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    qlq: function() {
        console.log(this.data), this.setData({
            qlq: !1
        });
    },
    qdzz: function() {
        this.setData({
            qlq: !0
        });
    },
    lqyhq: function(t, e) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/MyCoupons2",
            cachetime: "0",
            data: {
                user_id: t,
                store_id: e
            },
            success: function(t) {
                console.log("优惠券信息", t.data);
                for (var e = t.data, a = [], o = [], i = 0; i < e.length; i++) "1" == e[i].type && "2" == e[i].state && a.push(e[i]), 
                "2" == e[i].type && "2" == e[i].state && o.push(e[i]);
                console.log(a, o), s.setData({
                    djq: a,
                    zkq: o
                });
            }
        });
    },
    ckwz: function(t) {
        console.log(t.currentTarget.dataset.jwd);
        var e = t.currentTarget.dataset.jwd.split(",");
        console.log(e);
        wx.openLocation({
            latitude: Number(e[0]),
            longitude: Number(e[1]),
            name: this.data.mdinfo.name,
            address: this.data.mdinfo.address
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
    qrmd: function(t) {
        var e = this.data.address, a = this.data.offline;
        if (console.log(e, a), 0 == a && null == e) return wx.showModal({
            title: "提示",
            content: "请选择收货地址"
        }), !1;
        this.setData({
            form_id2: t.detail.formId
        }), this.setData({
            showModal: !0
        });
    },
    onLoad: function(t) {
        console.log(wx.getStorageSync("cart_list")), this.setData({
            cart_list: wx.getStorageSync("cart_list")
        });
        var a = this, e = getApp().imgurl;
        app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    xtxx: t.data,
                    url: e,
                    jf_proportion: t.data.jf_proportion
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                }), wx.setNavigationBarTitle({
                    title: t.data.link_name
                }), "1" == t.data.is_yue ? a.setData({
                    kqyue: !0
                }) : a.setData({
                    kqyue: !1
                }), "1" == t.data.is_jf && "1" == t.data.is_jfpay ? a.setData({
                    kqjf: !0
                }) : a.setData({
                    kqjf: !1
                });
            }
        });
        var o = wx.getStorageSync("mdid"), i = wx.getStorageSync("UserData").id;
        a.lqyhq(i, o), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: i
            },
            success: function(t) {
                if (console.log("用户信息", t.data), null != t.data.discount) var e = Number(t.data.discount); else e = 100;
                a.setData({
                    userInfo: t.data,
                    discount: e,
                    integral: t.data.integral
                }), app.util.request({
                    url: "entry/wxapp/MallSet",
                    cachetime: "0",
                    data: {
                        store_id: o
                    },
                    success: function(t) {
                        console.log("门店设置", t.data), t.data ? (t.data.freight = Number(t.data.freight), 
                        t.data.full = Number(t.data.full), a.setData({
                            mdset: t.data,
                            freight: t.data.freight
                        })) : a.setData({
                            mdset: {
                                freight: 0,
                                full: 0
                            },
                            freight: 0
                        }), a.gettotalprice();
                    }
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(t) {
                console.log("门店信息", t.data), a.setData({
                    mdinfo: t.data
                });
            }
        });
        var s = util.formatTime(new Date()), r = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"), d = util.formatTime(new Date()).substring(11, 16);
        console.log(s, r.toString(), d.toString()), this.setData({
            datestart: r,
            timestart: d,
            date: r,
            time: d
        });
    },
    bindDateChange: function(t) {
        console.log("date 发生 change 事件，携带值为", t.detail.value, this.data.datestart), this.setData({
            date: t.detail.value
        }), t.detail.value == this.data.datestart ? console.log("日期没有修改") : (console.log("修改了日期"), 
        this.setData({
            timestart: "00:01"
        }));
    },
    bindTimeChange: function(t) {
        console.log("time 发生 change 事件，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        });
    },
    radioChange: function(t) {
        this.setData({
            radioChange: t.detail.value
        }), console.log("radio发生change事件，携带value值为：", t.detail.value);
    },
    xzq: function(t) {
        if (console.log(t.currentTarget.dataset, this.data.xj), Number(t.currentTarget.dataset.full) > this.data.xj) return wx.showModal({
            title: "提示",
            content: "您的商品小计金额不满足此优惠券条件"
        }), !1;
        this.setData({
            activeradio: t.currentTarget.dataset.rdid,
            yhqnum: 1,
            yhqfull: t.currentTarget.dataset.full,
            yhqname: t.currentTarget.dataset.type,
            yhqkdje: t.currentTarget.dataset.kdje
        }), "代金券" == t.currentTarget.dataset.type && this.setData({
            kdje: Number(t.currentTarget.dataset.kdje)
        }), "折扣券" == t.currentTarget.dataset.type && this.setData({
            kdje: Number(((1 - .1 * Number(t.currentTarget.dataset.kdje)) * Number(this.data.xj)).toFixed(2))
        }), this.gettotalprice();
    },
    gettotalprice: function() {
        var t = this.data.freight, e = this.data.mdset.full, a = this.data.discount, o = this.data.kdje;
        console.log(t, e, a, o);
        var i = 0, s = this.data.cart_list;
        for (var r in s) i += s[r].money * s[r].num;
        var d = Number(i.toFixed(2));
        console.log(d), e <= d && (t = 0);
        var n = Number((d + t).toFixed(2)), l = Number((n * (100 - a) / 100).toFixed(2)), u = o, c = Number((n * a / 100 - u).toFixed(2));
        c <= 0 && (c = 0), console.log(t, n, c, l, u), this.setData({
            yprice: n,
            pre: l,
            pre2: u,
            yf: t,
            xj: d,
            totalprice: c
        });
    },
    bindkeyinput: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    KeyName: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    KeyMobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    getOffline: function(t) {
        console.log(t);
        this.setData({
            offline: t.target.dataset.index
        });
        var e = this.data.mdset.freight;
        1 == t.target.dataset.index ? this.setData({
            offline: 1,
            freight: 0
        }) : this.setData({
            offline: 0,
            freight: e
        }), this.gettotalprice();
    },
    formSubmit: function(t) {
        var a = [];
        this.data.cart_list.map(function(t) {
            if (0 < t.num) {
                var e = {};
                e.name = t.name, e.img = t.logo, e.num = t.num, e.money = t.money, e.good_id = t.good_id, 
                e.car_id = t.id, e.spec = t.spec, a.push(e);
            }
        }), console.log(a);
        var e = this, o = getApp().getOpenId;
        console.log("form发生了submit事件，携带数据为：", t.detail.value.radiogroup);
        var i = t.detail.formId, s = this.data.form_id2, r = wx.getStorageSync("UserData").id, d = wx.getStorageSync("mdid"), n = this.data.yprice, l = this.data.totalprice, u = this.data.yf, c = this.data.content, f = this.data.pre, h = this.data.mdinfo.name, p = this.data.radioChange, g = this.data.kdje, m = parseInt(this.data.offline) + 1, w = this.data.date, y = this.data.time;
        if (null != this.data.address) var _ = this.data.address.area + this.data.address.address, x = this.data.address.user_name, v = this.data.address.tel; else _ = "", 
        x = "", v = "";
        if (1 == (m = 1 == m ? 2 : 1) && (x = e.data.name, v = this.data.mobile, "" == x || "" == v)) return wx.showModal({
            title: "提示",
            content: "到店自提必须填写收货人和联系电话！"
        }), !1;
        if (console.log(o, i, s, r, d, "总价", n, "实付", l, "运费", u, "zhe", f, "quan", g, "优惠券id", p, h, "收货人", x, "收获电话", v, "收货地址", _, "留言", c, "is_zt", m, "sz", a, "自提时间", w, y), 
        "yezf" == t.detail.value.radiogroup) {
            var z = Number(this.data.userInfo.wallet), D = Number(this.data.totalprice);
            if (console.log(z, D), z < D) return void wx.showToast({
                title: "余额不足支付",
                icon: "loading"
            });
        }
        var q = 0;
        if ("jfzf" == t.detail.value.radiogroup) {
            var b = Number(this.data.integral) / Number(this.data.jf_proportion), T = Number(this.data.totalprice);
            if (q = (T * Number(this.data.jf_proportion)).toFixed(2), console.log(b, T, q), 
            b < T) return void wx.showToast({
                title: "积分不足支付",
                icon: "loading"
            });
        }
        if ("yezf" == t.detail.value.radiogroup) var j = 2;
        if ("wxzf" == t.detail.value.radiogroup) j = 1;
        if ("jfzf" == t.detail.value.radiogroup) j = 3;
        console.log("是否余额", j), "" == i ? wx.showToast({
            title: "没有获取到formid",
            icon: "loading",
            duration: 1e3
        }) : (this.setData({
            zfz: !0
        }), "yezf" == t.detail.value.radiogroup ? (console.log("余额支付流程"), app.util.request({
            url: "entry/wxapp/AddShopOrder",
            cachetime: "0",
            data: {
                price: n,
                money: l,
                store_id: d,
                user_id: r,
                pay_type: j,
                preferential: f,
                preferential2: g,
                coupons_id: p,
                note: c,
                address: _,
                user_name: x,
                tel: v,
                is_zt: m,
                freight: u,
                sz: a,
                zt_time: w + " " + y,
                form_id2: s,
                form_id: i
            },
            success: function(t) {
                console.log(t);
                t.data;
                e.setData({
                    zfz: !1,
                    showModal: !1
                }), "下单失败" != t.data ? (wx.showToast({
                    title: "支付成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../my/wddd/order"
                    });
                }, 1e3), app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                        openid: o,
                        form_id: i,
                        store_name: h,
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
            url: "entry/wxapp/AddShopOrder",
            cachetime: "0",
            data: {
                price: n,
                money: l,
                store_id: d,
                user_id: r,
                pay_type: j,
                preferential: f,
                preferential2: g,
                coupons_id: p,
                jf: q,
                note: c,
                address: _,
                user_name: x,
                tel: v,
                is_zt: m,
                freight: u,
                sz: a,
                zt_time: w + " " + y,
                form_id2: s,
                form_id: i
            },
            success: function(t) {
                console.log(t);
                t.data;
                e.setData({
                    zfz: !1,
                    showModal: !1
                }), "下单失败" != t.data ? (wx.showToast({
                    title: "支付成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../my/wddd/order"
                    });
                }, 1e3), app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                        openid: o,
                        form_id: i,
                        store_name: h,
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
            url: "entry/wxapp/AddShopOrder",
            cachetime: "0",
            data: {
                price: n,
                money: l,
                store_id: d,
                user_id: r,
                pay_type: j,
                preferential: f,
                preferential2: g,
                coupons_id: p,
                note: c,
                address: _,
                user_name: x,
                tel: v,
                is_zt: m,
                freight: u,
                sz: a,
                zt_time: w + " " + y,
                form_id2: s,
                form_id: i
            },
            success: function(t) {
                console.log(t);
                t.data;
                "下单失败" != t.data && app.util.request({
                    url: "entry/wxapp/pay3",
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
                                console.log(t), "requestPayment:fail cancel" == t.errMsg && (wx.showToast({
                                    title: "取消支付",
                                    icon: "loading",
                                    duration: 1e3
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "../my/wddd/order"
                                    });
                                }, 1e3)), "requestPayment:ok" == t.errMsg && (wx.showToast({
                                    title: "支付成功",
                                    duration: 1e3
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "../my/wddd/order"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                });
            }
        })));
    },
    onShow: function() {
        var t = wx.getStorageSync("UserData").id, e = this;
        app.util.request({
            url: "entry/wxapp/MyDefaultAddress",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data), t.data && (t.data.area = t.data.area.replace(/,/g, ""), e.setData({
                    address: t.data,
                    mobile: t.data.tel,
                    name: t.data.user_name
                }));
            }
        });
    },
    showShop: function(t) {
        this.setData({
            show_shop: !0
        });
    },
    ycshow_shop: function() {
        this.setData({
            show_shop: !1
        });
    }
});