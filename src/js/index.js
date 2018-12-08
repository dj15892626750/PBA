require(["config"],function(){
	require(["jquery","template","load","autoplay"], function($, template) {
		function Index() {
			this.loadHotProducts();
			this.autoPlays();
		}
		$.extend(Index.prototype, {
			// 加载渲染热销商品
			loadHotProducts() {
				$.getJSON("http://rap2api.taobao.org/app/mock/120085/api/index", (data)=>{
//					console.log(data)
					// var htmlstring = template("模板id", 待渲染数据data);
					//明星产品
					const starhtml = template("star-template", {star: data.res_body.star_prod})
					$(".star-prod").prepend(starhtml);
					//美妆香水
					const cosmhtml = template("cosmetics-template", {cosmetics: data.res_body.cosmetics_prod})
					$(".cosmetics-prod").prepend(cosmhtml);
					//养肤护肤
					const skinhtml = template("skin-template", {skin: data.res_body.skin_prod})
					$(".skin_prod").prepend(skinhtml);
					//当红名模
					const modelshtml = template("models-template", {models: data.res_body.models_prod})
					$(".models_prod").prepend(modelshtml);
					//工具洗护
					const toolshtml = template("tools-template", {tools: data.res_body.tools_prod})
					$(".tools_prod").prepend(toolshtml);
					//美容食品
					const foodhtml = template("food-template", {food: data.res_body.beauty_food})
					$(".food_prod").prepend(foodhtml);
				});				
			},
			
			//轮播图
			autoPlays(){
				console.log("in")
				
				var mySwiper=new Swiper('.swiper-container', {
					loop: true, // 循环模式选项
	    			autoplay:true,
	    			speed:1000,
//			      pagination: {
//			        el: '.swiper-pagination',
//			      },
//			      navigation: {
//			        nextEl: '.swiper-button-next',
//			        prevEl: '.swiper-button-prev',
//			      },
			   });
			},
		});

		new Index();
	});
})