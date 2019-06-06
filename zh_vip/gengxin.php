<?php
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_czorder')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `form_id` varchar(100) NOT NULL,
  `time` varchar(20) NOT NULL,
  `money` decimal(10,2) NOT NULL,
  `money2` decimal(10,2) NOT NULL,
  `state` int(11) NOT NULL COMMENT '1.待支付2已支付',
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_account')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `account` varchar(20) NOT NULL COMMENT '账号',
  `pwd` varchar(50) NOT NULL COMMENT '密码',
  `store_id` int(11) NOT NULL COMMENT '门店id',
  `state` int(11) NOT NULL DEFAULT '1' COMMENT '1.启用2.禁用',
  `uniacid` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '1.店员2.店长'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_admin')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `weid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属帐号',
  `storeid` varchar(1000) NOT NULL,
  `uid` int(10) unsigned NOT NULL DEFAULT '0',
  `from_user` varchar(100) NOT NULL DEFAULT '',
  `accountname` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(200) NOT NULL DEFAULT '',
  `salt` varchar(10) NOT NULL DEFAULT '',
  `pwd` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pay_account` varchar(200) NOT NULL,
  `displayorder` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '状态',
  `role` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1:店长,2:店员',
  `lastvisit` int(10) unsigned NOT NULL DEFAULT '0',
  `lastip` varchar(15) NOT NULL,
  `areaid` int(10) NOT NULL DEFAULT '0' COMMENT '区域id',
  `is_admin_order` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_notice_order` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_notice_queue` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_notice_service` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_notice_boss` tinyint(1) NOT NULL DEFAULT '0',
  `remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '备注',
  `lat` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '经度',
  `lng` decimal(18,10) NOT NULL DEFAULT '0.0000000000' COMMENT '纬度'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_jftype')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `img` varchar(100) NOT NULL,
  `num` int(11) NOT NULL,
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_jfrecord')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `good_id` int(11) NOT NULL COMMENT '商品id',
  `time` varchar(20) NOT NULL COMMENT '兑换时间',
  `user_name` varchar(20) NOT NULL COMMENT '用户地址',
  `user_tel` varchar(20) NOT NULL COMMENT '用户电话',
  `address` varchar(200) NOT NULL COMMENT '地址',
  `note` varchar(20) NOT NULL,
  `integral` int(11) NOT NULL COMMENT '积分',
  `good_name` varchar(50) NOT NULL COMMENT '商品名称',
  `good_img` varchar(100) NOT NULL,
  `state` int(11) NOT NULL DEFAULT '2' COMMENT '1.未处理 2.已处理'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_jfgoods')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '名称',
  `img` varchar(100) NOT NULL,
  `money` int(11) NOT NULL COMMENT '价格',
  `type_id` int(11) NOT NULL COMMENT '分类id',
  `goods_details` text NOT NULL,
  `process_details` text NOT NULL,
  `attention_details` text NOT NULL,
  `number` int(11) NOT NULL COMMENT '数量',
  `time` varchar(50) NOT NULL COMMENT '期限',
  `is_open` int(11) NOT NULL COMMENT '1.开启2关闭',
  `type` int(11) NOT NULL COMMENT '1.余额2.实物',
  `num` int(11) NOT NULL COMMENT '排序',
  `uniacid` int(11) NOT NULL,
  `hb_moeny` decimal(10,2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_dyj')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `dyj_title` varchar(50) NOT NULL COMMENT '打印机标题',
  `dyj_id` varchar(50) NOT NULL COMMENT '打印机编号',
  `dyj_key` varchar(50) NOT NULL COMMENT '打印机key',
  `uniacid` varchar(50) NOT NULL,
  `type` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mid` varchar(100) NOT NULL,
  `api` varchar(100) NOT NULL,
  `yy_id` varchar(20) NOT NULL,
  `token` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_assess')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `good_id` int(11) NOT NULL COMMENT '商品',
  `store_id` int(11) NOT NULL,
  `spec` varchar(100) NOT NULL COMMENT '规格',
  `user_img` varchar(200) NOT NULL COMMENT '用户头像',
  `user_name` varchar(20) NOT NULL COMMENT '用户昵称',
  `order_num` varchar(30) NOT NULL COMMENT '订单号',
  `score` int(11) NOT NULL COMMENT '分数',
  `content` text NOT NULL COMMENT '评价内容',
  `img` text NOT NULL COMMENT '图片',
  `cerated_time` varchar(20) NOT NULL COMMENT '创建时间',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `uniacid` varchar(50) NOT NULL,
  `reply` varchar(1000) NOT NULL COMMENT '商家回复',
  `status` int(4) NOT NULL COMMENT '评价状态1，未回复，2已回复',
  `reply_time` datetime NOT NULL COMMENT '回复时间'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_goods')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `name` varchar(50) NOT NULL COMMENT '商品名称',
  `type_id` int(11) NOT NULL COMMENT '商品分类',
  `img` text NOT NULL COMMENT '商品图片',
  `money` decimal(10,2) NOT NULL COMMENT '售价',
  `money2` decimal(10,2) NOT NULL COMMENT '原价',
  `is_show` int(11) NOT NULL DEFAULT '1' COMMENT '1.上架2.下架',
  `uniacid` int(11) NOT NULL COMMENT '小程序id',
  `inventory` int(11) NOT NULL COMMENT '库存',
  `details` text NOT NULL COMMENT '详情',
  `store_id` int(11) NOT NULL COMMENT '商家id',
  `sales` int(11) NOT NULL COMMENT '销量',
  `logo` varchar(100) NOT NULL,
  `num` int(11) NOT NULL,
  `is_gg` int(11) NOT NULL DEFAULT '2' COMMENT '是否开启规格'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_mallset')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
 `store_id` int(11) NOT NULL,
  `freight` decimal(10,2) NOT NULL COMMENT '运费',
  `full` decimal(10,2) NOT NULL COMMENT '满多少包邮',
  `uniacid` int(11) NOT NULL,
  `is_zt` int(11) NOT NULL DEFAULT '2' COMMENT '是否开启自提'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_ordergoods')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `img` varchar(300) NOT NULL COMMENT '商品图片',
  `number` int(11) NOT NULL COMMENT '数量',
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `name` varchar(50) NOT NULL COMMENT '商品名称',
  `money` decimal(10,2) NOT NULL COMMENT '商品金额',
  `uniacid` varchar(50) NOT NULL,
  `good_id` int(11) NOT NULL COMMENT '商品id',
  `spec` varchar(50) NOT NULL COMMENT '规格'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_shopcar')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `good_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `spec` varchar(100) NOT NULL,
  `combination_id` int(11) NOT NULL,
  `money` decimal(10,2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_shoporder')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `order_num` varchar(100) NOT NULL COMMENT '订单号',
  `money` decimal(10,2) NOT NULL COMMENT '金额',
  `price` decimal(10,2) NOT NULL COMMENT '原价',
  `preferential` decimal(10,2) NOT NULL COMMENT '折扣金额',
  `preferential2` decimal(10,2) NOT NULL COMMENT '优惠金额',
  `user_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `uniacid` int(11) NOT NULL,
  `pay_type` int(11) NOT NULL COMMENT '付款方式',
  `coupons_id` int(11) NOT NULL COMMENT '优惠券id',
  `state` int(11) NOT NULL COMMENT '1.待支付2.已支付3.待配送4.配送中5.已完成6.已评价7.退款中8.退款通过9.退款拒绝',
  `code` varchar(100) NOT NULL,
  `form_id` varchar(100) NOT NULL,
  `note` varchar(100) NOT NULL COMMENT '备注',
  `address` varchar(100) NOT NULL COMMENT '地址',
  `tel` varchar(20) NOT NULL COMMENT '电话',
  `user_name` varchar(20) NOT NULL COMMENT '姓名',
  `is_zt` int(11) NOT NULL COMMENT '1.是 2.不是 (自提)',
  `is_del` int(11) NOT NULL DEFAULT '2' COMMENT '1.删除 2.未删除',
  `pay_time` int(11) NOT NULL COMMENT '付款时间',
  `freight` decimal(10,2) NOT NULL COMMENT '运费',
  `kd_num` varchar(50) NOT NULL COMMENT '快递单号',
  `complete_time` varchar(20) NOT NULL COMMENT '完成时间'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_spec')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `name` varchar(20) NOT NULL COMMENT '规格名称',
  `good_id` int(11) NOT NULL COMMENT '商品id',
  `num` int(11) NOT NULL COMMENT '排序',
  `uniacid` int(11) NOT NULL COMMENT '小程序id'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_spec_combination')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `money` decimal(10,2) NOT NULL,
  `combination` varchar(50) NOT NULL,
  `number` int(11) NOT NULL,
  `good_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_spec_val')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '规格属性名称',
  `spec_id` int(11) NOT NULL COMMENT '规格id',
  `num` int(11) NOT NULL COMMENT '排序',
  `uniacid` int(11) NOT NULL,
  `good_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_type')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `num` int(11) NOT NULL COMMENT '排序',
  `uniacid` int(11) NOT NULL COMMENT '小程序id',
  `state` int(11) NOT NULL DEFAULT '1',
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_type2')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL COMMENT '分类名称',
  `num` int(11) NOT NULL COMMENT '排序',
  `uniacid` int(11) NOT NULL COMMENT '小程序id',
  `img` varchar(100) NOT NULL COMMENT '图片',
  `type_id` int(11) NOT NULL COMMENT '分类id',
  `state` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_useradd')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `area` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `is_default` int(11) NOT NULL COMMENT '1.是 2.不是 (默认)'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_nav')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(20) NOT NULL COMMENT '标题',
  `title_color` varchar(20) NOT NULL COMMENT '标题选中颜色',
  `title_color2` varchar(20) NOT NULL COMMENT '标题未选中颜色',
  `logo` varchar(200) NOT NULL COMMENT '选中图片',
  `logo2` varchar(200) NOT NULL COMMENT '未选中图片',
  `url` varchar(200) NOT NULL COMMENT '跳转链接',
  `num` int(11) NOT NULL COMMENT '排序',
  `state` int(11) NOT NULL DEFAULT '1' COMMENT '1开启2关闭',
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_vipset')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `days` int(11) NOT NULL,
  `money` decimal(10,2) NOT NULL,
  `num` int(11) NOT NULL,
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_timeorder')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `money` decimal(10,2) NOT NULL,
  `day` int(11) NOT NULL,
  `state` int(11) NOT NULL COMMENT '1.未付款2.已付款',
  `code` varchar(50) NOT NULL,
  `form_id` varchar(50) NOT NULL,
  `uniacid` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `pay_time` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_stinfo')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `pwd` varchar(20) NOT NULL COMMENT '密码',
  `state` int(11) NOT NULL COMMENT '1.绑定2.未绑定',
  `term` int(11) NOT NULL COMMENT '期限',
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_stlist')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `time` varchar(20) NOT NULL COMMENT '时间',
  `number` int(11) NOT NULL COMMENT '数量',
  `term` int(11) NOT NULL COMMENT '期限',
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_numcard_record')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `card_id` int(11) NOT NULL COMMENT '次卡id',
  `time` varchar(20) NOT NULL COMMENT '时间',
  `uniacid` int(11) NOT NULL,
  `hx_id` int(11) NOT NULL COMMENT '核销员id',
  `num` int(11) NOT NULL COMMENT '次数'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_numcardorder')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `code` varchar(100) NOT NULL,
  `form_id` varchar(100) NOT NULL,
  `state` int(11) NOT NULL COMMENT '1.待付款2.已付款',
  `money` decimal(10,2) NOT NULL,
  `card_id` int(11) NOT NULL,
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_numcard')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `number` int(11) NOT NULL,
  `money` decimal(10,2) NOT NULL,
  `uniacid` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `img` varchar(100) NOT NULL,
  `time` varchar(20) NOT NULL,
  `store_id` varchar(50) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1.次卡',
  `details` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_topnav')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `logo` varchar(300) NOT NULL COMMENT '图片',
  `src` varchar(300) NOT NULL COMMENT '链接地址',
  `created_time` datetime NOT NULL COMMENT '创建时间',
  `orderby` int(4) NOT NULL COMMENT '排序',
  `status` int(4) NOT NULL COMMENT '状态1.启用，2禁用',
  `type` int(11) NOT NULL COMMENT '1首页幻灯片 2.开屏广告',
  `store_id` int(11) NOT NULL,
  `appid` varchar(30) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT '幻灯片标题',
  `xcx_name` varchar(30) NOT NULL COMMENT '小程序名称',
  `uniacid` int(11) NOT NULL,
  `item` int(11) NOT NULL,
  `src2` varchar(200) NOT NULL COMMENT '外部'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_mynumcard')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `money` decimal(10,2) NOT NULL,
  `uniacid` int(11) NOT NULL,
  `lq_time` varchar(20) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_storead')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `logo` varchar(300) NOT NULL COMMENT '图片',
  `src` varchar(300) NOT NULL COMMENT '链接地址',
  `created_time` datetime NOT NULL COMMENT '创建时间',
  `orderby` int(4) NOT NULL COMMENT '排序',
  `status` int(4) NOT NULL COMMENT '状态1.启用，2禁用',
  `store_id` int(11) NOT NULL,
  `appid` varchar(30) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT '幻灯片标题',
  `xcx_name` varchar(30) NOT NULL COMMENT '小程序名称',
  `uniacid` int(11) NOT NULL,
  `item` int(11) NOT NULL,
  `src2` varchar(200) NOT NULL COMMENT '外部'
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
pdo_query("CREATE TABLE IF NOT EXISTS".tablename('zhvip_formid')."(
  `id` int(11) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `form_id` varchar(200) NOT NULL,
  `time` int(11) NOT NULL,
  `uniacid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;"
);
if (!pdo_fieldexists(tablename('zhvip_order'), 'state')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_order')." ADD `state`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_order'), 'code')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_order')." ADD `code`  varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_order'), 'form_id')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_order')." ADD `form_id`  varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_czorder'), 'account_id')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_czorder')." ADD `account_id`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_czorder'), 'note')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_czorder')." ADD `note`  varchar(50) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_czorder'), 'pay_type')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_czorder')." ADD `pay_type`  varchar(10) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_order'), 'account_id')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_order')." ADD `account_id`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_order'), 'pay_type2')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_order')." ADD `pay_type2`  varchar(10) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_order'), 'note')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_order')." ADD `note`  varchar(50) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_coupons'), 'level_type')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_coupons')." ADD `level_type`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_ad'), 'item')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_ad')." ADD `item`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'appid')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `appid`  varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'xcx_name')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `xcx_name`  varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'type')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `type`  INT NOT NULL DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_level'), 'my_img')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_level')." ADD `my_img`  varchar(200) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'opencard')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `opencard`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'integral')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `integral`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'is_jf')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `is_jf`  INT NOT NULL  DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'is_jfpay')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `is_jfpay`  INT NOT NULL  DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'jf_proportion')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `jf_proportion`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'md_img')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `md_img`  varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'md_img2')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `md_img2`  varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'pay_time')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `pay_time`  INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'freight')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `freight`  DECIMAL(10,2) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'kd_num')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `kd_num`  varchar(50) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'kd_name')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `kd_name`  varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'complete_time')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `complete_time`  varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'apiclient_cert')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `apiclient_cert`  TEXT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'apiclient_key')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `apiclient_key`  TEXT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_assess'), 'good_name')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_assess')." ADD `good_name` varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'tid3')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `tid3` varchar(200) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'model')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `model` INT NOT NULL  DEFAULT '2';");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'mr_logo')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `mr_logo` varchar(200) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'zt_time')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `zt_time` varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_img')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_img` varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_name')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_name` varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_url')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_url` varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_type')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_type` INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_url2')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_url2` varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_appid')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_appid` varchar(50) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'qhmd_appidname')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `qhmd_appidname` varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_ad'), 'src2')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_ad')." ADD `src2` varchar(200) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'is_sc')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `is_sc` INT NOT NULL DEFAULT '2';");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'vip_qx')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `vip_qx` INT NOT NULL DEFAULT '2';");
}
if (!pdo_fieldexists(tablename('zhvip_user'), 'vip_time')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_user')." ADD `vip_time` INT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'vip_xy')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `vip_xy` TEXT NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'md_xs')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `md_xs` INT NOT NULL DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'is_stk')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `is_stk` INT NOT NULL DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'sms_tel')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `sms_tel` varchar(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'tpl2_id')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `tpl2_id` varchar(50) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'tpl3_id')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `tpl3_id` varchar(50) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'tid4')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `tid4` varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_shoporder'), 'form_id2')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_shoporder')." ADD `form_id2` varchar(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_store'), 'cz_img')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_store')." ADD `cz_img` varchar(300) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_goods'), 'quantity')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_goods')." ADD `quantity` int NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'is_ck')) {
  pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `is_ck` INT NOT NULL DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_numcardorder'), 'pay_type')) {
    pdo_query("ALTER TABLE ".tablename('zhvip_numcardorder')." ADD `pay_type` INT NOT NULL DEFAULT '1';");
}
if (!pdo_fieldexists(tablename('zhvip_user'), 'note')) {
    pdo_query("ALTER TABLE ".tablename('zhvip_user')." ADD `note` VARCHAR(100) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_stlist'), 'name')) {
    pdo_query("ALTER TABLE ".tablename('zhvip_stlist')." ADD `name` VARCHAR(20) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'sj_tid')) {
    pdo_query("ALTER TABLE ".tablename('zhvip_system')." ADD `sj_tid` VARCHAR(200) NOT NULL;");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'kc_tid')) {
  pdo_query("ALTER TABLE".tablename('zhvip_system')." ADD `kc_tid` VARCHAR(100) NOT NULL");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'yue_tid')) {
  pdo_query("ALTER TABLE".tablename('zhvip_system')." ADD `yue_tid` VARCHAR(100) NOT NULL");
}
if (!pdo_fieldexists(tablename('zhvip_system'), 'jf_tid')) {
  pdo_query("ALTER TABLE".tablename('zhvip_system')." ADD `jf_tid` VARCHAR(100) NOT NULL");
}

if (!pdo_fieldexists(tablename('zhvip_goods'), 't_id')) {
  pdo_query("ALTER TABLE".tablename('zhvip_goods')." ADD `t_id` INT(11) NOT NULL");
}

pdo_query("ALTER TABLE ".tablename('zhvip_jfmx')." CHANGE `cerated_time` `cerated_time` varchar(20) NOT NULL");
pdo_query("ALTER TABLE ".tablename('zhvip_system')." CHANGE `jf_proportion` `jf_proportion`  INT NOT NULL  DEFAULT '10'");
pdo_query("ALTER TABLE ".tablename('zhvip_user')." CHANGE `nickname` `nickname` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL");
