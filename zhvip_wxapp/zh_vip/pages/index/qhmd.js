var qqmapsdk, searchTitle = "", app = getApp(), QQMapWX = require("../../utils/qqmap-wx-jssdk.js"), util = require("../../utils/util.js");

Page({
    data: {
        listarr: [ "推荐排序", "距您最近", "人气优先" ],
        weizhi: "定位中...",
        activeIndex: 0,
        qqsj: !1,
        msgList: [],
        searchLogList: [],
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        searchLogShowed: !0,
        scrollHeight: 0,
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0
    },
    showInput: function() {
        this.setData({
            inputShowed: !0,
            searchLogShowed: !0
        });
    },
    comparesx: function(o) {
        return function(t, e) {
            var a = t[o], s = e[o];
            return isNaN(Number(a)) || isNaN(Number(s)) || (a = Number(a), s = Number(s)), a < s ? -1 : s < a ? 1 : 0;
        };
    },
    comparejx: function(o) {
        return function(t, e) {
            var a = t[o], s = e[o];
            return isNaN(Number(a)) || isNaN(Number(s)) || (a = Number(a), s = Number(s)), a < s ? 1 : s < a ? -1 : 0;
        };
    },
    searchData: function() {
        console.log(searchTitle);
        var t = this;
        t.setData({
            scrollTop: 0,
            storelist: [],
            tjstorelist: [],
            jlstorelist: [],
            jlpx: [],
            rqpx: [],
            pagenum: 1,
            mygd: !1,
            qqsj: !1
        }), "" != searchTitle ? t.tjpx(t.data.start, searchTitle) : (wx.showToast({
            title: "搜索内容为空",
            icon: "loading",
            duration: 1e3
        }), t.setData({
            qqsj: !0,
            mygd: !0
        }));
    },
    clearInput: function() {
        this.setData({
            msgList: [],
            scrollTop: 0,
            inputVal: ""
        }), searchTitle = "";
    },
    inputTyping: function(t) {
        this.setData({
            inputVal: t.detail.value,
            searchLogShowed: !0
        }), searchTitle = t.detail.value;
    },
    tabClick: function(t) {
        var e = this, a = t.currentTarget.id;
        console.log(a), this.setData({
            activeIndex: t.currentTarget.id,
            qqsj: !1
        }), "0" == a && e.setData({
            tjstorelist: e.data.storelist,
            qqsj: !0
        }), "1" == a && e.setData({
            jlstorelist: e.data.jlpx.sort(e.comparesx("aa1")),
            qqsj: !0
        }), "2" == a && e.setData({
            tjstorelist: e.data.rqpx.sort(e.comparejx("sentiment")),
            qqsj: !0
        });
    },
    tzsj: function(t) {
        if (console.log(t.currentTarget.dataset.sjid, t.currentTarget.dataset.type, t.currentTarget.dataset.appid), 
        "2" == t.currentTarget.dataset.type) wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.appid,
            success: function(t) {
                console.log(t);
            }
        }); else {
            wx.navigateBack({});
            var e = getCurrentPages();
            if (console.log(e), 1 < e.length) e[e.length - 2].StoreInfo(t.currentTarget.dataset.sjid);
        }
    },
    onLoad: function(t) {
        searchTitle = "";
        var o = this;
        app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    xtxx: t.data
                }), wx.setStorageSync("xtxx", t.data), qqmapsdk = new QQMapWX({
                    key: t.data.mapkey
                }), wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        var e = t.latitude, a = t.longitude, s = e + "," + a;
                        console.log(s), qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: e,
                                longitude: a
                            },
                            coord_type: 1,
                            success: function(t) {
                                var e = t.result.ad_info.location;
                                console.log(t), console.log(t.result.formatted_addresses.recommend), console.log("坐标转地址后的经纬度：", t.result.ad_info.location), 
                                o.setData({
                                    weizhi: t.result.formatted_addresses.recommend,
                                    start: e
                                }), o.tjpx(o.data.start, searchTitle);
                            },
                            fail: function(t) {
                                console.log(t);
                            },
                            complete: function(t) {
                                console.log(t);
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
                                        t.authSetting["scope.userLocation"], o.onLoad();
                                    },
                                    fail: function(t) {}
                                });
                            }
                        });
                    },
                    complete: function(t) {}
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                }), wx.setNavigationBarTitle({
                    title: t.data.link_name
                });
            }
        }), app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/ad",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    lbarr: t.data
                });
            }
        });
    },
    tjpx: function(n, t) {
        console.log(t);
        var i = this;
        app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                page: i.data.pagenum,
                pagesize: 3,
                name: t
            },
            success: function(t) {
                console.log("分页返回的商家列表数据", t.data), t.data.length < 3 ? i.setData({
                    mygd: !0,
                    jzgd: !0,
                    qqsj: !0
                }) : i.setData({
                    jzgd: !0,
                    pagenum: i.data.pagenum + 1
                });
                var e = i.data.storelist;
                e = e.concat(t.data);
                for (var a = 0; a < e.length; a++) {
                    var s = e[a].coordinates.split(",");
                    console.log(s, n);
                    var o = util.getDistance(n.lat, n.lng, s[0], s[1]).toFixed(1);
                    console.log(o), e[a].aa = o < 1e3 ? o + "m" : (o / 1e3).toFixed(2) + "km", e[a].aa1 = o, 
                    i.setData({
                        tjstorelist: e,
                        storelist: e,
                        jlpx: e,
                        rqpx: e,
                        qqsj: !0
                    }), i.setData({
                        jlstorelist: i.data.jlpx.sort(i.comparesx("aa1"))
                    });
                }
                console.log("商家列表数据", e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), this.setData({
            scrollTop: 0,
            inputVal: "",
            activeIndex: 0,
            storelist: [],
            tjstorelist: [],
            jlstorelist: [],
            jlpx: [],
            rqpx: [],
            pagenum: 1,
            mygd: !1,
            qqsj: !1
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.tjpx(this.data.start, searchTitle));
    },
    onShareAppMessage: function() {}
});