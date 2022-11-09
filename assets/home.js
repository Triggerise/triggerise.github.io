// ---- Home Slider Start ---- //
var slideIndex = 0;
var slider = document.querySelector('.slideshow-container');
var donorListElm = document.querySelector('.donor__header_container');
var userJourneyElm = document.querySelector('.uj__header_container');
var autoPlaySlider = null;

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function userJourney() {

    var items = document.querySelectorAll(".timeline li");
    function callbackFunc() {
        for (var i = 0; i < items.length; i++) {
            if (isScrolledIntoView(items[i])) {
                items[i].classList.add("in-view");
            }
        }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
}

// Toggle to next slide on the Home page
function nextSlide() {
    continueAutoPlay = false;
    showSlides(slideIndex += 1);
}
// Toggle to selected slide on the Home page
function currentSlide(n) {
    clearInterval(autoPlaySlider);
    showSlides(slideIndex = n);
}
// Toggle to previous slide on the Home page
function prevSlide() {
    clearInterval(autoPlaySlider);
    showSlides(slideIndex -= 1);
}
// Toggle slides on the Home page
function showSlides(n) {
    let slides = document.getElementsByClassName("slidr");
    let dots = document.getElementsByClassName('dot-slidr');
    if (n >= 3) {
        slideIndex = 0;
    } else if (n <= -1) {
        slideIndex = 2;
    }
    if (slides) {
        document.querySelectorAll('.slidr').forEach(function (ele, key) {
            if (slideIndex !== key) {
                ele.style.display = "none";
            } else {
                ele.style.display = "block";
            }
        });
    }
    if (dots) {
        document.querySelectorAll('.dot-slidr').forEach(function (ele, key) {
            if (slideIndex !== key) {
                ele.classList.remove('dot-slidr-active');
            } else {
                ele.classList.add('dot-slidr-active');
            }
        });
    }
}

function donorList() {
    const boxes = gsap.utils.toArray('.donor__card');
    gsap.set(boxes, { autoAlpha: 0, y: 100 });

    boxes.forEach((box, i) => {
        const anim = gsap.to(box, { duration: 1, autoAlpha: 1, y: 0, paused: true });
        ScrollTrigger.create({
            trigger: box,
            start: 'top',
            end: "bottom bottom",
            once: true,
            onEnter: self => {
                self.progress === 0.6 ? anim.progress(1) : anim.play()
            }
        });
    });
}
// ---- Home Slider End ---- //
function initHome() {
    window.addEventListener('load', function () {
        userJourney();
        if (slider) {
            try {
                showSlides();
                // Auto play slider on the Home page
                autoPlaySlider = setInterval(function () {
                    showSlides(slideIndex += 1);
                }, 5000);
            } catch (err) {
                console.error(err);
            }
        }
        if (donorListElm) {
            $('.donor__container').slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                lazyLoad: 'ondemand',
                dots: true,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: false,
                            dots: true,
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            dots: true,
                            arrows: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }

    });
} initHome();