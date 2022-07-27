//---- DIB Charts Start ----//
var impactBondMetricContainer = document.querySelector('.impact-bond__metric_container');
function loadChartData(labels, data, type, element) {
    const config = {
        type: type,
        data: data,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            }
        }
    };
    new Chart(
        document.getElementById(element),
        config
    );
}
function bootstrapChartData() {
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: '#1D214F',
            borderColor: '#FDDE5A',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };
    loadChartData(labels, data, 'doughnut', 'impact-chart-1');
    loadChartData(labels, data, 'pie', 'impact-chart-2');
    loadChartData(labels, data, 'line', 'impact-chart-3');
    loadChartData(labels, data, 'bar', 'impact-chart-4');
}
//---- DIB Charts End ----//
function initImpactBond() {
    window.addEventListener('load', function () {
        if (impactBondMetricContainer) {
            try {
                bootstrapChartData();
            } catch (err) {
                console.error(err);
            }
        }
    });
} initImpactBond();