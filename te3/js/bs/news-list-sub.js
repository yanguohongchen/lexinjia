var NewsListSub = function() {
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
		if(id == "z1") {
			$(".menu-dev").removeClass("active");
			$("#before_div").addClass("active");
			_showMask();
		} else if(id == "z2") {
			$(".menu-dev").removeClass("active");
			$("#runing_div").addClass("active");
			_showMask();
		} else if(id == "z3") {
			$(".menu-dev").removeClass("active");
			$("#after_div").addClass("active");
			_showMask();
		}
	};
	
	
	var _contentClick =function(){
		
	};

	var _titleClick = function() {
		$("#before_div table td").click(function() {
			var html = $(this).html();
			$(".menu-dev table td").removeClass("active-click");
			$(this).addClass("active-click");
			
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/news-list.html");
				contentWebview.evalJS("News.changeBugetName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("type", $(this).attr("typeId"));
			mui('#news_list_sub_div').pullRefresh().pulldownLoading();
			_hideMask();
		});
		$("#runing_div table td").click(function() {
			var html = $(this).html();
			$(".menu-dev table td").removeClass("active-click");
			$(this).addClass("active-click");
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/news-list.html");
				contentWebview.evalJS("News.changeAreaName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("type", $(this).attr("typeId"));
			mui('#news_list_sub_div').pullRefresh().pulldownLoading();
			_hideMask();
		});
		$("#after_div table td").click(function() {
			var html = $(this).html();
			$(".menu-dev table td").removeClass("active-click");
			$(this).addClass("active-click");
			mui.plusReady(function() {
				var contentWebview = plus.webview.getWebviewById("html/news-list.html");
				contentWebview.evalJS("News.changeLayoutName('" + html + "')");
			});
			//改变值,刷新
			sessionStorage.setItem("type", $(this).attr("typeId"));
			mui('#news_list_sub_div').pullRefresh().pulldownLoading();
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
				type: sessionStorage.getItem("type") == null ? -1 : sessionStorage.getItem("type"),
				adType: 1,
				adPlaceId:100001,
				contentPlaceId:100002
			};
			api.ajax_request("/v1/getNewsList.json", params, true, function(data, code, msg) {
				if(code == "200") {
					var map = {
						list: data.contentData,
						list2:data.adData
					};
					var html2 = template("ad_pic_div_tpl", map);
					$('#ad_pic_div').html(html2);
					var html = template("news_list_sub_tpl", map);
					$('#news_list_sub_ul').html(html);
				
					pageNo++;
					mui('#news_list_sub_div').pullRefresh().endPulldownToRefresh();
					if((data.contentPageNo + 1) >= data.contentTotalPage){
						mui('#news_list_sub_div').pullRefresh().refresh(true);
						mui('#news_list_sub_div').pullRefresh().endPullupToRefresh((data.contentPageNo + 1) >= data.contentTotalPage); //参数为true代表没有更多数据了。
					}else{
						mui('#news_list_sub_div').pullRefresh().refresh(true);
					}
					
				} else {
					alert("对不起，网络连接失败！");
					mui('#news_list_sub_div').pullRefresh().endPulldownToRefresh();
					mui('#news_list_sub_div').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
				}
			})
		}, 1500);
	}

	var getList = function(callback) {
		var params = {
			pageNo: pageNo,
			type: sessionStorage.getItem("type") == null ? -1 : sessionStorage.getItem("type"),
			adType: 1,
			adPlaceId:100001,
			contentPlaceId:100002
		};
		api.ajax_request("/v1/getNewsList.json", params, true, function(data, code, msg) {
			if(code == "200") {
				var map = {
					list: data.contentData,
					list2:data.adData
				};
				var html2 = template("ad_pic_div_tpl", map);
				$('#ad_pic_div').html(html2);
				var html = template("news_list_sub_tpl", map);
				$('#news_list_sub_ul').append(html);
				
				mui('#news_list_sub_div').pullRefresh().endPullupToRefresh((data.contentPageNo + 1) >= data.contentTotalPage); //参数为true代表没有更多数据了。
				pageNo++;
				if(callback != null) {
					callback();
				}
				
			} else {
				alert("对不起，网络连接失败！");
				mui('#news_list_sub_div').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
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
				container: '#news_list_sub_div',
				down: {
					height: 50, //可选,默认50.触发下拉刷新拖动距离,
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
					mui('#news_list_sub_div').pullRefresh().pullupLoading();
				}, 1000);
			});
		} else {
			$("#mask").click(function() {
				_hideMask();
				mui('#news_list_sub_div').pullRefresh().pullupLoading();
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