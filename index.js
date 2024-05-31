const base_url="https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".frommmm select");
const toCurr=document.querySelector(".tooo select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOpt=document.createElement("option");
        newOpt.innerText=currCode;
        newOpt.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOpt.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOpt.selected="selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amount=="" || amount<0){
        amtval=1;
        amount.value=1;
    }
    const url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    for(let z in countryList){
        if(z===toCurr.value){
            let ratefrom=data[fromCurr.value.toLowerCase()];
            let g=ratefrom[toCurr.value.toLowerCase()];
            let finalamt=amtval*g;
            msg.innerText=`${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
        }
    }
});

