var app = getApp();

Page({
    data: {
        name: "",
        mobile: "",
        detail: "",
        region: []
    },
    onLoad: function(e) {
        console.log(e.bjid), e.bjid && app.util.request({
            url: "entry/wxapp/MyAddressInfo",
            cachetime: "0",
            data: {
                id: e.bjid
            },
            success: function(e) {
                console.log(e.data), a.setData({
                    name: e.data.user_name,
                    mobile: e.data.tel,
                    detail: e.data.address,
                    region: e.data.area
                });
            }
        });
        var a = this, t = wx.getStorageSync("xtxx");
        console.log(t), this.setData({
            xtxx: t,
            bjid: e.bjid
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.link_color
        });
    },
    bindRegionChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            region: e.detail.value
        });
    },
    dingwei: function(e) {
        console.log(e);
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                console.log(e);
                var a = e.address.indexOf("区");
                console.log(e.address.substring(a + 1) + e.name), t.setData({
                    detail: e.address.substring(a + 1) + e.name
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "您点击了拒绝位置授权，部分功能无法使用,点击确定重新获取授权。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.userLocation"] && t.dingwei();
                            },
                            fail: function(e) {}
                        });
                    }
                });
            }
        });
    },
    formSubmit: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var a = wx.getStorageSync("UserData").id, t = e.detail.value.name, o = e.detail.value.mobile, n = e.detail.value.picker.toString(), i = e.detail.value.detail, s = this.data.bjid;
        console.log(a, t, o, n, i, s);
        var d = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: d
            },
            success: function(e) {
                console.log(e);
            }
        });
        var l = "", c = !0;
        "" == t ? l = "请填写收货人！" : "" == o ? l = "请填写手机号！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(o) && 11 == o.length ? "" == n ? l = "请选择所在地区！" : "" == i ? l = "请填写详细地址！" : (c = !1, 
        wx.showLoading({
            title: "保存中...",
            mask: !0
        }), null == s ? app.util.request({
            url: "entry/wxapp/AddAddress",
            cachetime: "0",
            data: {
                address: i,
                area: n,
                user_name: t,
                user_id: a,
                tel: o
            },
            success: function(e) {
                console.log(e.data), "1" == e.data && (wx.showToast({
                    title: "保存成功",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3));
            }
        }) : app.util.request({
            url: "entry/wxapp/UpdAddress",
            cachetime: "0",
            data: {
                address: i,
                area: n,
                user_name: t,
                id: s,
                tel: o
            },
            success: function(e) {
                console.log(e.data), "1" == e.data && (wx.showToast({
                    title: "保存成功",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3));
            }
        })) : l = "手机号错误！", 1 == c && wx.showModal({
            title: "提示",
            content: l
        });
    },
    onReady: function() {},
    onShow: function() {}
});