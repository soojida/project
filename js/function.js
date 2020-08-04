$(document).ready(function(){
	
	//////////// 메인메뉴 
	var $mnu = $("#gnb>.gnb-mid>.inner>ol>li"); //메인메뉴
	var $sub = $("#gnb>.gnb-mid>.inner>ol>li>.sub"); //서브메뉴
	var bgW = $("#gnb>.gnb-mid"); //흰색배경
	var bgWt = $("#gnb>.gnb-left"); //언더라인
	var logo = $("#gnb>.gnb-left>h1>a"); //로고
	var gnbR =$("#gnb>.gnb-right>ul>li>a, #gnb>.util>a");//햄버거,고객문의
	
	var _this = $(this);
	
	$mnu.on("mouseenter",function(){
		bgWt.addClass("on");
		bgW.addClass("on");
		logo.addClass("on");
		$sub.css("display","block");
		gnbR.addClass("on");
		$(".blackBg").css("display","block");
	});
	
	$mnu.on("mouseleave",function(){
		//bgW.css("height","0px");
		$(this).removeClass("on");
		bgW.removeClass("on");
		bgWt.removeClass("on");		
		$sub.css("display","none");
		logo.removeClass("on");
		gnbR.removeClass("on");
		$(".blackBg").css("display","none");
	});
	
	
	/*bgW.on("mouseleave",function(){
		bgW.removeClass("on");
		bgWt.removeClass("on");		
		$sub.css("display","none");
		logo.removeClass("on");
		gnbR.removeClass("on");
	});*/
	

	//////////// 페이지스크롤 이벤트
	var $indicator = $(".indicator>ul>li>a"); 
	var nowIdx = 0;
	var aniChk = false;
	
	var arrTopVal = [];//각 높이값 저장
	
	arrTopVal[0] = scrollTop=0;
	arrTopVal[1] = $("#tech").offset().top;
	arrTopVal[2] = $("#news").offset().top;
	arrTopVal[3] = $("#career").offset().top;
	arrTopVal[4] = $("footer").offset().top;
	
	console.log("arrTopVal =", arrTopVal);
	
	var pageAni = function(topVal){
		aniChk = true; //작동 정지
		
		$("html, body").stop().animate({
			"scrollTop" : topVal
		},function(){
			aniChk = false;//작동 실행
		});
	};
	
	//인디케이터 클릭이벤트
	$indicator.on("click", function(e){
		e.preventDefault();
		
		nowIdx = $indicator.index(this);
		pageAni(arrTopVal[nowIdx]);
	});
	
	//페이지가 로드된 시점에서 작동하는 이벤트
	$(window).load(function(){
		pageAni(arrTopVal[nowIdx]);
	});
	
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop(); 
		
		var result = scrollTop + $(this).height() - $("#career").offset().top;
		
		for(var i=0;i<=4;i++){
			if(scrollTop>=arrTopVal[i]){
				$indicator.eq(i).parent().addClass("on").siblings().removeClass("on");				
			}
		}
		
		if(scrollTop>=arrTopVal[2]){//3,4부분
			
			logo.addClass("on");
			$("#gnb>.gnb-mid>.inner>ol>li").addClass("on");
			bgWt.addClass("on");
			gnbR.addClass("on");	
			bgW.css("height","0px");	

			$mnu.on("mouseenter",function(){
				bgW.css("height","390px");
			});	
			
			$mnu.on("mouseleave",function(){				
				$(this).addClass("on");
				logo.addClass("on");
				gnbR.addClass("on");
				bgW.css("height","70px");
			});	
			
					
		}else{ //1,2부분
			$mnu.removeClass("on");
			logo.removeClass("on");		
			$("#gnb>.gnb-mid>.inner>ol>li").removeClass("on");
			bgWt.removeClass("on");
			gnbR.removeClass("on");
			
			$mnu.on("mouseleave",function(){				
				bgW.css("height","0px");
				logo.removeClass("on");
				gnbR.removeClass("on");
				$(this).removeClass("on");
			});	
		}

	});
	
	//마우스 휠 이벤트
	$(window).on("mousewheel DOMMouseScroll",function(e){
		 if(aniChk == false){
			 var E = e.originalEvent.wheelDelta;
			 var D = e.originalEvent.detail;
			 
			 if(E>0 || D<0){//마우스 휠 상단 스크롤
				 if(nowIdx>0){nowIdx--;}
			 }else{
				 if(nowIdx<4){nowIdx++;}
			 }
			 
			 pageAni(arrTopVal[nowIdx]);
		 }
	 });

	//////////// 기술리스트
	var $tech = $("#tech .list");
	var tIdx =0;
	
	$tech.find("ol").mouseenter(function(){
		
		tIdx = $tech.index();
		
	});
	



	
	//////////// 뉴스리스트(Swiper 플러그인)
	//swiper 슬라이드
	var newsList = new Swiper('.swiper-container', {
		slidesPerView: 4, 
		spaceBetween: 20,
		slidesPerGroup: 4,
		loop: false,
		spaceBetween: 20,
		loopFillGroupWithBlank: true,
		scrollbar: {
			el: '.swiper-scrollbar',
			hide: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination:{
			el:'.swiper-pagination',
			type:'bullets',
			clickable:true
		},
		breakpoints: {
			1230:{
				slidesPerView: "auto",
				slidesPerGroup: 1,
				spaceBetween: 15,
				centeredSlides: true
			}
		}
	});

	
	
	//////////// 푸터영역(패밀리 사이트)
	var curFamily = false;
	
	$("#footer .familysite>a").click(function(e){
		e.preventDefault();
		
		if(curFamily == false){
			$(this).addClass("on");
			$(this).attr("title", "패밀리사이트 닫기");
			$("#footer .familysite>div").stop().slideDown(300);
			
			curFamily = true;
		}else if(curFamily == true){
			$(this).removeClass("on");
			$(this).attr("title", "패밀리사이트 열기");
			$("#footer .familysite>div").stop().slideUp(300);
			
			curFamily= false;
		}
	});
	
	//로고 스크롤 탑이벤트
	$("#gnb h1>a").on("click",function(e){
		e.preventDefault();
		$("html,body").stop().animate({"scrollTop":0});
	});
});


