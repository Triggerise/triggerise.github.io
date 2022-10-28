$.fn.isInViewport = function () {
    var top_of_element = $(this).offset().top;
    var bottom_of_element = $(this).offset().top + $(this).outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    return (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element);
};

function onVisible(element, callback) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
}

function updateMenuLinks() {
    if ($('#heroSectionOne').isInViewport()) {
        $('#circle_first').addClass('done');
        $('#circle_second').removeClass('done');
        $('#circle_third').removeClass('done');
        $('#circle_fourth').removeClass('done');
    }
    if ($('#heroSectionTwo').isInViewport()) {
        $('#circle_first').addClass('done');
        $('#circle_second').addClass('done');
        $('#circle_third').removeClass('done');
        $('#circle_fourth').removeClass('done');
    }
    if ($('#heroSectionThree').isInViewport()) {
        $('#circle_first').addClass('done');
        $('#circle_second').addClass('done');
        $('#circle_third').addClass('done');
        $('#circle_fourth').removeClass('done');
    }
    if ($('#heroSectionFour').isInViewport()) {
        $('#circle_first').addClass('done');
        $('#circle_second').addClass('done');
        $('#circle_third').addClass('done');
        $('#circle_fourth').addClass('done');
    }
}

function navigateToElement(element) {
    document.getElementById(element).scrollIntoView({ block: 'end', behavior: 'smooth' }); Ï
}

function ctaSection() {
    let value = $('#sectionOneCounter').text();
    let countUp = new CountUp('sectionOneCounter', 0, value, 0, 100)
    countUp.start();

    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.cta-container .cta ', { autoAlpha: 0 });

    const pinDistance = $('#cta-pin').height() ? $('#cta-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#cta-pin",
        start: "center center",
        end: "+=" + (pinDistance + 500),
        pin: "#cta-pin",
        markers: false,
        id: "cta"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.cta-container .cta',
            start: 'top top',
            end: "+=" + pinDistance,
            scrub: true
        }
    });

    const steps = gsap.utils.toArray(".cta-container .cta");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.1, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 })

}

function goalsSection() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.goals__container', { autoAlpha: 0 });

    const pinDistance = $('#goal-pin').height() ? $('#goal-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#goal-pin",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#goal-pin",
        markers: false,
        id: "goals"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.goals .goals__container',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true
        }
    });

    const steps = gsap.utils.toArray(".goals .goals__container");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(step, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.1, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 })
}

function flipSection(container1, container2, box) {
    gsap.registerPlugin(Flip);
    const state = Flip.getState(box, { props: "" });

    if (box) {
        if (box.length > 1) {
            box.forEach((elm) => {
                if (elm.parentElement === container1) {
                    container2.appendChild(elm);
                } else {
                    container1.appendChild(elm);
                }
            });
        } else {
            if (box.parentElement === container1) {
                container2.appendChild(box);
            } else {
                container1.appendChild(box);
            }
        }
    }

    Flip.from(state, {
        duration: 1,
        ease: Sine.easeOut,
    });
}

function dibSectionTwo(container1, container2, box, pinDistance) {

    gsap.set('.dib_content_middle_title_container', { display: "none" });
    gsap.set('.dib-margin-bottom', { marginBottom: "0" });
    gsap.set('.dib-margin-top', { marginTop: "0" });
    const stepsTwoTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.three_row .extended_three_column .dib_two_right_container',
            start: 'top center',
            end: "+=" + (pinDistance + 500),
            scrub: true,
            paused: true,
        }
    });

    const stepsTwo = gsap.utils.toArray(".three_row .extended_three_column .dib_two_right_container");


    stepsTwo.forEach((step, i) => {
        stepsTwoTimeline.add(() => {
            const forward = stepsTwoTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : stepsTwo[i - 1],
                outEl = forward ? stepsTwo[i - 1] : step;
            outEl && gsap.to(outEl, { duration: 0.2, overwrite: true, autoAlpha: 0, display: 'none' });
            inEl && gsap.to(inEl, { duration: 0.2, delay: 0.1, overwrite: true, autoAlpha: 1, display: 'block' });
        }, i || 0.001);
    });

    stepsTwoTimeline.to({}, { duration: 1 });

    flipSection(container1, container2, box)

}

function dibSectionOne() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set('.dib_two_left_container', { display: "none" });
    gsap.set('.dib_two_column .dib_content_column_container', { display: "none" });
    gsap.set('.extended_three_column .dib_two_right_container', { display: "none" });
    gsap.set('.dib-margin-bottom', { marginBottom: "50%" });
    gsap.set('.dib-margin-top', { marginTop: "100%" });

    const pinDistance = $('#dib-content-pin').height() ? $('#dib-content-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#dib-content-pin",
        start: "center center",
        end: "+=" + (pinDistance + 1000),
        pin: "#dib-content-pin",
        markers: false,
        id: "dib-content"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.three_row .three_column .dib_two_left_container',
            start: 'top center',
            pinSpacing: true,
            end: "+=" + (pinDistance),
            scrub: true,
            onLeave: () => dibSectionTwo(document.querySelector("#dib-horizontal-animation"), document.querySelector("#dib-vertical-animation .dib_two_column"), document.querySelectorAll("#dib-horizontal-animation .three_column"), pinDistance),
        },
    });

    const steps = gsap.utils.toArray(".three_row .three_column .dib_two_left_container, .three_row .dib_two_column .dib_content_column_container");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {
            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(step, { duration: 0.2, overwrite: true, display: "none" });
            inEl && gsap.to(inEl, { duration: 0.2, delay: 0.1, overwrite: true, display: "flex" });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 });

}

