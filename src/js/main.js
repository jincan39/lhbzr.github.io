/* global TimelineMax */

import 'babel-polyfill'

import get from './lib/get'

import Music from './music'
import Scene from './scene'

import setStrokeDash from './lib/setStrokeDash'

import { logoSet } from './logo'
import { aboutSet } from './about'
import { projectsSet, projectsClose } from './projects'
import { projectSet } from './project'
import { buttonsSet } from './buttons'

(function () {
  document.body.classList.add('is-loaded')

  const logoPath = document.querySelectorAll('.logo path')

  const homeBtnPath = document.querySelectorAll('.home-menu-item path')
  const homeBtnText = document.querySelectorAll('.home-menu-item .btn-text')

  /**
   * Logo.
   */
  logoSet()

  /**
   * Elements.
   */
  aboutSet()
  projectsSet()
  projectSet()
  buttonsSet()

  /**
   * Strokes.
   */
  setStrokeDash(logoPath)
  setStrokeDash(homeBtnPath)

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
  window.addEventListener('resize', (e) => {
    logoSet()

    scene.resize(e)
  }, false)

  window.addEventListener('mousemove', (e) => {
    scene.mousemove(e)
  }, false)

  /**
   * Loaded.
   */
  const timeline = new TimelineMax()

  timeline
    .to(logoPath, 2, { strokeDashoffset: 0 })
    .to(homeBtnPath, 0.4, { strokeDashoffset: 0 }, 'btn')
    .from(homeBtnText, 0.4, { autoAlpha: 0 }, 'btn')
})()
