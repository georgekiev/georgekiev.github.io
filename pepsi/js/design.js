$(document).ready(function() {

	var fit = function () {
		var ww = $(window).width();
		var wh = $(window).height();
		cw = ww - 105

		rbox = wh / 3;
		cbox = cw - rbox;

		if (ww >= 992) {
			$('.index_page__right').width(rbox);
			$('.index_page__body').width(cbox);
		} else {
			$('.index_page__right').css('width','100%');
			$('.index_page__body').css('width','100%');
		}
	}

	fit();

	$(window).resize(function(){
		fit();
	});
	

	// Nav menu  
	$(document).on('click touchstart', 'body', function(event) {
		$('.nav-btn').removeClass('nav-btn--active');
		$('.menu').removeClass('menu--active');
		$('.container').removeClass('container--blur');
	});
 
 	$(document).on('click touchstart', '.nav-btn', function(event) {	
		$(this).toggleClass('nav-btn--active');
		$('.container').toggleClass('container--blur');
		$('.menu').toggleClass('menu--active');

		return false;
	});
 
	$(document).on('click touchstart', '.menu, .nav', function(event) {
		event.stopPropagation();
	});


	// Input mask
	if($('.inp-mask-code').length) {
		$('.inp-mask-code').mask('*********');
	}

	if($('.inp-mask-phone').length) {
		$('.inp-mask-phone').mask('+38(099)999-99-99');
	}

});  