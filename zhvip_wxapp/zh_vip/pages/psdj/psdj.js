var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp(), dataheith = [ 0 ], linheightid = 0;

Page({
    data: {
        rgihtdata: [],
        sub_cat_list_scroll_top: 0,
        store: {
            cat_style: 4
        },
        tab_config: {
            tabs: [],
            tab_left: 0
        },
        linheightid: linheightid,
        scroll: "scroll"
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        var e = wx.getStorageSync("xtxx"), o = getApp().imgurl;
        console.log(e), this.setData({
            xtxx: e,
            url: o
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.link_color
        });
    },
    reLoad: function() {
        var g = this, t = wx.getStorageSync("mdid");
        console.log(t), app.util.request({
            url: "entry/wxapp/Type",
            cachetime: "0",
            data: {
                store_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var e = [], o = 0; o < t.data.length; o++) 0 < t.data[o].type2.length && e.push(t.data[o]);
                console.log(e);
                for (var i = 0, a = 0; a < e.length; a++) i += 95 * (Math.floor(e[a].type2.length / 3) + 1), 
                dataheith.push(i);
                var n = g.data, l = n.window_height, h = n.tab_config, s = wx.getSystemInfoSync();
                console.log(s), l = s.windowHeight - 110, h.item_height = 50, console.log(l, h.item_height), 
                g.setData({
                    window_height: l,
                    tab_config: h
                }), g.setData({
                    tab_config: {
                        tabs: e,
                        tab_left: 0
                    }
                });
            }
        });
    },
    onShow: function() {
        this.reLoad();
    },
    catItemClick: function(t) {
        var e = this;
        console.log("你点击的ID为：", t.currentTarget.dataset.index);
        var o = t.currentTarget.dataset.index;
        console.log(void 0 === o ? "undefined" : _typeof(o)), e.updateSelectedPage(parseInt(o)), 
        this.setData({
            intoid: "id" + o,
            linheightid: o,
            scroll: ""
        }), setTimeout(function() {
            e.setData({
                scroll: "scroll"
            });
        }, 500);
    },
    scroll: function(t) {
        console.log(t);
        for (var e = t.detail.scrollTop, o = (t.detail.scrollTop, 0); o < dataheith.length; o++) if (e <= dataheith[o - 1]) {
            if (console.log(o), console.log(e, linheightid), linheightid != o) {
                if (this.updateSelectedPage(o - 2), -1 == (linheightid = o - 2)) return void this.setData({
                    linheightid: 0
                });
                this.setData({
                    linheightid: linheightid
                });
            }
            break;
        }
    },
    updateSelectedPage: function(t) {
        console.log("====_updateSelectedPage", t);
        var e = this.data, o = e.window_height, i = e.tab_config, a = (i.item_width, Math.round(o / i.item_height)), n = i.item_height * (t - a + 1), l = i.item_height * t;
        (i.tab_left < n || i.tab_left > l) && (i.tab_left = l - (o - i.item_height) / 2), 
        console.log(i), this.setData({
            tab_config: i
        });
    },
    onPullDownRefresh: function() {
        dataheith = [ linheightid = 0 ], this.setData({
            intoid: "id" + linheightid,
            linheightid: linheightid
        }), this.reLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    }
});