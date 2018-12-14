require(["config"],function(){
	require(["jquery","template","cookie","cart_load","bootstrap","popt","city","cityset"],function($,template){
		function Account(){
			this.goods=[];//商品
			this.address=[];//地址
			$.cookie.json = true;
			this.render();
			this.addListener();
			
		}
		$.extend(Account.prototype,{
			render(){
				//加载商品
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
				$(".pay-money").text("￥"+paymoney.toFixed(2));
				
				//加载地址
				const address=this.address=$.cookie("address")||[];
				console.log(address)
				const addr=template("address-template",{address:address});
				$(".address-body").prepend(addr);
			},
			
			addListener(){
				//选择地址
				$(".add-address").on("click",".address",this.SelectAddress);
				//选择地址
				$(".update-address").on("click",".address",this.SelectAddress);
				//添加地址
				$("#add-save").on("click",this.saveUserAddress);
				//删除地址
				$(".address-body").on("click",".del",$.proxy(this.deleteAddress,this));
				//点击修改地址
				$(".address-body").on("click",".upd",$.proxy(this.updateAddress,this));
				//修改后重新保存地址
				$("#update-save").on("click",this.updateSaveAddress);
			},
			SelectAddress(e){
				SelCity(this,e);
			},
			
			//添加地址
			saveUserAddress(){
				const address=this.address=$.cookie("address") || [];
				let 
					name=$(".name").val(),
					phone=$(".phone").val(),
					hcity=$("#hcity").val(),//省
					hproper=$("#hproper").val(),//市
					harea=$("#harea").val(),//区
					address_detail=$(".address-detail").val(),
					zipcode=$(".zipcode").val(),
					tag=$(".tag").val();
				if(name!="" && phone!="" && hcity!="" && hproper!="" && harea!="" && address_detail!=""){
					harea=harea.replace(/\s/g,"");
					const reg=/^1[34578]\d{9}$/;
					if(!reg.test(phone)){
						alert("请输入有效的手机号码");
						return false;
					}
					let html="";
					html=`<div class="address-item my-address">
							<dl>
								<dt>${name}</dt>
								<dd class="mobile">${phone}</dd>
								<dd class="adr">${hcity} ${hproper} ${harea}</dd>
								<dd class="adr-det">${address_detail}</dd>
							</dl>
							<input type="hidden" class="zipcode" value="${zipcode}" />
							<input type="hidden" class="tag" value="${tag}" />
							<div class="addr-handle">
								<i class="glyphicon glyphicon-pencil upd" data-toggle="modal" data-target="#updateModal"></i>
								<i class="glyphicon glyphicon-trash del"></i>
							</div>
						</div>`;
					$(".address-body").prepend(html);
					const curr={
						name:name,
						phone:phone,
						hcity:hcity,
						hproper:hproper,
						harea:harea,
						address_detail:address_detail,
						zipcode:zipcode,
						tag:tag
					};
					address.push(curr);
					//将地址保存进cookie
					$.cookie("address",address,{expires:10,path:"/"});
				}
				$("#addModal").modal("hide");
				$(".add-address")[0].reset();
			},
			
			//删除地址
			deleteAddress(event){
				const $src=$(event.target);
				const $parent=$src.parents(".my-address");
				$parent.remove();
			},
			//点击修改地址
			updateAddress(event){
				const $src=$(event.target);
				const $parent=$src.parents(".my-address");
				const 
					name=$parent.find("dt").text(),
					phone=$parent.find(".mobile").text(),
					addr=$parent.find(".adr").text(),
					adr_detail=$parent.find(".adr-det").text(),
					zipcode=$parent.find(".zipcode").val(),
					tag=$parent.find(".tag").val();
					
				$(".update-address").find(".name").val(name);
				$(".update-address").find(".phone").val(phone);
				$(".update-address").find(".address").val(addr);
				$(".update-address").find(".address-detail").val(adr_detail);
				$(".update-address").find(".zipcode").val(zipcode);
				$(".update-address").find(".tag").val(tag);
			},
			
			//修改后重新保存地址
			updateSaveAddress(){
				let id=parseInt(Math.random()*100);
				console.log(id);
			}
		});
		new Account();
	})
})