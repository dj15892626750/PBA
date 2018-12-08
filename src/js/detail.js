require(["config"],function(){
	require(["jquery","template","load","cookie","fly","zoom"],function($,template){
		function Detail(){
			this.render();

			
			// 配置 cookie 自动在JS值与JSON值之间转换
			$.cookie.json = true;

			
			
		}
		$.extend(Detail.prototype,{
			render(){
				//获取当前待加载商品的id
				const _id=location.search.slice(location.search.lastIndexOf("=")+1);
				$.getJSON("http://rap2api.taobao.org/app/mock/120085/api/detail?id="+_id,(data)=>{
					const {title,desc,price,details,id,zoomImgs,colors}=data.res_body;
					const html=template("detail-img-template",{id,zoomImgs,title,desc,price,details,colors});
					$(".goods-info").prepend(html);
					// 放大镜
					$(".zoom-img").elevateZoom({
						gallery:'small-pic',//为缩放图像指定一组图库链接
						cursor: 'pointer',
						galleryActiveClass: 'action'
					}); 
					
					const ds=template("details-template",{details:data.res_body.details});
					$(".pic-list").prepend(ds);	
					
					this.addListener();
				});
				
				$.getJSON("http://rap2api.taobao.org/app/mock/120085/api/hot",(d)=>{
					const hotGoods=template("hot-template",{hot:d.res_body.list});
					$(".hot").find("ul").prepend(hotGoods);
				});
			},
			
			//添加事件监听
			addListener(){
				$(".add-cart").on("click",this.addToCart);
			},
			addToCart(event){
				const parent=$(".goods-info");
				const currProduct={
					id:parent.find(".id").text(),
					title:parent.find("h1").text(),
					price:parent.find(".price").text();
				};
				console.log(currProduct);
				return false;
			},
		});
		new Detail();
	})
})