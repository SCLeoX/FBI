$(function() {
	var pagePositions = [0];
	var animating;
	var page = 1;
	var entered = [];
	var animateStart = function() {
		animating = true;
		$('button').removeClass('active');
	};
	var animateEnd = function() {
		animating = false;
		$('button').addClass('active');
	};
	var enterAnimations = {
		1: new TimelineMax({onComplete: animateEnd}).staggerFrom([
				'.title',
				'.sub-title',
				'.button-1'
			], 1, {opacity: 0, top: -50, ease: Power2.Out}, 0.5, animateEnd).stop(),
		2: new TimelineMax({onComplete: animateEnd}).from('.title-2', 1, 
			{opacity: 0, top: -50, ease: Power2.Out}, 0.5, animateEnd).stop()
	};
	var enterEvents = {
		2: function() {
			slowPrintPage2();
		}
	};
	var prepareSlowPrint = function(J) {
		var J2 = J.clone();
		J.css('color', 'rgba(0,0,0,0)');
		return function() {
			J.append(J2);
			slowPrintR(J, J2, J2.text(), 0, 0);
		};
	};
	var wrongCList = 'abcdefghijklmnopqrstuvwxyz., ';
	var slowPrintR = function(origin, J, content, pointer, wrongC) {
		if (pointer < content.length -1) {
			if (!J.hasClass('slow-printing')) {
				J.addClass('slow-printing');
			}
			var waitTime = 40 + 20*Math.random();
			if (wrongC !== '') {
				wrongC = '';
			} else {
				if (Math.random() < 0.04) {
					wrongC = wrongCList[Math.floor(Math.random() * wrongCList.length)];
					waitTime = 200;
				} else {
					if (content[pointer] == '.') {
						waitTime = 500;
					}
					if (content[pointer] == ',') {
						waitTime = 300;
					}
					pointer++;
					if (content[pointer] == ' ') {
						waitTime = 100;
					}
				}

			} 
			J.text(content.substr(0, pointer) + wrongC);
			setTimeout(slowPrintR.bind(this, origin, J, content, pointer, wrongC), waitTime);
		} else {
			origin.css('color', '');
			J.remove();
		}
	};
	setInterval(function() {
		$('.skewable', '.p' + page).each(function() {
			var JT = $(this);
			if (JT.hasClass('skew')) {
				if (Math.random() < 0.8) {
					JT.removeClass('skew');
				}
			} else {
				if (Math.random() < 0.05) {
					JT.addClass('skew');
				}
			}
		});
		switch (page) {
			case 1:

				break;
		}
	}, 100);
	$('.page').each(function() {
		var J = $(this);
		var p = J.data('page');
		J.addClass('p' + p);
	});
	var slowPrintPage2 = prepareSlowPrint($('p', '.p2'));
	$('.pad').each(function() {
		var J = $(this);
		J.height(J.data("pad"));
	});
	var onScroll = function() {
		pagePositions = [0];
		$('.page').each(function() {
			pagePositions.push($(this).offset().top);
		});
		var distance = Infinity;
		for (var i = 1; i < pagePositions.length; i++) {
			var d = Math.abs($(document).scrollTop() - pagePositions[i]);
			if (d < distance) {
				distance = d;
			} else {
				i = i - 1;
				break;
			}
		}
		page = i;
		if (entered.indexOf(page) === -1) {
			entered.push(page);
			if (typeof enterEvents[page] === 'function') {
				enterEvents[page]();
			}
			if (enterAnimations[page]) {
				animateStart();
				enterAnimations[page].resume();
			}
		}
	};
	$(window).scroll(onScroll);
	onScroll();
	$('button').addClass('active');
	$('.button-next-page').each(function() {
		var J = $(this);
		J.click(function() {
			TweenLite.to(window, 1, {scrollTo:{y:pagePositions[$(this).data('target')]}, ease: Back.easeOut.config(1.3)});
		});
	});
});