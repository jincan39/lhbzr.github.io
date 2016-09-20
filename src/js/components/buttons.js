/**
 * Library.
 */
import forEach from '../lib/forEach'
import randomInt from '../lib/randomInt'
import replaceChar from '../lib/replaceChar'

/**
 * Elements.
 */
const buttons = document.querySelectorAll('.btn')

/**
 * Events.
 */
forEach(buttons, (index, button) => {
  let buttonInterval

  const buttonText = button.querySelector('.btn-text')

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
