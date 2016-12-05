var Sub = function() {
	var _showMask = function() {
		$("#mask").css("height", $(document).height());
		$("#mask").css("width", $(document).width());
		$("#mask").show();
	};

	var _hideMask = function() {
		$("#mask").hide();
		$(".menu-dev").removeClass("active");
		$(".title-icon").removeClass("mui-icon-arrowdown");
		$(".title-icon").addClass("mui-icon-arrowup");
	};

	var _menuTitleEvent = function(id) {
		if(id == "t1") {
			$(".menu-dev").removeClass("active");
			$("#area_div").addClass("active");
			_showMask();
		} else if(id == "t2") {
			$(".menu-dev").removeClass("active");
			$("#buget_div").addClass("active");
			_showMask();
		} else if(id == "t3") {
			$(".menu-dev").removeClass("active");
			$("#layout_div").addClass("active");
			_showMask();
		} else if(id == "t4") {
			$(".menu-dev").removeClass("active");
			$("#style_div").addClass("active");
			_showMask();
		}
	};

	template.helper('styleJson', dic.styleJson);
	template.helper('layoutJson', dic.layoutJson);
	template.helper('dateFormat', dic.dateFormatFunc);

	var _titleClick = function() {
		$("#buget_div table td").click(function() {
			var html = $(this).html();
			if(html == "不限") {
				html = "预算";
			}
			$("#buget_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/pullrefresh_main.html");
				contentWebview.evalJS("Examples.changeBugetName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("buget", $(this).attr("bugetId"));
			mui('#pullrefresh').pullRefresh().pulldownLoading();
			_hideMask();
		});
		$("#area_div table td").click(function() {
			var html = $(this).html();
			if(html == "不限") {
				html = "面积";
			}
			$("#area_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/pullrefresh_main.html");
				contentWebview.evalJS("Examples.changeAreaName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("area", $(this).attr("areaId"));
			mui('#pullrefresh').pullRefresh().pulldownLoading();
			_hideMask();
		});
		$("#layout_div table td").click(function() {
			var html = $(this).html();
			if(html == "不限") {
				html = "户型";
			}
			$("#layout_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/pullrefresh_main.html");
				contentWebview.evalJS("Examples.changeLayoutName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("layout", $(this).attr("layoutId"));
			mui('#pullrefresh').pullRefresh().pulldownLoading();
			_hideMask();
		});
		$("#style_div table td").click(function() {
			var html = $(this).html();
			if(html == "不限") {
				html = "风格";
			}
			$("#style_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/pullrefresh_main.html");
				contentWebview.evalJS("Examples.changeStyleName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("style", $(this).attr("styleId"));
			mui('#pullrefresh').pullRefresh().pulldownLoading();
			_hideMask();
		});
	};

	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		setTimeout(function() {
			pageNo = 0;
			var params = {
				pageNo: pageNo,
				style: sessionStorage.getItem("style") == null ? -1 : sessionStorage.getItem("style"),
				layout: sessionStorage.getItem("layout") == null ? -1 : sessionStorage.getItem("layout"),
				area: sessionStorage.getItem("area") == null ? -1 : sessionStorage.getItem("area"),
				buget: sessionStorage.getItem("buget") == null ? -1 : sessionStorage.getItem("buget")
			};
			api.ajax_request("/v1/getExamplesList.json", params, true, function(data, code, msg) {
				if(code == "200") {
					var map = {
						list: data.data
					};
					var html = template("example_tpl", map);
					$('#example_list_div').html(html);
					pageNo++;
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
					if((data.pageNo + 1) >= data.totalPage){
						mui('#pullrefresh').pullRefresh().refresh(true);
						mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.pageNo + 1) >= data.totalPage); //参数为true代表没有更多数据了。
					}else{
						mui('#pullrefresh').pullRefresh().refresh(true);
					}
					
				} else {
					alert("对不起，网络连接失败！");
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
				}
			})
		}, 1500);
	}

	var getList = function(callback) {
		var params = {
			pageNo: pageNo,
			style: sessionStorage.getItem("style") == null ? -1 : sessionStorage.getItem("style"),
			layout: sessionStorage.getItem("layout") == null ? -1 : sessionStorage.getItem("layout"),
			area: sessionStorage.getItem("area") == null ? -1 : sessionStorage.getItem("area"),
			buget: sessionStorage.getItem("buget") == null ? -1 : sessionStorage.getItem("buget")
		};
		api.ajax_request("/v1/getExamplesList.json", params, true, function(data, code, msg) {
			if(code == "200") {
				var map = {
					list: data.data
				};
				var html = template("example_tpl", map);
				$('#example_list_div').append(html);
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.pageNo + 1) >= data.totalPage); //参数为true代表没有更多数据了。
				pageNo++;
				if(callback != null) {
					callback();
				}
			} else {
				alert("对不起，网络连接失败！");
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
			}

		})
	};

	var pageNo = 0;
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			getList();
		}, 1500);
	}

	var _init = function() {
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					height: 150, //可选,默认50.触发下拉刷新拖动距离,
					callback: pulldownRefresh
				},
				up: {
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
		if(mui.os.plus) {
			mui.plusReady(function() {
				document.getElementById("mask").addEventListener("tap", function() {
					_hideMask();
				});

				setTimeout(function() {
					mui('#pullrefresh').pullRefresh().pullupLoading();
				}, 1000);
			});
		} else {
			$("#mask").click(function() {
				_hideMask();
				mui('#pullrefresh').pullRefresh().pullupLoading();
			});
		}

		_titleClick();

		mui("#example_list_div").on('tap', '.mui-card', function() {
			mui.openWindow({
				url: 'imageviewer.html',
				id: 'imageviewer',
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				show: {
					autoShow: false, //页面loaded事件发生后自动显示，默认为true
				},
				extras: {
					exampleId: $(this).attr("exampleId")
				},
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
				}
			})
		});
	};

	return {
		init: function() {
			_init();
		},
		menuTitleEvent: function(id) {
			_menuTitleEvent(id);
		}
	};
}();