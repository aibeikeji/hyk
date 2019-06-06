var qqmapsdk, app = getApp(), QQMapWX = require("../../utils/qqmap-wx-jssdk.js"), util = require("../../utils/util.js");

Page({
    data: {
        open: !1,
        sqlq: !1
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
    ljkk: function() {
        var t = this.data.userInfo;
        "" != t.img && "" != t.nickname ? (console.log(this.data.xtxx.is_stk), "1" == this.data.xtxx.is_stk ? wx.showModal({
            title: "提示",
            content: "请选择开卡类型",
            confirmText: "办会员卡",
            cancelColor: "#3CC51F",
            cancelText: "绑定实卡",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.navigateTo({
                    url: "../my/login"
                })) : t.cancel && (console.log("用户点击取消"), wx.navigateTo({
                    url: "../my/stklogin"
                }));
            }
        }) : wx.navigateTo({
            url: "../my/login"
        })) : wx.navigateTo({
            url: "/zh_vip/pages/index/getdl"
        });
    },
    tradeinfo: function(t) {
        console.log(t.currentTarget.dataset.id);
        var a = t.currentTarget.dataset.id, e = this.data.unreceive, o = this.data.received;
        console.log(a);
        for (var n = 0, s = e.length; n < s; ++n) e[n].id == a ? e[n].open = !e[n].open : e[n].open = !1;
        for (n = 0, s = o.length; n < s; ++n) o[n].id == a ? o[n].open = !o[n].open : o[n].open = !1;
        this.setData({
            unreceive: e,
            received: o
        });
    },
    sqlq: function() {
        console.log("sqlq");
        this.setData({
            sqlq: !this.data.sqlq
        });
    },
    maketel: function(t) {
        console.log(t.currentTarget.dataset.tel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    ckwz: function(t) {
        console.log(t.currentTarget.dataset.jwd);
        var a = t.currentTarget.dataset.jwd.split(",");
        console.log(a);
        wx.openLocation({
            latitude: Number(a[0]),
            longitude: Number(a[1]),
            name: this.data.mdinfo.name,
            address: this.data.mdinfo.address
        });
    },
    qhmd: function() {
        wx.navigateTo({
            url: "qhmd"
        });
    },
    md: function() {
        console.log(this.data.userInfo, this.data.xtxx.vip_qx, this.data.isdq), "0" != this.data.userInfo.grade ? "0" == this.data.userInfo.grade || "1" != this.data.xtxx.vip_qx || "1" != this.data.isdq ? wx.navigateTo({
            url: "md"
        }) : wx.showModal({
            title: "提示",
            content: "您的会员卡已到期，请点击立即续费后使用此功能"
        }) : wx.showModal({
            title: "提示",
            content: "请点击立即开卡，开卡后使用此功能"
        });
    },
    cz: function() {
        "0" != this.data.userInfo.grade ? "0" == this.data.userInfo.grade || "1" != this.data.xtxx.vip_qx || "1" != this.data.isdq ? wx.navigateTo({
            url: "cz"
        }) : wx.showModal({
            title: "提示",
            content: "您的会员卡已到期，请点击立即续费后使用此功能"
        }) : wx.showModal({
            title: "提示",
            content: "请点击立即开卡，开卡后使用此功能"
        });
    },
    mflq: function(t) {
        if (console.log(t.currentTarget.dataset.id, t.currentTarget.dataset.lqdj, this.data.userInfo.level_type), 
        console.log(this.data.userInfo, this.data.xtxx.vip_qx, this.data.isdq), "0" != this.data.userInfo.grade) if ("0" == this.data.userInfo.grade || "1" != this.data.xtxx.vip_qx || "1" != this.data.isdq) {
            var a = this, e = wx.getStorageSync("UserData").id, o = wx.getStorageSync("mdid");
            console.log(e, o), Number(a.data.userInfo.level_type) < Number(t.currentTarget.dataset.lqdj) ? wx.showModal({
                title: "提示",
                content: "您的会员等级不足以领此券哦~"
            }) : (a.setData({
                lqdisabledid: t.currentTarget.dataset.id
            }), app.util.request({
                url: "entry/wxapp/AddCoupons",
                cachetime: "0",
                data: {
                    user_id: e,
                    coupons_id: t.currentTarget.dataset.id
                },
                success: function(t) {
                    console.log(t.data), 1 == t.data ? (wx.showToast({
                        title: "领取成功"
                    }), setTimeout(function() {
                        a.lqyhq(e, o);
                    }, 1e3)) : (a.setData({
                        lqdisabledid: ""
                    }), wx.showToast({
                        title: "网络问题"
                    }));
                }
            }));
        } else wx.showModal({
            title: "提示",
            content: "您的会员卡已到期，请点击立即续费后领券"
        }); else wx.showModal({
            title: "提示",
            content: "请点击立即开卡，开卡后领券"
        });
    },
    tzxcx: function(t) {
        console.log(t.currentTarget.dataset.appid), wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    topjumps: function(t) {
        var a = t.currentTarget.dataset.appid, e = t.currentTarget.dataset.src, o = t.currentTarget.dataset.websrc, n = t.currentTarget.dataset.item;
        if (console.log(a, e, o, n), 1 == n) {
            if (console.log(e), "/zh_vip/pages/index/cz" == e || "/zh_vip/pages/index/md" == e) {
                if ("0" == this.data.userInfo.grade) return void wx.showModal({
                    title: "提示",
                    content: "请点击立即开卡，开卡后使用此功能"
                });
                if ("0" != this.data.userInfo.grade && "1" == this.data.xtxx.vip_qx && "1" == this.data.isdq) return void wx.showModal({
                    title: "提示",
                    content: "您的会员卡已到期，请点击立即续费后使用此功能"
                });
            }
            wx.navigateTo({
                url: e
            });
        } else 2 == n ? (wx.setStorageSync("vr", o), wx.navigateTo({
            url: "../car/car"
        })) : 3 == n && wx.navigateToMiniProgram({
            appId: a
        });
    },
    jumps: function(t) {
        var a = this.data.xtxx.qhmd_name, e = this.data.xtxx.qhmd_appid, o = this.data.xtxx.qhmd_url, n = this.data.xtxx.qhmd_url2, s = this.data.xtxx.qhmd_type;
        console.log(a, e, o, s), 1 == s ? (console.log(o), wx.navigateTo({
            url: o
        })) : 2 == s ? (wx.setStorageSync("vr", n), wx.navigateTo({
            url: "../car/car"
        })) : 3 == s && wx.navigateToMiniProgram({
            appId: e
        });
    },
    onLoad: function(o) {
        console.log("onLoad()", o), app.pageOnLoad(this);
        var n = this;
        app.getimgUrl(n), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "60",
            success: function(e) {
                console.log(e.data), n.setData({
                    xtxx: e.data
                }), wx.setStorageSync("xtxx", e.data), qqmapsdk = new QQMapWX({
                    key: e.data.mapkey
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.link_color
                }), wx.setNavigationBarTitle({
                    title: e.data.link_name
                }), app.getUserInfo(function(t) {
                    var a = decodeURIComponent(o.scene);
                    console.log("scene", a, wx.getStorageSync("mdid")), "undefined" != a ? n.StoreInfo(a) : "" != wx.getStorageSync("mdid") ? n.StoreInfo(wx.getStorageSync("mdid")) : n.reLoad(t.id), 
                    console.log(t), "" != t.img && "" != t.nickname || wx.navigateTo({
                        url: "/zh_vip/pages/index/getdl"
                    }), n.setData({
                        userInfo: t
                    }), "1" == e.data.vip_qx && app.util.request({
                        url: "entry/wxapp/IsDq",
                        cachetime: "0",
                        data: {
                            user_id: t.id
                        },
                        success: function(t) {
                            console.log(t.data), n.setData({
                                isdq: t.data
                            });
                        }
                    });
                });
            }
        }), app.util.request({
            url: "entry/wxapp/DelAllCoupons",
            cachetime: "0",
            success: function(t) {
                console.log("DelAllCoupons", t.data);
            }
        }), app.util.request({
            url: "entry/wxapp/TopNav",
            cachetime: "0",
            success: function(t) {
                console.log("TopNav", t.data), n.setData({
                    TopNav: t.data
                });
            }
        });
    },
    reLoad: function(a) {
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), app.util.request({
                    url: "entry/wxapp/Store",
                    cachetime: "0",
                    data: {
                        lat: t.latitude,
                        lng: t.longitude
                    },
                    success: function(t) {
                        console.log("门店信息", t.data), e.lqyhq(a, t.data.id), wx.setStorageSync("mdid", t.data.id), 
                        e.setData({
                            mdinfo: t.data
                        });
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    title: "警告",
                    content: "您点击了拒绝授权,无法正常使用功能，点击确定重新获取授权。",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.userLocation"], e.onLoad();
                            },
                            fail: function(t) {}
                        });
                    }
                });
            }
        });
    },
    StoreInfo: function(t) {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            mask: !0
        });
        var a = this, e = wx.getStorageSync("UserData").id;
        console.log(e), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(t) {
                console.log("门店信息", t.data), a.setData({
                    sxwb: !1,
                    mdinfo: t.data
                }), wx.showToast({
                    title: "加载中",
                    icon: "loading",
                    mask: !0
                }), a.lqyhq(e, t.data.id), wx.setStorageSync("mdid", t.data.id);
            }
        });
    },
    onReady: function() {},
    changeData: function() {
        console.log("changeData");
        var t = wx.getStorageSync("UserData").id;
        console.log(t);
        var a = this;
        app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("用户信息", t.data), a.setData({
                    userInfo: t.data
                });
            }
        }), "1" == this.data.xtxx.vip_qx && app.util.request({
            url: "entry/wxapp/IsDq",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    isdq: t.data
                });
            }
        });
    },
    lqyhq: function(t, a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: t,
                store_id: a
            },
            success: function(t) {
                console.log("优惠券信息", t.data);
                var a = e.getIdDataSet(t.data.ok);
                e.classify(t.data.all, a);
            }
        });
    },
    getIdDataSet: function(t) {
        for (var a = new Array(), e = t.length, o = 0; o < e; o++) a.push(t[o].coupons_id);
        return a;
    },
    classify: function(t, a) {
        for (var e = new Array(), o = new Array(), n = t.length, s = 0; s < n; s++) -1 === a.indexOf(t[s].id) ? o.push(t[s]) : e.push(t[s]);
        console.log(o, e), this.setData({
            unreceive: o,
            received: e,
            sxwb: !0
        });
    },
    onShow: function() {
        console.log("onshow()");
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.getStorageSync("UserData").id;
        var t = wx.getStorageSync("mdid");
        this.changeData(), this.data.sxwb ? (console.log(this.data.sxwb), this.StoreInfo(t)) : console.log(this.data.sxwb), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});