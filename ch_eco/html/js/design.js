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

$(document).ready(function() {

	// Prizes
	if($('.prize_page__counter').length) {

		var countv = $('.prize_page__counter .numb').html();

		$('.prize_page__counter .numb').countTo({
			from: 100000,
			to: countv,
			speed: 750,
			refreshInterval: 50,
		});
	}

	// Phone input
	if($('.inp-phone').length){
		$('.inp-phone').mask('+38(099) 999-99-99');
	}

	// Decorate radio+checkbox+select
	if($('.inp-decorate').length){
		setTimeout(function() {
			$('.inp-decorate').styler();
		}, 100);
	}

	if($('.main_slider__list').length){

		var $main_slider = $('.main_slider__list');

		$('.main_slider__prev').click(function() {
		    $main_slider.trigger('prev.owl.carousel');
		});

		$('.main_slider__next').click(function() {
		    $main_slider.trigger('next.owl.carousel');
		});

		$main_slider.on('initialized.owl.carousel translated.owl.carousel', function(e){
	        $('.main_slider__info .region').html($(this).find('.center .main_slider__sprite .region').html());
	        $('.main_slider__info .bt .stats a').html($(this).find('.center .main_slider__sprite .counter').html());
	    });

		$main_slider.owlCarousel({
			loop: true, 
			autoWidth: true,
			center: true,
			slideSpeed: 300,
      		paginationSpeed: 400,
			singleItem: true,
			addClassActive: true,
		});

	}

	// List projects filter dd
	if($('.projects_page__dropdown').length) {
		$('.projects_page__dropdown').hide();

		$('.projects_page__sub').click(function(){

			$('.projects_page__dropdown:visible').fadeToggle(250);
			$('.projects_page__sub').removeClass('projects_page__sub--active');

			$(this).toggleClass('projects_page__sub--active');
			$(this).find('.projects_page__dropdown').fadeToggle(250);

			return false;
		});

		$('body').click(function() {
			$('.projects_page__dropdown:visible').fadeToggle(250);
			
			if($('.projects_page__sub').hasClass('projects_page__sub--active')) {
				$('.projects_page__sub').removeClass('projects_page__sub--active');
			}
		});

		$('.projects_page__dropdown').click(function(event){
			event.stopPropagation();
		});


		$('.projects_page__dropdown li a').click(function(){
			var dd_selected = $(this).html();

			$(this).parents('.projects_page__sub').find('span').html(dd_selected);

			$('.projects_page__dropdown:visible').fadeToggle(250);
			$('.projects_page__sub').removeClass('projects_page__sub--active');

		});
	}


	// Faq page
	if($('.faq_items').length) {
		$('.faq__forms').hide();

		$('.faq_form-btn span').click(function(){
			$('.faq__forms').slideDown(300);
		});

		$('.faq__forms input[type=reset]').click(function(){
			$('.faq__forms').slideUp(300);
		});


		$('.faq_item-body').hide();

		$('.faq_item-head h3').click(function(){
			$(this).parent().parent().find('.faq_item-body').slideToggle(300);
		});
	}


	// Pop-up's
	function close_popup() {
		if(!($('.popup_age:visible'))) {
			$('.popup_holder').fadeOut(250);
			$('.popup-close').parent().fadeOut(250);
			//$('body').removeClass('hidden');
		}
	}

	// Close popup
	$('.popup-close, .popup_layer').click(function(){
		close_popup();
	});


	// Check 18 years
	if($('.popup_age').length) {

		// Check cookies
		if ($.cookie('check_18year') == 'yes') {
			$('.popup_holder, .popup_age').css({'display':'none'});
		} else {
			$('.popup_holder, .popup_age').css({'display':'block'});

			$('.popup_age .inp-style:first').focus();

			$('.popup_age .inp-style').keyup(function () {
			    if(this.value.length == this.maxLength) {
			      $(this).next('.inp-style').focus();
			    }
			});

		}

		// Validate 18 years
		$.validator.addMethod('check_date_of_birth', function(value, element) {

		    var day = $('.inp-day').val();
		    var month = $('.inp-month').val();
		    var year = $('.inp-year').val();
		    var age =  18;

		    var mydate = new Date();
		    mydate.setFullYear(year, month-1, day-1);

		    var currdate = new Date();
		    currdate.setFullYear(currdate.getFullYear() - age);

		    return currdate > mydate;

		}, 'You must be at least 18 years of age.');


		// Validate 18 years form
		$('#check_18year').validate({
			errorClass: 'inp-error',
			errorElement: 'p',

			highlight: function (element, errorClass, validClass) { 
	            $(element).addClass(errorClass).removeClass(validClass); 
	        }, 
	        
	        unhighlight: function (element, errorClass, validClass) { 
	            $(element).removeClass(errorClass).addClass(validClass); 
	        },

			rules: {

				age_day: {
					required: true,
					minlength: 1,
					maxlength: 2,
					digits: true,
					range: [1, 31],
				},

				age_month: {
					required: true,
					minlength: 1,
					maxlength: 2,
					digits: true,
					range: [1, 12],
				},

				age_year: {
					required: true,
					minlength: 4,
					maxlength: 4,
					digits: true,
					check_date_of_birth: true,
				},
			},
			
			messages: {
				age_day: 'Введіть правильно день',

				age_month: 'Введіть правильно місяць',

				age_year: {
					required: 'Введіть правильно рік',
					minlength: 'Введіть правильно рік',
					check_date_of_birth: 'Вибачте, сайт тільки для повнолітніх',
				},
			},

			errorPlacement: function(error, element) {
				var error_n = element.attr('name');
				
				if (error_n == 'age_day' || error_n == 'age_month' || error_n == 'age_year') {
					error.insertAfter('.inp-error2');
				} else {
					//error.insertAfter(element);
				}
			},

			submitHandler: function(form) {
				$.cookie('check_18year', 'yes', {expires: 90, path: '/'});

				$('.popup_holder').fadeOut(250);
				$('.popup_age').fadeOut(250);
			}

		});
	}


});


/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.0
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});