var ExampleList = function() {

	var getExampleList = function() {
		var data = {};
		var html = template("example_tpl", data)
		document.getElementById('list').innerHTML = html;
		
		mui(document).imageLazyload({
			placeholder: '../images/60x60.gif'
		});
	}

	var createWindow = function() {

		mui.openWindow({
			url: 'imageviewer.html',
			id: 'imageviewer',
			createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			}
		})
	};

	return {
		init: function() {
			mui.init();
			mui("#list").on('tap','.example-li',function(){
				createWindow();
			});
			getExampleList();
			
		}
	}

}();