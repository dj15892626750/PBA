require(["config"],function(){
	require(["jquery","template","load"],function($,template){
//		console.log($);
		function List() {
			this.loadHotProducts();
		}
		$.extend(List.prototype, {
			// 加载渲染热销商品
			loadHotProducts() {
				$.getJSON("http://rap2api.taobao.org/app/mock/120085/api/list", (data)=>{
					console.log(data)
					//var htmlstring = template("模板id", 待渲染数据data);
					const html = template("list-template", {products: data.res_body.list})
					console.log(html)
					$(".goods-list-show").find("ul").prepend(html);
				});				
			}
		});

		new List();
	});
});