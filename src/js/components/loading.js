/* global TimelineMax */

/**
 * Library.
 */
import setStrokeDash from '../lib/setStrokeDash'

/**
 * Elements.
 */
const logoPath = document.querySelectorAll('.logo path')

const homeBtnPath = document.querySelectorAll('.home-menu-item path')
const homeBtnText = document.querySelectorAll('.home-menu-item .btn-text')

/**
 * Setup.
 */
export function loadingSetup () {
  const timeline = new TimelineMax()

  timeline
    .call(() => {
      setStrokeDash(logoPath)
      setStrokeDash(homeBtnPath)

      document.body.classList.add('is-loaded')
    })
    .to(logoPath, 2, { strokeDashoffset: 0 })
    .to(homeBtnPath, 0.4, { strokeDashoffset: 0 }, 'btn')
    .from(homeBtnText, 0.4, { autoAlpha: 0 }, 'btn')
}
