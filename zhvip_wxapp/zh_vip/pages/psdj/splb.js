var app = getApp(), searchTitle = "";

Page({
    data: {
        isFilterShow: !1,
        listmode: "block",
        listsort: "",
        page: 1,
        loaded: !1,
        loading: !0,
        opencategory: !1,
        category: {},
        category_child: [],
        filterBtns: {},
        isfilter: 0,
        category_child_selected: "",
        list: [],
        params: {},
        total: 0,
        fromsearch: !1,
        searchRecords: []
    },
    onLoad: function(t) {
        console.log(t);
        var a = wx.getStorageSync("xtxx"), e = getApp().imgurl;
        console.log(a, e), this.setData({
            xtxx: a,
            url: e,
            searchLogList: wx.getStorageSync("searchLog") || []
        }), console.log(wx.getStorageSync("searchLog")), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.link_color
        }), t.fromsearch ? this.setData({
            fromsearch: t.fromsearch || !1
        }) : this.setData({
            params: t,
            fromsearch: t.fromsearch || !1
        }), this.initCategory(), t.fromsearch || this.getList();
    },
    onShow: function() {
        searchTitle = "", this.data.fromsearch && this.setFocus();
    },
    onReachBottom: function() {
        this.data.loaded || this.getList();
    },
    initCategory: function() {
        var e = this, t = wx.getStorageSync("mdid");
        console.log(t), app.util.request({
            url: "entry/wxapp/Type",
            cachetime: "0",
            data: {
                store_id: t
            },
            success: function(t) {
                console.log(t);
                var a = t.data;
                e.setData({
                    category_parent: a,
                    category_child: []
                });
            }
        });
    },
    getList: function() {
        var s = this;
        s.setData({
            loading: !0
        }), s.data.params.page = s.data.page, s.data.params.pagesize = 10, console.log(s.data.params), 
        app.util.request({
            url: "entry/wxapp/Goods",
            cachetime: "0",
            data: s.data.params,
            success: function(t) {
                console.log(t.data);
                var a = t.data, e = {
                    loading: !1,
                    total: a.length
                };
                a || (a = []), 0 < a.length && (e.page = s.data.page + 1, e.list = s.data.list.concat(a), 
                a.length < s.data.params.pagesize && (e.loaded = !0)), s.setData(e);
            }
        });
    },
    changeMode: function() {
        "block" == this.data.listmode ? this.setData({
            listmode: ""
        }) : this.setData({
            listmode: "block"
        });
    },
    bindSort: function(t) {
        var a = t.currentTarget.dataset.order, e = this.data.params;
        if ("" == a) {
            if (e.order == a) return;
            e.order = "", this.setData({
                listorder: ""
            });
        } else if ("minprice" == a) this.setData({
            listorder: ""
        }), e.order == a ? "desc" == e.by ? e.by = "asc" : e.by = "desc" : e.by = "asc", 
        e.order = a, this.setData({
            listorder: e.by
        }); else if ("sales" == a) {
            if (e.order == a) return;
            this.setData({
                listorder: ""
            }), e.order = "sales", e.by = "desc";
        }
        this.setData({
            params: e,
            page: 1,
            list: [],
            loading: !0,
            loaded: !1,
            sort_selected: a
        }), this.getList();
    },
    showFilter: function() {
        this.setData({
            isFilterShow: !this.data.isFilterShow
        });
    },
    bindFilterCancel: function() {
        this.setData({
            isFilterShow: !1,
            cateogry_parent_selected: "",
            category_child_selected: "",
            category_child: [],
            filterBtns: {},
            loaded: !1,
            listorder: ""
        });
    },
    bindFilterSubmit: function() {
        var t = this.data.params, a = this.data.category_child_selected;
        console.log(t, a), "" != a ? (t.type_id = a, t.name = "", this.setData({
            page: 1,
            params: t,
            isFilterShow: !1,
            list: [],
            loading: !0,
            loaded: !1
        }), this.getList()) : wx.showModal({
            title: "提示",
            content: "请选择子分类"
        });
    },
    bindCategoryEvents: function(t) {
        var a = t.target.dataset.index, e = t.target.dataset.id, s = this.data.params;
        console.log(a, e, s);
        var o = t.target.dataset.level;
        1 == o ? (this.setData({
            category_child: []
        }), this.setData({
            category_parent_selected: e,
            category_child_selected: "",
            category_child: this.data.category_parent[a].type2
        })) : 2 == o ? this.setData({
            category_child_selected: e
        }) : this.setData({});
    },
    bindSearch: function(t) {
        var a = this;
        if (console.log(searchTitle), "" != searchTitle) {
            var e = a.data.searchLogList;
            -1 === e.indexOf(searchTitle) && (e.unshift(searchTitle), wx.setStorageSync("searchLog", e), 
            a.setData({
                searchLogList: wx.getStorageSync("searchLog")
            }));
            var s = this.data.params;
            s.name = searchTitle, s.type_id = "", console.log(s), (a = this).setData({
                list: [],
                page: 1,
                params: s,
                listorder: "",
                fromsearch: !1,
                loading: !0,
                loaded: !1
            }), a.getList();
        } else wx.showToast({
            title: "搜索内容为空",
            icon: "loading",
            duration: 1e3
        });
    },
    bindInput: function(t) {
        console.log(t);
        "" != wx.getStorageSync("searchLog") ? this.setData({
            inputVal: t.detail.value,
            searchLogList: wx.getStorageSync("searchLog"),
            fromsearch: !0
        }) : this.setData({
            inputVal: t.detail.value,
            fromsearch: !0
        }), searchTitle = t.detail.value;
    },
    bindFocus: function(t) {
        "" == t.detail.value && this.setData({
            fromsearch: !0
        });
    },
    bindback: function() {
        wx.navigateBack();
    },
    searchDataByLog: function(t) {
        searchTitle = t.target.dataset.text, console.log(searchTitle), this.bindSearch();
    },
    delRecord: function() {
        wx.removeStorageSync("searchLog"), this.setData({
            searchLogList: []
        }), this.setData({
            fromsearch: !0
        });
    },
    setFocus: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                focusin: !0
            });
        }, 1e3);
    }
});