/* global */

import randomInt from './lib/randomInt'
import replaceChar from './lib/replaceChar'

export default function setButton () {
  const buttons = document.querySelectorAll('.btn')

  Array.from(buttons).forEach((button) => {
    let buttonInterval
    let buttonText = button.querySelector('.btn-text')

    button.setAttribute('data-text', buttonText.innerHTML.trim())

    button.addEventListener('mouseenter', () => {
      buttonInterval = setInterval(() => {
        const value = buttonText.innerHTML.trim()
        const index = randomInt(0, value.length - 1)
        const char = String.fromCharCode(randomInt(65, 122))

        buttonText.innerHTML = replaceChar(value, index, char)
      }, 10)
    })

    button.addEventListener('mouseleave', () => {
      clearInterval(buttonInterval)

      buttonText.innerHTML = button.getAttribute('data-text')
    })
  })
}
