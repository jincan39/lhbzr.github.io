/**
 * Classes.
 */
import Detector from '../classes/detector'
import Scene from '../classes/Scene'

/**
 * Components.
 */
import { music } from './music'

/**
 * Setup.
 */
if (Detector.webgl) {
  const scene = new Scene(music)
} else {
  const alert = document.createElement('div')

  alert.className = 'alert'
  alert.innerHTML = `The full experience of LHBZR requires WebGL, please updgrade your browser to the latest <a href='http://mozilla.org/firefox/' class='alert-link' target='_blank'>Mozilla Firefox</a> or <a href='http://www.google.com/chrome/' class='alert-link' target='_blank'>Google Chrome</a>.`

  document.body.appendChild(alert)
}
