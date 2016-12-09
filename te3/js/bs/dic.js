var Dic = function() {
	var dic = {
		styleMap: {
			1: "现代",
			2: "简约",
			3: "韩式",
			4: "地中海",
			5: "欧式",
			6: "中式",
			7: "日式",
			8: "新古典",
			9: "宜家",
			10: "田园",
			11: "混搭",
			12: "清新",
			13: "小资",
			14: "美式"
		},
		styleJson: function(str) {
			return dic.styleMap[str];
		},
		layoutMap: {
			1: "一居",
			2: "两居",
			3: "三居",
			4: "四居",
			5: "小户型",
			6: "大户型",
			7: "别墅",
			8: "复式",
			9: "公寓",
			10: "跃层",
			11: "LOFT",
			12: "阁楼",
			13: "公装"
		},
		layoutJson: function(str) {
			return dic.layoutMap[str];
		},
		placeMap: {
			100001: "新闻广告位",
			100002: "新闻主题位"
		},
		placeJson: function(str) {
			return dic.placeMap[str];
		},
		
		dateFormatFunc :function(date, format) {
		date = new Date(date);
		var map = {
			"M": date.getMonth() + 1, //月份 
			"d": date.getDate(), //日 
			"h": date.getHours(), //小时 
			"m": date.getMinutes(), //分 
			"s": date.getSeconds(), //秒 
			"q": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
			var v = map[t];
			if(v !== undefined) {
				if(all.length > 1) {
					v = '0' + v;
					v = v.substr(v.length - 2);
				}
				return v;
			} else if(t === 'y') {
				return(date.getFullYear() + '').substr(4 - all.length);
			}
			return all;
		});
		return format;
	}
	};
	this.dic = dic;
}();