var Examples = function() {
	var _getExamplesList = function() {
		var params = {};
		api.ajax_request("/v1/getExamplesAllList.json", params, true, function(data) {
			var map = {
				list: data
			};
			var html = template("example_tpl", map);
			document.getElementById('example_list_div').innerHTML = html;
		})
	};

	var _showMask = function() {
		$("#mask").css("height", $(document).height());
		$("#mask").css("width", $(document).width());
		$("#mask").show();
		$("example_list_div").bind('touchstart', function(e) {
			e.preventDefault();
		});
	};

	var _hideMask = function() {
		$("#mask").hide();
		$("example_list_div").unbind('touchstart');
		$(".menu-dev").removeClass("active");
		$(".title-icon").removeClass("mui-icon-arrowdown");
		$(".title-icon").addClass("mui-icon-arrowup");
	};

	template.helper('styleJson', dic.styleJson);
	template.helper('layoutJson', dic.layoutJson);
	template.helper('dateFormat', dic.dateFormatFunc);

	var _titleClick = function() {
		$(".menu-title").click(function() {
			if($(this).attr("id") == "t1") {
				$(".menu-dev").removeClass("active");
				$("#area_div").addClass("active");
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu1").addClass("mui-icon-arrowdown");
				_showMask();

			} else if($(this).attr("id") == "t2") {
				$(".menu-dev").removeClass("active");
				$("#buget_div").addClass("active");
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu2").addClass("mui-icon-arrowdown");
				_showMask();
			} else if($(this).attr("id") == "t3") {
				$(".menu-dev").removeClass("active");
				$("#layout_div").addClass("active");
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu3").addClass("mui-icon-arrowdown");
				_showMask();
			} else if($(this).attr("id") == "t4") {
				$(".menu-dev").removeClass("active");
				$("#style_div").addClass("active");
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu4").addClass("mui-icon-arrowdown");
				_showMask();
			}
		});

		$("#buget_div table td").click(function() {
			var html = $(this).html();
			if(html=="不限"){
				html = "预算";
			}
			$("#buget_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			$("#buget-name").html(html);
			_hideMask();
		});
		$("#area_div table td").click(function() {
			var html = $(this).html();
			if(html=="不限"){
				html = "面积";
			}
			$("#area_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			$("#area-name").html(html);
			_hideMask();
		});
		$("#layout_div table td").click(function() {
			var html = $(this).html();
			if(html=="不限"){
				html = "户型";
			}
			$("#layout_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			$("#layout-name").html(html);
			_hideMask();
		});
		$("#style_div table td").click(function() {
			var html = $(this).html();
			if(html=="不限"){
				html = "风格";
			}
			$("#style_div table td").removeClass("active-click");
			$(this).addClass("active-click");
			$("#style-name").html(html);
			_hideMask();
		});
	};

	var _init = function() {
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
		if(mui.os.plus) {
			mui.plusReady(function() {
				document.getElementById("mask").addEventListener("tap", function() {
					_hideMask();
				});
			});
		} else {
			$("#mask").click(function() {
				_hideMask();
			});
		}
		_titleClick();
	};

	return {
		init: function() {
			_init();
			_getExamplesList();
		}
	}

}();