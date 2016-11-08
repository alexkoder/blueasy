$(window).load(function() {
	$('.loader_inner').fadeOut();
	$('.loader').delay(100).fadeOut('slow');
});

$(document).ready(function() {

	$('#header_menu_toggle_id').on('click', function() {
		$(this).toggleClass('on');
		$('.header_nav').slideToggle();
		return false;
	});

	$('#header_id').parallax({imageSrc: 'img/bg_header.jpg'});
	$('.section5').parallax({imageSrc: 'img/bg_sect5.jpg'});
	$('.section7').parallax({imageSrc: 'img/bg_sect7.jpg'});

	$('#portfolio_grid_container').mixItUp();
	$('#portfolio_filters').find('.filter').on('click', function() {
		return false;
	});

	$('#portfolio_grid_container').magnificPopup({
		delegate: '.item_overlay', 
		type: 'image',
		closeOnContentClick: true,
		removalDelay: 250,
  		mainClass: 'mfp-fade'
	});

	scrollToId('#header_menu_id a');
	scrollToId('#footer_menu_id a');
	function scrollToId(links) {
		$(links).on('click', function() {
			var selector = $(this).attr('href');
			$('html, body')
			.animate({scrollTop: $(selector).offset().top}, 'slow');
			return false;
		});
	}

	$('.sect_title').waypoint({
		handler: function(dir) {
			$(this.element).addClass('on');
			this.destroy();
		},
		offset: '90%'
	});

	$('#sect1_id').waypoint({
		handler: function(dir) {
			$('#sect1_id .sect_item').each(function(index) {
				var $this = $(this);
				setTimeout(function() {
					$this.addClass('on');
				}, 400*index);
			});

			this.destroy();
		},
		offset: '70%'
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#contact_form_id").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				
				$("#contact_form_id").trigger("reset");
			}, 1000);
		});
		return false;
	});

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
