//utils
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

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

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error) {
          error(xhr);
        }
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

//counter
window.onload = function () {
  loadJSON("https://oblivion.movercado.org/api/metrics/website", function (data) {

    //api
    var homepage = data.global.active_rafikis;
    var userTotal = data.global.active_rafikis;
    var servicesTotal = data.global.number_of_services;
    const partnersTotalKenya = data?.ecosystems?.find(obj => obj.country === 'Kenya')?.size;
    const partnersTotalIndia = data?.ecosystems?.find(obj => obj.country === 'India')?.size;
    const partnersTotalEthiopia = data?.ecosystems?.find(obj => obj.country === 'Ethiopia')?.size;
    var milesTotal = data.global.tiko_miles;

    //not in API
    let serviceUptake = data?.conversion_rate?.[0]?.size || 0;
    let repeatBehaviour = data?.repeat_visit?.[0]?.size || 0;
    let providerRatings = data?.top_business?.[0]?.size || 0;

    var home = document.querySelector('#countup');
    var impactTotal = document.querySelector('#total-users');
    var services = document.querySelector('#platform-services');
    var partners = document.querySelector('#partnersKenya');
    var partnersIndia = document.querySelector('#partners-india');
    var partnersEthiopia = document.querySelector('#partnersEthiopia');
    var miles = document.querySelector('#tiko-miles');
    var serviceUptakeSelect = document.querySelector('#serviceUptake');
    var repeatBehaviourSelect = document.querySelector('#repeatBehaviour');
    var providerRatingsSelect = document.querySelector('#providerRatings');
    let serviceUptakeTitle = document.querySelector('#serviceUptakeTitle');
    let repeatBehaviourTitle = document.querySelector('#repeatBehaviourTitle');
    let providerRatingsTitle = document.querySelector('#providerRatingsTitle');

    if (serviceUptake === 0) {
      serviceUptake = 91;
      serviceUptakeTitle.textContent = "of our members enrolled in Kenya visited a provider in the month of July 2020";
    }

    if (repeatBehaviour === 0) {
      repeatBehaviour = 6;
      repeatBehaviourTitle.textContent = "of our members in Kenya who took a service were repeat users in the month of July 2020";
    }

    if (providerRatings === 0) {
      providerRatings = 87;
      providerRatingsTitle.textContent = "of all our providers in Kenya in the month of July 2020 were rated 5 stars";
    }

    ///THIS NEEDS REFACTOR

    if (home || impactTotal || services || partners || partnersIndia || partnersEthiopia || miles || serviceUptakeSelect || repeatBehaviourSelect || providerRatingsSelect) {

      if (impactTotal && !impactTotal.classList.contains('counted')) {
        impactTotal.classList.add('counted');
        var countUp = new CountUp('total-users', 2000, userTotal)
        countUp.start();
      }

      if (home && !home.classList.contains('counted')) {
        home.classList.add('counted');
        var countUp = new CountUp('countup', 2000, homepage)
        countUp.start();
      }

      if (services && !services.classList.contains('counted')) {
        services.classList.add('counted');
        var countUp = new CountUp('platform-services', 2000, servicesTotal);
        countUp.start();
      }

      if (partners && !partners.classList.contains('counted')) {
        partners.classList.add('counted');
        var countUp = new CountUp('partnersKenya', 0, partnersTotalKenya);
        countUp.start();
      }

      if (partnersIndia && !partnersIndia.classList.contains('counted')) {
        partnersIndia.classList.add('counted');
        var countUp = new CountUp('partners-india', 0, partnersTotalIndia);
        countUp.start();
      }

      if (partnersEthiopia && !partnersEthiopia.classList.contains('counted')) {
        partnersEthiopia.classList.add('counted');
        var countUp = new CountUp('partnersEthiopia', 0, partnersTotalEthiopia);
        countUp.start();
      }

      if (miles && !miles.classList.contains('counted')) {
        miles.classList.add('counted');
        var countUp = new CountUp('tiko-miles', 0, milesTotal);
        countUp.start();
      }

      if (serviceUptakeSelect && !serviceUptakeSelect.classList.contains('counted')) {
        serviceUptakeSelect.classList.add('counted');
        var countUp = new CountUp('serviceUptake', 0, serviceUptake);
        countUp.start();
      }

      if (repeatBehaviourSelect && !repeatBehaviourSelect.classList.contains('counted')) {
        repeatBehaviourSelect.classList.add('counted');
        var countUp = new CountUp('repeatBehaviour', 0, repeatBehaviour);
        countUp.start();
      }

      if (providerRatingsSelect && !providerRatingsSelect.classList.contains('counted')) {
        providerRatingsSelect.classList.add('counted');
        var countUp = new CountUp('providerRatings', 0, providerRatings);
        countUp.start();
      }
    }
  });
};

