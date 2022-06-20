var key = config.SECRET_API_KEY;

const currency = document.querySelectorAll(".currency select");
// const inputNumber = document.querySelector("input");
getButton = document.querySelector("form button");
fromCurrency = document.querySelector(".currency select");
toCurrency = document.querySelector(".to select");

for (let i = 0; i < currency.length; i++) {
  // selecting usd by default as from currency and npr as to currency

  for (devises_code in country_code) {
    let selected;
    if (i == 0) {
      selected = devises_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = devises_code == "NPR" ? "selected" : "";
    }
    // creating option tag with passing currency code as a text and value
    let selectors = `<option value=${devises_code}>${devises_code}</option>`;
    // inserting options tag inside select tag
    currency[i].insertAdjacentHTML("beforeend", selectors);
  }
}

window.addEventListener("load", (e) => {
  getExchangeRate();
});
getButton.addEventListener("click", (e) => {
  e.preventDefault(); // preventing form from submitting
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".currency .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  // if user dont enter any value or enter O then we'll put 1 value by default in the input field
  if (amountVal == "" || amountVal == "O") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/${key}/latest/${fromCurrency.value}`;
  // fetching api response and returning it with parsing into js object and in another then method receving that obj
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      const exchangeRateTxt = document.querySelector(".exchange-rate");
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value}= ${totalExchangeRate} ${toCurrency.value}`;
    });
  // api return an object of all currency conversion rates
}
