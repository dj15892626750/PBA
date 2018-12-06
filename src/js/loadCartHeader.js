/* 加载头部和尾部 */
// 定义模块，复用
define(["jquery"],function($){
	// 构造函数
	function HeaderAndFooter(){
		this.init();
	}
	//扩展原型
	$.extend(HeaderAndFooter.prototype, {
		//初始化
		init(){
			this.loadHeader();
			this.loadFooter();
		},
		//加载头部
		loadHeader(){
			$.get("/html/_cart-header.html",(data)=>{
				$("#container-header").html(data);
			});
		},
		// 加载尾部
		loadFooter(){
			$(".footer").load("/html/_footer.html");
		},
	});
	return new HeaderAndFooter();

})