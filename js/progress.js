$(function () {
    "use strict";
    var soft_progress_check = false,
    technical_progress_check = false,
    resumeSection = $('.resume'),
    softSkills = $('.soft-skills'),
    technicalSkills = $(".skills"),
    allProgress = [];    

    function getOffsetTop($parent, $child) {
        return $child.position().top - $parent.position().top;
    }

    function readyProgress($pro) {
        var element = "#" + $pro.attr('id'),
        circle = new ProgressBar.Circle(element, {
            easing: 'easeInOut',
            color: $pro.data("color"),
            duration: 3000,
            strokeWidth: 5,
            trailWidth: 5,
            trailColor: '#3a4a5d',
            text: {
                value: '0',
                style: {
                    color: '#FFF',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    padding: 0,
                    margin: 0,
                    transform: {
                        prefix: true,
                        value: 'translate(-50%, -50%)'
                    }
                }
            },
            svgStyle: {
                display: 'inline-block',
                width: 'auto'
            }
        });
        return circle;
    }
    
    $('.progressName').each(function () {
        allProgress.push({
            'circle': readyProgress($(this)),
            'proElement': $(this)
        });
    });
    function getStep(state, circle) {
        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value);
        }
    }
    function startProgress() {
        var i;
        for (i = 0; i < allProgress.length; i += 1) {
            allProgress[i].circle.animate(allProgress[i].proElement.data("value"), {
                duration: 1500,
                step: getStep
            });
        }
    }

    /** Soft Skills Progress */
    
    resumeSection.on('scroll', function () {
        var offsetTop = getOffsetTop($(this), softSkills);
        if (!soft_progress_check && offsetTop < $(this).parent().height()) {
            startProgress();
            soft_progress_check = true;
        }
    });
    // on mobile size
    $(document,window).on('scroll', function () {
        if (window.matchMedia('(max-width: 768px)').matches) {
            var bodyScrollTop = $(document,window).scrollTop(),
            softSkillsoffsetTop = softSkills.offset().top - ($(window).height() / 2);
            if (!soft_progress_check && bodyScrollTop >= softSkillsoffsetTop) {
                startProgress();
                soft_progress_check = true;
            }
        }
    });

    /** Technical Skills Progress */
    function skillsProgress() {
        $('.timer').countTo();
        $('.progress-bar-container').each(function () {
            var thisElement = $(this),
            timer = thisElement.find('.timer'),
            dataTo = timer.data("to");
            thisElement.find('.progress-bar').css({ "width": dataTo + "%" });
            timer.css({ "left": "calc(" + dataTo + "% - 19px)" });
        });
    }

    resumeSection.on('scroll', function () {
        var offsetTop = getOffsetTop($(this), technicalSkills);
        if (!technical_progress_check && offsetTop < $(this).parent().height()) {
            skillsProgress();
            technical_progress_check = true;
        }
    });

    // on mobile size
    $(document,window).on('scroll', function () {
        if (window.matchMedia('(max-width: 768px)').matches) {
            var bodyScrollTop = $(document,window).scrollTop(),
            techoffsetTop = technicalSkills.offset().top - ($(window).height() / 2);
            if (!technical_progress_check && bodyScrollTop >= techoffsetTop) {
                skillsProgress();
                technical_progress_check = true;
            }
        }
    });
});