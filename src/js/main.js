import 'babel/polyfill'

import get from './lib/get'

import Music from './music'
import Scene from './scene'

import onLoad from './loaded'

import { logoSet } from './logo'

import { aboutSet } from './about'
import { projectsSet, projectsClose } from './projects'
import { projectSet } from './project'
import { buttonsSet } from './buttons'

/**
 * Site.
 */
logoSet()
aboutSet()
projectsSet()
projectSet()
buttonsSet()

/**
 * Music.
 */
const music = new Music()

/**
 * Scene.
 */
const scene = new Scene(music)

/**
 * SVG.
 */
get('dist/svg/svg.svg', (response) => {
  const body = document.body
  const div = document.createElement('div')

  div.style.display = 'none'
  div.innerHTML = response.responseText.replace(/\n/g, '')

  body.insertBefore(div, body.childNodes[0])
})

/**
 * Home.
 */
const home = document.querySelector('.home')

home.addEventListener('click', (e) => {
  projectsClose()
})

home.addEventListener('mousewheel', (e) => {
  let value = Math.round(music.audio.volume * 100) / 100

  if (e.wheelDelta < 0 && value - 0.05 >= 0) {
    value = Math.abs(value - 0.05)
  } else if (e.wheelDelta > 0 && value + 0.05 <= 1) {
    value = Math.abs(value + 0.05)
  }

  music.audio.volume = value
})

/**
 * Window.
 */
window.addEventListener('load', () => {
  document.body.classList.add('is-loaded')

  onLoad()
})

window.addEventListener('resize', (e) => {
  scene.resize(e)
}, false)

window.addEventListener('mousemove', (e) => {
  scene.mousemove(e)
}, false)
