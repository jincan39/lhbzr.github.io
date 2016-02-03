import get from './lib/get'

import Music from './music'
import Scene from './scene'

import about from './about'
import menu from './menu'

about()
menu()

const music = new Music()
const musicPrev = document.querySelector('.music-prev')
const musicToggle = document.querySelector('.music-toggle')
const musicNext = document.querySelector('.music-next')

musicToggle.addEventListener('click', (e) => {
  e.stopPropagation()

  if (music.isPaused()) {
    musicToggle.classList.remove('is-paused')

    music.play()
  } else {
    musicToggle.classList.add('is-paused')

    music.pause()
  }
})

musicPrev.addEventListener('click', (e) => {
  e.stopPropagation()

  musicToggle.classList.remove('is-paused')

  music.prev()
})

musicNext.addEventListener('click', (e) => {
  e.stopPropagation()

  musicToggle.classList.remove('is-paused')

  music.next()
})

const scene = new Scene(music)

scene.createGeometry()
scene.createLight()
scene.createShaders()
scene.render()

get('dist/svg/svg.svg', (res) => {
  const body = document.body
  const wrapper = document.createElement('div')

  wrapper.style.display = 'none'
  wrapper.innerHTML = res.responseText.replace(/\n/g, '')

  body.insertBefore(wrapper, body.childNodes[0])
})

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader')

  loader.parentNode.removeChild(loader)

  const timeline = new TimelineMax()

  timeline
    .fromTo('.body-border', 0.5, { scale: 0 }, { scale: 1 })
    .fromTo('.body-dots', 0.5, { autoAlpha: 0 }, { autoAlpha: 1 })
    .fromTo('.about', 0.5, { autoAlpha: 0 }, { autoAlpha: 1 })
    .fromTo('.music, .share', 0.5, { autoAlpha: 0 }, { autoAlpha: 1 })
    .staggerFromTo('.menu-link', 0.25, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.25)
    .fromTo('.canvas', 0.5, { autoAlpha: 0 }, { autoAlpha: 1 })
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

window.addEventListener('mousewheel', (e) => {
  let volume = Math.round(music.audio.volume * 100) / 100

  if (e.wheelDelta < 0 && volume - 0.05 >= 0) {
    volume = Math.abs(volume - 0.05)
  } else if (e.wheelDelta > 0 && volume + 0.05 <= 1) {
    volume = Math.abs(volume + 0.05)
  }

  music.audio.volume = volume
})