//carousel
var myFullpage = new fullpage('#fullpage', {
  //Navigation
  licenseKey: '3B63225D-9F3C433A-BBF0651D-0A97F55E',
  fadingEffectKey: 'dHJpZ2dlcmlzZS5vcmdfWWI5Wm1Ga2FXNW5SV1ptWldOMGx6SQ==',
  fitToSection: false,
  fadingEffect: true,
  autoScrolling: false,
  scrollHorizontally: true,
  offsetSections: true,
  slidesNavigation: true,
  slidesNavPosition: 'bottom',
  fadingEffect: 'slides',
  controlArrows: true
});

//ecosystem
var map = document.querySelector('.ecosystem-map');
function scroll() {
  document.addEventListener('scroll', function () {
    if (elementInViewport(map)) {
      map.classList.add('display');
    }
  });
}

var worldMapCheck = document.querySelector('#svgMap');
function worldMap() {
  new svgMap({
    targetElementID: 'svgMap',
    flagType: 'image',
    mouseWheelZoomEnabled: false,
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
          '': 'Operational since 2018, we are connecting young girls in the Far North and Eastern regions of Cameroon with SRH services. Funded by Cordaid, we have built an ecosystem of 36 service providers in Cameroon.'
        },
        ET: {
          '': 'Operational since 2016, we are connecting young girls in Addis Ababa and Afar regions of Ethiopia with SRH services. Funded by Rutgers and Embassy of Netherlands, Ethiopia, we have built an ecosystem of 77 service providers in Ethiopia. Since 2017, we also have an office in Addis Ababa that supports the regional operations.'
        },
        IN: {
          '': 'Operational since 2015, we are connecting young girls &amp; mothers in Delhi, Rajasthan and Uttar Pradesh states of India with SRH &amp; ANC services. Funded by the Ministry of Foreign Affairs of the Netherlands and Grand Challenges Canada, we have built an ecosystem of 228 service providers in India. Since 2015, we also have an office in New Delhi that supports the regional operations.'
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
        US: {
          '': 'Scheduled to implement our platform in 2020, we aim to connect young girls in Omaha, Nebraska in the USA to various SRH services. Together with our partner, Women’s Fund Of Omaha, we are building ecosystems of service providers and youth in Omaha.'
        },
        PT: {
          '': 'Established in 2014, our Porto office, called Triggerise Labs, serves as the global technology hub and supports all our operations.'
        },
        NL: {
          '': 'Established in 2014, our Amsterdam office is our registered headquarters and also provides global administrative support to all other offices.'
        },
        ZA: {
          '': 'Established in 2014, our Cape Town office provides global executive support to our operations and technology teams.'
        },
      }
    }
  });
}
function classLists() {
  console.log('countries')
  document.querySelector('#svgMap-map-country-CM').classList.add('operation');
  document.querySelector('#svgMap-map-country-ZA').classList.add('office');
  document.querySelector('#svgMap-map-country-NL').classList.add('office');
  document.querySelector('#svgMap-map-country-US').classList.add('project');
  document.querySelector('#svgMap-map-country-PT').classList.add('office');
  document.querySelector('#svgMap-map-country-UG').classList.add('project');
  document.querySelector('#svgMap-map-country-BF').classList.add('project');
  document.querySelector('#svgMap-map-country-KE').classList.add('operation-office');
  document.querySelector('#svgMap-map-country-IN').classList.add('operation-office');
  document.querySelector('#svgMap-map-country-ET').classList.add('operation-office');
  document.querySelector('#svgMap-map-country-CM').classList.add('operation');
}

