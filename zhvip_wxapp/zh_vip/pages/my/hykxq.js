var app = getApp();

Page({
    data: {},
    last: function() {
        var a = this.data.dqdj;
        console.log(a), this.setData({
            dqdj: a - 1
        });
    },
    next: function() {
        var a = this.data.dqdj;
        console.log(a), this.setData({
            dqdj: a + 1
        });
    },
    swiperchange: function(a) {
        console.log(a), this.setData({
            dqdj: a.detail.current
        });
    },
    onLoad: function(a) {
        var n = this, t = getApp().imgurl, e = wx.getStorageSync("xtxx");
        console.log(e), this.setData({
            xtxx: e,
            url: t
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.link_color
        });
        var o = wx.getStorageSync("UserData").id;
        console.log(o), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(o) {
                console.log("用户信息", o.data), app.util.request({
                    url: "entry/wxapp/Upgrade",
                    cachetime: "0",
                    data: {
                        level: o.data.grade
                    },
                    success: function(a) {
                        if (console.log("Upgrade", a.data), a.data) {
                            var t = (Number(a.data.threshold) - Number(o.data.level_cumulative)).toFixed(2);
                            console.log(t);
                            var e = (Number(o.data.level_cumulative) / Number(a.data.threshold) * 100).toFixed(2);
                            n.setData({
                                Upgrade: a.data,
                                sjxfje: t,
                                sjjd: e
                            });
                        } else n.setData({
                            Upgrade: "",
                            sjxfje: "",
                            sjjd: 100
                        });
                    }
                }), app.util.request({
                    url: "entry/wxapp/level",
                    cachetime: "0",
                    success: function(a) {
                        console.log(a.data);
                        for (var t = 0; t < a.data.length; t++) a.data[t].id == o.data.grade && (console.log(t), 
                        n.setData({
                            dqdj: t,
                            userdqdj: t
                        }));
                        n.setData({
                            imgarr: a.data
                        });
                    }
                }), n.setData({
                    userInfo: o.data
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