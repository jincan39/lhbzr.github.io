import get from './lib/get'

import Music from './music'
import Scene from './scene'

import onLoad from './loaded'

import { setLogo } from './logo'

import setAbout from './about'
import setProjects from './projects'
import setProject from './project'
import setButtons from './buttons'

/**
 * Site.
 */
setLogo()
setAbout()
setProjects()
setProject()
setButtons()

/**
 * Music.
 */
const music = new Music()
const musicPrev = document.querySelector('.home-music-prev')
const musicToggle = document.querySelector('.home-music-toggle')
const musicNext = document.querySelector('.home-music-next')

music.audio.addEventListener('pause', () => {
  musicToggle.classList.add('is-paused')
})

music.audio.addEventListener('play', () => {
  musicToggle.classList.remove('is-paused')
})

music.audio.addEventListener('ended', () => {
  music.load((music.song < music.songs.length - 1) ? music.song + 1 : 0)
})

musicToggle.addEventListener('click', (e) => {
  if (music.isPaused()) {
    music.play()
  } else {
    music.pause()
  }

  e.stopPropagation()
})

musicPrev.addEventListener('click', (e) => {
  music.prev()

  e.stopPropagation()
})

musicNext.addEventListener('click', (e) => {
  music.next()

  e.stopPropagation()
})

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
 * Buttons.
 */
const buttons = document.querySelectorAll('.btn')

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    scene.click(e)
  })
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
