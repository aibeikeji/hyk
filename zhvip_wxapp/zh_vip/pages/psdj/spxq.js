var app = getApp();

Page({
    data: {
        id: null,
        goods: {},
        show_attr_picker: !1,
        form: {
            number: 1
        },
        tab_detail: "active",
        tab_comment: "",
        comment_list: [],
        comment_count: {
            score_all: 0,
            score_3: 0,
            score_2: 0,
            score_1: 0
        },
        autoplay: !1,
        hide: "hide",
        show: !1,
        x: wx.getSystemInfoSync().windowWidth,
        y: wx.getSystemInfoSync().windowHeight - 20,
        xdggid: "",
        pjindex: 0,
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0
    },
    form_save: function(t) {
        console.log(t);
        var a = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: a
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        app.getUserInfo(function(t) {
            console.log(t);
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    xtxx: t.data
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.link_color
                });
            }
        }), app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    url: t.data
                });
            }
        });
        var e = this;
        e.setData({
            id: t.id
        }), e.getGoodInfo(), e.reLoad(), e.getCommentList("0"), e.getpjnum();
    },
    reLoad: function() {
        var a = this, t = wx.getStorageSync("mdid"), e = wx.getStorageSync("UserData").id;
        app.util.request({
            url: "entry/wxapp/MyCarNum",
            cachetime: "0",
            data: {
                store_id: t,
                user_id: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    gwccd: t.data
                });
            }
        });
    },
    getGoodInfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                good_id: a.data.id
            },
            success: function(t) {
                console.log(t), t.data.details = t.data.details.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '), 
                a.setData({
                    goodinfo: t.data
                });
            }
        });
    },
    djpj: function(t) {
        console.log(t.currentTarget.dataset.pjindex), this.setData({
            pjindex: t.currentTarget.dataset.pjindex,
            pagenum: 1,
            storelist: [],
            mygd: !1,
            jzgd: !0
        }), this.getCommentList(t.currentTarget.dataset.pjindex);
    },
    getCommentList: function(t) {
        var o = this;
        console.log(t, o.data.pagenum), app.util.request({
            url: "entry/wxapp/PjList",
            cachetime: "0",
            data: {
                good_id: o.data.id,
                score: t,
                page: o.data.pagenum,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回数据", t.data), t.data.length < 10 ? o.setData({
                    mygd: !0,
                    jzgd: !0
                }) : o.setData({
                    jzgd: !0,
                    pagenum: o.data.pagenum + 1
                });
                var a = o.data.storelist;
                for (var e in a = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(a = a.concat(t.data)), console.log(a), t.data) t.data[e].img = t.data[e].img.split(",");
                o.setData({
                    comment_list: a,
                    storelist: a
                });
            }
        });
    },
    getpjnum: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/PjNum",
            cachetime: "0",
            data: {
                good_id: a.data.id
            },
            success: function(t) {
                console.log(t), a.setData({
                    pjnum: t.data
                });
            }
        });
    },
    onGoodsImageClick: function(t) {
        var a = this, e = [], o = t.currentTarget.dataset.index;
        for (var i in a.data.goodinfo.img) e.push(a.data.url + a.data.goodinfo.img[i]);
        wx.previewImage({
            urls: e,
            current: e[o]
        });
    },
    numberSub: function() {
        var t = this.data.form.number;
        if (t <= 1) return !0;
        t--, this.setData({
            form: {
                number: t
            }
        });
    },
    numberAdd: function() {
        var t = this.data.form.number;
        t++, this.setData({
            form: {
                number: t
            }
        });
    },
    numberBlur: function(t) {
        var a = t.detail.value;
        a = parseInt(a), isNaN(a) && (a = 1), a <= 0 && (a = 1), this.setData({
            form: {
                number: a
            }
        });
    },
    addCart: function() {
        this.submit("ADD_CART");
    },
    buyNow: function() {
        this.submit("BUY_NOW");
    },
    submit: function(t) {
        var a = this;
        if (!a.data.show_attr_picker) return a.setData({
            show_attr_picker: !0
        }), !0;
        if (console.log(a.data.form.number, Number(a.data.goodinfo.inventory)), a.data.form.number > Number(a.data.goodinfo.inventory)) return wx.showToast({
            title: "商品库存不足，请选择其它规格或数量",
            image: "../../img/jg.png"
        }), !0;
        var e = a.data.goodinfo.spec, o = [];
        for (var i in e) {
            var s = !1;
            for (var n in e[i].spec_val) if (e[i].spec_val[n].checked) {
                s = {
                    spec_val_id: e[i].spec_val[n].spec_val_id,
                    spec_val_name: e[i].spec_val[n].spec_val_name
                };
                break;
            }
            if (!s) return wx.showToast({
                title: "请选择" + e[i].spec_name,
                image: "../../img/jg.png"
            }), !0;
            var d = e[i].spec_name + ":" + s.spec_val_name;
            o.push(d);
        }
        var r = a.data.xdggid, c = a.data.goodinfo.id, u = a.data.goodinfo.money, l = wx.getStorageSync("mdid"), g = wx.getStorageSync("UserData").id, m = a.data.form.number, f = o.toString();
        console.log(o, r, u, c, l, g, m, f), "ADD_CART" == t && (wx.showLoading({
            title: "正在提交",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddCar",
            cachetime: "0",
            data: {
                money: u,
                good_id: c,
                store_id: l,
                user_id: g,
                num: m,
                spec: f,
                combination_id: r
            },
            success: function(t) {
                console.log(t), "1" == t.data && wx.showToast({
                    title: "添加成功"
                }), "超出库存!" == t.data && wx.showModal({
                    title: "提示",
                    content: "您的购物车已添加过此商品，总计购买数量超出库存!请重新选择"
                });
            }
        })), "BUY_NOW" == t && (a.setData({
            show_attr_picker: !1
        }), wx.setStorageSync("cart_list", [ {
            good_id: c,
            combination_id: r,
            logo: a.data.goodinfo.logo,
            name: a.data.goodinfo.name,
            money: u,
            num: m,
            spec: f,
            store_id: l,
            user_id: g
        } ]), wx.redirectTo({
            url: "../gwc/tjdd"
        }));
    },
    hideAttrPicker: function() {
        this.setData({
            show_attr_picker: !1
        });
    },
    showAttrPicker: function() {
        this.setData({
            show_attr_picker: !0
        });
    },
    attrClick: function(t) {
        var e = this, a = t.target.dataset.groupId, o = t.target.dataset.id, i = e.data.goodinfo;
        for (var s in console.log(a, o, i), i.spec) if (i.spec[s].spec_id == a) for (var n in i.spec[s].spec_val) i.spec[s].spec_val[n].spec_val_id == o ? i.spec[s].spec_val[n].checked = !0 : i.spec[s].spec_val[n].checked = !1;
        e.setData({
            goodinfo: i
        });
        var d = [], r = !0;
        for (var s in i.spec) {
            var c = !1;
            for (var n in i.spec[s].spec_val) if (i.spec[s].spec_val[n].checked) {
                d.push(i.spec[s].spec_val[n].spec_val_name), c = !0;
                break;
            }
            if (!c) {
                r = !1;
                break;
            }
        }
        console.log(e.data.goodinfo.id, d, d.toString()), r && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/GgZh",
            cachetime: "0",
            data: {
                combination: d.toString(),
                good_id: e.data.goodinfo.id
            },
            success: function(t) {
                console.log(t);
                var a = e.data.goodinfo;
                a.money = t.data.money, a.inventory = t.data.number, e.setData({
                    goodinfo: a,
                    xdggid: t.data.id
                });
            }
        }));
    },
    favoriteAdd: function() {
        var e = this;
        o.request({
            url: t.user.favorite_add,
            method: "post",
            data: {
                goods_id: e.data.goods.id
            },
            success: function(t) {
                if (0 == t.code) {
                    var a = e.data.goods;
                    a.is_favorite = 1, e.setData({
                        goods: a
                    });
                }
            }
        });
    },
    favoriteRemove: function() {
        var e = this;
        o.request({
            url: t.user.favorite_remove,
            method: "post",
            data: {
                goods_id: e.data.goods.id
            },
            success: function(t) {
                if (0 == t.code) {
                    var a = e.data.goods;
                    a.is_favorite = 0, e.setData({
                        goods: a
                    });
                }
            }
        });
    },
    tabSwitch: function(t) {
        "detail" == t.currentTarget.dataset.tab ? this.setData({
            tab_detail: "active",
            tab_comment: ""
        }) : this.setData({
            tab_detail: "",
            tab_comment: "active"
        });
    },
    commentPicView: function(t) {
        console.log(t);
        var a = this.data.comment_list, e = [], o = t.currentTarget.dataset.index, i = t.currentTarget.dataset.picindex, s = t.currentTarget.dataset.id;
        if (console.log(o, i, s), s == a[o].id) {
            var n = a[o].img;
            for (var d in n) e.push(this.data.url + n[d]);
            wx.previewImage({
                current: this.data.url + n[i],
                urls: e
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this.data.pjindex;
        console.log("上拉加载", this.data.pagenum, t), !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.getCommentList(t));
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("UserData").nickname;
        wx.getStorageSync("user_info");
        return {
            path: "/zh_vip/pages/psdj/spxq?id=" + this.data.id,
            success: function(t) {
                console.log(t);
            },
            title: t + "邀请你来看" + this.data.goodinfo.name,
            imageUrl: this.data.url + this.data.goodinfo.img[0]
        };
    },
    play: function(t) {
        var a = t.target.dataset.url;
        this.setData({
            url: a,
            hide: "",
            show: !0
        }), wx.createVideoContext("video").play();
    },
    close: function(t) {
        if ("video" == t.target.id) return !0;
        this.setData({
            hide: "hide",
            show: !1
        }), wx.createVideoContext("video").pause();
    },
    hide: function(t) {
        0 == t.detail.current ? this.setData({
            img_hide: ""
        }) : this.setData({
            img_hide: "hide"
        });
    },
    showShareModal: function() {
        this.setData({
            share_modal_active: "active",
            no_scroll: !0
        });
    },
    shareModalClose: function() {
        this.setData({
            share_modal_active: "",
            no_scroll: !1
        });
    },
    getGoodsQrcode: function() {
        var a = this;
        if (a.setData({
            goods_qrcode_active: "active",
            share_modal_active: ""
        }), a.data.goods_qrcode) return !0;
        o.request({
            url: t.default.goods_qrcode,
            data: {
                goods_id: a.data.id
            },
            success: function(t) {
                0 == t.code && a.setData({
                    goods_qrcode: t.data.pic_url
                }), 1 == t.code && (a.goodsQrcodeClose(), wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }));
            }
        });
    },
    goodsQrcodeClose: function() {
        this.setData({
            goods_qrcode_active: "",
            no_scroll: !1
        });
    },
    saveGoodsQrcode: function() {
        var a = this;
        wx.saveImageToPhotosAlbum ? (wx.showLoading({
            title: "正在保存图片",
            mask: !1
        }), wx.downloadFile({
            url: a.data.goods_qrcode,
            success: function(t) {
                wx.showLoading({
                    title: "正在保存图片",
                    mask: !1
                }), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function() {
                        wx.showModal({
                            title: "提示",
                            content: "商品海报保存成功",
                            showCancel: !1
                        });
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "图片保存失败",
                            content: t.errMsg,
                            showCancel: !1
                        });
                    },
                    complete: function(t) {
                        console.log(t), wx.hideLoading();
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "图片下载失败",
                    content: t.errMsg + ";" + a.data.goods_qrcode,
                    showCancel: !1
                });
            },
            complete: function(t) {
                console.log(t), wx.hideLoading();
            }
        })) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
            showCancel: !1
        });
    },
    goodsQrcodeClick: function(t) {
        var a = t.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ a ]
        });
    },
    closeCouponBox: function(t) {
        this.setData({
            get_coupon_list: ""
        });
    },
    to_dial: function(t) {
        var a = this.data.store.contact_tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    }
});