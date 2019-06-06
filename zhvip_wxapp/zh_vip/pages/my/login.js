var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        VerifyCode: "立即验证",
        bdsjhtext: "验证微信手机号",
        isyz: !0,
        isbd: !1,
        isdx: !0,
        fsyzm: !1,
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
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value);
        for (var t = this.data.radioItems, a = 0, o = t.length; a < o; ++a) t[a].checked = t[a].id == e.detail.value, 
        t[a].checked && this.setData({
            zfmoney: t[a].money,
            zfts: t[a].days
        });
        this.setData({
            radioItems: t
        });
    },
    bindDateChange: function(e) {
        this.setData({
            start: e.detail.value
        });
    },
    hqsjh: function(e) {
        console.log(e.detail.value), this.setData({
            sjh: e.detail.value
        }), "" != e.detail.value ? this.setData({
            isyz: !1
        }) : this.setData({
            isyz: !0
        });
    },
    setVerify: function() {
        var e = util.getRandomNum();
        this.setData({
            yzm: e
        });
        var t = this.data.sjh;
        console.log(t), console.log(e);
        var a = 60, o = this;
        if (11 != t.length) return wx.showToast({
            title: "手机号错误",
            icon: "loading",
            duration: 1e3
        }), !1;
        var n = setInterval(function() {
            0 < --a ? o.setData({
                VerifyCode: a + " 秒",
                isyz: !0,
                fsyzm: !0
            }) : (o.setData({
                VerifyCode: "立即验证",
                isyz: !1,
                fsyzm: !1
            }), clearInterval(n));
        }, 1e3);
        app.util.request({
            url: "entry/wxapp/sms",
            cachetime: "0",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                tel: t,
                code: e
            },
            success: function(e) {
                console.log("111111111"), console.log(e), "操作成功" == e.data.reason && wx.showToast({
                    title: "发送成功",
                    icon: "success",
                    duration: 1e3
                });
            },
            fail: function(e) {
                console.log("error res="), console.log(e.data);
            }
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
    getPhoneNumber: function(e) {
        var t = this;
        console.log(e), console.log(e.detail.iv), console.log(e.detail.encryptedData), "getPhoneNumber:fail user deny" == e.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "您未授权获取您的手机号",
            success: function(e) {}
        }) : app.util.request({
            url: "entry/wxapp/Jiemi",
            cachetime: "0",
            data: {
                sessionKey: getApp().getSK,
                data: e.detail.encryptedData,
                iv: e.detail.iv
            },
            success: function(e) {
                console.log("解密后的数据", e), null != e.data.phoneNumber && t.setData({
                    sjh: e.data.phoneNumber,
                    isbd: !0,
                    bdsjhtext: "验证成功"
                });
            }
        });
    },
    formSubmit: function(e) {
        var t = this, a = this.data.xtxx.vip_qx, o = this.data.userInfo;
        if (console.log(o), "" != o.img && "" != o.nickname) {
            var n = getApp().getOpenId, s = e.detail.formId, i = wx.getStorageSync("UserData").id, l = parseFloat(this.data.zfmoney), c = this.data.zfts;
            null == c && (c = 0), console.log(i), console.log("form发生了submit事件，携带数据为：", e.detail.value, a, l, c);
            var d = this.data.yzm;
            console.log("随机生成的验证码", d);
            var r = e.detail.value.xm, u = e.detail.value.sjh, g = e.detail.value.yanzm, p = e.detail.value.sr, f = e.detail.value.xxdz, h = this.data.xtxx;
            console.log(r, u, g, p, f, h, n);
            var m = "", x = !0;
            if ("" == r) m = "请填写姓名！"; else if ("" == u) m = "请填写手机号！"; else if (11 != u.length) m = "手机号错误！"; else if ("" == g && t.data.isdx) m = "请填写您收到的验证码！"; else if (g != d && t.data.isdx) m = "验证码不正确！"; else if ("" == e.detail.value.radiogroup) m = "请选择购买有效期类型"; else {
                x = !1;
                t = this;
                var y = getCurrentPages();
                if (console.log(y), console.log(Number(h.opencard)), Number(h.opencard) <= 0 && "2" == a || "1" == a && 0 == l) console.log("免费"), 
                app.util.request({
                    url: "entry/wxapp/AddVip",
                    cachetime: "0",
                    data: {
                        user_id: i,
                        name: r,
                        tel: u,
                        birthday: p,
                        address: f,
                        day: c
                    },
                    success: function(e) {
                        (console.log(e.data), 2 != e.data) && (wx.showModal({
                            title: "恭喜成为会员",
                            content: "开卡成功"
                        }), app.util.request({
                            url: "entry/wxapp/Message2",
                            cachetime: "0",
                            data: {
                                openid: n,
                                form_id: s,
                                code: e.data.vip_code,
                                level_name: e.data.level_name,
                                name: e.data.name,
                                tel: e.data.tel
                            },
                            success: function(e) {
                                console.log("msg", e);
                            }
                        }), 1 < y.length ? (y[y.length - 2].changeData(), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)) : setTimeout(function() {
                            wx.reLaunch({
                                url: "/zh_vip/pages/index/index"
                            });
                        }, 1e3));
                        2 == e.data && wx.showToast({
                            title: "提交失败请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }); else if (0 < Number(h.opencard) && "2" == a) {
                    var w = Number(h.opencard);
                    console.log(w), app.util.request({
                        url: "entry/wxapp/AddCzOrder",
                        cachetime: "0",
                        data: {
                            user_id: i,
                            name: r,
                            tel: u,
                            birthday: p,
                            address: f,
                            money: w,
                            form_id: s
                        },
                        success: function(e) {
                            console.log(e), "下单失败" != e.data && app.util.request({
                                url: "entry/wxapp/pay2",
                                cachetime: "0",
                                data: {
                                    openid: n,
                                    money: w,
                                    order_id: e.data
                                },
                                success: function(e) {
                                    console.log(e), wx.requestPayment({
                                        timeStamp: e.data.timeStamp,
                                        nonceStr: e.data.nonceStr,
                                        package: e.data.package,
                                        signType: e.data.signType,
                                        paySign: e.data.paySign,
                                        success: function(e) {
                                            (console.log(e), wx.showModal({
                                                title: "恭喜成为会员",
                                                content: "开卡成功"
                                            }), 1 < y.length) && y[y.length - 2].changeData();
                                            setTimeout(function() {
                                                wx.navigateBack({});
                                            }, 1e3);
                                        },
                                        complete: function(e) {
                                            "requestPayment:fail cancel" == e.errMsg && wx.showToast({
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
                } else "1" == a && 0 < l && (console.log("开通期限要付费", l), app.util.request({
                    url: "entry/wxapp/AddtimeOrder",
                    cachetime: "0",
                    data: {
                        user_id: i,
                        name: r,
                        tel: u,
                        birthday: p,
                        address: f,
                        money: l,
                        day: c,
                        form_id: s
                    },
                    success: function(e) {
                        console.log(e), "下单失败" != e.data && app.util.request({
                            url: "entry/wxapp/pay4",
                            cachetime: "0",
                            data: {
                                openid: n,
                                money: l,
                                order_id: e.data
                            },
                            success: function(e) {
                                console.log(e), wx.requestPayment({
                                    timeStamp: e.data.timeStamp,
                                    nonceStr: e.data.nonceStr,
                                    package: e.data.package,
                                    signType: e.data.signType,
                                    paySign: e.data.paySign,
                                    success: function(e) {
                                        (console.log(e), wx.showModal({
                                            title: "恭喜成为会员",
                                            content: "开卡成功"
                                        }), 1 < y.length) && y[y.length - 2].changeData();
                                        setTimeout(function() {
                                            wx.navigateBack({});
                                        }, 1e3);
                                    },
                                    complete: function(e) {
                                        "requestPayment:fail cancel" == e.errMsg && wx.showToast({
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
            1 == x && wx.showModal({
                title: "提示",
                content: m
            });
        } else wx.navigateTo({
            url: "/zh_vip/pages/index/getdl"
        });
    },
    onLoad: function(e) {
        var a = this;
        app.getUserInfo(function(e) {
            console.log(e), "0" != e.grade && wx.reLaunch({
                url: "/zh_vip/pages/index/index"
            }), a.setData({
                userInfo: e
            });
            var t = wx.getStorageSync("UserData").id;
            console.log(t);
        });
        var t = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(t.toString()), this.setData({
            date: t,
            start: t
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(e) {
                console.log(e.data), "2" == e.data.is_sms && a.setData({
                    isdx: !1
                }), a.setData({
                    xtxx: e.data
                }), wx.setStorageSync("xtxx", e.data), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.link_color
                }), wx.setNavigationBarTitle({
                    title: e.data.link_name + "会员卡注册"
                });
            }
        }), app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(e) {
                console.log(e.data), a.setData({
                    url: e.data
                }), getApp().imgurl = e.data;
            }
        }), app.util.request({
            url: "entry/wxapp/VipSet",
            cachetime: "0",
            success: function(e) {
                console.log(e.data), a.setData({
                    radioItems: e.data
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