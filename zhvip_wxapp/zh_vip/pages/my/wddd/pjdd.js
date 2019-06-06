var app = getApp(), siteinfo = require("../../../../siteinfo.js");

Page({
    data: {
        goods_list: [],
        images: []
    },
    onLoad: function(t) {
        var o = wx.getStorageSync("xtxx"), e = getApp().imgurl;
        console.log(o), this.setData({
            xtxx: o,
            url: e
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: o.link_color
        });
        var a = this, i = wx.getStorageSync("UserData");
        console.log(t, i), a.setData({
            order_id: t.oid
        }), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/MallOrderInfo",
            data: {
                order_id: t.oid
            },
            success: function(t) {
                console.log(t);
                for (var o = 0; o < t.data.good.length; o++) t.data.good[o].pic_list = [], t.data.good[o].uploaded_pic_list = [];
                a.setData({
                    goods_list: t.data.good,
                    orderinfo: t.data
                });
            }
        });
    },
    setScore: function(t) {
        var o = t.currentTarget.dataset.index, e = t.currentTarget.dataset.score, a = this.data.goods_list;
        a[o].score = e, this.setData({
            goods_list: a
        });
    },
    contentInput: function(t) {
        var o = this, e = t.currentTarget.dataset.index;
        o.data.goods_list[e].content = t.detail.value, o.setData({
            goods_list: o.data.goods_list
        });
    },
    chooseImage: function(t) {
        var o = this, e = t.currentTarget.dataset.index, a = o.data.goods_list, i = a[e].pic_list.length;
        console.log(e, a), wx.chooseImage({
            count: 3 - i,
            success: function(t) {
                a[e].pic_list = a[e].pic_list.concat(t.tempFilePaths), o.setData({
                    goods_list: a
                }), console.log(a);
            }
        });
    },
    deleteImage: function(t) {
        var o = t.currentTarget.dataset.index, e = t.currentTarget.dataset.picIndex, a = this.data.goods_list;
        console.log(o, e), a[o].pic_list.splice(e, 1), this.setData({
            goods_list: a
        }), console.log(a);
    },
    commentSubmit: function(t) {
        var o = this;
        wx.showLoading({
            title: "正在提交",
            mask: !0
        });
        var r = o.data.goods_list;
        for (var t in console.log(r), r) if (!r[t].score) return void wx.showModal({
            title: "提示",
            content: "有商品未置评！"
        });
        !function e(a) {
            if (a == r.length) return function() {
                var e = wx.getStorageSync("UserData").id, a = wx.getStorageSync("UserData").nickname, i = wx.getStorageSync("UserData").img, s = o.data.orderinfo.order.store_id, t = o.data.orderinfo.order.id;
                console.log("上传图片完毕", r, e, i, a, s);
                var n = [];
                r.map(function(t) {
                    null == t.content && (t.content = "");
                    var o = {};
                    o.user_id = e, o.user_img = i, o.user_name = a, o.store_id = s, o.good_id = t.good_id, 
                    o.spec = t.spec, o.score = t.score, o.content = t.content, o.img = t.uploaded_pic_list.toString(), 
                    n.push(o);
                }), console.log(n), app.util.request({
                    url: "entry/wxapp/Assess",
                    cachetime: "0",
                    data: {
                        sz: n,
                        order_id: t
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "评价成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=4"
                            });
                        }, 1e3), console.log("Assess", t.data);
                    }
                });
            }();
            var i = 0;
            if (!r[a].pic_list.length || 0 == r[a].pic_list.length) return e(a + 1);
            for (var t in r[a].pic_list) !function(o) {
                wx.uploadFile({
                    url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_vip",
                    name: "upfile",
                    filePath: r[a].pic_list[o],
                    success: function(t) {
                        if (console.log("上传图片返回值", t), "" != t.data && (r[a].uploaded_pic_list[o] = t.data), 
                        ++i == r[a].pic_list.length) return e(a + 1);
                    }
                });
            }(t);
        }(0);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});