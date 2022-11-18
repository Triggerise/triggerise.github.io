const sections = gsap.utils.toArray(".section-container");

const allSlides = [];
const vh = window.innerHeight;
let lastSlide = 0;
let activeSlide = 0;

sections.forEach(slide => {
    slide.type = 0;
    if (!slide.querySelectorAll("section-container").length > 0) allSlides.push(slide);
    slide.querySelectorAll("section-container").forEach(subslide => {
        gsap.set(subslide, { opacity: 0, y: 100, zIndex: 1 });
        subslide.posY = slide.offsetTop;
        subslide.type = 1;
        allSlides.push(subslide);
    })
})

const scrolling = {
    enabled: true,
    events: "scroll,wheel,touchmove,pointermove,keyup,keydown".split(","),
    prevent: e => e.preventDefault(),
    disable() {
        if (scrolling.enabled) {
            scrolling.enabled = false;
            window.addEventListener("scroll", gsap.ticker.tick, { passive: true });
            scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, { passive: false }));
        }
    },
    enable() {
        if (!scrolling.enabled) {
            scrolling.enabled = true;
            window.removeEventListener("scroll", gsap.ticker.tick);
            scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
        }
    }
}

function goToSection(section, lastSection) {
    lastSlide = lastSection;
    if (scrolling.enabled) {
        scrolling.disable();
        if (section.type == 0) {
            gsap.to(window, {
                scrollTo: { y: section, autoKill: false },
                onComplete: scrolling.enable,
                duration: 1
            });
        } else if (section.type == 1) {
            gsap.to(window, {
                scrollTo: { y: section.posY, autoKill: false },
                onComplete: scrolling.enable,
                duration: 1
            })
            gsap.to(section, {
                y: 0,
                opacity: 1,
                zIndex: 10,
                duration: 10
            });
            if (lastSection.type == 1) {
                gsap.to(lastSection, {
                    y: 100,
                    opacity: 0,
                    zIndex: 1,
                    duration: 10
                });
            }
        }
    }
}

$.fn.isInViewport = function () {
    var top_of_element = $(this).offset().top;
    var bottom_of_element = $(this).offset().top + $(this).outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    return (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element);
};

function shuffleArray(arr, subtraction) {
    var arr2 = [];
    while (arr.length > 0) {
        arr2.push(arr.splice(Math.round(Math.random() * (arr.length - 1)), 1)[0]);
    }
    for (let i = 0; i <= subtraction; i++) {
        var index = Math.floor(Math.random() * arr2.length);
        arr2.splice(index, 1);
    }
    return arr2;
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

function navigateToElement(activeSection) {
    goToSection(allSlides[activeSection], lastSlide);
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
        end: "+=" + (pinDistance + 1000),
        pin: "#cta-pin",
        markers: false,
        id: "cta",
    })

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.cta-container .cta',
            start: 'bottom center',
            end: "+=" + (pinDistance + 1000),
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
        id: "goals",
        onLeave: () => { goToSection(allSlides[13], allSlides[12])},
        onLeaveBack: () => goToSection(allSlides[12], allSlides[11])
    })

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.goals .goals__container',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
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

function heroSectionThree() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "#hero-three-pin",
        start: "center center",
        end: "bottom center",
        pin: "#hero-three-pin",
        markers: false,
        onLeave: () => goToSection(allSlides[10], allSlides[9]),
        onLeaveBack: () => goToSection(allSlides[9], allSlides[8])
    })
}

function heroSectionTwo() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "#hero-two-pin",
        start: "center center",
        end: "bottom center",
        pin: "#hero-two-pin",
        markers: false,
        onLeave: () => goToSection(allSlides[8], allSlides[7]),
        onLeaveBack: () => goToSection(allSlides[7], allSlides[6])
    })
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
                if (container2) {
                    container2.appendChild(box);
                }
            } else {
                if (box.length > 0) {
                    container1.appendChild(box);
                }
            }
        }
    }

    Flip.from(state, {
        duration: 2,
        ease: "power1.inOut",
        fade: true,
        stagger: 0.2,
    });
}

