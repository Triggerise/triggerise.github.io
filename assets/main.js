console.log('Welcome to Triggerise');
console.log('Built by Umbrella Studios');

//utils
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
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
};

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
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
window.onload = function() {

  loadJSON("https://oblivion.movercado.org/api/metrics/website", function(data) {

  //api
  console.log(data);
  var homepage = data.global.active_rafikis;
  var userTotal = data.global.active_rafikis;
  var servicesTotal = data.global.number_of_services;
  var partnersTotal = data.ecosystems[0].size;
  var partnersTotalIndia = data.ecosystems[1].size;
  var partnersTotalEthiopia = data.ecosystems[2].size;
  var milesTotal = data.global.tiko_miles;

  //not in API
  var serviceUptake = 91;
  var repeatBehaviour = 6;
  var providerRatings = 87;

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

  ///THIS NEEDS REFACTOR

  if(home || impactTotal || services || partners || partnersIndia || partnersEthiopia || miles || serviceUptakeSelect || repeatBehaviourSelect || providerRatingsSelect){

    if(impactTotal && !impactTotal.classList.contains('counted')){
      impactTotal.classList.add('counted');
      var countUp = new CountUp('total-users', 2000, userTotal);
      console.log(countUp);
      countUp.start();
    }

    if(home && !home.classList.contains('counted')) {
      home.classList.add('counted');
      var countUp = new CountUp('countup', 2000, homepage);
      console.log(countUp);
      countUp.start();
    }

    document.addEventListener('scroll', function(){
      if(services && !services.classList.contains('counted')){
        if(elementInViewport(services)) {
          services.classList.add('counted');
          var countUp = new CountUp('platform-services', 2000, servicesTotal);
          console.log(countUp);
          countUp.start();
        }
      }
      if(partners && !partners.classList.contains('counted')){
        if(elementInViewport(partners)) {
          partners.classList.add('counted');
          var countUp = new CountUp('partnersKenya', 0, partnersTotal);
          console.log(countUp);
          countUp.start();
        }
      }
      if(partnersIndia && !partnersIndia.classList.contains('counted')){
        if(elementInViewport(partnersIndia)) {
          partnersIndia.classList.add('counted');
          var countUp = new CountUp('partners-india', 0, partnersTotalIndia);
          console.log(countUp);
          countUp.start();
        }
      }
      if(partnersEthiopia && !partnersEthiopia.classList.contains('counted')){
        if(elementInViewport(partnersEthiopia)) {
          partnersEthiopia.classList.add('counted');
          var countUp = new CountUp('partnersEthiopia', 0, partnersTotalEthiopia);
          console.log(countUp);
          countUp.start();
        }
      }
      if(miles && !miles.classList.contains('counted')){
        if(elementInViewport(miles)) {
          miles.classList.add('counted');
          var countUp = new CountUp('tiko-miles', 0, milesTotal);
          console.log(countUp);
          countUp.start();
        }
      }
      if(serviceUptakeSelect && !serviceUptakeSelect.classList.contains('counted')){
        if(elementInViewport(serviceUptakeSelect)) {
          serviceUptakeSelect.classList.add('counted');
          var countUp = new CountUp('serviceUptake', 0, serviceUptake);
          console.log(countUp);
          countUp.start();
        }
      }
      if(repeatBehaviourSelect && !repeatBehaviourSelect.classList.contains('counted')){
        if(elementInViewport(repeatBehaviourSelect)) {
          repeatBehaviourSelect.classList.add('counted');
          var countUp = new CountUp('repeatBehaviour', 0, repeatBehaviour);
          console.log(countUp);
          countUp.start();
        }
      }
      if(providerRatingsSelect && !providerRatingsSelect.classList.contains('counted')){
        if(elementInViewport(providerRatingsSelect)) {
          providerRatingsSelect.classList.add('counted');
          var countUp = new CountUp('providerRatings', 0, providerRatings);
          console.log(countUp);
          countUp.start();
        }
      }
    });
  }
  });
};

//carousel
var myFullpage = new fullpage('#fullpage', {
	//Navigation
  licenseKey:'3B63225D-9F3C433A-BBF0651D-0A97F55E',
  fadingEffectKey: 'dHJpZ2dlcmlzZS5vcmdfWWI5Wm1Ga2FXNW5SV1ptWldOMGx6SQ==',
  fitToSection: false,
  fadingEffect: true,
  autoScrolling:false,
	scrollHorizontally: true,
  offsetSections:true,
  slidesNavigation: true,
	slidesNavPosition: 'bottom',
  fadingEffect:'slides',
  controlArrows: true
});

//ecosystem
var map = document.querySelector('.ecosystem-map');
function scroll() {
  document.addEventListener('scroll', function(){
    if(elementInViewport(map)){
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
function filters(){
 for(i=0; i<filtersCheck.length; i++) {
   filtersCheck[i].addEventListener('click', function(){
     document.querySelectorAll('.report-cover').forEach((item, i) => {
       item.classList.remove('display');
     });

      var data = this.dataset.click;
      var selected = document.querySelectorAll('.report-cover.' + data);
      console.log(selected);
      for(j=0; j<selected.length; j++) {
        console.log(j);
        document.querySelectorAll('.report-cover').forEach((item, i) => {
          item.style.display = "none";
        });
        selected[j].classList.add('display');
      }
   });
 }
};



// $(document).on('click', '#pnAdvancerLeft', function() {
//     console.log('TEST')
// });



// var test = document.querySelector('#pnAdvancerLeft');
// test.onclick = function() {
//     console.log('Hello');
// }

// $(document).ready(function() {
//   $('#pnAdvancerLeft').on('click', function() {
//     console.log('Hello');
//   });
// });


var myStorage = window.localStorage;
console.log(myStorage);
var cookies = myStorage.getItem('cookies');
var cookiesButton = document.querySelector('.cookies-button');
var cookiesBanner = document.querySelector('.cookies-banner');
cookiesButton.addEventListener('click', function(){
  localStorage.setItem('cookies', 'True');
  cookiesBanner.classList.remove('display');
});
if(cookies) {
  console.log('cookies seen');
} else {
  cookiesBanner.classList.add('display');
  console.log('cookies not seen');
}


function init(){
  if(worldMapCheck){
    worldMap();
    classLists();
  }
  if(map) {
    scroll();
  }
  if(filtersCheck) {
    filters();
  }
}init();
