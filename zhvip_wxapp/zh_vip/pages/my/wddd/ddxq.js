var app = getApp();

Page({
    data: {
        order: null,
        getGoodsTotalPrice: function() {
            return this.data.order.total_price;
        }
    },
    onLoad: function(t) {
        var e = this, o = wx.getStorageSync("xtxx"), a = getApp().imgurl;
        console.log(o), this.setData({
            xtxx: o,
            url: a
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: o.link_color
        }), wx.showLoading({
            title: "正在加载"
        }), app.util.request({
            url: "entry/wxapp/MallOrderInfo",
            data: {
                order_id: t.oid
            },
            success: function(t) {
                console.log(t);
                for (var o = 0, a = 0; a < t.data.good.length; a++) o += Number(t.data.good[a].number);
                t.data.order.spnum = o, e.setData({
                    order: t.data.order,
                    good: t.data.good
                }), app.util.request({
                    url: "entry/wxapp/StoreInfo",
                    cachetime: "0",
                    data: {
                        id: t.data.order.store_id
                    },
                    success: function(t) {
                        console.log("门店信息", t.data), e.setData({
                            mdinfo: t.data
                        });
                    }
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    copyText: function(t) {
        var o = t.currentTarget.dataset.text;
        wx.setClipboardData({
            data: o,
            success: function() {
                wx.showToast({
                    title: "已复制"
                });
            }
        });
    },
    location: function() {
        var t = this.data.mdinfo.coordinates.split(","), o = this.data.mdinfo;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: o.address,
            name: o.name
        });
    }
});