var filtersCheck = document.querySelectorAll('.filter');
function hideReports(reports) {
  reports.forEach((item, i) => {
    item.classList.remove('display');
    item.style.display = "none";
  });
}

function filters() {
  var allReports = Array.from(document.querySelectorAll('.report-cover'));
  hideReports(allReports);
  var initialReports = allReports.slice(0, 4);
  initialReports.forEach(e => e.classList.add('display'));
  filtersCheck.forEach(f => {
    f.addEventListener('click', function () {
      hideReports(allReports)
      var data = this.dataset.click;
      var selected = document.querySelectorAll('.' + data);
      console.log(selected);
      selected.forEach(s => {
        s.classList.add('display');
      });
    });
  });
}

//Policy Select

var selectedPolicy = document.querySelectorAll('.link');

function displayPolicy() {
  let currentLanguage = window.location.hash.replace('#', '.') || '.English';
  let allPolicies = Array.from(document.querySelectorAll('.policy'));
  allPolicies.forEach(policy => policy.classList.add('hidden'));
  let correctPolicy = Array.from(document.querySelectorAll('.policy' + currentLanguage));
  correctPolicy.forEach(policy => policy.classList.remove('hidden'));

  let allPolicyLinks = Array.from(document.querySelectorAll('.policy-link'));
  allPolicyLinks.forEach(policy => policy.classList.remove('active-policy'));
  let correctPolicyLink = Array.from(document.querySelectorAll('.policy-link' + currentLanguage));
  correctPolicyLink.forEach(policy => policy.classList.add('active-policy'));
}

displayPolicy();
window.addEventListener('hashchange', displayPolicy);

//---- Cookies Start ----//

