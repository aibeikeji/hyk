var app = getApp();

Page({
    data: {},
    chakan: function() {
        wx.navigateTo({
            url: "../../index/sjdl?sjid=" + this.data.sjid
        });
    },
    onLoad: function(a) {
        var t = this;
        console.log(a), this.setData({
            sjid: a.sjid
        }), app.util.request({
            url: "entry/wxapp/CouponsInfo",
            cachetime: "0",
            data: {
                coupons_id: a.yhqid
            },
            success: function(a) {
                console.log(a.data), wx.setNavigationBarTitle({
                    title: "管理" + a.data.md_name + a.data.name
                }), t.setData({
                    yhq: a.data,
                    sysl: Number(a.data.number) - Number(a.data.lq_num)
                });
            }
        }), app.util.request({
            url: "entry/wxapp/HxUserList",
            cachetime: "0",
            data: {
                coupons_id: a.yhqid
            },
            success: function(a) {
                console.log(a.data), t.setData({
                    hxlist: a.data
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