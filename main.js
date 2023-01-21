'use strict'

const out = document.querySelector('.out')
const btns = document.querySelector('.btns')

let imgNum = 0, count = 0, outItems

const makeField = (word) => {
    let html = '', tmp = ''

    for (let i = 0; i < word.length; i++) {
        tmp += word[i].toUpperCase()
        html += `<input class="show" type="text" value="*" disabled>`
    }
    out.innerHTML = html
    return tmp
}

const validate = (event) => {
    if (event.target.value.length <= 1) {
        event.target.value = event.target.value.toUpperCase().replace(/[^а-яё]/i, '')
    } else {
        event.target.value = event.target.value[0]
    }

    return event.target.value
}

const gameLogic = (word, target) => {
    if (target.classList.contains('btn')) {
        if (word.includes(target.value)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === target.value) {
                    count++
                    outItems[i].value = target.value
                    target.style.backgroundColor = 'green'
                    target.disabled = true
                    target.style.cursor = 'auto'
                }
            }
            if (count === word.length) {
                document.querySelector('.left').style.borderColor = 'green'
                btns.removeEventListener('click', (e) => gameLogic(word, e.target))
            }
        } else {
            imgNum++
            target.disabled = true
            target.style.cursor = 'auto'
            target.style.backgroundColor = 'red'
            document.querySelector('.left').style.background = `url('img/${imgNum}.png') center no-repeat`
            if (imgNum === 6) {
                document.querySelector('.left').style.borderColor = 'red'
                btns.removeEventListener('click', (e) => gameLogic(word, e.target))
            }
        }
    }
}

const getData = () => {
    fetch('words.json')
        .then(res => res.json())
        .then(data => {
            const word = makeField(data.words[Math.floor(Math.random() * data.words.length)])
            outItems = document.querySelectorAll('.show')

            btns.addEventListener('click', (e) => gameLogic(word, e.target))
        })
        .catch(err => err)
}

getData()