import get from '../library/get'

get('sprites/sprites.svg', (response) => {
  const div = document.createElement('div')

  div.style.display = 'none'
  div.innerHTML = response.responseText.replace(/\n/g, '')

  document.body.insertBefore(div, document.body.childNodes[0])
})
