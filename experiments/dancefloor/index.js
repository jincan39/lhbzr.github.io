/* global requestAnimationFrame */

const THREE = require('three')
const GSAP = require('gsap')
const dat = require('dat-gui')
const Stats = require('stats-js')

const Music = require('./classes/music')

const OrbitControls = require('three-orbit-controls')(THREE)

const EffectComposer = require('three-effectcomposer')(THREE)
const DotScreenShader = require('./shaders/dotScreenShader')
const RGBShiftShader = require('./shaders/rgbShift')
const HorizontalBlurShader = require('./shaders/horizontalBlurShader')
const VerticalBlurShader = require('./shaders/verticalBlurShader')

const music = new Music('https://soundcloud.com/jeantonique/poom-face-the-fire-jean')

class App {
  constructor () {
    this.gui = null
    this.renderer = null
    this.scene = null
    this.camera = null
    this.composer = null
    this.controls = null
    this.clock = new THREE.Clock({ autoStart: true })

    this.createRender()
    this.createScene()
    this.createShaders()
    this.createGeometry()
    this.createLight()
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

    this.renderer.setClearColor(0xFFFFFF)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.style.display = 'block'

    document.body.appendChild(this.renderer.domElement)
  }

  createScene () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.x = -200

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableKeys = false
    this.controls.minDistance = 50
    this.controls.maxDistance = 75
    this.controls.autoRotate = false
  }

  createGeometry () {
    this.object = new THREE.Object3D()

    for (let column = 1; column < 50; column++) {
      for (let row = 1; row < 20; row++) {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial({ color: 0x0000FF })
        )

        box.position.x = (column - 50 / 2)
        box.position.y = (row - 20 / 2)

        this.object.add(box)
      }
    }

    this.scene.add(this.object)
  }

  createLight () {
    const light = new THREE.PointLight(0x000000)
    light.position.set(-100, 200, 100)

    this.scene.add(light)

    const light2 = new THREE.AmbientLight(0x000000)

    this.scene.add(light2)
  }

  createShaders () {
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera))

    const dotEffect = new EffectComposer.ShaderPass(DotScreenShader)
    dotEffect.uniforms.scale.value = 50

    this.composer.addPass(dotEffect)

    const rgbEffect = new EffectComposer.ShaderPass(RGBShiftShader)
    rgbEffect.uniforms.amount.value = 0.005
    rgbEffect.renderToScreen = true

    this.composer.addPass(rgbEffect)

    const horizontalBlurEffect = new EffectComposer.ShaderPass(HorizontalBlurShader)

    this.composer.addPass(horizontalBlurEffect)

    const verticalBlurEffect = new EffectComposer.ShaderPass(VerticalBlurShader)

    this.composer.addPass(verticalBlurEffect)
  }

  update () {
    this.stats.begin()

    const frequencies = music.getFrequencies()

    this.object.children.forEach((geometry, index) => {
      GSAP.to(geometry.scale, 0.2, {
        z: frequencies[index] / 10 + 0.01
      })
    })

    this.renderer.render(this.scene, this.camera)

    this.composer.render()
    this.controls.update()

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
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
