import get from '../lib/get'

get('dist/svg/svg.svg', (response) => {
  const div = document.createElement('div')

  div.style.display = 'none'
  div.innerHTML = response.responseText.replace(/\n/g, '')

  document.body.insertBefore(div, document.body.childNodes[0])
})
