const dropdowns = document.querySelectorAll(".dropdown select");
const button=document.getElementById('button');
const from=document.querySelector('.from select')
const to=document.querySelector('.to select')
const conversion=document.querySelector('.msg');
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

dropdowns.forEach(select => {
    for (const currencyCode in countryList) {
        // console.log(currencyCode);
        let newOption = document.createElement('option');
        newOption.innerText = `${currencyCode}  - ${countryList[currencyCode]}`;
        newOption.value = countryList[currencyCode];
        newOption.dataset.country =currencyCode;
       
        newOption.classList.add('custom-option');
        if(select.name==='from'&& currencyCode==='USD'){
            newOption.selected="selected";}
        else if(select.name==='to' && currencyCode==='INR'){
            newOption.selected="selected";}
        select.appendChild(newOption); 
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
});

const updateFlag=(element)=>{
    let currencecy=element.value;
    let countrycode=countryFlag[currencecy];
    let img = element.parentElement.querySelector("img");
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    img.src=newSrc;
}

const changeRate = async () => {
    const amount = document.querySelector('.amount input');
    let amountValue = amount.value; // Change this to 'let' so it can be reassigned
    if (amountValue === '' || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    const fromCurrency = from.options[from.selectedIndex].dataset.country.toLowerCase();
    const toCurrency = to.options[to.selectedIndex].dataset.country.toLowerCase();
    const newURL = BASE_URL+fromCurrency+".json";
    console.log(newURL);
    
    try {
        let response = await fetch(newURL);
        let data = await response.json();
        let rate = data[fromCurrency][toCurrency];   
        console.log(typeof rate);   
        let convertedAmount = amountValue * rate;
        conversion.innerText = `${amountValue} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        console.error('Fetch error: ', error);
        conversion.innerText = 'Error fetching exchange rate. Please try again.';
    }
};

button.addEventListener('click', (event) => {
    event.preventDefault();
    changeRate();
});