function flipMapSection(container1, container2, box) {
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
                if (container2) {
                    container2.appendChild(box);
                }
            } else {
                if (box.length > 0) {
                    container1.appendChild(box);
                }
            }
        }
    }

    Flip.from(state, {
        duration: 2,
        ease: "power1.inOut",
        fade: true,
        absolute: true,
        stagger: 0.2,
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
            end: "+=" + pinDistance,
            scrub: true,
            paused: true,
        }
    });

    const stepsTwo = gsap.utils.toArray(".three_row .extended_three_column .dib_two_right_container");
    const columns = gsap.utils.toArray("#dib-horizontal-animation .three_column");
    const arrows = gsap.utils.toArray(".dib-arrow");
    arrows.forEach((arrow, i) => {
        $(arrow).css({ 'transform': 'rotate(0deg)', 'margin-top': '0px', 'margin-left': 'auto', 'margin-right': 'auto', 'font-size': '35px' });
    });

    columns.forEach((column, i) => {
        console.log(column);
        $(column).css({ 'flex-wrap': 'wrap' });
    });


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
    gsap.set('.dib-arrow', { autoAlpha: 0 });

    const pinDistance = $('#dib-content-pin').height() ? $('#dib-content-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#dib-content-pin",
        start: "center center",
        end: "+=" + (pinDistance + 1000),
        pin: "#dib-content-pin",
        markers: false,
        id: "dib-content",
        onLeave: () => { goToSection(allSlides[11], allSlides[10]); },
        onLeaveBack: () => { goToSection(allSlides[10], allSlides[9]); }
    })


    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.three_row .three_column .dib_two_left_container',
            start: 'top center',
            pinSpacing: true,
            end: "+=" + pinDistance,
            scrub: true,
            onLeave: () => dibSectionTwo(document.querySelector("#dib-horizontal-animation"), document.querySelector("#dib-vertical-animation .dib_two_column"), document.querySelectorAll("#dib-horizontal-animation .three_column"), pinDistance),
        },
    });

    const steps = gsap.utils.toArray(".three_row .three_column .dib_two_left_container, .three_row .dib_two_column .dib_content_column_container");

    const arrows = gsap.utils.toArray(".dib-arrow");
    arrows.forEach((arrow, i) => {
        if (i === 0) {
            $(arrow).css({ 'transform': 'rotate(-125deg)', 'margin-top': '100px' });
        } else if (i === 1) {
            $(arrow).css({ 'transform': 'rotate(-50deg)', 'margin-top': '100px' });
        } else {

        }
    });

    steps.forEach((step, i) => {
        stepsTimeline.add(() => {
            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(step, { duration: 0.2, overwrite: true, display: "none" });
            inEl && gsap.to(inEl, { duration: 0.2, delay: 0.1, overwrite: true, display: "flex" });
        }, i || 0.001);
    });

    arrows.forEach((arrow, i) => {
        stepsTimeline.add(() => {
            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? arrow : arrows[i - 1],
                outEl = forward ? arrows[i - 1] : arrow;
            outEl && gsap.to(arrow, { duration: 0.2, overwrite: true, autoAlpha: 0 });
            inEl && gsap.to(arrows, { duration: 0.2, delay: 0.1, overwrite: true, autoAlpha: 1 });
        });
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
        end: "+=" + (pinDistance + 1000),
        pin: "#why-us-pin",
        markers: false,
        id: "why-us",
        onLeave: () => { goToSection(allSlides[12], allSlides[11]); },
        onLeaveBack: () => { goToSection(allSlides[11], allSlides[10]); }
    })

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.why-us-row-container .why-us',
            start: 'bottom center',
            end: "+=" + (pinDistance + 1000),
            scrub: true,
        }
    });

    const steps = gsap.utils.toArray(".why-us-row-container .why-us .why-icon-container");

    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, duration: 0.5, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.5, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    const stepsTwo = gsap.utils.toArray(".why-us-row-container .why-us .why-content");

    stepsTwo.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : stepsTwo[i - 1],
                outEl = forward ? stepsTwo[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, display: "none", duration: 0.5, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, display: "block", duration: 0.5, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });
    stepsTimeline.to({}, { duration: 1 });
}

