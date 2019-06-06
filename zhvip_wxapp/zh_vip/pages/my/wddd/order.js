var app = getApp();

Page({
    data: {
        status: 1,
        order_list: [],
        show_no_data_tip: !1,
        hide: 1,
        qrcode: "",
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("xtxx"), a = getApp().imgurl;
        console.log(e), this.setData({
            xtxx: e,
            url: a
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.link_color
        });
        console.log(t), this.setData({
            status: t.status
        }), this.reLoad();
    },
    form_save: function(t) {
        console.log(t);
        var e = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: e
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    reLoad: function() {
        var a = this, t = this.data.status || 1, e = wx.getStorageSync("UserData").id, o = this.data.pagenum;
        "4" == t && (t = "4,5"), "5" == t && (t = "6,7,8"), console.log(t, e, o), app.util.request({
            url: "entry/wxapp/MyMallOrder",
            cachetime: "0",
            data: {
                state: t,
                user_id: e,
                page: o,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回的列表数据", t.data), t.data.length < 3 ? a.setData({
                    mygd: !0,
                    jzgd: !0
                }) : a.setData({
                    jzgd: !0,
                    pagenum: a.data.pagenum + 1
                });
                var e = a.data.storelist;
                e = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(e = e.concat(t.data)), a.setData({
                    order_list: e,
                    storelist: e
                }), console.log(e);
            }
        });
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad());
    },
    orderPay: function(t) {
        var e = getApp().getOpenId, a = wx.getStorageSync("UserData").id, o = t.currentTarget.dataset.id, n = t.currentTarget.dataset.money;
        console.log(e, a, o, n), wx.showLoading({
            title: "正在提交",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/pay3",
            cachetime: "0",
            data: {
                openid: e,
                money: n,
                order_id: o
            },
            success: function(t) {
                console.log(t), wx.hideLoading(), wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        console.log(t.data);
                    },
                    complete: function(t) {
                        console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == t.errMsg && (wx.showToast({
                            title: "支付成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order"
                            });
                        }, 1e3));
                    }
                });
            }
        });
    },
    orderRevoke: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.showModal({
            title: "提示",
            content: "是否取消该订单？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/DelMallOrder",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    txsj: function(t) {
        console.log("提醒商家" + t.currentTarget.dataset.tel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    sqtk: function(e) {
        console.log("申请退款" + e.currentTarget.dataset.id), wx.showModal({
            title: "提示",
            content: "申请退款么",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/TkMallOrder",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.id
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "申请成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=5"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    qrsh: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.showModal({
            title: "提示",
            content: "是否确认已收到货？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/ShMallOrder",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "收货成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=4"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    orderQrcode: function(a) {
        var o = this, n = o.data.order_list, r = a.target.dataset.index;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), o.data.order_list[r].offline_qrcode ? (o.setData({
            hide: 0,
            qrcode: o.data.order_list[r].offline_qrcode
        }), wx.hideLoading()) : e.request({
            url: t.order.get_qrcode,
            data: {
                order_no: n[r].order_no
            },
            success: function(t) {
                0 == t.code ? o.setData({
                    hide: 0,
                    qrcode: t.data.url
                }) : wx.showModal({
                    title: "提示",
                    content: t.msg
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    hide: function(t) {
        this.setData({
            hide: 1
        });
    }
});