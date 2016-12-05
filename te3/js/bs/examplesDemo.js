var Examples = function() {
	
	var _changeBugetName =function(html){
		$("#buget-name").html(html);
	};
	var _changeAreaName =function(html){
		$("#area-name").html(html);
	};
	var _changeLayoutName =function(html){
		$("#layout-name").html(html);
	};
	
	var _changeStyleName =function(html){
		$("#style-name").html(html);
	};
	

	var _titleClick = function() {
		$(".menu-title").click(function() {
			var id = $(this).attr("id");
			if(id == "t1") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu1").addClass("mui-icon-arrowdown");
			} else if(id == "t2") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu2").addClass("mui-icon-arrowdown");
			} else if(id == "t3") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu3").addClass("mui-icon-arrowdown");
			} else if(id == "t4") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#tu4").addClass("mui-icon-arrowdown");
			}
			var contentWebview = plus.webview.currentWebview().children()[0];
			contentWebview.evalJS("Sub.menuTitleEvent('" + id + "')");
		});
	};

	var _init = function() {
		mui.init({
			subpages: [{
				url: 'pullrefresh_sub.html',
				id: 'pullrefresh_sub.html',
				styles: {
					top: '45px',
					bottom: '0px',
				}
			}]
		});
		_titleClick();
	};

	return {
		init: function() {
			_init();
		},
		changeBugetName:function(html){
			_changeBugetName(html);
		},
		changeAreaName:function(html){
			_changeAreaName(html);
		},
		changeLayoutName:function(html){
			_changeLayoutName(html);
		},
		changeStyleName:function(html){
			_changeStyleName(html);
		}
	}

}();