App({
    onLaunch: function() {},
    onShow: function() {
        console.log(getCurrentPages());
    },
    onHide: function() {
        console.log(getCurrentPages());
    },
    onError: function(e) {
        console.log(e);
    },
    getimgUrl: function(o) {
        var e = this.globalData.imgurl;
        console.log(e, o), o.setData({
            url: e
        });
        var a = this;
        e || a.util.request({
            url: "entry/wxapp/Url",
            success: function(e) {
                console.log(e), getApp().imgurl = e.data, a.globalData.imgurl = e.data, a.getimgUrl(o);
            }
        });
    },
    pageOnLoad: function(n) {
        var l = this;
        function i(e) {
            console.log(e);
            var o = !1, a = n.route || n.__route__ || null;
            for (var t in e.navs) e.navs[t].url === "/" + a ? o = e.navs[t].active = !0 : e.navs[t].active = !1;
            o && n.setData({
                _navbar: e
            });
        }
        console.log("----setPageNavbar----"), console.log(n);
        var r = {
            background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
            border_color: "rgba(0,0,0,.1)"
        }, e = l.globalData.navbar;
        console.log(e), e && i(e), e || l.util.request({
            url: "entry/wxapp/nav",
            success: function(t) {
                if (console.log(t), 0 == t.data.length) {
                    r.navs = [ {
                        logo: "/zh_vip/img/ddf.png",
                        logo2: "/zh_vip/img/dd.png",
                        title: "首页",
                        title_color: "#ff7f46",
                        title_color2: "#888",
                        url: "/zh_vip/pages/index/index"
                    }, {
                        logo: "/zh_vip/img/tabzdf.png",
                        logo2: "/zh_vip/img/tabzd.png",
                        title: "账单",
                        title_color: "#ff7f46",
                        title_color2: "#888",
                        url: "/zh_vip/pages/my/wdzd"
                    }, {
                        logo: "/zh_vip/img/myf.png",
                        logo2: "/zh_vip/img/my.png",
                        title: "我的",
                        title_color: "#ff7f46",
                        title_color2: "#888",
                        url: "/zh_vip/pages/my/my"
                    } ], i(r), l.globalData.navbar = r;
                } else l.util.request({
                    url: "entry/wxapp/url",
                    cachetime: "0",
                    success: function(e) {
                        console.log(e.data);
                        var o = e.data;
                        for (var a in t.data) t.data[a].logo = o + t.data[a].logo, t.data[a].logo2 = o + t.data[a].logo2;
                        r.navs = t.data, i(r), l.globalData.navbar = r;
                    }
                });
            }
        });
    },
    getUserInfo: function(o) {
        var a = this, e = this.globalData.userInfo;
        console.log(e), e ? a.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: e.id
            },
            success: function(e) {
                console.log("用户信息", e.data), wx.setStorageSync("UserData", e.data), o(e.data);
            }
        }) : wx.login({
            success: function(e) {
                console.log(e.code), a.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log("openid信息", e.data), getApp().getOpenId = e.data.openid, getApp().getSK = e.data.session_key, 
                        a.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: e.data.openid
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(e) {
                                console.log("用户信息", e), getApp().getuniacid = e.data.uniacid, wx.setStorageSync("UserData", e.data), 
                                a.globalData.userInfo = e.data, o(e.data);
                            }
                        });
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
    },
    util: require("we7/resource/js/util.js"),
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        } ]
    },
    globalData: {
        userInfo: null
    },
    siteInfo: require("siteinfo.js")
});