// Global vars
var selectedCountry = "";
var selectedPosition = null;
var selectedDepartment = null;
var dataArr = [];
var selectRoleEle = document.getElementById('salary-tracker-role-picker');
var selectDepartmentEle = document.getElementById('salary-tracker-department-picker');
var departmentList = ['N/A'];
// Update the country selection on click
// Update the class for the active country button
// Clear all previous selection options for position
function updateCountry(country) {

    let allCountryBtns = document.querySelectorAll("button");
    let currencySymbolAnnual = document.getElementById('salary-tracker-currency-annual');
    let currencySymbolMonthly = document.getElementById('salary-tracker-currency-monthly');

    if (event.srcElement.classList !== undefined) {
        allCountryBtns.forEach(function (el) {
            el.classList.remove("salary-tracker-country-btn-active");
            el.classList.add("salary-tracker-country-btn");
        });
        event.srcElement.classList.remove("salary-tracker-country-btn");
        event.srcElement.classList.add("salary-tracker-country-btn-active");
    }

    removeSelectOptions(selectRoleEle);
    removeSelectOptions(selectDepartmentEle);

    selectedPosition = null;
    selectedDepartment = null;

    if (departmentList.length >= 1) {
        departmentList.forEach(department => {
            let departmentOpt = document.createElement('option');
            departmentOpt.value = department;
            departmentOpt.innerHTML = department;
            selectDepartmentEle.appendChild(departmentOpt);
        });
    }

    switch (country) {
        case 'ZA':
            currencySymbolAnnual.innerText = "R";
            currencySymbolMonthly.innerText = "R";
            updateData('South Africa', null, null, 2);
            break;
        case 'PT':
            currencySymbolAnnual.innerText = "€";
            currencySymbolMonthly.innerText = "€";
            updateData('Portugal', null, null, 2);
            break;
        case 'ET':
            currencySymbolAnnual.innerText = "€";
            currencySymbolMonthly.innerText = "€";
            updateData('Ethiopia', null, null, 2);
            break;
        case 'KE':
            currencySymbolAnnual.innerText = "KES";
            currencySymbolMonthly.innerText = "KES";
            updateData('Kenya', null, null, 2);
            break;
        case 'NL':
            currencySymbolAnnual.innerText = "€";
            currencySymbolMonthly.innerText = "€";
            updateData('Netherlands', null, null, 2);
            break;
        default:
            break;
    }

}
// Update the selected position
function updatePosition(position) {

    selectedPosition = position;
    updateData(null, position, null, 1);

}
// Update the selected department
function updateDepartment(department) {

    selectedDepartment = department;
    updateData(null, null, department, 0);

}
// Populate select options for Roles and Departments
// This also acts as a filter for Roles based on selected department
// Update option can have 4 values - 0: Department was updated; 1: Position was updated; 2: Reset positions; null: don't do anything 
function updateSelectOptions(updateOption) {
    let countryArr = dataArr.filter(obj => {
        return obj.country === selectedCountry;
    });
    let setSelectedPosition = false;

    if (updateOption === 0) {
        removeSelectOptions(selectRoleEle);
        selectedPosition = null;
    } else if (updateOption === 1) {
        removeSelectOptions(selectRoleEle);
        setSelectedPosition = true;
    }

    if (countryArr[0].positions[0] !== undefined) {
        countryArr[0].positions.forEach(position => {
            let positionOpt = document.createElement('option');
            if (selectedDepartment !== null && selectedDepartment !== 'N/A' && (updateOption === 0 || updateOption === 1)) {
                if (position.department === selectedDepartment) {
                    positionOpt.value = position.position;
                    positionOpt.innerHTML = position.position;
                    selectRoleEle.appendChild(positionOpt);
                }
            } else if (updateOption === 2 || selectedDepartment === 'N/A' || selectedDepartment === null) {
                positionOpt.value = position.position;
                positionOpt.innerHTML = position.position;
                selectRoleEle.appendChild(positionOpt);
            }
        });
        if (setSelectedPosition) {
            selectRoleEle.value = selectedPosition;
        }
    }
}
// Validate country / role selections
// Filter by selected country
// Update benefits and salary brackets where applicable
// Update selected elements where applicable
function updateData(country, position, department, updateOption) {

    // Fill filter global vars 
    if (country !== null) {
        selectedCountry = country;
    }

    if (position !== null) {
        selectedPosition = position;
    }

    if (department !== null) {
        selectedDepartment = department;
    }

    // Filter by selected Country
    let countryArr = dataArr.filter(obj => {
        return obj.country === selectedCountry
    });

    if (countryArr[0] !== undefined) {
        // Load values into Positions and Department Dropdowns
        updateSelectOptions(updateOption);

        // Proccess only if the country has positions
        if (countryArr[0].positions !== undefined) {

            // Populate the benefits for the selected country
            let benefitsEle = document.getElementById('salary-tracker-benefits');
            if (countryArr[0].benefits !== undefined) {
                let splitBenefits = countryArr[0].benefits.split('"').join('');
                benefitsEle.innerText = splitBenefits;
            } else {
                benefitsEle.innerText = "";
            }

            // Check selected position and update salary brackets
            if (selectedPosition === null) {
                if (countryArr[0].positions[0] !== undefined) {
                    selectItemByValue(document.getElementById('salary-tracker-role-picker'), null);
                    try {
                        if (selectedDepartment === null || selectedDepartment === 'N/A') {
                            updatePositionValues(countryArr[0].positions[0].annualLow, countryArr[0].positions[0].annualHigh, countryArr[0].positions[0].monthlyLow, countryArr[0].positions[0].monthlyHigh);
                        } else {
                            let firstPositionInDepartment = countryArr[0].positions.find(function (el) {
                                return el.department === selectedDepartment;
                            });
                            if (firstPositionInDepartment !== undefined) {
                                updatePositionValues(firstPositionInDepartment.annualLow, firstPositionInDepartment.annualHigh, firstPositionInDepartment.monthlyLow, firstPositionInDepartment.monthlyHigh);
                            } else {
                                updatePositionValues(0, 0, 0, 0);
                            }
                        }
                    } catch (err) {
                        updatePositionValues(0, 0, 0, 0);
                    }
                }
            } else {
                let positionArr = countryArr[0].positions.find(function (el) {
                    return el.position === selectedPosition;
                });
                if (positionArr) {
                    try {
                        updatePositionValues(positionArr.annualLow, positionArr.annualHigh, positionArr.monthlyLow, positionArr.monthlyHigh);
                    } catch (err) {
                        updatePositionValues(0, 0, 0, 0);
                    }
                }
            }
        }
    }
}
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
/*** Helpers - Start ***/
// Re-usable updater for salary bracket values
function updatePositionValues(annualLow, annualHigh, monthlyLow, monthlyHigh) {
    let annualLowEle = document.getElementById('salary-annual-amount-low');
    let annualHighEle = document.getElementById('salary-annual-amount-high');
    let monthlyLowEle = document.getElementById('salary-monthly-amount-low');
    let monthlyHighEle = document.getElementById('salary-monthly-amount-high');

    // Remove white space from salary text
    // Convert the text to a float
    // Round the salary either up or down
    // Add spaces to the salary to have the same appearance as currency without actually converting it to a currency
    try {
        annualLowEle.innerText = numberWithSpaces(Math.round(parseFloat(annualLow.replace(/\s/g, ''))));
        annualHighEle.innerText = numberWithSpaces(Math.round(parseFloat(annualHigh.replace(/\s/g, ''))));
        monthlyLowEle.innerText = numberWithSpaces(Math.round(parseFloat(monthlyLow.replace(/\s/g, ''))));
        monthlyHighEle.innerText = numberWithSpaces(Math.round(parseFloat(monthlyHigh.replace(/\s/g, ''))));
    } catch (err) {
        annualLowEle.innerText = annualLow;
        annualHighEle.innerText = annualHigh;
        monthlyLowEle.innerText = monthlyLow;
        monthlyHighEle.innerText = monthlyHigh;
    }

}
// Set an option as selected from a given element and value
function selectItemByValue(elmnt, value) {

    for (let i = 0; i < elmnt.options.length; i++) {
        if (value === null) {
            elmnt.selectedIndex = 0;
            break;
        } else {
            if (elmnt.options[i].value === value) {
                elmnt.selectedIndex = i;
                break;
            }
        }
    }

}
// Remove select options from a given element
function removeSelectOptions(elmnt) {

    let i, L = elmnt.options.length - 1;
    for (i = L; i >= 0; i--) {
        elmnt.remove(i);
    }

}
// Make an XHR request with given params
function makeRequest(method, url) {

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });

}
// Parse and format the csv into an array
function csvParse(csv) {

    let lines = csv.split("\n");
    lines = csv.split("\r");
    let result = [];
    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result;

}
// Clean any unexpected special character from the csv import
function escapeRegExp(input) {

    return input.replace(/[^a-zA-Z ]/g, "");

}
// Check if a country exists within an array
function countryExists(check, array) {

    return array.some(function (el) {
        return el.country === check;
    });

}
// Check that the position exists within a given array against a selected country
function positionExists(countryCheck, positionCheck, array) {

    if (countryExists(countryCheck, array)) {
        let checkArr = array.filter(obj => {
            return obj.country === countryCheck
        });
        return checkArr.some(function (el) {
            return el.position === positionCheck;
        });
    } else {
        return false;
    }

}
/*** Helpers - End ***/
// Main launch function
// Define the doc url and execute fetch promise
// Parse the returned data into a formatted/friendly array
// Remove the 'no positions loaded' selection option for positions
// Update the data
function main() {

    let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSr_TpN5LWs9ejhbmttNHfqG25LLi9rPKHPE3wYvovXwNNXSxcFsDSEBSEsEf-9MNfwFTKjLPh1FTLL/pub?output=csv";
    let enableCountryBtns = false;

    makeRequest('GET', url)
        .then(function (data) {
            csvParse(data).forEach(element => {

                let formattedCountry = escapeRegExp(element.Country);
                let formattedArray = [{ country: formattedCountry, positions: [{ position: element.Position, monthlyHigh: element.MonthlyHigh, monthlyLow: element.MonthlyLow, annualHigh: element.AnnualHigh, annualLow: element.AnnualLow, department: element.Department }], benefits: element.Benefits }];

                element.Country = formattedCountry;

                if (element.Department !== undefined && element.Department !== "") {
                    if (!departmentList.includes(element.Department)) {
                        departmentList.push(element.Department);
                    }
                }
                if (dataArr.length <= 0) {
                    dataArr = formattedArray;
                    dataArr = dataArr.flat();
                } else {

                    let countryFound = countryExists(formattedCountry, dataArr);
                    if (!countryFound) {
                        dataArr.push(formattedArray);
                        dataArr = dataArr.flat();
                    } else {
                        let positionFound = positionExists(formattedCountry, element.Position, dataArr);
                        if (!positionFound) {
                            let formattedPositionArray = [{ position: element.Position, monthlyHigh: element.MonthlyHigh, monthlyLow: element.MonthlyLow, annualHigh: element.AnnualHigh, annualLow: element.AnnualLow, department: element.Department }];
                            let countryArr = dataArr.filter(obj => {
                                return obj.country === formattedCountry
                            });
                            countryArr[0].positions.push(formattedPositionArray);
                            countryArr[0].positions = countryArr[0].positions.flat()
                        }
                    }
                }
            });

            if (dataArr.length >= 1) {
                try {

                    removeSelectOptions(selectRoleEle);
                    removeSelectOptions(selectDepartmentEle);

                    if (departmentList.length >= 1) {
                        departmentList.forEach(department => {
                            let departmentOpt = document.createElement('option');
                            departmentOpt.value = department;
                            departmentOpt.innerHTML = department;
                            selectDepartmentEle.appendChild(departmentOpt);
                        });
                    }

                    dataArr = dataArr.sort((a, b) => a.country.toLowerCase() > b.country.toLowerCase() ? 1 : -1);
                    dataArr.forEach(arr => {
                        arr.positions = arr.positions.sort((a, b) => a.position.toLowerCase() > b.position.toLowerCase() ? 1 : -1)
                    });

                    updateData('Ethiopia', null, null, 2);
                } catch (err) {
                    console.error(err);
                }
            }

            // Re-enable country buttons
            $('.salary-tracker-country-btn-container button').each(function( index, elm ) {
                $(elm).removeAttr("disabled");
            });
            
            // Remove the page spinner
            $('.loader-spinner').remove();
        })
        .catch(function (err) {
            console.error('An error occured!', err);
            $('.loader-spinner').remove();
        });
}
// Execute main on successful DOM load
function initSalaryTracker() {
    window.addEventListener('load', function () {
        main();
        $("#salary-tracker-role-picker").select2();
        $("#salary-tracker-department-picker").select2();
    });
} initSalaryTracker();