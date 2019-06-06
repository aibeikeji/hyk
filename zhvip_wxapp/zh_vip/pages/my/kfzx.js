var app = getApp();

Page({
    data: {},
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    onLoad: function(o) {
        var t = this, n = wx.getStorageSync("xtxx");
        console.log(n), this.setData({
            xtxx: n
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n.link_color
        }), console.log(this), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(o) {
                console.log(o.data), t.setData({
                    tel: o.data.link_tel
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