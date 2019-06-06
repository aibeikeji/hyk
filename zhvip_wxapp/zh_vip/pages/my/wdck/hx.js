var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log(o);
        var t = decodeURIComponent(o.scene);
        console.log(t);
        var n = t, e = o.storeid, a = o.acountid;
        this.setData({
            kid: n,
            storeid: e,
            acountid: a
        }), app.getUserInfo(function(o) {});
    },
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
    hx: function() {
        var o = this.data.storeid, t = this.data.kid, n = this.data.acountid;
        console.log("扫码人的storeid", o, "卡的id", t, "acountid", n), null == o || null == n ? wx.showModal({
            title: "",
            content: "请登录商家后台核销"
        }) : app.util.request({
            url: "entry/wxapp/HxCard",
            cachetime: "0",
            data: {
                store_id: o,
                id: t,
                hx_id: n
            },
            success: function(o) {
                console.log(o), wx.showModal({
                    title: "提示",
                    content: o.data
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3);
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