// Fetches the cookies that have been set for the client
function getClientCookies() {
  const cookies = document.cookie.split(';').reduce(
    (cookies, cookie) => {
      const [name, val] = cookie.split('=').map(c => c.trim());
      cookies[name] = val;
      return cookies;
    }, {});
  try {
    return JSON.stringify(cookies);
  } catch (err) {
    return JSON.stringify([{}]);
  }
}
// Compares the cookies being set to the cookies that have already been set for the client
function compareCookies(ourCookies) {
  let comparision = true;
  const theirCookies = JSON.parse(getClientCookies());
  ourCookies.forEach(item => {
    if (theirCookies[item.name] === undefined || theirCookies[item.name] === null) {
      comparision = false;
    }
  });
  return comparision;
}
// Deletes all the 'Non Essential' cookies from the client
function deleteAllCookies(ourCookies) {
  try {
    theirCookies = JSON.parse(getClientCookies());
    ourCookies.forEach(item => {
      for (var k in theirCookies) {
        if (item.name === k) {
          if (item.priority === 0) {
            document.cookie = item.name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
        } else {
          document.cookie = k + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      };
    });
  } catch (err) {
    console.log(err);
  }
}
// Either set or remove cookies / local storage
function updateCookies(consent, ourCookies, cookiesButtonStatus, cookiesTextStatus) {
  if (consent) {
    localStorage.setItem('cookiesSeen', 'True');
    localStorage.setItem('cookiesConsentGiven', 'True');
    // Enable GA
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
    updateCookieButtonStatus(true, cookiesButtonStatus, cookiesTextStatus);
  } else {
    localStorage.setItem('cookiesSeen', 'True');
    localStorage.setItem('cookiesConsentGiven', 'False');
    deleteAllCookies(ourCookies);
    updateCookieButtonStatus(false, cookiesButtonStatus, cookiesTextStatus);
  }
}
// Update the values of the cookies slider button and text
function updateCookieButtonStatus(value, cookiesButtonStatus, cookiesTextStatus) {
  if (value) {
    if (cookiesButtonStatus) {
      cookiesButtonStatus.checked = true;
      if (cookiesTextStatus) {
        if (cookiesTextStatus.innerText) {
          cookiesTextStatus.innerText = 'accepted';
        } else {
          cookiesTextStatus.textContent = 'accepted';
        }
      }
    }
  } else {
    if (cookiesButtonStatus) {
      cookiesButtonStatus.checked = false;
      if (cookiesTextStatus) {
        if (cookiesTextStatus.innerText) {
          cookiesTextStatus.innerText = 'rejected';
        } else {
          cookiesTextStatus.textContent = 'rejected';
        }
      }
    }
  }

}
// Adds the event listeners for the Accept/Reject buttons, and toggles the banner
function showCookieBanner(cookiesBanner, cookiesButtonAccept, cookiesButtonDeny, ourCookies, cookiesButtonStatus, cookiesTextStatus) {
  cookiesBanner.classList.add('display');
  cookiesButtonAccept.addEventListener('click', function () {
    updateCookies(true, ourCookies, cookiesButtonStatus, cookiesTextStatus);
    cookiesBanner.classList.remove('display');
  });
  cookiesButtonDeny.addEventListener('click', function () {
    updateCookies(false, ourCookies, cookiesButtonStatus, cookiesTextStatus);
    cookiesBanner.classList.remove('display');
  });
}
// Initialize the cookie process
function initializeCookies() {
  var myStorage = window.localStorage;
  const viewedCookies = myStorage.getItem('cookiesSeen');
  const consentGiven = myStorage.getItem('cookiesConsentGiven');
  // Add new cookies in here
  // Set the priority to '1' if the cookie is required
  // The label, value, and domain attributes can be used to extend other parts of the site
  const ourCookies = [
    {
      // Google analytics default cookie
      "name": "_ga", "value": "", "domain": "", "label": "Google Analytics", "priority": 0,
    }
  ];
  var cookiesButtonAccept = document.querySelector('.cookies-button-accept');
  var cookiesButtonDeny = document.querySelector('.cookies-button-deny');
  var cookiesBanner = document.querySelector('.cookies-banner');
  var comparedCookies = compareCookies(ourCookies);
  var cookiesButtonStatus = document.getElementById('cookies-client-button');
  var cookiesTextStatus = document.getElementById('cookies-client-status');

  if (viewedCookies === 'False' || !viewedCookies) {
    showCookieBanner(cookiesBanner, cookiesButtonAccept, cookiesButtonDeny, ourCookies, cookiesButtonStatus, cookiesTextStatus);
  } else if (viewedCookies === 'True' && consentGiven === 'True' && !comparedCookies) {
    showCookieBanner(cookiesBanner, cookiesButtonAccept, cookiesButtonDeny, ourCookies, cookiesButtonStatus, cookiesTextStatus);
  } else if (viewedCookies === 'True' && consentGiven === 'True' && comparedCookies) {
    updateCookieButtonStatus(true, cookiesButtonStatus, cookiesTextStatus);
  }
  // Slider button on the cookies page
  // This is the functionality implemented for the client, so that they may change their decision on Cookie preference
  if (cookiesButtonStatus) {
    if (consentGiven === 'True') {
      updateCookieButtonStatus(true, cookiesButtonStatus, cookiesTextStatus);
    } else {
      updateCookieButtonStatus(false, cookiesButtonStatus, cookiesTextStatus);
    }
    cookiesButtonStatus.addEventListener('change', function (event) {
      if (event.target.checked) {
        updateCookies(true, ourCookies);
        updateCookieButtonStatus(true, cookiesButtonStatus, cookiesTextStatus);
      } else {
        updateCookies(false, ourCookies);
        updateCookieButtonStatus(false, cookiesButtonStatus, cookiesTextStatus);
      }
    });

  }
}

//---- Cookies End ----//

function init() {
  if (worldMapCheck) {
    worldMap();
    classLists();
  }
  if (map) {
    scroll();
  }
  if (filtersCheck) {
    filters();
  }
  // Initialize the cookie process
  try {
    initializeCookies();
    insertReportSVG();
    fetchMediumPosts();
  } catch (err) {
    console.log(err);
  }
} init();

// Fetch Medium posts from RSS and convert to JSON
function fetchMediumPosts() {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Triggerise')
    .then((res) => res.json())
    .then((data) => {
      const res = data.items;
      const posts = res.filter(item => item.categories.length > 0)
      var output = '';
      var newsSlider = document.getElementById('news-slider');

      posts.forEach((item) => {
        output += `
         <div class="news__post">
            <div class="news__post_img" style="background-image: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url('${item.thumbnail}')">
              <div class="news__preview">
                <div class="news__info_bottom_container">
                  <span class="news__author">${item.author}</span>
                  <span class="news__date">${item.pubDate}</span>
                </div>
                <h3 class="news__title">${item.title}</h3>
              </div>
            </div>
            <div class="news__content">
              <a target="_blank" href="${item.link}">
                <button class="news__read_more">Read More</button>
              </a>
            </div>
         </div>`
      })
      
      if(newsSlider) {
        newsSlider.innerHTML = output;
      }

    })
    .catch((error) => {
      var newsSliderEmpty = document.getElementById('news-empty');

      if(newsSliderEmpty) {
        newsSliderEmpty.innerHTML = `<h4 class="news__error_text">Something went wrong while loading the posts, please try again.</h4>`;
      }

      console.log('Error: ', error);
    });
}

//Includes Jobs.html
var $ = jQuery;
$('.card-flip').hover(function () {
  $('.uk-card').toggleClass('flipped');
});

var anchors = document.querySelectorAll('a');
anchors.forEach((a) => {
  a.setAttribute('target', '__blank');
  a.setAttribute('rel', 'noopener noreferrer');
});

// Insert SVGs and Classes for report covers on the about page
function insertReportSVG () {
    
  // Find all elements tagged with the report-cover class
  var reports = document.getElementsByClassName("report-cover");

  // Loop through elements and attach an svg and class in a set of 4, and then reset the counter on the 5th|11th|etc set
  if(reports.length >= 1) {

    var svgArray = [
      '<svg class="one" width="286" height="185" viewBox="0 0 286 185" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 92.5C0 143.562 41.438 185 92.5 185S185 143.562 185 92.5 143.623 0 92.5 0C41.438 0 0 41.377 0 92.5z" fill="#1D214F"/><path d="M205 144.5c0 22.357 18.143 40.5 40.5 40.5s40.5-18.143 40.5-40.5-18.116-40.5-40.5-40.5c-22.357 0-40.5 18.116-40.5 40.5zM258 40.5c0 6.9-5.6 12.5-12.5 12.5S233 47.4 233 40.5 238.591 28 245.5 28c6.9 0 12.5 5.592 12.5 12.5z" fill="#FDDE5A"/></svg>',
      '<svg class="two" width="298" height="185" viewBox="0 0 298 185" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M92.5 185C41.438 185 0 143.562 0 92.5h185c0 51.062-41.438 92.5-92.5 92.5z" fill="#2C449C"/><path d="M205.5 0C256.562 0 298 41.438 298 92.5H113C113 41.438 154.438 0 205.5 0z" fill="#742F8D"/></svg>',
      '<svg class="three" width="197" height="207" viewBox="0 0 197 207" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 108.5C6 159.562 47.438 201 98.5 201s92.5-41.438 92.5-92.5M191 98.5C191 47.438 149.562 6 98.5 6S6 47.438 6 98.5" stroke="#742F8D" stroke-width="12"/><path d="M44 103.5c0 30.085 24.415 54.5 54.5 54.5s54.5-24.415 54.5-54.5S128.621 49 98.5 49C68.415 49 44 73.379 44 103.5z" fill="#FDDE5A"/></svg>',
      '<svg class="four" width="292" height="35" viewBox="0 0 292 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 17.5C0 27.16 7.84 35 17.5 35S35 27.16 35 17.5 27.172 0 17.5 0C7.84 0 0 7.828 0 17.5zM257 17.5c0 9.66 7.84 17.5 17.5 17.5S292 27.16 292 17.5 284.172 0 274.5 0C264.84 0 257 7.828 257 17.5z" fill="#F9CC17"/><path fill="#2C449C" d="M42 11h206v13H42z"/></svg>'
    ];
    var classArray = [
      'every-first-element',
      'every-second-element',
      'every-third-element',
      'every-fourth-element',
    ];
    var svgCount = 0;

    for (var i = 0; i < reports.length; i++) {

      var reportImageContainer = reports[i].querySelector('.report-image');

      if (svgCount >= 4) {
        svgCount = 0;
      }

      reports[i].classList.add(classArray[svgCount]);
      
      if (reportImageContainer) {
        reportImageContainer.innerHTML = svgArray[svgCount];
      }

      svgCount += 1;
  
    }

  }

}
