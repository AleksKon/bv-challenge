// Smooth scroll

$("a[href^='#']").on('click touchstart', function(e) {
	// prevent default anchor click behavior
	e.preventDefault();

	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var $target = $(this.hash);
		$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

		if ($target.length) {
			var targetOffset = $target.offset().top - 50;
			$('html,body').animate({scrollTop: targetOffset}, 1000);
			return false;
		}
	}
});

// Collapse nav on scroll

$(window).scroll(function(){
	if($('.navbar').offset().top >100){
		$('.navbar-fixed-top').addClass('top-nav-collapse');
	}else{
		$('.navbar-fixed-top').removeClass('top-nav-collapse');
	}
});

// On click, close navbar

$('.nav a').on('click touchstart',function () {
	$('.active').removeClass('active');
	$(this).closest('li').addClass('active');

	$('.navbar-collapse').collapse('hide');
});

// Slider

$('#featuresSlider').flickity({
		cellAlign: 'left',
		contain: true,
		prevNextButtons: false,
		autoPlay: true
	});

// Hero image animated

$('.jumbotron').mousemove(function(e){
	var containerWidth = $(this).innerWidth(),  
	containerHeight = $(this).innerHeight(),
	mousePositionX = (e.pageX / containerWidth) * 100,
	mousePositionY = (e.pageY /containerHeight) * 100;

	$(this).css('background-position', mousePositionX + '%' + ' ' + mousePositionY + '%');
});










