var a = getApp();

Page({
    data: {
        color: "#09BB07"
    },
    form_save: function(o) {
        console.log(o);
        var n = o.detail.formId;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            data: {
                user_id: wx.getStorageSync("UserData").id,
                form_id: n
            },
            success: function(o) {
                console.log(o);
            }
        });
    },
    bindGetUserInfo: function(o) {
        console.log(o);
        var n = getCurrentPages();
        console.log(n), "getUserInfo:ok" == o.detail.errMsg && (wx.showLoading({
            title: "登录中...",
            mask: !0
        }), wx.getUserInfo({
            success: function(o) {
                console.log(o), a.util.request({
                    url: "entry/wxapp/login",
                    cachetime: "0",
                    data: {
                        openid: getApp().getOpenId,
                        img: o.userInfo.avatarUrl,
                        name: o.userInfo.nickName
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    dataType: "json",
                    success: function(o) {
                        (console.log("用户信息", o), a.globalData.userInfo = o.data, 1 < n.length) && n[n.length - 2].setData({
                            userInfo: o.data
                        });
                        setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3);
                    }
                });
            }
        }));
    },
    onLoad: function(o) {
        a.setNavigationBarColor(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});