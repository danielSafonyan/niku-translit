import makeTranslator from './makeTranslator.js'

const $form = document.getElementById('js-form')
const $textInput = document.getElementById('js-text-input')
const $results = document.getElementById('js-results')

document.addEventListener('click', clickHandler)

function clickHandler(e) {
    if (e.target.closest('.clear-btn')) {
        clearAll()
    }
    const deletedElem = e.target.closest('.results__element')
    if (deletedElem) {
        const elemId = Number(deletedElem.dataset.id)
        if (elemId === 1) return
        state = state.filter(el => el.id !== elemId)
        renderAll()
    }
}

function clearAll() {
    state = [...template]
    renderAll()
}

const template = [
    {
    id: 1,
    input: 'Привет',
    output: 'Privet'
    }
]

let state = [...template]
const getTranslit = makeTranslator()

$form.addEventListener('submit', function(e) {
    e.preventDefault()
    const input = $textInput.value
    const output = getTranslit(input)
    state.push({
        id: state.length + 1,
        input,
        output
    })
    $textInput.value = ''
    renderAll()
})

function renderAll() {
    let htmlString = ''
    state.forEach(el => htmlString += getElementHtml(el))
    $results.innerHTML = htmlString
}

function getElementHtml(elObj) {
    const { id, input, output} = elObj
    const isLong = checkIsLong(input)
    const inputEl = isLong ? `${input.slice(0, 7)}...` : input
    const outputEl = isLong ? `${output.slice(0, 7)}...` : output
    console.log(inputEl)
    return (`<div class="results__element" data-id=${elObj.id}>
            <div class="results__element__input">
                <span>${id}</span>
                <span>${inputEl}</span>
                ${isLong ? `<span class="element__input__tooltip">${input}</span>` : ''}
            </div>
            <div class="results__element__output">
                <span>${outputEl}</span>
                ${isLong ? `<span class="element__output__tooltip">${output}</span>` : ''}
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
        </div>`)
}

renderAll()

function checkIsLong(text) {
    return text.length > 7
}