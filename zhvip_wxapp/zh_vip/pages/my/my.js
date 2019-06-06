var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        issq: !1,
        showModal: !1,
        kgvip: !1,
        isvip: !1,
        issc: !1,
        btnshowModal: !1
    },
    ljkk: function() {
        console.log(this.data.xtxx.is_stk), "1" == this.data.xtxx.is_stk ? wx.showModal({
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
        });
    },
    tzbj: function() {
        wx.navigateTo({
            url: "myinfo"
        });
    },
    tzewm: function() {
        wx.navigateTo({
            url: "ewm"
        });
    },
    xszz: function() {
        this.setData({
            showModal: !0
        });
    },
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    glkq: function() {
        wx.showModal({
            title: "提示",
            content: "此功能正在开发中，敬请期待"
        });
    },
    sjvip: function() {
        this.data.issq ? wx.navigateTo({
            url: "sjvip"
        }) : wx.showModal({
            title: "温馨提示",
            content: "成功开通门店后方能升级VIP"
        });
    },
    tjhxy: function() {
        this.data.issq ? wx.navigateTo({
            url: "tjhxy/tjhxy"
        }) : wx.showModal({
            title: "温馨提示",
            content: "成功开通门店并且发布券后方能添加核销员"
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
    previewImage: function(t) {
        console.log(t.currentTarget.dataset.img), wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: [ t.currentTarget.dataset.img ]
        });
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        var a = this, e = getApp().imgurl;
        app.util.request({
            url: "entry/wxapp/system",
            cachetime: "60",
            success: function(t) {
                console.log(t.data), a.setData({
                    xtxx: t.data,
                    url: e
                }), a.changeData(), wx.setStorageSync("xtxx", t.data), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                });
            }
        }), app.util.request({
            url: "entry/wxapp/myAd",
            cachetime: "60",
            success: function(t) {
                console.log(t), a.setData({
                    lblist: t.data
                });
            }
        });
    },
    tzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.lblist);
        var a = this.data.lblist[t.currentTarget.dataset.index];
        console.log(a), "1" == a.item && wx.navigateTo({
            url: a.src
        }), "2" == a.item && (wx.setStorageSync("vr", a.src2), wx.navigateTo({
            url: "../car/car"
        })), "3" == a.item && wx.navigateToMiniProgram({
            appId: a.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    reLoad: function() {
        console.log("reLoad()");
        var a = this;
        app.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
    },
    onReady: function() {},
    bindGetUserInfo: function(t) {
        console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
            btnshowModal: !1
        }), this.changeData());
    },
    changeData: function() {
        console.log("changeData");
        var t = wx.getStorageSync("UserData").id;
        console.log(t);
        var e = this;
        app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(a) {
                console.log("用户信息", a.data), a.data.vip_time = util.ormatDate(a.data.vip_time), 
                "" == a.data.img || "" == a.data.nickname ? wx.getSetting({
                    success: function(t) {
                        console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(t) {
                                console.log(t.userInfo), app.util.request({
                                    url: "entry/wxapp/login",
                                    cachetime: "0",
                                    data: {
                                        openid: a.data.openid,
                                        img: t.userInfo.avatarUrl,
                                        name: t.userInfo.nickName
                                    },
                                    header: {
                                        "content-type": "application/json"
                                    },
                                    dataType: "json",
                                    success: function(t) {
                                        console.log("用户信息", t), t.data.vip_time = util.ormatDate(t.data.vip_time), e.setData({
                                            userInfo: t.data
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), e.setData({
                            btnshowModal: !0
                        }));
                    }
                }) : e.setData({
                    userInfo: a.data
                });
            }
        }), "1" == this.data.xtxx.vip_qx && app.util.request({
            url: "entry/wxapp/IsDq",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    isdq: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    MyCoupons: t.data.length
                });
            }
        });
    },
    onShow: function() {
        console.log(this.data._navbar.navs);
        var t = this.data._navbar.navs;
        for (var a in t) "/zh_vip/pages/psdj/psdj" !== t[a].url && "/zh_vip/pages/ksgm/takeoutindex" !== t[a].url || this.setData({
            issc: !0
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.changeData(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {}
});