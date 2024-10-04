const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const button = document.querySelector("form button");
const drowdown = document.querySelectorAll(".slecet select");
const msg=document.querySelector(".msg");
const inn=document.querySelector(".in");
const out=document.querySelector(".out");
for (let select of drowdown) {
    for (i in countryList) {
        let newoptiion = document.createElement("option");
        newoptiion.innerText = i;
        newoptiion.value = i;
        if (select.name === "from" && i === "USD") {
            newoptiion.selected = "selected";
        }
        else if (select.name === "to" && i === "INR") {
            newoptiion.selected = "selected";
        }
        select.append(newoptiion);
    }
    select.addEventListener("change", (evt) => {
        flag(evt.target);
    });
}

const flag = (Element) => {

    let i = Element.value;
    let country = countryList[i];

    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");

    img.src = newSrc;
};
button.addEventListener("click", async (e)=>{
    e.preventDefault();
    let amount=document.querySelector("form input");
    let val=amount.value;
    if (val==="" || val<0){
        val=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]; 
    let finalamount=val*rate;
    let text=tocurr.value;
    inn.innerText=`${val} ${fromcurr.value}  `;
    out.innerText=` = ${finalamount} ${text}`;
});
