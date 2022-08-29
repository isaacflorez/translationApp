const inputTextField = document.querySelector('.text-input')
const outputTextField = document.querySelector('.text-output')
const exchangeButton = document.querySelector('.exchange')
const tranlateButton = document.querySelector('.translateBtn')
const selectBars = document.querySelectorAll('select')
const icons = document.querySelectorAll('.icons i')

selectBars.forEach((menu, id) => {  // fill in options from data.js
    for(const countryCode in countries){
        let selected = ''
        if(id == 0 && countryCode == "en-US") selected = "selected"    
        if(id == 1 && countryCode == "fr-FR") selected = "selected"
        let option =  `<option value=${countryCode} ${selected}>${countries[countryCode]}</option>`
        menu.insertAdjacentHTML('beforeend', option)
    }
});

const translate = () => { // fetch api with text and languge variable
    let text = inputTextField.value
    let translateFrom = selectBars[0].value
    let translateTo = selectBars[1].value
    if(!text) return
    outputTextField.setAttribute('placeholder', 'Translating....')
    const apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let translation = data.responseData.translatedText
            outputTextField.value = translation
        })
}

const exchange = () => {    // swap languages
    let tempText = inputTextField.value
    let tempLang = selectBars[0].value
    inputTextField.value = outputTextField.value
    outputTextField.value = tempText
    selectBars[0].value = selectBars[1].value
    selectBars[1].value = tempLang
}

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        if(target.classList.contains('fa-copy')){   // copy text to clipboard
            if(target.id == "input"){
                navigator.clipboard.writeText(inputTextField.value)
            } else {
                navigator.clipboard.writeText(outputTextField.value)
            }
        } else {    // using speech button
            if(target.id == "input"){
                let utterance = new SpeechSynthesisUtterance(inputTextField.value)
                utterance.lang = selectBars[0].value
                speechSynthesis.speak(utterance)
            } else {
                let utterance = new SpeechSynthesisUtterance(outputTextField.value)
                utterance.lang = selectBars[1].value
                speechSynthesis.speak(utterance)
            }
        }
    })
})
exchangeButton.addEventListener('click', exchange)
tranlateButton.addEventListener('click', translate)