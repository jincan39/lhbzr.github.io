/**
 * Classes.
 */
import Music from '../classes/Music'

/**
 * Elements.
 */
export const music = new Music()
const musicToggle = document.querySelector('.music-toggle')
const musicPrev = document.querySelector('.music-prev')
const musicNext = document.querySelector('.music-next')
let musicVolume

/**
 * Setup.
 */
export function musicSetup () {
  /**
   * Music.
   */
  music.audio.addEventListener('pause', () => {
    musicToggle.classList.add('is-paused')
  })

  music.audio.addEventListener('play', () => {
    musicToggle.classList.remove('is-paused')
  })

  music.audio.addEventListener('ended', () => {
    music.next()
  })

  musicToggle.addEventListener('click', () => {
    if (music.isPaused()) {
      music.play()
    } else {
      music.pause()
    }
  })

  musicPrev.addEventListener('click', () => {
    music.prev()
  })

  musicNext.addEventListener('click', () => {
    music.next()
  })

  /**
   * Window.
   */
  window.addEventListener('blur', () => {
    musicVolume = music.audio.volume
    music.audio.volume = 0
  })

  window.addEventListener('focus', () => {
    music.audio.volume = musicVolume
  })
}
