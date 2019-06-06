var app = getApp();

Page({
    data: {
        disabled: !0,
        zh: "",
        mm: "",
        logintext: "登录"
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    form_save: function(t) {
        console.log(t);
        var a = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: a
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    srzh: function(t) {
        console.log(t.detail.value), this.setData({
            zh: t.detail.value
        }), "" != this.data.zh && "" != this.data.mm ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    srmm: function(t) {
        console.log(t.detail.value), this.setData({
            mm: t.detail.value
        }), "" != this.data.zh && "" != this.data.mm ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    login: function() {
        var t = this.data.zh, a = this.data.mm;
        console.log(t, a), this.setData({
            logintext: "登录中...",
            disabled: !0
        });
        var e = this;
        app.util.request({
            url: "entry/wxapp/storelogin",
            cachetime: "0",
            data: {
                user: t,
                password: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    logintext: "登录",
                    disabled: !1
                }), null != t.data.storeid ? (wx.setStorageSync("sjdsjid", t.data.storeid), wx.setStorageSync("acountid", t.data.id), 
                wx.redirectTo({
                    url: "index"
                })) : wx.showModal({
                    title: "提示",
                    content: t.data
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        console.log(this), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    bqxx: t.data,
                    tel: t.data.link_tel,
                    url: getApp().imgurl
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