function whyTikoSection() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.icon-container', { autoAlpha: 0 });

    const pinDistance = $('#why-tiko-pin').height() ? $('#why-tiko-pin').height() : 1000;


    ScrollTrigger.create({
        trigger: "#why-tiko-pin",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#why-tiko-pin",
        markers: false,
        id: "why-tiko",
        onLeave: () => { goToSection(allSlides[9], allSlides[8]); },
        onLeaveBack: () => { goToSection(allSlides[8], allSlides[7]); }
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

function mapSectionFive() {

    gsap.registerPlugin(ScrollTrigger);
    const pinDistance = $('#map-pin-five').height() ? $('#map-pin-five').height() : 1000;
    ScrollTrigger.create({
        trigger: "#map-pin-five",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#map-pin-five",
        markers: false,
        id: "map-content-box-five",
        onLeave: () => { goToSection(allSlides[7], allSlides[6]); },
        onLeaveBack: () => { goToSection(allSlides[6], allSlides[5]); }
    })
    const boxes = document.querySelectorAll(".slide__image");
    const t1 = gsap.timeline({
        scrollTrigger: {
            trigger: '#map-pin-five',
            start: "top center",
            end: "+=" + pinDistance,
            markers: false,
        },
        defaults: {
            duration: 1,
            opacity: 0,
            ease: "power2"
        },
        onUpdate: function () {
            if (this.progress() === 1) {
                flipMapSection(document.querySelector('#map-section-five #image__container_1'), document.querySelector('#map-section-five #image__container_2'), document.querySelector('#map-section-five #image__container_1 #image__1'));
                flipMapSection(document.querySelector('#map-section-five #image__container_2'), document.querySelector('#map-section-five #image__container_1'), document.querySelector('#map-section-five #image__container_2 #image__2'));
                this.to("#map-section-five #image__container_1", 1, { autoAlpha: 0, ease: Linear.easeNone });
                this.to("#map-section-five #image__container_2", 1, { autoAlpha: 0, ease: Linear.easeNone });
                this.to("#map-section-five #map__middle_container", 1, { autoAlpha: 0, display: 'none', ease: Linear.easeNone });
                this.to("#map-section-five #map__middle_mobile_container", 1, { autoAlpha: 1, display: 'block', ease: Linear.easeNone });
            }
        }
    })
        .from(boxes[0], { x: "-100vw" })
        .from(boxes[1], { y: "-100vh" })
        .from(boxes[2], { y: "-100vh" })
        .from(boxes[3], { x: "100vw" })

}

function mapSectionFour() {
    gsap.set('.map-content-step-four', { autoAlpha: 0 });
    gsap.set('#thoughtLineSVG g path', { autoAlpha: 0 });
    gsap.registerPlugin(ScrollTrigger);
    const pinDistance = $('#map-pin-four').height() ? $('#map-pin-four').height() : 1000;

    ScrollTrigger.create({
        trigger: "#map-pin-four",
        start: "center center",
        end: "+=" + (pinDistance + 1000),
        pin: "#map-pin-four",
        markers: false,
        id: "map-content-box-four",
        onLeave: () => { goToSection(allSlides[6], allSlides[5]); },
        onLeaveBack: () => { goToSection(allSlides[5], allSlides[4]); }
    });

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box .map-content .map-content-step-four',
            start: 'top center',
            end: "+=" + (pinDistance + 1000),
            scrub: true,
        }
    });

    const steps = gsap.utils.toArray(".map-content-box .map-content-step-four");
    steps.forEach((step, i) => {
        stepsTimeline.add(() => {

            const forward = stepsTimeline.scrollTrigger.direction > 0,
                inEl = forward ? step : steps[i - 1],
                outEl = forward ? steps[i - 1] : step;
            outEl && gsap.to(outEl, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });

    stepsTimeline.to({}, { duration: 1 });

    const thoughtTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box .map-content .map-content-step-four',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
        }
    });

    const paths = gsap.utils.toArray('#thoughtLineSVG g path');
    paths.forEach((path, i) => {
        thoughtTimeline.add(() => {
            const forward = thoughtTimeline.scrollTrigger.direction > 0,
                inEl = forward ? path : paths[i - 1],
                outEl = forward ? paths[i - 1] : path;
            outEl && gsap.to(path, { autoAlpha: 0, duration: 0.1, overwrite: true });
            inEl && gsap.to(inEl, { autoAlpha: 1, duration: 0.1, delay: 0.01, overwrite: true });
        }, i || 0.001);
    });
}

