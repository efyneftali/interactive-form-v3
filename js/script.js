//cache the DOM
const name_input = document.getElementById("name")
const jobRole_select = document.getElementById("title")
const otherJob_input = document.getElementById("other-job-role")
const tShirtDesign_select =  document.getElementById("design")
const tShirtColor_select =  document.getElementById("color")
const tShirtColor_colorOptions = document.querySelectorAll('[data-theme]') //node list
const jsPuns_colorOptions = document.querySelectorAll('[data-theme="js puns"]') //node list
const jsHeart_colorOptions = document.querySelectorAll('[data-theme="heart js"]') //node list

//Promps the user to enter their name
name_input.focus()

//hides the "other" job field unless selected
otherJob_input.style.display = "none"

//prevents the user from selection a tshirt color without selecting the desing first
tShirtColor_select.disabled = true

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
 

