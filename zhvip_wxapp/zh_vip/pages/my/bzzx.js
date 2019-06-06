var app = getApp();

Page({
    data: {
        list: []
    },
    kindToggle: function(o) {
        var t = o.currentTarget.id, n = this.data.list;
        console.log(t);
        for (var a = 0, e = n.length; a < e; ++a) n[a].open = a == t && !n[a].open;
        this.setData({
            list: n
        });
    },
    onLoad: function(o) {
        var n = this, t = wx.getStorageSync("xtxx");
        console.log(t), this.setData({
            xtxx: t
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.link_color
        }), console.log(this), app.util.request({
            url: "entry/wxapp/GetHelp",
            cachetime: "0",
            success: function(o) {
                console.log(o.data);
                for (var t = 0; t < o.data.length; t++) o.data[t].answer = o.data[t].answer.replace(/↵/g, "\n");
                n.setData({
                    list: o.data
                });
            }
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