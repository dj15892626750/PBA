require(["config"],function(){
	require(["jquery", "template", "load"], function($, template) {
		console.log($);
//		function Index() {
//			this.loadHotProducts();
//		}
//		$.extend(Index.prototype, {
//			// 加载渲染热销商品
//			loadHotProducts() {
//				$.getJSON("http://rap2api.taobao.org/app/mock/120085/api/yfhf", (data)=>{
//					console.log(data)
//					// var htmlstring = template("模板id", 待渲染数据data);
////					const html = template("prod-template", {products: data.res_body.list})
////					console.log(html)
////					$("ul.grid_2").prepend(html);
//				});				
//			}
//		});
//
//		new Index();
	});
})