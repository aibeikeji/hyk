var app = getApp();

Page({
    data: {
        fwxy: !0,
        disabled: !1,
        logintext: "申请成为分销商"
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/GetPlatform",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    pt_name: t.data.name,
                    url: getApp().imgurl
                });
            }
        }), app.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    img: t.data.img2,
                    fx_details: t.data.fx_details,
                    fxset: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MySx",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t.data), t.data ? e.setData({
                    yqr: t.data.nickname
                }) : e.setData({
                    yqr: "总店"
                });
            }
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var e = this, a = wx.getStorageSync("UserData").id, o = t.detail.value.name, n = t.detail.value.tel, i = t.detail.value.checkbox.length;
        console.log(a, o, n, i);
        var s = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: s
            },
            success: function(t) {
                console.log(t);
            }
        });
        var l = "", u = !0;
        "" == o ? l = "请填写姓名！" : "" == n ? l = "请填写联系电话！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(n) && 11 == n.length ? 0 == i ? l = "阅读并同意分销商申请协议" : (e.setData({
            disabled: !0,
            logintext: "提交中..."
        }), u = !1, app.util.request({
            url: "entry/wxapp/Distribution",
            cachetime: "0",
            data: {
                user_id: a,
                user_name: o,
                user_tel: n
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), e.setData({
                    disabled: !1,
                    logintext: "申请成为分销商"
                }));
            }
        })) : l = "手机号错误！", 1 == u && wx.showModal({
            title: "提示",
            content: l
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