function mapSectionThree() {
    gsap.set('.map-content-step-three', { autoAlpha: 0 });
    gsap.registerPlugin(ScrollTrigger);
    const pinDistance = $('#map-pin-three').height() ? $('#map-pin-three').height() : 1000;

    ScrollTrigger.create({
        trigger: "#map-pin-three",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#map-pin-three",
        markers: false,
        id: "map-content-box-three",
        onLeave: () => { goToSection(allSlides[5], allSlides[4]); flipMapSection(document.querySelector('#map-section-two .two_column .map__svg_container'), document.querySelector('#map-section-three .two_column .map__svg_container'), document.querySelector('#map-section-two .two_column .map__svg_container svg')) },
        onLeaveBack: () => { goToSection(allSlides[4], allSlides[3]); flipMapSection(document.querySelector('#map-section-three .two_column .map__svg_container'), document.querySelector('#map-section-two .two_column .map__svg_container'), document.querySelector('#map-section-three .two_column .map__svg_container svg')) }
    });

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box .map-content .map-content-step-three',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
        }
    });

    const steps = gsap.utils.toArray(".map-content-box .map-content-step-three");
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

function mapSectionTwo() {
    gsap.set('.map-content-step-two', { autoAlpha: 1 });

    gsap.registerPlugin(ScrollTrigger);
    const pinDistance = $('#map-pin-two').height() ? $('#map-pin-two').height() : 1000;

    ScrollTrigger.create({
        trigger: "#map-pin-two",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#map-pin-two",
        markers: false,
        id: "map-content-box-two",
        onLeave: () => { goToSection(allSlides[4], allSlides[3]); flipMapSection(document.querySelector('#map-section-two .two_column .map__svg_container'), document.querySelector('#map-section-three .two_column .map__svg_container'), document.querySelector('#map-section-two .two_column .map__svg_container svg')) },
        onLeaveBack: () => { goToSection(allSlides[3], allSlides[2]); flipMapSection(document.querySelector('#map-section-two .two_column .map__svg_container'), document.querySelector('#map-section-one .two_column .map__svg_container'), document.querySelector('#map-section-two .two_column .map__svg_container svg')) }
    });

    const mapTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box .map-content .map-content-step-two',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
        }
    });

    const gsapPaths = gsap.utils.toArray('#mapSVG g path');
    const paths = shuffleArray(gsapPaths, 25);
    paths.forEach((path, i) => {
        mapTimeline.add(() => {
            mapTimeline.to(path, 5, { fill: "#45a590" });
        });
    });
}

function mapSection() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.map-content-step', { autoAlpha: 0 });

    const pinDistance = $('#map-pin').height() ? $('#map-pin').height() : 1000;

    ScrollTrigger.create({
        trigger: "#map-pin",
        start: "center center",
        end: "+=" + pinDistance,
        pin: "#map-pin",
        markers: false,
        id: "map-content-box",
        onLeave: () => { goToSection(allSlides[3], allSlides[2]); flipMapSection(document.querySelector('#map-section-one .two_column .map__svg_container'), document.querySelector('#map-section-two .two_column .map__svg_container'), document.querySelector('#map-section-one .two_column .map__svg_container svg')) },
        onLeaveBack: () => goToSection(allSlides[2], allSlides[1])
    })

    const stepsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.map-content-box .map-content .map-content-step',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
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
        id: "first-headline",
        onLeave: () => goToSection(allSlides[2], allSlides[1]),
        onLeaveBack: () => goToSection(allSlides[1], allSlides[0]),
    })

    gsap.timeline({
        scrollTrigger: {
            trigger: "#first-headline-pin .first_column_two ",
            scrub: true,
            start: 'top center',
            end: "bottom top",
        }
    }).to('#dib_heroFourSVG', {
        rotation: 45,
        duration: 1, ease: 'none',
    })
}

