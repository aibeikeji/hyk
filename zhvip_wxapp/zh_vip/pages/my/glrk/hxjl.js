var app = getApp();

Page({
    data: {
        pagenum: 1,
        order_list: [],
        storelist: [],
        mygd: !1,
        jzgd: !0
    },
    onLoad: function(t) {
        console.log(t), wx.setNavigationBarTitle({
            title: "核销记录"
        }), this.setData({
            card_id: t.kid
        }), this.reLoad();
    },
    reLoad: function() {
        var t, e = this, a = this.data.activeIndex, o = this.data.card_id, n = this.data.pagenum;
        0 == a && (t = "1"), 1 == a && (t = "2"), 2 == a && (t = "3"), console.log(a, t, o, n), 
        app.util.request({
            url: "entry/wxapp/CardRecord",
            cachetime: "0",
            data: {
                card_id: o,
                page: n,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回的列表数据", t.data), t.data.length < 10 ? e.setData({
                    mygd: !0,
                    jzgd: !0
                }) : e.setData({
                    jzgd: !0,
                    pagenum: e.data.pagenum + 1
                });
                var a = e.data.storelist;
                a = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(a = a.concat(t.data)), e.setData({
                    order_list: a,
                    storelist: a
                }), console.log(a);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad());
    },
    onShareAppMessage: function() {}
});