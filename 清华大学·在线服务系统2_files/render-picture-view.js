var mySwiper;
function renderViewer(id){//渲染区域图片组件，参数为组件区域id
	var $ul = $("#"+id);
	$ul.viewer("destroy");
//	if(1==2){//window.innerWidth<1023){
//		$(".swiper-wrapper").empty();
//		$ul.find("img").each((i,o){
//			var $slide = $('<div class="swiper-slide"><div class="swiper-zoom-container"></div></div>');
//			$slide.children().append($(o).clone().removeAttr("id"));
//			$(".swiper-wrapper").append($slide);
//		})
//		$ul.find("img").off("click").on("click",function(){
//			if(mySwiper){
//				mySwiper.destroy(true,true);
//			}
//			$('#phonePicView').show();
//			mySwiper = new Swiper('#pic-container', {
//		        zoom: true,
//		    	slidesPerView : 1,
//		    	paginationClickable: true,
//		        pagination: '.swiper-pagination',
//		        nextButton: '.swiper-button-next',
//		        prevButton: '.swiper-button-prev'
//		    });
//			mySwiper.slideTo($(this).parent().index(), 0, false);
//			
//		});
//		$('#close-phonePicView').on("click",function(){
//			$('#phonePicView').hide();
//		});
//	}else{
//		$ul.find("img").off("click");
		$ul.viewer();
//	}
}
function renderViewerOne(picInfo){//渲染单个图片
	$("#"+picInfo.id).viewer("destroy");
//	$("[name='tempClick']").remove();
//	if(window.innerWidth<1023){
//		$(".swiper-wrapper").empty();
//		$("body").append("<div id="+picInfo.id+" name='tempClick' style='display:none'></div>")
//		$(".swiper-wrapper").append('<div class="swiper-slide"><div class="swiper-zoom-container"><img data-original="'+picInfo.url+'" src="'+picInfo.url+'" alt="'+picInfo.name+'"></div></div>');
//		$("#"+picInfo.id).off("click").on("click",function(){
//			if(mySwiper){
//				mySwiper.destroy(true,true);
//			}
//			$('#phonePicView').show();
//			mySwiper = new Swiper('#pic-container', {
//		        zoom: true,
//		    	slidesPerView : 1,
//		    	paginationClickable: true,
//		        pagination: '.swiper-pagination',
//		        nextButton: '.swiper-button-next',
//		        prevButton: '.swiper-button-prev'
//		    });
//		});
//		$('#close-phonePicView').off("click").on("click",function(){
//			$('#phonePicView').hide();
//		});
//	}else{
		if($("#"+picInfo.id+"_imageContainer").length==0){
			$("body").append('<div style = "display:none"><ul name="pictures" id="'+picInfo.id+'_imageContainer'+'"></ul></div>');
		}
		$("#"+picInfo.id+"_imageContainer").empty().append('<li><img id="'+picInfo.id+'"  data-original="'+picInfo.url+'" src="'+picInfo.url+'" alt="'+picInfo.name+'"></li>')
		$("#"+picInfo.id).viewer();
//	}
}