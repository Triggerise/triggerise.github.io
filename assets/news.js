var reports = document.getElementsByClassName("report-cover");
var filtersCheck = document.querySelectorAll('.filter');
function hideReports(reports) {
    reports.forEach((item, i) => {
        item.classList.remove('display');
        item.style.display = "none";
    });
}
function filters() {
    let allReports = Array.from(document.querySelectorAll('.report-cover'));
    hideReports(allReports);
    let initialReports = allReports.slice(0, 4);
    initialReports.forEach(e => e.classList.add('display'));
    filtersCheck.forEach(f => {
        f.addEventListener('click', function () {
            hideReports(allReports)
            let data = this.dataset.click;
            let selected = document.querySelectorAll('.' + data);
            selected.forEach(s => {
                s.classList.add('display');
            });
        });
    });
}
function insertReportSVG() {

    // Loop through elements and attach an svg and class in a set of 4, and then reset the counter on the 5th|11th|etc set
    if (reports.length >= 1) {

        let svgArray = [
            '<svg class="one" width="286" height="185" viewBox="0 0 286 185" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 92.5C0 143.562 41.438 185 92.5 185S185 143.562 185 92.5 143.623 0 92.5 0C41.438 0 0 41.377 0 92.5z" fill="#1D214F"/><path d="M205 144.5c0 22.357 18.143 40.5 40.5 40.5s40.5-18.143 40.5-40.5-18.116-40.5-40.5-40.5c-22.357 0-40.5 18.116-40.5 40.5zM258 40.5c0 6.9-5.6 12.5-12.5 12.5S233 47.4 233 40.5 238.591 28 245.5 28c6.9 0 12.5 5.592 12.5 12.5z" fill="#FDDE5A"/></svg>',
            '<svg class="two" width="298" height="185" viewBox="0 0 298 185" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M92.5 185C41.438 185 0 143.562 0 92.5h185c0 51.062-41.438 92.5-92.5 92.5z" fill="#2C449C"/><path d="M205.5 0C256.562 0 298 41.438 298 92.5H113C113 41.438 154.438 0 205.5 0z" fill="#742F8D"/></svg>',
            '<svg class="three" width="197" height="207" viewBox="0 0 197 207" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 108.5C6 159.562 47.438 201 98.5 201s92.5-41.438 92.5-92.5M191 98.5C191 47.438 149.562 6 98.5 6S6 47.438 6 98.5" stroke="#742F8D" stroke-width="12"/><path d="M44 103.5c0 30.085 24.415 54.5 54.5 54.5s54.5-24.415 54.5-54.5S128.621 49 98.5 49C68.415 49 44 73.379 44 103.5z" fill="#FDDE5A"/></svg>',
            '<svg class="four" width="292" height="35" viewBox="0 0 292 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 17.5C0 27.16 7.84 35 17.5 35S35 27.16 35 17.5 27.172 0 17.5 0C7.84 0 0 7.828 0 17.5zM257 17.5c0 9.66 7.84 17.5 17.5 17.5S292 27.16 292 17.5 284.172 0 274.5 0C264.84 0 257 7.828 257 17.5z" fill="#F9CC17"/><path fill="#2C449C" d="M42 11h206v13H42z"/></svg>'
        ];
        let classArray = [
            'every-first-element',
            'every-second-element',
            'every-third-element',
            'every-fourth-element',
        ];
        let svgCount = 0;

        for (let i = 0; i < reports.length; i++) {

            let reportImageContainer = reports[i].querySelector('.report-image');

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

function initNews() {

    window.addEventListener('load', function () {

        if (filtersCheck) {
            try {
                filters();
            } catch (err) {
                console.error(err);
            }
        }
        
        if (reports) {
            try {
                insertReportSVG();
            } catch (err) {
                console.error(err);
            }
        }

    });

} initNews();