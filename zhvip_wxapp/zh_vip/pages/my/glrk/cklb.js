var app = getApp();

Page({
    data: {
        districtList: [ {
            name: "全部"
        }, {
            name: "次卡"
        } ],
        typeList: [ {
            id: 0,
            name: "全部分类"
        } ],
        yhqList: [ "全部", "未失效", "已失效" ],
        districtChioceIcon: "../../../img/icon-go-black.png",
        typeChioceIcon: "../../../img/icon-go-black.png",
        yhqChioceIcon: "../../../img/icon-go-black.png",
        activeDistrictIndexname: "选择卡的类型",
        activeTypeIndexname: "选择卡的类型",
        activeYhqIndexname: "选择卡的期限",
        borbtm: 1,
        mdlist: [],
        qqsj: !1,
        pagenum: 1,
        flpagenum: 1,
        storelist: [],
        flstorelist: [],
        mygd: !1,
        jzgd: !0,
        kname: "",
        time: ""
    },
    tzxq: function(t) {
        wx.navigateTo({
            url: "hxjl?kid=" + t.currentTarget.dataset.kid + "&cid=" + t.currentTarget.dataset.cid
        });
    },
    ljsy: function(t) {
        wx.navigateTo({
            url: "hxq?kid=" + t.currentTarget.dataset.kid
        });
    },
    hideAllChioce: function() {
        this.setData({
            districtChioceIcon: "../../../img/icon-go-black.png",
            typeChioceIcon: "../../../img/icon-go-black.png",
            yhqChioceIcon: "../../../img/icon-go-black.png",
            chioceDistrictList: !1,
            chioceTypeList: !1,
            chioceYhqList: !1
        });
    },
    choiceItem: function(t) {
        switch (this.setData({
            borbtm: t.currentTarget.dataset.item
        }), t.currentTarget.dataset.item) {
          case "1":
            this.data.chioceDistrictList ? this.setData({
                districtChioceIcon: "../../../img/icon-go-black.png",
                typeChioceIcon: "../../../img/icon-go-black.png",
                yhqChioceIcon: "../../../img/icon-go-black.png",
                chioceDistrictList: !1,
                chioceTypeList: !1,
                chioceYhqList: !1
            }) : this.setData({
                districtChioceIcon: "../../../img/icon-down-black.png",
                typeChioceIcon: "../../../img/icon-go-black.png",
                yhqChioceIcon: "../../../img/icon-go-black.png",
                chioceDistrictList: !0,
                chioceTypeList: !1,
                chioceYhqList: !1
            });
            break;

          case "2":
            this.data.chioceTypeList ? this.setData({
                districtChioceIcon: "../../../img/icon-go-black.png",
                typeChioceIcon: "../../../img/icon-go-black.png",
                yhqChioceIcon: "../../../img/icon-go-black.png",
                chioceDistrictList: !1,
                chioceTypeList: !1,
                chioceYhqList: !1
            }) : this.setData({
                districtChioceIcon: "../../../img/icon-go-black.png",
                typeChioceIcon: "../../../img/icon-down-black.png",
                yhqChioceIcon: "../../../img/icon-go-black.png",
                chioceDistrictList: !1,
                chioceTypeList: !0,
                chioceYhqList: !1
            });
            break;

          case "3":
            this.data.chioceYhqList ? this.setData({
                districtChioceIcon: "../../../img/icon-go-black.png",
                typeChioceIcon: "../../../img/icon-go-black.png",
                yhqChioceIcon: "../../../img/icon-go-black.png",
                chioceDistrictList: !1,
                chioceTypeList: !1,
                chioceYhqList: !1
            }) : this.setData({
                districtChioceIcon: "../../../img/icon-go-black.png",
                typeChioceIcon: "../../../img/icon-go-black.png",
                yhqChioceIcon: "../../../img/icon-down-black.png",
                chioceDistrictList: !1,
                chioceTypeList: !1,
                chioceYhqList: !0
            });
        }
    },
    selectDistrict: function(t) {
        if (console.log(t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) var i = ""; else i = this.data.districtList[t.currentTarget.dataset.index].name;
        console.log(i), this.setData({
            activeDistrictIndexname: this.data.districtList[t.currentTarget.dataset.index].name,
            kname: i,
            mdlist: [],
            qqsj: !1,
            pagenum: 1,
            mygd: !1,
            jzgd: !0,
            chioceDistrictList: !1,
            chioceTypeList: !1,
            chioceYhqList: !1
        }), this.reLoad();
    },
    selectType: function(t) {
        if (console.log(t.currentTarget.id, t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) var i = ""; else i = t.currentTarget.id;
        console.log(i);
    },
    selectYhq: function(t) {
        console.log(t.currentTarget.dataset.index);
        var i = t.currentTarget.dataset.index;
        console.log(i), "全部" == i && (i = ""), this.setData({
            activeYhqIndexname: t.currentTarget.dataset.index,
            time: i,
            mdlist: [],
            qqsj: !1,
            pagenum: 1,
            mygd: !1,
            jzgd: !0,
            chioceDistrictList: !1,
            chioceTypeList: !1,
            chioceYhqList: !1
        }), this.reLoad();
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            flid: t.flid,
            url: getApp().imgurl
        }), this.reLoad();
        var i = wx.getStorageSync("xtxx");
        console.log(i), this.setData({
            xtxx: i
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: i.link_color
        });
    },
    reLoad: function() {
        var c = this, t = this.data.kname, i = this.data.time, e = wx.getStorageSync("sjdsjid");
        console.log("hqfllb", this.data.pagenum, t, e, i), app.util.request({
            url: "entry/wxapp/StoreCardList",
            cachetime: "0",
            data: {
                store_id: e,
                type: t,
                yxq: i,
                page: c.data.pagenum,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回的分类门店列表数据", t.data), t.data.length < 10 ? c.setData({
                    mygd: !0,
                    jzgd: !0
                }) : c.setData({
                    jzgd: !0,
                    pagenum: c.data.pagenum + 1
                });
                var i = c.data.mdlist;
                i = i.concat(t.data), c.setData({
                    qqsj: !0,
                    list: i,
                    mdlist: i
                });
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
    }
});