function whyUsSection() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set('.why-us-row-container .why-us .why-icon-container', { autoAlpha: 0 });
    gsap.set('.why-us-row-container .why-us .why-content', { display: 'none', autoAlpha: 0 });

    const pinDistance = $('#why-us-pin').height() ? $('#why-us-pin').height() : 1000;

    ScrollTrigger.create({
        trigger: "#why-us-pin",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#why-us-pin",
        markers: false,
        id: "why-us"
    })

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.why-us-row-container .why-us',
            start: 'top center',
            end: "bottom top",
            scrub: true,
        }
    });

    const steps = gsap.utils.toArray(".why-us-row-container .why-us .why-icon-container");

    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    const stepsTimelineTwo = gsap.timeline({
        scrollTrigger: {
            trigger: '.why-us-row-container .why-us',
            start: 'top center',
            end: "bottom top",
            scrub: true,
        }
    });

    const stepsTwo = gsap.utils.toArray(".why-us-row-container .why-us .why-content");


    stepsTwo.forEach((step, i) => {
        stepsTimelineTwo.add(() => {

            const forward = stepsTimelineTwo.scrollTrigger.direction > 0,
                inEl = forward ? step : stepsTwo[i - 1],
                outEl = forward ? stepsTwo[i - 1] : step;
            outEl && gsap.to(outEl, { display: "none", autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { display: "block", autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.add(stepsTimelineTwo, 0);
    stepsTimeline.to({}, { duration: 1 });
}

function whyTikoSection() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.icon-container', { autoAlpha: 0 });

    const pinDistance = $('#why-tiko-pin').height() ? $('#why-tiko-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#why-tiko-pin",
        start: "center center",
        end: "+=" + (pinDistance + 500),
        pin: "#why-tiko-pin",
        markers: false,
        id: "why-tiko"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.why-tiko .icon-container',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true
        }
    });

    const steps = gsap.utils.toArray(".why-tiko .icon-container");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(step, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.1, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 })
}

function mapSectionThree() {

    gsap.registerPlugin(ScrollTrigger);
    const pinDistance = $('#map-pin-three').height() ? $('#map-pin-three').height() : 1000;
    ScrollTrigger.create({
        trigger: "#map-pin-three",
        start: "center center",
        end: "+=" + (pinDistance + 500),
        pin: "#map-pin-three",
        markers: false,
        id: "map-content-box-three"
    })
    gsap.utils.toArray(".map__content_three_container").forEach(section => {
        const boxes = section.querySelectorAll(".slide-image");
        const t1 = gsap.timeline({
            scrollTrigger: {
                trigger: '#map-pin-three',
                start: "top center",
                end: pinDistance,
                markers: false,
            },
            defaults: {
                duration: 1,
                opacity: 0,
                ease: "power2"
            }
        })
            .from(boxes[0], { x: "-100vw" })
            .from(boxes[1], { x: "100vw" })
    });
}

function mapSectionTwo() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.map-content-step-two', { autoAlpha: 0 });

    const pinDistance = $('#map-pin-two').height() ? $('#map-pin-two').height() : 1000;


    ScrollTrigger.create({
        trigger: "#map-pin-two",
        start: "center center",
        end: "+=" + (pinDistance + 500),
        pin: "#map-pin-two",
        markers: false,
        id: "map-content-box-two"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box-two .map-content',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
            onLeaveBack: () => flipSection(document.querySelector(".map_container_two"), document.querySelector(".map_container"), document.querySelector(".map_container_two svg")),
        }
    });

    const steps = gsap.utils.toArray(".map-content-box-two .map-content-step-two");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 })

}

function mapSection() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.map-content-step', { autoAlpha: 0 });

    const pinDistance = $('#map-pin').height() ? $('#map-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#map-pin",
        start: "center center",
        end: "+=" + (pinDistance + 500),
        pin: "#map-pin",
        markers: false,
        id: "map-content-box"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box .map-content',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
            onLeave: () => flipSection(document.querySelector(".map_container"), document.querySelector(".map_container_two"), document.querySelector(".map_container svg")),
        }
    });

    const steps = gsap.utils.toArray(".map-content-box .map-content-step");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 })

}

function firstHeadline() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.map-content-step-two', { autoAlpha: 0 });

    const pinDistance = $('#first-headline-pin').height() ? $('#first-headline-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#first-headline-pin",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#first-headline-pin",
        markers: false,
        id: "first-headline"
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#first-headline-pin .two_column',
            start: 'top center',
            end: "bottom top",
            scrub: true,
        }
    });

    const steps = gsap.utils.toArray("#first-headline-pin .two_column");


    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(step, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 })
}

function initImpactBond() {
    window.addEventListener('load', function () {

        $(window).on('resize scroll', function (scroll) {
            if (!window.matchMedia("(max-width: 1024px)").matches) {
                updateMenuLinks();
            }
        });
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            firstHeadline();
            mapSection();
            mapSectionTwo();
            mapSectionThree();
            whyTikoSection();
            dibSectionOne();
            whyUsSection();
            goalsSection();
            ctaSection();
        }

        AOS.init();
    });
} initImpactBond();