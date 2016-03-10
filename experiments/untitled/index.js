/* global XMLHttpRequest, Audio, Power0, requestAnimationFrame */

const THREE = require('three')
const GSAP = require('gsap')
const dat = require('dat-gui')
const Stats = require('stats-js')

const OrbitControls = require('three-orbit-controls')(THREE)

const EffectComposer = require('three-effectcomposer')(THREE)
const DotScreenShader = require('./shaders/dotScreenShader')
const RGBShiftShader = require('./shaders/rgbShift')
const HorizontalBlurShader = require('./shaders/horizontalBlurShader')
const VerticalBlurShader = require('./shaders/verticalBlurShader')

class App {
  constructor () {
    this.url = 'https://soundcloud.com/jeantonique/poom-face-the-fire-jean'

    this.data = null
    this.div = null

    this.gui = null
    this.renderer = null
    this.scene = null
    this.camera = null
    this.composer = null
    this.controls = null
    this.clock = new THREE.Clock({ autoStart: true })

    this.loadSong()
    this.createRender()
    this.createScene()
    this.createGeometry()
    this.createShaders()
    this.startGUI()
    this.startStats()
    this.update()
  }

  startGUI () {
    this.gui = new dat.GUI()
  }

  startStats () {
    this.stats = new Stats()

    this.stats.domElement.style.display = 'block'
    this.stats.domElement.style.left = 0
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = 0
    this.stats.domElement.style.zIndex = 50

    document.body.appendChild(this.stats.domElement)
  }

  createRender () {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      transparent: false
    })

    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.style.display = 'block'

    document.body.appendChild(this.renderer.domElement)
  }

  createScene () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4000)
    this.camera.position.set(0, 0, -100)
    this.camera.lookAt(new THREE.Vector3(1, 1, 100))

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableKeys = false
    this.controls.minDistance = 50
    this.controls.maxDistance = 75
    this.controls.autoRotate = false
  }

  createGeometry () {
    this.scene.add()
  }

  createShaders () {
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera))

    const dotEffect = new EffectComposer.ShaderPass(DotScreenShader)
    dotEffect.uniforms.scale.value = 4

    this.composer.addPass(dotEffect)

    const rgbEffect = new EffectComposer.ShaderPass(RGBShiftShader)
    rgbEffect.uniforms.amount.value = 0.05
    rgbEffect.renderToScreen = true

    this.composer.addPass(rgbEffect)

    const horizontalBlurEffect = new EffectComposer.ShaderPass(HorizontalBlurShader)

    this.composer.addPass(horizontalBlurEffect)

    const verticalBlurEffect = new EffectComposer.ShaderPass(VerticalBlurShader)

    this.composer.addPass(verticalBlurEffect)
  }

  loadSong () {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const request = new XMLHttpRequest()

    const _this = this

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.responseText)

        _this.music = new Audio()
        _this.music.crossOrigin = 'anonymous'
        _this.music.src = `${response.stream_url}?client_id=78c6552c14b382e23be3bce2fc411a82`
        _this.music.play()

        _this.music.addEventListener('ended', () => {
          _this.music.play()
        })

        _this.context = new AudioContext()

        _this.analyser = this.context.createAnalyser()
        _this.analyser.smoothingTimeConstant = 0.1
        _this.analyser.fftSize = 2048
        _this.analyser.connect(this.context.destination)

        _this.src = this.context.createMediaElementSource(this.audio)
        _this.src.connect(this.context.destination)
        _this.src.connect(this.analyser)

        _this.frequency = new Uint8Array(this.analyser.frequencyBinCount)

        const div = document.createElement('a')
        const divImg = '<img src="https://developers.soundcloud.com/assets/logo_white.png" class="soundcloud-img">'

        div.className = 'soundcloud-link'
        div.setAttribute('href', response.permalink_url)
        div.innerHTML = `${divImg} ${response.title} - ${response.user.username}`

        document.body.appendChild(div)
      }
    }

    request.open('GET', `//api.soundcloud.com/resolve.json?url=${this.url}&client_id=78c6552c14b382e23be3bce2fc411a82`, true)

    request.send()
  }

  update () {
    this.stats.begin()

    this.composer.render()
    this.controls.update()

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))

    this.renderer.render(this.scene, this.camera)
  }

  resize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

const app = new App()

document.body.style.margin = '0'
document.body.style.padding = '0'

window.addEventListener('resize', () => {
  app.resize()
})
