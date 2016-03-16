/* global requestAnimationFrame */

require('gsap')

const THREE = require('three')
const dat = require('dat-gui')
const Stats = require('stats-js')

const Music = require('./classes/music')

const OrbitControls = require('three-orbit-controls')(THREE)

const EffectComposer = require('three-effectcomposer')(THREE)
const VignetteShader = require('./shaders/vignetteShader')

// const music = new Music('https://soundcloud.com/lordrecollectif/elseif')

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
    this.createShader()

    this.createSun()
    this.createGlobe()
    this.createAtmosphere()

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
      alpha: true,
      antialias: true,
      transparent: true
    })

    this.renderer.setClearColor(0x2447B0)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(this.renderer.domElement)
  }

  createScene () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.camera.position.set(0, 0, -25)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  createAtmosphere () {
    const atmosphereGeometry = new THREE.SphereGeometry(5.5, 32, 32)
    const atmosphereMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFF00, wireframe: true })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)

    atmosphere.material.transparent = true
    atmosphere.material.opacity = 0.1

    this.scene.add(atmosphere)
  }

  createGlobe () {
    const globeGeometry = new THREE.SphereGeometry(5, 32, 32)
    const globeMaterial = new THREE.MeshLambertMaterial({
      color: 0x0055F2,
      specular: 0x0096FF,
      shininess: 100
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)

    this.scene.add(globe)
  }

  createSun () {
    /**
     * Light.
     */
    const light = new THREE.PointLight(0xffffff, 1.5, 2000)

    light.color.setHSL(0.995, 0.5, 0.9)
    light.position.set(4.5, 4.5, 0)

    this.scene.add(light)

    /**
     * Flare.
     */
    const textureLoader = new THREE.TextureLoader()

    const flare0 = textureLoader.load('sprites/lensflare/lensflare-0.png')
    const flare1 = textureLoader.load('sprites/lensflare/lensflare-1.png')
    const flare2 = textureLoader.load('sprites/lensflare/lensflare-2.png')

    var flareColor = new THREE.Color(0xffffff)

    flareColor.setHSL(0.995, 0.5, 1.4)

    const lensFlare = new THREE.LensFlare(flare0, 700, 0.0, THREE.AdditiveBlending, flareColor)

    lensFlare.add(flare1, 512, 0.0, THREE.AdditiveBlending)
    lensFlare.add(flare1, 512, 0.0, THREE.AdditiveBlending)
    lensFlare.add(flare1, 512, 0.0, THREE.AdditiveBlending)

    lensFlare.add(flare2, 60, 0.6, THREE.AdditiveBlending)
    lensFlare.add(flare2, 70, 0.7, THREE.AdditiveBlending)
    lensFlare.add(flare2, 120, 0.9, THREE.AdditiveBlending)
    lensFlare.add(flare2, 70, 1.0, THREE.AdditiveBlending)

    lensFlare.position.copy(light.position)

    this.scene.add(lensFlare)
  }

  createLight () {
    this.scene.add(new THREE.AmbientLight(0xFFFFFF, 0.5))
  }

  createShader () {
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera))

    const vignetteShader = new EffectComposer.ShaderPass(VignetteShader)

    vignetteShader.uniforms['offset'].value = 1
    vignetteShader.uniforms['darkness'].value = 2
    vignetteShader.renderToScreen = true

    this.composer.addPass(vignetteShader)
  }

  update () {
    this.stats.begin()

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

window.addEventListener('resize', () => {
  app.resize()
})
