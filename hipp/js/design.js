$(window).load(function(){
	var body = document.body,
	    timer,
	    hover_disabled = false;

	window.addEventListener('scroll', function() {
	  clearTimeout(timer);
	  if( ! hover_disabled && ! body.classList.contains('disable-hover')) {
	    body.classList.add('disable-hover');
	    hover_disabled = true;
	  }
	  
	  timer = setTimeout(function(){
	    body.classList.remove('disable-hover');
	    hover_disabled = false;
	  }, 200);
	}, false);
});

/*new WOW().init({
	mobile: false,
});*/

$(document).ready(function() {


	if($('.top__menu').length) {
		$('.top__menu').onePageNav({
			currentClass: 'active',

			scrollChange: function() {
        		var act_offset = $('.top__menu li.active').position().left;
        		var act_width = $('.top__menu li.active').width() / 2;
        		var act = act_offset + act_width;

        		$('.top__menu-arr').animate({left: act}, 250);
    		},
		});

		$('.top__menu li').click(function(){
			var act_offset = $(this).position().left;
    		var act_width = $(this).width() / 2;
    		var act = act_offset + act_width;

    		$('.top__menu-arr').animate({left: act}, 250);
		});
	}

		$('.top__menu ul li').click(function(){
			if($(window).width() < 970) {
				setTimeout(function(){
					$('.top__menu').slideUp(700);
				}, 50);
			}
		});

	$(window).resize(function(){
		var win_width = $(window).width();

		if(win_width > 970) {
			$('.top__menu').css({'display': 'block'});
		} else {
			$('.top__menu').css({'display': 'none'});
		}
	});

	//Mobile menu
	$('.mobile_menu-btn').click(function(){
		$('.top__menu').slideToggle(300);
	})

	// Stats box count
	if($('.features_box__right').length) {
		$('.features_box__right').appear(function() {

			setTimeout(function(){
			
			var block = $('.features_box__right li');

	        $('.features_box__right ul').fadeIn(1000, function(){
	            block.each(function(i) {
	                $(this).delay(i * 1000).fadeIn('0', function(){
	                    $(this).addClass('show');
	                });
	            });
	        });

	    }, 500);

		});
	}

	// Stats box count
	if($('.stats_box__item').length) {
		$('.stats_box').appear(function() {
			$('.stats_box__item span').each(function() {

				var count_element = $(this).html();

				$(this).countTo({
					from: 0,
					to: count_element,
					speed: 750,
					refreshInterval: 50,
				});
			});
		});
	}


	// Start box tabs
	if($('.start_box__content').length) {

		$('.start_box__tab1').hover(function(){
			$('.start_box__tab').removeClass('start_box__tab--active');
			$(this).addClass('start_box__tab--active');

			$('.start_box__step').removeClass('show');

			$('.start_box__content').stop(true).fadeOut(0);
			$('.start_box__content-left').stop(true).fadeIn(350);

			var block = $('.start_box__content-left .start_box__step');

	        $('.start_box__content-left').fadeIn(1000, function(){
	            block.each(function(i) {
	                $(this).delay(i * 1000).fadeIn('0', function(){
	                    $(this).addClass('show');
	                });
	            });
	        });
		});

		$('.start_box__tab2').hover(function(){
			$('.start_box__tab').removeClass('start_box__tab--active');
			$(this).addClass('start_box__tab--active');

			$('.start_box__step').removeClass('show');

			$('.start_box__content').stop(true).fadeOut(0);
			$('.start_box__content-center').stop(true).fadeIn(350);

			var block = $('.start_box__content-center .start_box__step');

	        $('.start_box__content-center').fadeIn(1000, function(){
	            block.each(function(i) {
	                $(this).delay(i * 1000).fadeIn('0', function(){
	                    $(this).addClass('show');
	                });
	            });

	        });
		});

		$('.start_box__tab3').hover(function(){
			$('.start_box__tab').removeClass('start_box__tab--active');
			$(this).addClass('start_box__tab--active');

			$('.start_box__step').removeClass('show');

			$('.start_box__content').stop(true).fadeOut(0);
			$('.start_box__content-right').stop(true).fadeIn(350);

			var block = $('.start_box__content-right .start_box__step');

	        $('.start_box__content-right').fadeIn(1000, function(){
	            block.each(function(i) {
	                $(this).delay(i * 1000).fadeIn('0', function(){
	                    $(this).addClass('show');
	                });
	            });
	        });
		});

	}

	// Stats box count
	if($('.start_box__content').length) {
		$('.start_box__content').appear(function() {

			if($('.start_box__tab1').hasClass('start_box__tab--active')) {
				setTimeout(function(){
				
					var block = $('.start_box__content-left .start_box__step');

			        $('.start_box__content-left').fadeIn(1000, function(){
			            block.each(function(i) {
			                $(this).delay(i * 1000).fadeIn('0', function(){
			                    $(this).addClass('show');
			                });
			            });
			        });

		    	}, 500);
			}

		});
	}

	//Products tabs
	if($('.products_box__content').length) {
		$('.products_box__tab1').hover(function(){
			$('.products_box__tab').removeClass('products_box__tab--active');
			$(this).addClass('products_box__tab--active');

			$('.products_box__content').stop(true).fadeOut(250);
			$('.products_box__content--1').stop(true).fadeIn(250);
		});

		$('.products_box__tab2').hover(function(){
			$('.products_box__tab').removeClass('products_box__tab--active');
			$(this).addClass('products_box__tab--active');

			$('.products_box__content').stop(true).fadeOut(250);
			$('.products_box__content--2').stop(true).fadeIn(250);
		});

		$('.products_box__tab3').hover(function(){
			$('.products_box__tab').removeClass('products_box__tab--active');
			$(this).addClass('products_box__tab--active');

			$('.products_box__content').stop(true).fadeOut(250);
			$('.products_box__content--3').stop(true).fadeIn(250);
		});

		$('.products_box__tab4').hover(function(){
			$('.products_box__tab').removeClass('products_box__tab--active');
			$(this).addClass('products_box__tab--active');

			$('.products_box__content').stop(true).fadeOut(250);
			$('.products_box__content--4').stop(true).fadeIn(250);
		});

		
			var n=7,
		     	i=0;

		    var timer = setInterval(spinner, 3000);
		    
		    function spinner() {
		        i = (++i < n ? i : 1);

		        var current_tab_id = '.ideal_products_item' + i;

		        $('.ideal_products li').removeClass('ideal_products_item--active');
		        $('.ideal_products .layer2').fadeOut(250);

		        $(current_tab_id).find('.layer2').fadeIn(250);
		        $(current_tab_id).addClass('ideal_products_item--active');

		    }

		    $('.ideal_products li').hover(function(ev){
			    clearInterval(timer);
			    $('.ideal_products li').stop(true).removeClass('ideal_products_item--active');
		        $('.ideal_products .layer2').stop(true).fadeOut(250);

					$('.ideal_products li').removeClass('ideal_products_item--active');
					$('.ideal_products li .layer2').fadeOut(250);
					$(this).find('.layer2').stop(true).fadeIn(250);

			}, function(ev){
				$(this).find('.layer2').stop(true).fadeOut(250);
			    timer = setInterval(spinner, 3000);
			});
	}


	//Start mobile
	if($('.mobile_start_box').length){
		$('.mobile_start_box__head').click(function(){
			$(this).parent().toggleClass('mobile_start_box__item--active');
			$(this).parent().find('.mobile_start_box__body').slideToggle(300);
		});
	}

	//Prd mobile
	if($('.prd_mobile').length){
		$('.prd_mobile__head').click(function(){
			$(this).parent().toggleClass('prd_mobile__item--active');
			$(this).parent().find('.prd_mobile__body').slideToggle(300);
		});
	}

	// compl parallax
	if($('.compl').length) {
		$('.compl').parallaxify({
			responsive: true,
			positionProperty: 'transform',
		});
	}
    
});