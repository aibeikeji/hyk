var app = getApp();

Page({
    data: {
        countries: [ "现金收款", "微信收款", "支付宝收款", "刷卡收款" ],
        countryIndex: 0,
        disabled: !0
    },
    onLoad: function(t) {
        console.log(t);
        var e = this, a = wx.getStorageSync("sjdsjid");
        console.log(a), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t.uid
            },
            success: function(t) {
                console.log("用户信息", t.data), e.setData({
                    userInfo: t.data,
                    discount: t.data.discount
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(t) {
                console.log("门店信息", t.data), e.setData({
                    mdinfo: t.data
                }), wx.setNavigationBarTitle({
                    title: t.data.name + "充值"
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Czhd",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    czhd: t.data
                });
            }
        });
    },
    jsmj: function(t, e) {
        for (var a, o = 0; o < e.length; o++) if (Number(t) >= Number(e[o].full)) {
            a = o;
            break;
        }
        return a;
    },
    bindInput: function(t) {
        console.log(t.detail.value), this.setData({
            czje: t.detail.value
        }), "" != t.detail.value ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    bindCountryChange: function(t) {
        console.log("picker country 发生选择改变，携带值为", t.detail.value), this.setData({
            countryIndex: t.detail.value
        });
    },
    formSubmit: function(t) {
        var a = this;
        console.log("form发生了submit事件，携带数据为：", t.detail, t.detail.formId);
        var e = wx.getStorageSync("sjdzh"), o = t.detail.value.czje, n = this.data.countries[t.detail.value.fkfs], i = t.detail.value.beizhu, s = this.data.userInfo.id, u = this.data.mdinfo.id;
        console.log(e, o, s, u, n, i), a.setData({
            disabled: !0
        });
        var d = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: d
            },
            success: function(t) {
                console.log(t);
            }
        }), app.util.request({
            url: "entry/wxapp/StoreRecharge",
            cachetime: "0",
            data: {
                user_id: s,
                money: o,
                store_id: u,
                account_id: e.id,
                type: n,
                note: i
            },
            success: function(t) {
                console.log(t);
                var e = t.data;
                "下单失败！" != t.data ? (wx.showToast({
                    title: "充值成功",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3), app.util.request({
                    url: "entry/wxapp/czPrint2",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t);
                    }
                })) : (wx.showToast({
                    title: "请重试！"
                }), a.setData({
                    disabled: !1
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});