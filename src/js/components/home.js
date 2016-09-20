/**
 * Components.
 */
import { music } from './music'
import { projectsClose } from './projects'

/**
 * Elements.
 */
const home = document.querySelector('.home')

/**
 * Events.
 */
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
