/**
 * Imports.
 */
import 'babel-polyfill'

import { aboutSetup } from './components/about'
import { buttonsSetup } from './components/buttons'
import { homeSetup } from './components/home'
import { loadingSetup } from './components/loading'
import { logoSetup } from './components/logo'
import { musicSetup } from './components/music'
import { projectSetup } from './components/project'
import { projectsSetup } from './components/projects'
import { sceneSetup } from './components/scene'

/**
 * Library.
 */
import get from './lib/get'

/**
 * SVG.
 */
get('dist/svg/svg.svg', (response) => {
  const div = document.createElement('div')

  div.style.display = 'none'
  div.innerHTML = response.responseText.replace(/\n/g, '')

  document.body.insertBefore(div, document.body.childNodes[0])
})

/**
 * Setup.
 */
aboutSetup()
buttonsSetup()
homeSetup()
loadingSetup()
logoSetup()
musicSetup()
projectSetup()
projectsSetup()
sceneSetup()

/**
 * Window.
 */
window.addEventListener('resize', () => {
  if (!document.querySelector('.about').classList.contains('is-active') && !document.querySelector('.project').classList.contains('is-active')) {
    logoSetup()
  }
})

/**
 * Scrollbar.
 */
import Scrollbar from 'smooth-scrollbar'

Scrollbar.initAll()
