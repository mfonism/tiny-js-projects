const loanForm = document.getElementById('loanForm');
const amountInput = document.getElementById('amount');
const rateInput = document.getElementById('rate');
const yearsInput = document.getElementById('years');
const resultsDisplay = document.getElementById('results');
const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
const totalPaymentDisplay = document.getElementById('totalPayment');
const totalInterestDisplay = document.getElementById('totalInterest');

const divider = document.querySelector('.divider');
const loader = document.querySelector('.loader');

loanForm.addEventListener('submit', calculateResults);

function calculateResults(event, delayMicroseconds = 3000) {
    event.preventDefault();

    const principal = parseFloat(amountInput.value);
    const rate = parseFloat(rateInput.value) / 100;
    const time = parseFloat(yearsInput.value);

    if (!isFinite(principal) || !isFinite(rate) || !isFinite(time)) {
        clearError();
        displayError();
        return
    }

    clearError();

    // final amount => P(1 + r/n)**nt
    // compound interest => final amount - P
    const totalPayment = (principal * Math.pow(1 + (rate / 12), 12 * time));
    const monthlyPayment = totalPayment / (12 * time);
    const totalInterest = totalPayment - principal;

    if (!isFinite(totalPayment) || !isFinite(monthlyPayment) || !isFinite(totalInterest)) {
        displayError();
        return
    }

    monthlyPaymentDisplay.value = monthlyPayment.toFixed(2);
    totalPaymentDisplay.value = totalPayment.toFixed(2);
    totalInterestDisplay.value = totalInterest.toFixed(2);

    resultsDisplay.classList.add('d-none');
    divider.classList.add('d-none');
    loader.classList.remove('d-none');
    setTimeout(displayResults, delayMicroseconds);
}

function displayResults() {
    loader.classList.add('d-none');
    divider.classList.remove('d-none');
    resultsDisplay.classList.remove('d-none');
}

function displayError() {
    const errorDisplay = document.createElement('div');
    errorDisplay.id = 'inputErrorAlert';
    errorDisplay.className = 'alert alert-danger';
    errorDisplay.setAttribute('role', 'alert');
    errorDisplay.appendChild(document.createTextNode('Please check your numbers!'));

    const mainHeading = document.querySelector('h1');

    mainHeading.insertAdjacentElement('beforebegin', errorDisplay);
}

function clearError() {
    const errorDisplay = document.getElementById('inputErrorAlert');

    if (errorDisplay) {
        errorDisplay.remove();
    }
}
