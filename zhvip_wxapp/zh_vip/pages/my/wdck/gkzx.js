var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = wx.getStorageSync("xtxx");
        console.log(t), this.setData({
            xtxx: t,
            url: getApp().imgurl
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.link_color
        });
    },
    reLoad: function() {
        var r = this, t = wx.getStorageSync("UserData").id;
        console.log(t), app.util.request({
            url: "entry/wxapp/NumCardList",
            cachetime: "0",
            success: function(o) {
                console.log(o.data);
                var e = o.data;
                app.util.request({
                    url: "entry/wxapp/MyCardList",
                    cachetime: "0",
                    data: {
                        user_id: t,
                        yxq: "未失效"
                    },
                    success: function(o) {
                        console.log(o.data);
                        for (var t = o.data, a = 0; a < t.length; a++) for (var n = 0; n < e.length; n++) t[a].card_id == e[n].id && (e[n].isgm = !0);
                        console.log(e), r.setData({
                            list: e
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});