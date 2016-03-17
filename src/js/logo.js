/* global SVGMorpheus, TweenMax */

import getOffset from './lib/getOffset'

let logo
let logoElement = document.querySelector('.logo')

let homeLogo = document.querySelector('.home-logo')
let homeOffset = getOffset(homeLogo)

let aboutLogo = document.querySelector('.about-logo')
let aboutOffset = getOffset(aboutLogo)

let projectLogo = document.querySelector('.project-logo')
let projectOffset = getOffset(projectLogo)

export function setLogo () {
  logo = new SVGMorpheus('.logo')

  TweenMax.set(logoElement, {
    height: homeLogo.clientHeight,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeLogo.clientWidth
  })
}

export function setLogoLoaded () {
  const logoPath = logoElement.querySelectorAll('path')

  Array.from(logoPath).forEach((path) => {
    const pathLength = path.getTotalLength()

    path.style.strokeDasharray = pathLength + ' ' + pathLength
    path.style.strokeDashoffset = pathLength
  })

  TweenMax.to(logoPath, 2, { delay: 0.2, strokeDashoffset: 0 })
}

export function setLogoHome () {
  logo.to('logo-horizontal', { duration: 1000 })

  TweenMax.to(logoElement, 1, {
    height: homeLogo.clientHeight,
    left: homeOffset.left,
    top: homeOffset.top,
    width: homeLogo.clientWidth
  })
}

export function setLogoAbout () {
  logo.to('logo-vertical', { duration: 1000 })

  TweenMax.to(logoElement, 1, {
    height: aboutLogo.clientHeight,
    left: aboutOffset.left,
    top: aboutOffset.top,
    width: aboutLogo.clientWidth
  })
}

export function setLogoProject () {
  logo.to('logo-vertical', { duration: 1000 })

  TweenMax.to(logoElement, 1, {
    height: projectLogo.clientHeight,
    left: projectOffset.left,
    top: projectOffset.top,
    width: projectLogo.clientWidth
  })
}
