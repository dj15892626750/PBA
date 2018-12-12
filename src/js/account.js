require(["config"],function(){
	require(["jquery","template","cookie","cart_load","bootstrap","popt","city","cityset"],function($,template){
		function Account(){
			this.goods=[];
			$.cookie.json = true;
			this.render();
			this.addListener();
			
		}
		$.extend(Account.prototype,{
			render(){
				const goods=this.goods=$.cookie("selectgoods")||[];
				const html=template("account-template",{goods:goods});
				$(".goods-list").prepend(html);
				const lis=$(".goods-list").find("li");
				let sum=0;
				lis.each((index,element)=>{
					sum+=Number($(element).find(".col-total").text());
				});
				$(".amount").text(lis.length+"件");
				$(".totalprice").text("￥"+sum.toFixed(2));
				let paymoney=Number(sum-$(".discount").text().slice(1));
				$(".pay-money").text(paymoney.toFixed(2));
			},
			
			addListener(){
				//选择地址
				$(".form-address").on("click",".address",this.selectAddress);
				//添加地址
				$("#save").on("click",this.saveUserAddress);
			},
			selectAddress(e){
				SelCity(this,e);
				$("i").click(function(e){
					SelCity($(".address"),e);
				})
			},
			
			//添加地址
			saveUserAddress(){
				const 
					name=$(".name").val(),
					phone=$(".phone").val(),
					hcity=$("#hcity").val(),//省
					hproper=$("#hproper").val(),//市
					harea=$("#harea").val().replace(/\s/g,""),//区
					address_detail=$(".address-detail").val(),
					zipcode=$(".zipcode").val(),
					tag=$(".tag").val();
					
				let html="";
				html=`<div class="address-item my-address">
						<dl>
							<dt>${name}</dt>
							<dd>${phone}</dd>
							<dd>${hcity} ${hproper} ${harea}</dd>
							<dd>${address_detail}</dd>
						</dl>
				</div>`;
				console.log(html);
				$(".address-body").prepend(html);
				$("#myModal").modal("hide");
				$(".add-address")[0].reset();
			}
		});
		new Account();
	})
})