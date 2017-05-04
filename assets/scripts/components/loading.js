import { TweenMax } from 'gsap'

import setStrokeDash from '../library/setStrokeDash'

const logoPath = document.querySelectorAll('.logo path')

const homeButtonPath = document.querySelectorAll('.home-menu-item path')
const homeButtonText = document.querySelectorAll('.home-menu-item .btn-text')

setStrokeDash(logoPath)
setStrokeDash(homeButtonPath)

document.body.classList.add('is-loaded')

TweenMax.to(logoPath, 2, { strokeDashoffset: 0 })
TweenMax.to(homeButtonPath, 0.4, { strokeDashoffset: 0 })
TweenMax.from(homeButtonText, 0.4, { autoAlpha: 0 })
