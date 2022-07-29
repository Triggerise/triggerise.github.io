//---- Success Section Start ----//
var successContainer = document.querySelector('.success__section');
function initializeTestimonialTabs() {
    const success = document.querySelector('.success__section');
    const tabs = [...success.querySelectorAll('nav .tab')];
    const content = [...success.querySelectorAll('.content .tab-content')];

    tabs.forEach(tab => tab.addEventListener('click', (e) => {
        for (p of content) p.classList.remove('active');
        for (tab of tabs) tab.classList.remove('active');
        const index = tabs.indexOf(e.target);
        if (index != -1) {
            e.target.classList.add('active');
            content[index].classList.add('active');
        }
    }));
}
//---- Success Section End ----//
function initImpact() {
    window.addEventListener('load', function () {
        if (successContainer) {
            try {
                initializeTestimonialTabs();
            } catch (err) {
                console.error(err);
            }
        }
    });
} initImpact();