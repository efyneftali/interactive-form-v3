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
const activity_p = document.getElementById("activities-cost")
const payment_select = document.getElementById("payment")
const paymentOptions = payment_select.options 
const creditCard_div = document.getElementById("credit-card")
const cc_input =  document.getElementById("cc-num")
const zip_input =  document.getElementById("zip")
const cvv_input =  document.getElementById("cvv")
const paypal_div = document.getElementById("paypal")
const bitcoin_div = document.getElementById("bitcoin")
const register_btn = document.querySelector('button[type=submit]')


let checked = []
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
register_btn.classList.add('disabled')

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
const nameValidator = () => {
    const nameValue = name_input.value

    //regex to check for non empty string
    const regex = /^(?!\s*$).+/
    const nameIsValid = regex.test(nameValue)
    return nameIsValid
   

} 

const emailValidator = () => {
    const emailValue = email_input.value
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)
    return emailIsValid 
}

const creditCardValidator = () => {
    const ccNum = cc_input.value
    const zipNum = zip_input.value
    const cvvNum = cvv_input.value
   
    const ccNumisValid = /^\d{16}$/.test(ccNum)
    const zipNumisValid = /^\d{5}$/.test(zipNum)
    const cvvNumisValid = /^\d{3}$/.test(cvvNum)

    return ccNumisValid && zipNumisValid && cvvNumisValid
    // console.log(ccNum)
    // console.log(zipNum)
    // console.log(cvvNum)
    // console.log(ccNumisValid)
    // console.log(zipNumisValid)
    // console.log(cvvNumisValid)
    
    

}


// submit listener on the form element
form.addEventListener('submit', (e) => {
    
    // IMPORTANT NOTE: Firing the submit event will refresh the page and reset the form, erasing your log statements.
    // This can be prevented by calling `e.preventDefault()` here in this submit handler, or
    // by clicking on the gear icon in the upper right hand corner of the Chrome DevTools console to enter the settings menu,
    // locating the "Console" section and selecting the "Preserve log upon navigation" option.

    // IMPORTANT NOTE: If you call `e.preventDefault()` outside of a conditional, keep in mind that when this exercise is completed, 
    // the form submission should only be prevented if one or more of the required fields is invalid.  
    // Otherwise the form should be allowed to submit.  But it's okay to temporarily disrupt that behavior for testing purposes.

    // IMPORTANT NOTE: Also keep in mind that the form's submission behavior will differ depending on whether
    // this project is being live served with a server or just viewed locally in the browser.

    
    // Preventing form submission for testing purposes. Remove or comment out as needed and before completion

    //e.preventDefault()

    //check if the submit handler is working if 
    
    //console.log(name_input.value)
    // nameValidator()
    // emailValidator()
    // console.log(creditCardValidator())
    
    //
    //if isCredit run credit validator if this is true otherwise dont run it 
    if (nameValidator() && emailValidator() && activityCost > 0 && creditCardValidator() ){
        register_btn.classList.remove('disabled')
        e.preventDefault()
    }else{
        register_btn.classList.add('disabled')
        e.preventDefault()
    }
    

    //console.log('Submit handler is functional!')
    //if any of the validation is false prevent the submission event
        //e.preventDefault()

    //else allow the user to sumit his info
        //
    
})