var dsq, app = getApp();

Page({
    data: {},
    form_save: function(o) {
        console.log(o);
        var t = o.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: t
            },
            success: function(o) {
                console.log(o);
            }
        });
    },
    onLoad: function(o) {
        console.log(o);
        var t = this, n = wx.getStorageSync("xtxx");
        console.log(n), this.setData({
            xtxx: n
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: n.link_color
        });
        var a = wx.getStorageSync("UserData").id;
        console.log(a), app.util.request({
            url: "entry/wxapp/MyCardInfo",
            cachetime: "0",
            data: {
                id: o.kid
            },
            success: function(o) {
                console.log(o.data), t.setData({
                    yhq: o.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(dsq);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});