function smoothShowHide(element, state) {
    if (state) {
        gsap.set(element, { autoAlpha: 1, ease: Linear.easeNone });
        gsap.set(element, { display: 'block', ease: Linear.easeNone });
    } else {
        gsap.set(element, { autoAlpha: 0, ease: Linear.easeNone });
        gsap.set(element, { display: 'none', ease: Linear.easeNone });
    }
}

function flipHeroSection(container1, container2, box) {
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
                if (container2) {
                    container2.appendChild(box);
                }
            } else {
                if (box.length > 0) {
                    container1.appendChild(box);
                }
            }
        }
    }

    Flip.from(state, {
        duration: 2,
        ease: "power1.inOut",
        fade: true,
        stagger: 0.1,
        onUpdate: function () {
            if (this.progress() <= 0.5) {
                smoothShowHide("#dib_heroTwoSVG", false);
                smoothShowHide("#dib_heroThreeSVG", false);
                smoothShowHide("#dib_heroFourSVG", false);
                smoothShowHide("#dib_heroOneSVG", true);
            } else if (this.progress() > 0.5 && this.progress() < 0.7) {
                smoothShowHide("#dib_heroOneSVG", false);
                smoothShowHide("#dib_heroThreeSVG", false);
                smoothShowHide("#dib_heroFourSVG", false);
                smoothShowHide("#dib_heroTwoSVG", true);
            } else if (this.progress() >= 0.7 && this.progress() < 1) {
                smoothShowHide("#dib_heroOneSVG", false);
                smoothShowHide("#dib_heroTwoSVG", false);
                smoothShowHide("#dib_heroFourSVG", false);
                smoothShowHide("#dib_heroThreeSVG", true);
            } else if (this.progress() === 1) {
                smoothShowHide("#dib_heroOneSVG", false);
                smoothShowHide("#dib_heroTwoSVG", false);
                smoothShowHide("#dib_heroThreeSVG", false);
                smoothShowHide("#dib_heroFourSVG", true);
            }
        }
    });
}

function heroOne() {
    gsap.registerPlugin(ScrollTrigger);

    const pinDistance = $('#hero-one-pin').height() ? $('#hero-one-pin').height() : 1000;

    ScrollTrigger.create({
        trigger: "#hero-one-pin",
        start: "center center",
        end: "bottom center",
        pin: "#hero-one-pin",
        markers: false,
        id: "firstSVG",
        onLeave: () => goToSection(allSlides[1], allSlides[0])
    })

    gsap.timeline({
        scrollTrigger: {
            trigger: '#dib_heroOneSVG',
            start: 'top center',
            end: "+=" + pinDistance,
            scrub: true,
            onLeave: () => flipHeroSection(document.querySelector("#heroSectionOne .wrapper .hero_section_one_svg_container"), document.querySelector("#first_headline_image_container"), document.querySelectorAll("#heroSectionOne .wrapper .hero_section_one_svg_container svg")),
        }
    });

}

function initImpactBond() {
    window.addEventListener('load', function () {
        $(window).on('resize scroll', function (scroll) {
            if (!window.matchMedia("(max-width: 1024px)").matches) {
                updateMenuLinks();
            }
        });
        if (!window.matchMedia("(max-width: 1024px)").matches && !window.matchMedia("(max-height: 700px)").matches) {
            heroOne();
            firstHeadline();
            mapSection();
            mapSectionTwo();
            mapSectionThree();
            mapSectionFour();
            mapSectionFive();
            whyTikoSection();
            dibSectionOne();
            whyUsSection();
            goalsSection();
            ctaSection();
        }
    });
} initImpactBond();