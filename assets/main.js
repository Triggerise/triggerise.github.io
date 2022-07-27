// Main is accessible on every page | Use this file for "Core" code
var $ = jQuery;
// ---- Counter Start ---- //
function loadJSON(path, success, error) {
  let xhr = new XMLHttpRequest();
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
function loadCounter() {
  loadJSON("https://oblivion-api.tikoplatform.org/api/metrics/website", function (data) {

    //api
    let homepage = data.global.active_rafikis;
    let userTotal = data.global.active_rafikis;
    let servicesTotal = data.global.number_of_services;
    const partnersTotalKenya = data?.ecosystems?.find(obj => obj.country === 'Kenya')?.size;
    const partnersTotalIndia = data?.ecosystems?.find(obj => obj.country === 'India')?.size;
    const partnersTotalEthiopia = data?.ecosystems?.find(obj => obj.country === 'Ethiopia')?.size;
    let milesTotal = data.global.tiko_miles;
    //not in API
    let serviceUptake = data?.conversion_rate?.[0]?.size || 0;
    let repeatBehaviour = data?.repeat_visit?.[0]?.size || 0;
    let providerRatings = data?.top_business?.[0]?.size || 0;
    let home = document.querySelector('#countup');
    let impactTotal = document.querySelector('#total-users');
    let services = document.querySelector('#platform-services');
    let partners = document.querySelector('#partnersKenya');
    let partnersIndia = document.querySelector('#partners-india');
    let partnersEthiopia = document.querySelector('#partnersEthiopia');
    let miles = document.querySelector('#tiko-miles');
    let serviceUptakeSelect = document.querySelector('#serviceUptake');
    let repeatBehaviourSelect = document.querySelector('#repeatBehaviour');
    let providerRatingsSelect = document.querySelector('#providerRatings');
    let serviceUptakeTitle = document.querySelector('#serviceUptakeTitle');
    let repeatBehaviourTitle = document.querySelector('#repeatBehaviourTitle');
    let providerRatingsTitle = document.querySelector('#providerRatingsTitle');

    ///THIS NEEDS REFACTOR - Edit: Cleaned up the code, but there is no way to refactor without rewriting this for each page.
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
    if (impactTotal) {
      if (!impactTotal.classList.contains('counted')) {
        impactTotal.classList.add('counted');
        let countUp = new CountUp('total-users', 2000, userTotal)
        countUp.start();
      }
    }
    if (home) {
      if (!home.classList.contains('counted')) {
        home.classList.add('counted');
        let countUp = new CountUp('countup', 2000, homepage)
        countUp.start();
      }
    }
    if (services) {
      if (!services.classList.contains('counted')) {
        services.classList.add('counted');
        let countUp = new CountUp('platform-services', 2000, servicesTotal);
        countUp.start();
      }
    }
    if (partners) {
      if (!partners.classList.contains('counted')) {
        partners.classList.add('counted');
        let countUp = new CountUp('partnersKenya', 0, partnersTotalKenya);
        countUp.start();
      }
    }
    if (partnersIndia) {
      if (!partnersIndia.classList.contains('counted')) {
        partnersIndia.classList.add('counted');
        let countUp = new CountUp('partners-india', 0, partnersTotalIndia);
        countUp.start();
      }
    }
    if (partnersEthiopia) {
      if (!partnersEthiopia.classList.contains('counted')) {
        partnersEthiopia.classList.add('counted');
        let countUp = new CountUp('partnersEthiopia', 0, partnersTotalEthiopia);
        countUp.start();
      }
    }
    if (miles) {
      if (!miles.classList.contains('counted')) {
        miles.classList.add('counted');
        let countUp = new CountUp('tiko-miles', 0, milesTotal);
        countUp.start();
      }
    }
    if (serviceUptakeSelect) {
      if (!serviceUptakeSelect.classList.contains('counted')) {
        serviceUptakeSelect.classList.add('counted');
        let countUp = new CountUp('serviceUptake', 0, serviceUptake);
        countUp.start();
      }
    }
    if (repeatBehaviourSelect) {
      if (!repeatBehaviourSelect.classList.contains('counted')) {
        repeatBehaviourSelect.classList.add('counted');
        let countUp = new CountUp('repeatBehaviour', 0, repeatBehaviour);
        countUp.start();
      }
    }
    if (providerRatingsSelect) {
      if (!providerRatingsSelect.classList.contains('counted')) {
        providerRatingsSelect.classList.add('counted');
        let countUp = new CountUp('providerRatings', 0, providerRatings);
        countUp.start();
      }
    }
  });
}
// ---- Counter End ---- //
// Initialize all functional code
function init() {
  window.addEventListener('load', function () {
    new fullpage('#fullpage', {
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
    // This is only used on Jobs.html but may be used else where in the future
    $('.card-flip').hover(function () {
      $('.uk-card').toggleClass('flipped');
    });
    // Noopener and noreferer on all <a> tags
    let anchors = document.querySelectorAll('a');
    anchors.forEach((a) => {
      a.setAttribute('rel', 'noopener noreferrer');
    });
    try {
      loadCounter();
    } catch (err) {
      console.error(err);
    }
  });
} init();