import get from './lib/get'

import Music from './music'
import Scene from './scene'

import setAbout from './about'
import setProjects from './projects'

/**
 * Site.
 */
setAbout()
setProjects()

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
  e.stopPropagation()

  if (music.isPaused()) {
    music.play()
  } else {
    music.pause()
  }
})

musicPrev.addEventListener('click', (e) => {
  e.stopPropagation()

  music.prev()
})

musicNext.addEventListener('click', (e) => {
  e.stopPropagation()

  music.next()
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
 * Window.
 */
window.addEventListener('mousewheel', (e) => {
  let value = Math.round(music.audio.volume * 100) / 100

  if (e.wheelDelta < 0 && value - 0.05 >= 0) {
    value = Math.abs(value - 0.05)
  } else if (e.wheelDelta > 0 && value + 0.05 <= 1) {
    value = Math.abs(value + 0.05)
  }

  music.audio.volume = value
})

window.addEventListener('load', () => {
  document.body.classList.add('is-loaded')
})

window.addEventListener('resize', (e) => {
  scene.resize(e)
}, false)

window.addEventListener('click', (e) => {
  scene.click(e)
}, false)

window.addEventListener('mousemove', (e) => {
  scene.mousemove(e)
}, false)