//인트로페이지 타이틀 자동 슬라이드 #############################################
$(function(){
	var rIdx = 0;
	var rollBt = $("#main>.main-vis>.visBtn>.rollBt");
	var visArea = $("#main>.main-vis>.visArea>.visual");
	var intervalID = null;//반복재생
	var $btnAuto = $("#main>.main-vis>.visBtn>.playBt");//재생
	
	var $myvideo = document.getElementById("myvideo");
	var viedoSec = 0;
	var nextRIdx = function(){
		if(rIdx==4){
			rIdx = 0;
		}else{
			rIdx++;
		}
	}; 
	
	var move = function(){
		//슬라이드 컨테이너 이동
		visArea.eq(rIdx).stop().animate({"left":0*rIdx});
		visArea.eq(rIdx).siblings().stop().animate({"left":"-100%"},function(){
			$(this).css({"left":"100%"})
		});				
		
				
		//인디케이터 활성화표시
		rollBt.eq(rIdx).find(".bar").parent().addClass("on").siblings().removeClass("on");
		
		console.log("rIdx =",rIdx);
		//인디케이터 바
		TweenMax.to($(".rollBt").eq(rIdx).find(".bar"), 0, {width:"0%", delay:2});
		TweenMax.to($(".rollBt").eq(rIdx).find(".bar"), 2, {width:"100%", delay:0.5, yoyo:true, repeat:6});				
	};
	
	
	var autoPlay = function(){
		
		intervalID = setInterval(function(){
			
			nextRIdx();	
			move();		
			
			if(rIdx==0){//첫번째 슬라이드
			
				//move();
				
				clearInterval(intervalID);
				
				$myvideo.play();

				viedoSec = Math.round($myvideo.duration) * 1000;

				 setTimeout(function(){

						nextRIdx();
						move();
						
						autoPlay();

				 }, viedoSec);

			}

			
		},2000)
	};
	
	var autoStop = function(){};
	
	
	
	
	
	$(window).load(function(){
		visArea.eq(rIdx).css({"right":"-100%","display":"block"});
		rollBt.eq(rIdx).parent().addClass("on");
		
		setTimeout(autoPlay,87000);
		
		//autoPlay();
	});
	//인디케이터 클릭이벤트	
	TweenMax.to($(".rollBt").eq(0).find(".bar"), 2, {width:"100%", delay:0.5});	
	
	rollBt.on("click",function(e){
		e.preventDefault();
				
		rIdx = rollBt.index(this);
		//인디케이터 활성화표시
		rollBt.eq(rIdx).find(".bar").parent().addClass("on").siblings().removeClass("on");
		
		console.log("rIdx =",rIdx);
		//인디케이터 바
		TweenMax.to($(".rollBt").eq(rIdx).find(".bar"), 0, {width:"0%", delay:2});
		TweenMax.to($(".rollBt").eq(rIdx).find(".bar"), 2, {width:"100%", delay:0.5, yoyo:true, repeat:6});
		
		
		
		//슬라이드 컨테이너 이동
		visArea.eq(rIdx).stop().animate({"left":0*rIdx});
		visArea.eq(rIdx).siblings().stop().animate({"left":"-100%"},function(){
			$(this).css({"left":"100%"})
		});
	
	});	


	
	
	
	//햄버거버튼 클릭이벤트
	$(".util>a").click(function(e){
		e.preventDefault();
		
		TweenMax.to($("#mgnb"), .8, {right:0, ease:Power3.easeOut});
	});
	
	//닫기버튼 클릭이벤트
	$(".clse").click(function(e){
		e.preventDefault();
		
		TweenMax.to($("#mgnb"), .8, {right:'-100%', ease:Power3.easeOut});
	});
	
	
	//자동재생함수
	var autoSlide = function(){
		var li = $("#main>.main-vis>.visArea>.visual");
		var idc = $("#main>.main-vis>.visBtn>.rollBt");
		var idx = idc.filter(".on").index();
		var nextIdx = idx+1;
		
		if(nextIdx==li.length) nextIdx=0;
		
		li.eq(idx).removeClass("on");
		li.eq(nextIdx).addClass("on");
		
	};
	
	autoSlide();//자동재생함수 호출
	
	$(window).load(function(){
		timer=setInterval(autoSlide);//무한자동재생		
		
	});

/*	setInterval(function(){
			
		if(nowIdx<4){
			nowIdx++;
		}else{
			nowIdx=0;
		}
		
		
		
	},400);

*/
});

$(function(){
	var q = 0;
	
	//기술영역  배경
	$(".list>a").mouseover(function(){
	
	q = $(".list>a").index(this);
	
		TweenMax.to($(this).find(".off"), 0.7, {opacity:0, ease:Power3.easeOut});
		TweenMax.to($(this).find(".on"), 0.7, {opacity:1, ease:Power3.easeOut});
		TweenMax.to($(".bg").find("div").eq(q), 0.7, {display:"block", opacity:1, ease:Power3.easeOut});
	});		
	
	$(".list>a").mouseout(function(){	
	
		TweenMax.to($(".list").find(".off"), 0.7, {opacity:1, ease:Power3.easeOut});
		TweenMax.to($(this).find(".on"), 0.7, {opacity:0, ease:Power3.easeOut});
		TweenMax.to($(".bg").find("div").eq(q), 0.7, {display:"none", opacity:0, ease:Power3.easeOut});
	});	
	
});



















