var app = getApp();

Page({
    data: {
        inputValue: "",
        qqsj: !1,
        pagenum: 1,
        hyarr: [],
        mygd: !1,
        jzgd: !0
    },
    bindinput: function(a) {
        console.log(a.detail.value), this.setData({
            inputValue: a.detail.value
        });
    },
    jqqd: function(a) {
        wx.showModal({
            title: "提示",
            content: "程序员回家过年了，敬请期待"
        });
    },
    confirm: function(a) {
        var t = this.data.inputValue;
        console.log(t), "" == t ? wx.showToast({
            title: "请输入内容",
            icon: "loading",
            duration: 1e3
        }) : (this.setData({
            hyarr: [],
            qqsj: !1,
            pagenum: 1,
            mygd: !1,
            jzgd: !0
        }), this.reLoad(t));
    },
    onLoad: function(a) {
        this.reLoad("");
    },
    reLoad: function(a) {
        console.log(a);
        var e = this;
        app.util.request({
            url: "entry/wxapp/StoreUser",
            cachetime: "0",
            data: {
                keywords: a,
                page: e.data.pagenum
            },
            success: function(a) {
                console.log("分页返回的数据", a.data), 0 == a.data.length ? e.setData({
                    mygd: !0,
                    jzgd: !0,
                    qqsj: !0
                }) : e.setData({
                    jzgd: !0,
                    pagenum: e.data.pagenum + 1
                });
                var t = e.data.hyarr;
                t = t.concat(a.data), e.setData({
                    hyarr: t,
                    qqsj: !0
                });
            }
        });
    },
    vipuserinfo: function(a) {
        console.log(a.currentTarget.dataset.id), wx.navigateTo({
            url: "vipuserinfo?uid=" + a.currentTarget.dataset.id
        });
    },
    vipseller: function(a) {
        wx.redirectTo({
            url: "../index"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            inputValue: "",
            hyarr: [],
            qqsj: !1,
            pagenum: 1,
            mygd: !1,
            jzgd: !0
        }), this.reLoad(""), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad(this.data.inputValue));
    },
    onShareAppMessage: function() {}
});