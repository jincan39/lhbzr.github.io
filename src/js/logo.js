/* global SVGMorpheus, TweenMax */

import setStrokeDash from './lib/setStrokeDash'

import getOffset from './lib/getOffset'

const logo = new SVGMorpheus('.logo')
const logoElement = document.querySelector('.logo')

const homeLogo = document.querySelector('.home-logo')

const aboutLogo = document.querySelector('.about-logo')

const projectLogo = document.querySelector('.project-logo')

/**
 * Set: Default.
 */
export function logoSet () {
  const homeOffset = getOffset(homeLogo)

  TweenMax.set(logoElement, {
    height: homeLogo.clientHeight,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeLogo.clientWidth
  })
}

/**
 * Animation: Home.
 */
export function logoSetHome () {
  logo.to('logo-horizontal', { duration: 1000 })

  const homeOffset = getOffset(homeLogo)

  TweenMax.to(logoElement, 1, {
    height: homeLogo.clientHeight,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeLogo.clientWidth
  })
}

/**
 * Animation: About.
 */
export function logoSetAbout () {
  logo.to('logo-vertical', { duration: 1000 })

  const aboutOffset = getOffset(aboutLogo)

  TweenMax.to(logoElement, 1, {
    height: aboutLogo.clientHeight,
    left: aboutOffset.left,
    top: aboutOffset.top,
    width: aboutLogo.clientWidth
  })
}

/**
 * Animation: Project.
 */
export function logoSetProject () {
  logo.to('logo-vertical', { duration: 1000 })

  const projectOffset = getOffset(projectLogo)

  TweenMax.to(logoElement, 1, {
    height: projectLogo.clientHeight,
    left: projectOffset.left,
    top: projectOffset.top,
    width: projectLogo.clientWidth
  })
}
