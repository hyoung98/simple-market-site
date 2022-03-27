$(function () {  //갤러리 넘어가는 부분 jqeury


	// .tab을 클릭하면 #mobile과 .dim에 active 클래스를 추가합니다.
	$(".tab").click(function (e) {
		e.preventDefault();
		$("#mobile").addClass("active"); // addClass() <=> removeClass()
		$(".dim").addClass("active");
		$("body").addClass("active");
	});

	// .dim을 클릭하면 #mobile과 .dim에 active 클래스를 제거합니다.
	$(".dim").click(function () {
		$("#mobile").removeClass("active");
		$(".dim").removeClass("active");
	});

	// 760보다 커지면 .dim을 클릭하면 하는 행동을 실행합니다.
	var w; // 가로 크기를 정의할 변수를 선언합니다.

	$(window).resize(function () { //pc형식일 경우
		w = $(window).width();

		if (w > 760) {
			if ($(".dim").hasClass("active")) {
				$(".dim").trigger("click");
			}
		}
	});





	var n = 0; //갤러리 번호에 관련된 변수
	var pos = 0; // 갤러리 위치변수
	$(".btn_group li").eq(0).find("a").addClass("act"); // 첫번째 이미지로 초기화

	$(".btn_group li a").click(function (e) {
		e.preventDefault();
		$(".btn_group li a").removeClass("act");
		$(this).addClass("act");

		n = $(this).parent().index();
		pos = n * (-1) * 600; //pointer 이전의 위치로 가기 위해 -1

		$(".viewer").animate({ left: pos }, 500, "easeInOutQuart"); //500 = 시간 / easeInOutQuar=움직이는 방법

		/*
		1버튼 인덱스:0   두번째 위치: 0      -1*600*0
		1버튼 인덱스:1   두번째 위치: -600   -1*600*1
		1버튼 인덱스:2   두번째 위치: -1200  -1*600*2
		1버튼 인덱스:3   두번째 위치: -1800  -1*600*3
		*/
	});

	$(".btn_group a, .prev, .next").hover(
		function () {
			clearInterval(id);
		},
		function () {
			id = setInterval(slideInterval, 5000);
		}
	);
	$(".prev").click(function (e) {
		e.preventDefault();
		if (n > 0) {
			n--;
			$(".btn_group a").removeClass("act");
			$(".btn_group li").eq(n).find("a").addClass("act");
			pos = n * (-600) + "px";
			$(".viewer").animate({ left: pos }, 500, "easeInOutQuart");
		}
	});
	$(".next").click(function (e) {
		e.preventDefault();
		if (n < 3) {
			n++;
			$(".btn_group a").removeClass("act");
			$(".btn_group li").eq(n).find("a").addClass("act");
			pos = n * (-600) + "px";
			$(".viewer").animate({ left: pos }, 500, "easeInOutQuart");
		}
	});
	function slideInterval() {
		// n=(n+1)%4;
		if (n < 3) {
			n = n + 1;
		} else {
			n = 0;
		}

		$(".btn_group a").removeClass("act");
		$(".btn_group li").eq(n).find("a").addClass("act");
		pos = n * (-600) + "px";
		$(".viewer").animate({ left: pos }, 500, "easeInOutQuart");
	}
});