// Threehouse FSJS Techdegree-Unit 3 Project Form Validation
// June 2022

//cache the DOM
const form = document.querySelector("form")
const name_input = document.getElementById("name")
const email_input = document.getElementById("email")
const jobRole_select = document.getElementById("title")
const otherJob_input = document.getElementById("other-job-role")
const tShirtDesign_select =  document.getElementById("design")
const tShirtColor_select =  document.getElementById("color")
const tShirtColor_colorOptions = document.querySelectorAll('[data-theme]') //node list
const jsPuns_colorOptions = document.querySelectorAll('[data-theme="js puns"]') //node list
const jsHeart_colorOptions = document.querySelectorAll('[data-theme="heart js"]') //node list
const activities_fieldset = document.querySelector('#activities')
const activities_box = document.querySelector("#activities-box")
const activity_p = document.getElementById("activities-cost")
const payment_select = document.getElementById("payment")
const paymentOptions = payment_select.options 
const creditCard_div = document.getElementById("credit-card")
const cc_input =  document.getElementById("cc-num")
const zip_input =  document.getElementById("zip")
const cvv_input =  document.getElementById("cvv")
const paypal_div = document.getElementById("paypal")
const bitcoin_div = document.getElementById("bitcoin")
//const register_btn = document.querySelector('button[type=submit]')


let activitiesChecked = []
let activityCost = 0
let creditOptn = paymentOptions[1].value
let isCredit = true

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

//disable submit btn
//register_btn.classList.add('disabled')

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
    activitiesValidator()
    if (e.target.checked === true){ 
         //add the first item clicked to the array of activitiesChecked boxes
        activitiesChecked.push(e.target)
        
        //access the cost of the event, add it to activity cost
        activityCost += parseInt(e.target.attributes["data-cost"].nodeValue)
        //add the cost of the activity only once, tally up total & display to UI
        activitiesChecked.forEach(item => {
            if (!activitiesChecked.includes(item)){
                activitiesChecked.push(e.target)
                activityCost += parseInt(e.target.attributes["data-cost"].nodeValue)
                activity_p.innerHTML =  `Total: $${activityCost}`      
            }
        })
       activitiesValidator()
    }
    else{
        //remove the item from the activitiesChecked array if user changes their mind
        activitiesChecked.splice(activitiesChecked.indexOf(e.target),1)
        
        // sumbtract from the total, display total to UI
        activityCost -= parseInt(e.target.attributes["data-cost"].nodeValue) 
        activity_p.innerHTML =  `Total: $${activityCost}`
        activitiesValidator()  
    }
    activity_p.innerHTML =  `Total: $${activityCost}`
})

// focuses on each checkbox when selected 
const activitiesCB = [...document.querySelectorAll('#activities input')]
activitiesCB.forEach(cb => {
    cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));
  
    cb.addEventListener('blur', e => {
      const active = document.querySelector('.focus');
      if (active) active.classList.remove('focus');
    })
})

payment_select.addEventListener("change", (e)=>{
    //hide and show elements depending on payment option selection 

    if (creditOptn !== e.target.value){
        
        isCredit = false
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
        isCredit = true
        creditCard_div.style.display = "block"
        bitcoin_div.style.display = 'none'
        paypal_div.style.display = 'none'
    }
}) 

// Validation helper functions
const validationPass = (elmnt) => {
    elmnt.parentElement.classList.add("valid")
    elmnt.parentElement.classList.remove("not-valid")
    elmnt.parentElement.lastElementChild.style.display = 'none'
}

const validationFail = (elmnt) =>{
    elmnt.parentElement.classList.add("not-valid")
    elmnt.parentElement.classList.remove("valid")
    elmnt.parentElement.lastElementChild.style.display = 'block'
    //register_btn.classList.add('disabled')
}


const nameValidator = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name_input.value)
    
    if(nameIsValid){
        validationPass(name_input)
    }else{
        validationFail(name_input)
    }
    return nameIsValid
} 

const emailValidator = () => {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email_input.value)

    if(emailIsValid){
        validationPass(email_input)
    }else{
        validationFail(email_input)
    }
    return emailIsValid 
}
const activitiesValidator = () => {
    const activitiesIsValid = activitiesChecked.length > 0
    if(activitiesIsValid){
        validationPass(activities_box)
    }else{
        validationFail(activities_box)
    }
    return  activitiesIsValid
}

const ccNumValidator = () => {
    const ccNumisValid = /^\d{13}|\d{16}$/.test(cc_input.value)
    if(ccNumisValid){
        validationPass(cc_input)
    }else{
        validationFail(cc_input)
    }
    return ccNumisValid 
}

const zipNumValidator = () => {
    const zipNumisValid = /^\d{5}$/.test(zip_input.value)
    if( zipNumisValid){
        validationPass(zip_input)
    }else{
        validationFail(zip_input)
    }
    return zipNumisValid
}

const cvvNumValidator = () => {

    const cvvNumisValid = /^\d{3}$/.test(cvv_input.value)

    if(cvvNumisValid){
        validationPass(cvv_input)
    }else{
        validationFail(cvv_input)
    }
    
    return cvvNumisValid
}



//realTime valildation
name_input.addEventListener('keyup', nameValidator)
email_input.addEventListener('keyup', emailValidator)
activities_box.addEventListener('keyup', activitiesValidator)
cc_input.addEventListener('keyup', ccNumValidator)
zip_input.addEventListener('keyup', zipNumValidator)
cvv_input.addEventListener('keyup', cvvNumValidator)

// submit listener on the form element
form.addEventListener('submit', (e) => {
     
    if ( !nameValidator() ){
        e.preventDefault()
    }
    if ( !emailValidator() ){
        e.preventDefault()
    }
    if ( !activitiesValidator() ){
        e.preventDefault()
    }
    if ( !ccNumValidator() ){
        e.preventDefault()
    }
    if ( !zipNumValidator() ){
        e.preventDefault()
    }
    if ( ! cvvNumValidator() ){
        e.preventDefault()
    }
 
})

