/**
 * 前端js基础框架，封装常用方法
 * @author sea
 */
var Base = function() {
	//请求base地址
	var requestUrl = ["http://192.168.1.103:8080/xinshujia-restful", "http://localhost/"];

	var _getRequestUrl = function(index) {
		return requestUrl[index];
	};
	var _getFullParameter = function(params) {

		//获取用户信息

		// var sid = getSid();
		// if (sid == null || sid == "")
		// {
		// return params;
		// }
		//
		// var seed = Math.random() * 10000 + 1;
		// params.sid = sid;
		// params.seed = seed;
		// params.sbf = common.util.md5(sid + seed + common.user.api.getEncryptKey());
		// return params;

		return params;

	};

	var _request = function(block, serverIndex, action, params, care, callback) {
		if(params != null) {
			params = _getFullParameter(params);
		} else {
			params = _getFullParameter({

			});
		}
		var parameter = "";
		for(var p in params) {
			if(typeof(params[p]) != "function" && typeof(params[p]) != "Object") {
				if(params[p] instanceof Array) {
					for(var i = 0; i < params[p].length; i++) {
						parameter += p + "=" + params[p][i] + "&";
					}
				} else {
					if(params[p] != '') {
						parameter += p + "=" + params[p] + "&";
					}
				}
			}
		}

		if(parameter.charAt(parameter.length - 1) == '&') {
			parameter.substr(0, parameter.length - 1);
		}

		if(block) {
			//TODO:是否阻塞
			// common.ui.mask.show();
		}

		var ajaxurl = _getRequestUrl(serverIndex) + action;
		console.log("url:" + ajaxurl);
		console.log("param:" + parameter);
		$.ajax({
			//地址格式
			// url : '192.168.253.166',
			url: ajaxurl,
			type: 'get',
			dataType: 'jsonp',
			jsonp: "callback",
			// type : 'post',
			// dataType : 'test'
			contentType: "application/json;charset=UTF-8",
			cache: 'false',
			data: parameter,
			// scriptCharset : 'utf-8',
			success: function(jsonstr) {
				console.log("result:" + JSON.stringify(jsonstr));
				if(callback != null) {
					if(jsonstr.code == "0") {
						mui.toast(jsonstr.businessMsg.businessNote);
					} else {
						if(care) {
							if(jsonstr.code == "200") //请求正常
							{
								callback(jsonstr.data, jsonstr.code, jsonstr.businessMsg);
							} else if("401" == jsonstr.code) {
								mui.toast("请登录！");
							} else {
								callback(jsonstr.data, jsonstr.code, jsonstr.businessMsg);
							}
						} else {
							if(jsonstr.code == "200") //请求正常
							{
								callback(jsonstr.data);
							} else if("500" == jsonstr.code) {
								mui.toast("业务异常！");
							}
						}
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				//TODO:隐藏弹出框
				//TODO:提示消息
				mui.toast(JSON.stringify(jqXHR) + "," + textStatus + "," + errorThrown);
				//						alert(jqXHR.responseText);
				//						alert("error");
			}
		});
	};

	var _loadRes = function(serverIndex, action, callback) {
		$.ajax({
			url: action,
			type: 'get',
			dataType: 'html',
			jsonp: "callback",
			cache: 'false',
			success: function(jsonstr) {
				if(callback != null) {
					callback(jsonstr);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// var info = "";
				// info += "网络请求错误:\n\n";
				// info += "url :" + _getRequestUrl(serverIndex) + action + "\n\n";
				// info += "status :" + XMLHttpRequest.status + "\n\n";
				// info += "textStatus :" + textStatus + "\n\n";
				// alert(info);
			},
		});
	};

	var _getUrlParamValue = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null)
			return unescape(r[2]);
		return null;
	};

	var api = {
		getFullParameter: function(param) {
			_getFullParameter();
		},

		ajax_request: function(action, params, care, callback) {
			_request(false, 0, action, params, care, callback);
		},

		ajax_requestBlock: function(action, params, care, callback) {
			_request(true, 0, action, params, care, callback);
		},
		ajax_requestIndex: function(serverIndex, action, params, care, callback) {
			_request(false, serverIndex, action, params, care, callback);
		},
		requestIndexBlock: function(serverIndex, action, params, care, callback) {
			_request(true, serverIndex, action, params, care, callback);
		},
		loadRes: function(serverIndex, action, callback) {
			_loadRes(serverIndex, action, callback);
		},
		apiRequest: function(action, params, callback) {
			_apiRequest(action, params, callback);
		},
		getUrlParamValue: function(name) {
			return _getUrlParamValue(name);
		}
	};

	//将api挂在到window下，便于全局调用
	this.api = api;

}();
//立刻执行