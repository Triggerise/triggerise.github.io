// Privacy is accessible on every page | Use this file to handle cookies
// ---- Privacy Start ---- //
var allPolicies = Array.from(document.querySelectorAll('.policy'));
function displayPolicy() {
    let currentLanguage = window.location.hash.replace('#', '.') || '.English';
    allPolicies.forEach(policy => policy.classList.add('hidden'));
    let correctPolicy = Array.from(document.querySelectorAll('.policy' + currentLanguage));
    correctPolicy.forEach(policy => policy.classList.remove('hidden'));
    let allPolicyLinks = Array.from(document.querySelectorAll('.policy-link'));
    allPolicyLinks.forEach(policy => policy.classList.remove('active-policy'));
    let correctPolicyLink = Array.from(document.querySelectorAll('.policy-link' + currentLanguage));
    correctPolicyLink.forEach(policy => policy.classList.add('active-policy'));
}
// ---- Privacy End ---- //
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
            for (let k in theirCookies) {
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
        console.error(err);
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
    let myStorage = window.localStorage;
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
    let cookiesButtonAccept = document.querySelector('.cookies-button-accept');
    let cookiesButtonDeny = document.querySelector('.cookies-button-deny');
    let cookiesBanner = document.querySelector('.cookies-banner');
    let comparedCookies = compareCookies(ourCookies);
    let cookiesButtonStatus = document.getElementById('cookies-client-button');
    let cookiesTextStatus = document.getElementById('cookies-client-status');

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
//---- Privacy popup start ----//

// Function to get query parameters
function setOverflowHidden() {
    $('html, body').css('overflow', 'hidden');
}
function setOverflowAuto() {
    $('html, body').css('overflow', 'auto');
}
function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
function removeQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(key);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
    window.location.href = newUrl;
}
function togglePrivacyPopup(userType, removeQuery) {
    const privacyModal = $("#privacyModal-" + userType);
    if (privacyModal) privacyModal.fadeToggle();
    if (removeQuery) {
        removeQueryParam('privacyUserType');
        removeQueryParam('showPrivacyPopup');
        setOverflowAuto();
    } else {
        setOverflowHidden();
    }
}
//---- Privacy popup end ----//
function initPrivacy() {

    window.addEventListener('load', function () {
        let userType = getQueryParam('privacyUserType');
        if (!userType) userType = 'general';

        const privacyModal = $("#privacyContent-" + userType);
        if (privacyModal) privacyModal.fadeToggle();

        const showPrivacyPopup = getQueryParam('showPrivacyPopup');
        if (showPrivacyPopup) {
            togglePrivacyPopup(userType.toLowerCase());
        }

        if (allPolicies) {
            try {
                displayPolicy();
                window.addEventListener('hashchange', displayPolicy);
            } catch (err) {
                console.error(err);
            }
        }

        try {
            initializeCookies();
        } catch (err) {
            console.error(err);
        }

        $(window).click(function (e) {
            if ($(e.target).hasClass("privacy__modal__centered")) {
                togglePrivacyPopup(userType, true);
            }
        });

    });
} initPrivacy();