var ExampleDetail = function() {

	var _getData = function(exampleId) {
		var params = {
			id: exampleId
		};
		api.ajax_request("/v1/getExample.json", params, true, function(data) {
			data.examplesEntity.content = JSON.parse(data.examplesEntity.content);
			var map = {
				list: data
			};
			
			document.getElementById('title').innerHTML = data.examplesEntity.address;

			var html = template("example_details_tpl", map)
			document.getElementById('example_details_div').innerHTML = html;
			mui.plusReady(function(){
			    //关闭等待框
			    plus.nativeUI.closeWaiting();
			    //显示当前页面
			    mui.currentWebview.show("slide-in-right",100,null,{});
			});
		})
	};
	
	template.helper('styleJson', dic.styleJson);
	template.helper('layoutJson', dic.layoutJson);

	var _init = function() {
		if(mui.os.plus){
			document.addEventListener("plusready", function() {
				var self = plus.webview.currentWebview();
				_getData(self.exampleId);
			}, false);
		}else{
			_getData(1);
		}
		
	};

	return {
		init: function() {
			_init();
		}
	};

}();