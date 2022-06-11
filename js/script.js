//cache the DOM
const name_input = document.getElementById("name")
const jobRole_select = document.getElementById("title")
const otherJob_input = document.getElementById("other-job-role")
const tShirtDesign_select =  document.getElementById("design")
const tShirtColor_select =  document.getElementById("color")
const tShirtColor_colorOptions = document.querySelectorAll('[data-theme]') //node list
const jsPuns_colorOptions = document.querySelectorAll('[data-theme="js puns"]') //node list
const jsHeart_colorOptions = document.querySelectorAll('[data-theme="heart js"]') //node list
const activities_fieldset = document.querySelector('#activities')
const activity_p = document.getElementById("activities-cost")
const payment_select = document.getElementById("payment")
const paymentOptions = payment_select.options //nodelist
const creditCard_div = document.getElementById("credit-card")
const paypal_div = document.getElementById("paypal")
const bitcoin_div = document.getElementById("bitcoin")
//console.log(paymentOptions)

let checked = []
let activityCost = 0
let creditOptn = paymentOptions[1].value

//Promps the user to enter their name
name_input.focus()

//hides the "other" job field unless selected
otherJob_input.style.display = "none"

//prevents the user from selection a tshirt color without selecting the desing first
tShirtColor_select.disabled = true

//set the default payment method to credit card/hide paypal&bitcoin
paymentOptions[1].setAttribute('selected', true)
paypal_div.style.display = 'none'
bitcoin_div.style.display = 'none'

//function that resets the displace property for all color options
const resetTshirtColorDisplay = function (tShirtColorOpts){
    tShirtColorOpts.forEach(
        function(node){
            node.style.display = ''
        }
    )
}

//function that hides tshirt color options depending on the desing
const hideColorOpts = function (jsDesignOpts){
    jsDesignOpts.forEach(
        function(node){
            node.style.display = 'none'
        }
    ) 
}

//display the "other" job title input field 
jobRole_select.addEventListener("change", (e) => {
    if (e.target.value === 'other'){
        otherJob_input.style.display = 'block'
    }else{
        otherJob_input.style.display = "none"
    }
})

//depending on the design selected, its correspondinig tShirt color options are display
tShirtDesign_select.addEventListener("change", (e) => {

    tShirtColor_select.disabled = false
    resetTshirtColorDisplay(tShirtColor_colorOptions)

    if (e.target.value === "js puns"){
        hideColorOpts(jsHeart_colorOptions)
    }
    else{
        hideColorOpts(jsPuns_colorOptions)
    }

})


//Calculate the total cost of the conference base on activities selected 
activities_fieldset.addEventListener("change",(e) => {
    
    if (e.target.checked === true){ 
         //add the first item clicked to the array of checked boxes
        checked.push(e.target)

        //access the cost of the event, add it to activity cost
        activityCost += parseInt(e.target.attributes["data-cost"].nodeValue)

        //add the cost of the activity only once, tally up total & display to UI
        checked.forEach(item => {
            if (!checked.includes(item)){
                    checked.push(e.target)
                    activityCost += parseInt(e.target.attributes["data-cost"].nodeValue)
                    activity_p.innerHTML =  `Total: $${activityCost}`
                        
                }
            })
    }
    else{
        //remove the item from the checked array if user changes their mind
        checked.splice(checked.indexOf(e.target),1)

        // sumbtract from the total, display total to UI
        activityCost -= parseInt(e.target.attributes["data-cost"].nodeValue) 
        activity_p.innerHTML =  `Total: $${activityCost}`  
    }
    activity_p.innerHTML =  `Total: $${activityCost}`
})

payment_select.addEventListener("change", (e)=>{
    //hide and show elements depending on payment option selection   
    if (creditOptn !== e.target.value){
        creditCard_div.style.display = 'none'
        switch(e.target.value){
            case "bitcoin":
                bitcoin_div.style.display = 'block'
                paypal_div.style.display = 'none'
                break;
            case "paypal":
                paypal_div.style.display = 'block'
                bitcoin_div.style.display = 'none'
                break;  
        }
    }else{
        creditCard_div.style.display = "block"
        bitcoin_div.style.display = 'none'
        paypal_div.style.display = 'none'
    }
}) 
