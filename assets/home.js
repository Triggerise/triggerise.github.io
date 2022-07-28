// ---- Home Slider Start ---- //
var slideIndex = 0;
var slider = document.querySelector('.slideshow-container');
var autoPlaySlider = null;
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
// ---- Home Slider End ---- //
function initHome() {
    window.addEventListener('load', function () {
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
    });
} initHome();