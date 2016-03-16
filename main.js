$(function() {
    console.info('Interested in JavaScript? Would you like to do something cool with Leo?');
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
        2: new TimelineMax({onComplete: animateEnd}).from(
            '.title-2', 1, {opacity: 0, top: -50, ease: Power2.Out}, animateEnd).stop(),
        3: new TimelineMax({onComplete: animateEnd}).from(
            '.title-3', 1, {opacity: 0, top: -50, ease: Power2.Out}, animateEnd).stop(),
        4: new TimelineMax({onComplete: animateEnd}).from(
            '.title-4', 1, {opacity: 0, top: -50, ease: Power2.Out}, animateEnd).stop(),
        5: new TimelineMax({onComplete: animateEnd}).from(
            '.title-5', 1, {opacity: 0, top: -50, ease: Power2.Out}, animateEnd).stop(),
        6: new TimelineMax({onComplete: animateEnd}).staggerFrom([
                '.title-6',
                '.ep-1',
                '.ep-2',
                '.ep-3',
                '.ep-4',
                '.ea-1',
                '.ea-2',
                '.ep-5',
                '.ea-3',
                '.ep-6',
                '.ep-7'
            ], 1, {opacity: 0, top: 50, ease: Power2.Out}, 0.5, animateEnd).stop()
    };
    var enterEvents = {
        2: function() {
            slowPrintPage2();
        },
        3: function() {
            slowPrintPage3();
        },
        4: function() {
            slowPrintPage4();
        },
        5: function() {
            slowPrintPage5();
        }
    };
    var prepareSlowPrint = function(J, cb) {
        var J2 = J.clone();
        J.css('color', 'rgba(0,0,0,0)');
        return function() {
            J.append(J2);
            slowPrintR(J, J2, J2.text(), 0, 0, cb);
        };
    };
    var wrongCList = 'abcdefghijklmnopqrstuvwxyz., ';
    var slowPrintR = function(origin, J, content, pointer, wrongC, cb) {
        if (pointer < content.length -1) {
            if (!J.hasClass('slow-printing')) {
                J.addClass('slow-printing');
            }
            var waitTime = 35 + 15*Math.random();
            if (wrongC !== '') {
                wrongC = '';
            } else {
                if (Math.random() < 0.05) {
                    wrongC = wrongCList[Math.floor(Math.random() * wrongCList.length)];
                    waitTime = waitTime;
                } else {
                    if (content[pointer] == '.') {
                        waitTime = 400;
                    }
                    if (content[pointer] == '?') {
                        waitTime = 400;
                    }
                    if (content[pointer] == '!') {
                        waitTime = 400;
                    }
                    if (content[pointer] == ',') {
                        waitTime = 300;
                    }
                    if (content[pointer] == '-') {
                        waitTime = 200;
                    }
                    pointer++;
                    if (content[pointer] == ' ') {
                        waitTime = 60;
                    }
                }
            } 
            J.text(content.substr(0, pointer) + wrongC);
            setTimeout(slowPrintR.bind(this, origin, J, content, pointer, wrongC), waitTime, cb);
        } else {
            if (typeof cb === 'function') {
                cb();
            }
            origin.css('color', '');
            J.remove();
        }
    };
    setInterval(function() {
        $('.skewable', '.p' + page).each(function() {
            var JT = $(this);
            if (JT.hasClass('skew')) {
                if (Math.random() < 0.7) {
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
    var a1 = new TimelineMax()
        .from('.button-2', 1, {opacity: 0, top: -50, ease: Power2.Out})
        .stop();
    var slowPrintPage2 = prepareSlowPrint($('p', '.p2'), function() {
        a1.resume();
    });
    var a2 = new TimelineMax({})
        .from('.button-3', 1, {opacity: 0, top: -50, ease: Power2.Out})
        .stop();
    var slowPrintPage3 = prepareSlowPrint($('p', '.p3'), function() {
        a2.resume();
    });
    var a3 = new TimelineMax({})
        .from('.button-4', 1, {opacity: 0, top: -50, ease: Power2.Out})
        .stop();
    var slowPrintPage4 = prepareSlowPrint($('p', '.p4'), function() {
        a3.resume();
    });
    var a4 = new TimelineMax({})
        .from('.button-5', 1, {opacity: 0, top: -50, ease: Power2.Out})
        .stop();
    var slowPrintPage5 = prepareSlowPrint($('p', '.p5'), function() {
        a4.resume();
    });
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
        for (var i = pagePositions.length - 1; i > 0; i--) {
            if ((pagePositions[i] - $(document).scrollTop()) < 200) {
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
            }
        }
    };
    $(window).scroll(onScroll).resize(onScroll);
    onScroll();
    $('button').addClass('active');
    $('.button-next-page').each(function() {
        var J = $(this);
        J.click(function() {
            TweenLite.to(window, 1, {scrollTo:{y:pagePositions[$(this).data('target')]}, ease: Back.easeOut.config(1.3)});
        });
    });
    $('.site-link').fadeOut(0);
    new Egg("up,up,down,down,left,right,left,right,b,a", function() {
        $('.site-link').fadeIn(500);
    }).listen();
});