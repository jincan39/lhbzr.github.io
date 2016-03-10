import get from './lib/get'

import Music from './music'
import Scene from './scene'

import setAbout from './about'
import setMenu from './menu'
import setProjects from './projects'

/**
 * Site.
 */
setAbout()
setMenu()
setProjects()

/**
 * Music.
 */
const music = new Music()
const musicPrev = document.querySelector('.music-prev')
const musicToggle = document.querySelector('.music-toggle')
const musicNext = document.querySelector('.music-next')

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
  let volume = Math.round(music.audio.volume * 100) / 100

  if (e.wheelDelta < 0 && volume - 0.05 >= 0) {
    volume = Math.abs(volume - 0.05)
  } else if (e.wheelDelta > 0 && volume + 0.05 <= 1) {
    volume = Math.abs(volume + 0.05)
  }

  music.audio.volume = volume
})

window.addEventListener('load', () => {
  document.body.classList.add('is-loaded')
})

window.addEventListener('resize', (e) => {
  setAbout()
  setMenu()

  scene.resize(e)
}, false)

window.addEventListener('click', (e) => {
  scene.click(e)
}, false)

window.addEventListener('mousemove', (e) => {
  scene.mousemove(e)
}, false)
