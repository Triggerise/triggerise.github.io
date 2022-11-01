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
                    '': 'Operational since 2018, we are connecting young girls in the Far North and Eastern regions of Cameroon with SRH services. Funded by Cordaid, we have built an ecosystem of 36 service providers in Cameroon.',
                },
                ET: {
                    '': 'Operational since 2016, we are connecting young girls in Addis Ababa and Afar regions of Ethiopia with SRH services. Funded by Rutgers and Embassy of Netherlands, Ethiopia, we have built an ecosystem of 77 service providers in Ethiopia. Since 2017, we also have an office in Addis Ababa that supports the regional operations.'
                },
                KE: {
                    '': 'Operational since 2015, we are connecting young girls in over 15 counties of Kenya with SRH services. Funded by the Children’s Investment Fund Foundation and Ministry of Foreign Affairs of the Netherlands, we have built an ecosystem of 551 service providers in Kenya. Since 2015, our Nairobi office has been providing support to operations in Burkina Faso, Cameroon, Democratic Republic of Congo and Kenya.'
                },
                BF: {
                    '': ' Scheduled to implement our platform in 2020, we aim to connect young girls in Ouagadougou and Bobo Dioulasso cities in Burkina Faso to various SRH services. Together with our partners, Planned Parenthood Global (PPG) and BURCASO, we are building ecosystems of service providers and youth in Burkina Faso.'
                },
                UG: {
                    '': 'Scheduled to implement our platform in 2020, we aim to connect young girls in Arua and Kampala districts of Uganda to various SRH services. Together with our partners, ThinkPlace and Reach a Hand Uganda, we are building ecosystems of service providers and youth in Uganda.'
                },
                ZA: {
                    '': 'Established in 2014, our Cape Town office provides global executive support to our operations and technology teams.'
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