var app = getApp();

Page({
    data: {
        address_list: null
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        wx.showNavigationBarLoading();
        var o = this, e = wx.getStorageSync("xtxx"), t = getApp().imgurl;
        console.log(e), this.setData({
            xtxx: e,
            url: t
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.link_color
        });
        var a = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/MyAddress",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(e) {
                console.log(e);
                for (var t = 0; t < e.data.length; t++) e.data[t].address = e.data[t].area.join("") + e.data[t].address;
                console.log(e), o.setData({
                    address_list: e.data
                });
            }
        });
    },
    form_save: function(e) {
        console.log(e);
        var t = e.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: t
            },
            success: function(e) {
                console.log(e);
            }
        });
    },
    bianji: function(e) {
        var t = e.currentTarget.dataset.bjid;
        console.log(t), wx.navigateTo({
            url: "bjdz?bjid=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    shanchu: function(e) {
        console.log(e.currentTarget.dataset.scid);
        var t = e.currentTarget.dataset.scid, o = this;
        wx.showModal({
            title: "提示",
            content: "确定要删除该地址吗？",
            confirmText: "确定",
            cancelText: "取消",
            success: function(e) {
                console.log(e), e.confirm ? (app.util.request({
                    url: "entry/wxapp/DelAdd",
                    cachetime: "0",
                    data: {
                        id: t
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        console.log(e), "1" == e.data && (o.onShow(), wx.showToast({
                            title: "删除成功",
                            icon: "success"
                        }));
                    }
                }), console.log("用户点击确定")) : console.log("用户点击取消");
            }
        });
    },
    radioChange: function(e) {
        wx.getStorageSync("mydata").id;
        var t = this;
        console.log("radio发生change事件，携带value值为：", e.detail.value);
        var o = e.detail.value;
        app.util.request({
            url: "entry/wxapp/AddDefault",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(e) {
                console.log(e), "1" == e.data && (t.onShow(), wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3));
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    getWechatAddress: function(e) {
        var t = wx.getStorageSync("UserData").id, o = this;
        wx.chooseAddress({
            success: function(e) {
                console.log(e), "chooseAddress:ok" == e.errMsg && (wx.showLoading(), app.util.request({
                    url: "entry/wxapp/AddAddress",
                    cachetime: "0",
                    data: {
                        address: e.detailInfo,
                        area: e.provinceName + "," + e.cityName + "," + e.countyName,
                        user_name: e.userName,
                        user_id: t,
                        tel: e.telNumber
                    },
                    success: function(e) {
                        console.log(e.data), "1" == e.data && (wx.showToast({
                            title: "保存成功",
                            duration: 1e3
                        }), o.onShow());
                    }
                }));
            },
            fail: function() {
                wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.address"] ? console.log("取消") : wx.showModal({
                            title: "提示",
                            content: "您拒绝了获取收货地址授权，部分功能无法使用,点击确定重新获取授权。",
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.address"] && o.getWechatAddress();
                                    },
                                    fail: function(e) {}
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});