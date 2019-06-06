var app = getApp();

Page({
    data: {},
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    onLoad: function(t) {
        var o = this, n = wx.getStorageSync("xtxx");
        console.log(n), this.setData({
            xtxx: n
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n.link_color
        }), wx.setNavigationBarTitle({
            title: "关于我们"
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    answer: t.data.details
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