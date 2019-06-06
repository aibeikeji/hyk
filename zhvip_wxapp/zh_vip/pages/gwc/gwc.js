var app = getApp();

Page({
    data: {
        total_price: 0,
        cart_check_all: !1,
        cart_list: [],
        number: 1
    },
    hdsy: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        var a = wx.getStorageSync("xtxx"), e = getApp().imgurl;
        console.log(a), this.setData({
            xtxx: a,
            url: e
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.link_color
        });
    },
    numberSub: function(t) {
        var a = t.currentTarget.dataset.id, e = this.data.cart_list;
        console.log(a, e);
        for (var r = 0; r < e.length; r++) if (e[r].id == a) {
            if (e[r].num <= 1) return;
            e[r].num--;
        }
        this.setData({
            cart_list: e
        }), this.updateTotalPrice();
    },
    numberAdd: function(t) {
        var a = t.currentTarget.dataset.id, e = this.data.cart_list;
        console.log(a, e);
        for (var r = 0; r < e.length; r++) if (e[r].id == a) {
            if (e[r].num >= e[r].number) return void wx.showToast({
                title: "库存不足,无法继续添加",
                icon: "none"
            });
            e[r].num++;
        }
        this.setData({
            cart_list: e
        }), this.updateTotalPrice();
    },
    numberBlur: function(t) {
        console.log(t);
        var a = Number(t.detail.value), e = t.target.dataset.id, r = this.data.cart_list;
        console.log(a, e, r);
        for (var i = 0; i < r.length; i++) r[i].id == e && (a >= r[i].number && (a = r[i].number), 
        a <= 1 && (a = 1), r[i].num = a);
        this.setData({
            cart_list: r
        }), this.updateTotalPrice();
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    reLoad: function() {
        this.setData({
            cart_check_all: !1,
            show_cart_edit: !1,
            total_price: 0
        });
        var e = this, t = wx.getStorageSync("mdid"), a = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/MyCar",
            cachetime: "0",
            data: {
                store_id: t,
                user_id: a
            },
            success: function(t) {
                console.log(t);
                for (var a = 0; a < t.data.length; a++) "0" == t.data[a].combination_id && (t.data[a].number = t.data[a].inventory), 
                t.data[a].num = Number(t.data[a].num), t.data[a].number = Number(t.data[a].number), 
                t.data[a].money = Number(t.data[a].money);
                e.setData({
                    cart_list: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(t) {
                console.log("门店信息", t.data), e.setData({
                    mdinfo: t.data
                });
            }
        });
    },
    cartCheck: function(t) {
        var a = this, e = t.currentTarget.dataset.index, r = a.data.cart_list, i = !0;
        for (var c in r[e].checked ? r[e].checked = !1 : r[e].checked = !0, a.setData({
            cart_list: r
        }), a.updateTotalPrice(), r) if (!r[c].checked) {
            i = !1;
            break;
        }
        a.setData({
            cart_check_all: i
        });
    },
    cartCheckAll: function() {
        var t, a = this, e = a.data.cart_list;
        for (var r in t = !a.data.cart_check_all, e) e[r].disabled && !a.data.show_cart_edit || (e[r].checked = t);
        a.setData({
            cart_check_all: t,
            cart_list: e
        }), a.updateTotalPrice();
    },
    updateTotalPrice: function() {
        var t = 0, a = this.data.cart_list;
        for (var e in a) a[e].checked && (t += a[e].money * a[e].num);
        this.setData({
            total_price: t.toFixed(2)
        });
    },
    cartSubmit: function() {
        var t = this.data.cart_list, a = [];
        for (var e in t) t[e].checked && a.push(t[e]);
        if (console.log(a), wx.setStorageSync("cart_list", a), 0 == a.length) return !0;
        wx.navigateTo({
            url: "tjdd"
        });
    },
    cartEdit: function() {
        var t = this.data.cart_list;
        for (var a in t) t[a].checked = !1;
        this.setData({
            cart_list: t,
            show_cart_edit: !0,
            cart_check_all: !1
        }), this.updateTotalPrice();
    },
    cartDone: function() {
        var t = this.data.cart_list;
        for (var a in t) t[a].checked = !1;
        this.setData({
            cart_list: t,
            show_cart_edit: !1,
            cart_check_all: !1
        }), this.updateTotalPrice();
    },
    cartDelete: function() {
        var a = this, t = a.data.cart_list, e = [];
        for (var r in console.log(t), t) t[r].checked && e.push(Number(t[r].id));
        if (console.log(e.toString()), 0 == e.length) return !0;
        wx.showModal({
            title: "提示",
            content: "确认删除" + e.length + "项内容？",
            success: function(t) {
                if (t.cancel) return !0;
                wx.showLoading({
                    title: "正在删除",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/DelCar",
                    cachetime: "0",
                    data: {
                        id: e.toString()
                    },
                    success: function(t) {
                        console.log(t), wx.hideLoading(), "1" == t.data ? (wx.showToast({
                            title: "删除成功"
                        }), a.reLoad()) : wx.showModal({
                            title: "提示",
                            content: t.data
                        });
                    }
                });
            }
        });
    }
});