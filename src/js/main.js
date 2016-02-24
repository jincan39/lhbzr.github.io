import get from './lib/get'

import Music from './music'
import Scene from './scene'

/**
 * About.
 */
import about from './about'

about()

/**
 * Menu.
 */
import menu from './menu'

menu()

/**
 * Projects.
 */
import projects from './projects'

projects()

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

scene.createGeometry()
scene.createLight()
scene.createShaders()
scene.render()

/**
 * Canvas.
 */
document.querySelector('.canvas').addEventListener('mousewheel', (e) => {
  let volume = Math.round(music.audio.volume * 100) / 100

  if (e.wheelDelta < 0 && volume - 0.05 >= 0) {
    volume = Math.abs(volume - 0.05)
  } else if (e.wheelDelta > 0 && volume + 0.05 <= 1) {
    volume = Math.abs(volume + 0.05)
  }

  music.audio.volume = volume
})

/**
 * SVG.
 */
get('dist/svg/svg.svg', (res) => {
  const body = document.body
  const wrapper = document.createElement('div')

  wrapper.style.display = 'none'
  wrapper.innerHTML = res.responseText.replace(/\n/g, '')

  body.insertBefore(wrapper, body.childNodes[0])
})

/**
 * Window.
 */
window.addEventListener('resize', (e) => {
  scene.resize(e)
}, false)

window.addEventListener('click', (e) => {
  scene.click(e)
}, false)

window.addEventListener('mousemove', (e) => {
  scene.mousemove(e)
}, false)
