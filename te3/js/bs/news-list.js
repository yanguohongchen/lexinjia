var News = function() {
	
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
			if(id == "z1") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#zu1").addClass("mui-icon-arrowdown");
			} else if(id == "z2") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#zu2").addClass("mui-icon-arrowdown");
			} else if(id == "z3") {
				$(".title-icon").removeClass("mui-icon-arrowdown");
				$(".title-icon").addClass("mui-icon-arrowup");
				$("#zu3").addClass("mui-icon-arrowdown");
			} 
			var contentWebview = plus.webview.currentWebview().children()[0];
			contentWebview.evalJS("NewsListSub.menuTitleEvent('" + id + "')");
		});
	};

	var _init = function() {
		mui.init({
			subpages: [{
				url: 'news-list-sub.html',
				id: 'news-list-sub.html',
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