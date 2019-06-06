var app = getApp();

Page({
    data: {
        slide: [ {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/tdJ70qw1fEfjfVJfFDD09570eqF28d.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/k5JQwpBfpb0u8sNNy5l5bhlnrhl33W.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/zUeEednDedmUkIUumN9XI6IXU91eko.jpg"
        } ],
        fenlei: [],
        commodity: []
    },
    tzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.lblist);
        var o = this.data.lblist[t.currentTarget.dataset.index];
        console.log(o), "1" == o.item && wx.redirectTo({
            url: "../" + o.src
        }), "2" == o.item && (wx.setStorageSync("vr", o.src2), wx.navigateTo({
            url: "../../car/car"
        })), "3" == o.item && wx.navigateToMiniProgram({
            appId: o.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    onLoad: function(t) {
        var o = wx.getStorageSync("xtxx");
        console.log(o), this.setData({
            xtxx: o
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: o.link_color
        });
        var e = getApp().imgurl;
        this.setData({
            url: e
        });
        var a = this;
        this.reLoad(), app.util.request({
            url: "entry/wxapp/Ad3",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    lblist: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Jftype",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    fenlei: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/JfGoods",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    commodity: t.data
                });
            }
        });
    },
    reLoad: function() {
        var o = this, t = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    integral: t.data.integral
                });
            }
        });
    },
    record: function(t) {
        wx.navigateTo({
            url: "record/record"
        });
    },
    interinfo: function(t) {
        console.log(t.currentTarget.id), wx.navigateTo({
            url: "integralinfo/integralinfo?id=" + t.currentTarget.id
        });
    },
    cxfl: function(t) {
        console.log(t.currentTarget.id);
        var o = this;
        app.util.request({
            url: "entry/wxapp/JftypeGoods",
            cachetime: "0",
            data: {
                type_id: t.currentTarget.id
            },
            success: function(t) {
                console.log(t), o.setData({
                    commodity: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});