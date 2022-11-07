// ---- About Start ---- //
function initializeTeamSections() {
    $('#team-section-one').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        lazyLoad: 'ondemand',
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    $('#team-section-two').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        lazyLoad: 'ondemand',
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            }
        ]
    });
    $('#team-section-three').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        lazyLoad: 'ondemand',
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            }
        ]
    });
}
// Map Start
var worldMapCheck = document.querySelector('#svgMap');
var map = document.querySelector('.ecosystem-map');
var africanCountryCodes = ["BJ", "BF", "BI", "CM", "CF", "TD", "KM", "CG", "CD", "DJ", "EG", "GQ", "ER", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "ST", "SC", "SL", "SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "UG", "EH", "ZM", "ZW", "AO", "ET", "BW", "DZ", "TN", "SN", "LY"];
function elementInViewport(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}
function scroll() {
    document.addEventListener('scroll', function () {
        if (elementInViewport(map)) {
            map.classList.add('display');
        }
    });
}
function toggleMapTooltips() {
    let hovering = false;
    $('.svgMap-country').on('click tap touchstart', function (event) {
        event.preventDefault();
        if (!hovering) {
            $('.svgMap-tooltip').css("display", "block");
        }
    });

    $(document).click(function (e) {
        if (!hovering) {
            $('.svgMap-tooltip').css("display", "none");
            hovering = false;
        }
    });

    $('.svgMap-country').mouseenter(function (event) {
        event.preventDefault();
        $('.svgMap-tooltip').css("display", "block");
        showTooltip = true;
        hovering = true;
    });

    $('.svgMap-country').mouseleave(function (event) {
        event.preventDefault();
        if (hovering) {
            $('.svgMap-tooltip').css("display", "none");
            showTooltip = false;
            hovering = false;
        }
    });
}
function worldMap() {
    new svgMap({
        targetElementID: 'svgMap',
        flagType: 'image',
        mouseWheelZoomEnabled: false,
        initialZoom: 2,
        initialPan: [{x: -734, y: -402}],
        noDataText: 'We have no projects here',
        data: {
            data: {
                '': {
                    name: '',
                    format: '{0}'
                }
            },
            applyData: '',
            values: {
                CM: {
                    '': "Here, we host a pilot programme in Yaounde expanding access to SRH services including safe abortion funded by Grand Challenges Canada."
                },
                ET: {
                    '': "The head office is based in Addis Ababa and is funded by the Embassy of the Netherlands and the Children's Investment Fund Foundation. Since its inception in 2016, we have provided SRH and HIV/STI services to over 70,000 women. We currently have over 253  providers, 79 clinics and 26 pharmacies in our ecosystem who provide services."
                },
                KE: {
                    '': "This is our largest office currently working with a network of private pharmacies (136) and clinics (200) ensuring variety and quality in service provision. Since 2017, 560,000+ adolescent girls (15-19) have enrolled to the platform and +375,000 have accessed SRH and HIV testing services across 15 counties. The 15 counties were selected based on those presenting the highest burden of teenage pregnancies, low CPR , HIV prevalence and have phone connectivity. The currently expanded platform offering from SRH now includes HIV treatment, mental health services, and job skills training."
                },
                BF: {
                    '': "Operational since 2020, our programme in Burkina Faso is funded by Planned Parenthood, BURCASO, with additional funding from the Children's Investment Fund Foundation. We have provided over 23,000 SRH services in Ouagadougou and Bobo Dioulasso through our ecosystem of over 20 providers."
                },
                UG: {
                    '': "Located in Kampala since 2020. Our Uganda office provides SRH services in Kampala and Arua. With funding from the Elton John AIDS Foundation and ELMA Foundation, we have expanded our services to HIV prevention, testing, and PrEP services to young people at risk."
                },
                ZA: {
                    '': "This is the hub of Triggerise and houses our technical team and global support for the rest of the organisation. It also hosts our research project with Indlela, and is expanding to provide HIV prevention and testing services for young people in the pilot communities around the country."
                },
            }
        }
    });
    toggleMapTooltips();
    $('.svgMap-map-image').children('g').children('path').each(function (i) {
        console.log(this);
        if (!africanCountryCodes.includes($(this).attr('data-id'))) {
            $(this).remove();
        }
    });
}
function classLists() {
    document.querySelector('#svgMap-map-country-CM').classList.add('operation');
    document.querySelector('#svgMap-map-country-ZA').classList.add('office');
    document.querySelector('#svgMap-map-country-UG').classList.add('project');
    document.querySelector('#svgMap-map-country-BF').classList.add('project');
    document.querySelector('#svgMap-map-country-KE').classList.add('operation-office');
    document.querySelector('#svgMap-map-country-ET').classList.add('operation-office');
    document.querySelector('#svgMap-map-country-CM').classList.add('operation');
}
// Map End //
// ---- About End ---- //
function initAbout() {

    window.addEventListener('load', function () { 
        if (worldMapCheck) {
            try {
                worldMap();
                classLists();
            } catch (err) {
                console.error(err);
            }
        }

        if (map) {
            try {
                scroll();
            } catch (err) {
                console.error(err);
            }
        }
        initializeTeamSections();
    });

} initAbout();