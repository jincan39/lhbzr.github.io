/* global requestAnimationFrame */

require('gsap')

const THREE = require('three')
const dat = require('dat-gui')
const Stats = require('stats-js')

const glslify = require('glslify')

const OrbitControls = require('three-orbit-controls')(THREE)

class App {
  constructor () {
    this.gui = null
    this.stats = null

    this.startGUI()
    this.startStats()

    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null

    this.createRender()
    this.createScene()
    this.createGeometry()

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

    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(this.renderer.domElement)
  }

  createScene () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.camera.position.z = 35

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  createGeometry () {
    this.group = new THREE.Object3D()

    const galaxyMaterial = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      transparent: true,
      uniforms: {
        color: { type: 'c', value: new THREE.Color(0xFFFFFF) }
      },
      fragmentShader: glslify('./shaders/particleFrag.glsl'),
      vertexShader: glslify('./shaders/particleVert.glsl')
    })

    const galaxyGeometry = new THREE.SphereGeometry(10, 35, 35)

    this.galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial)

    this.scene.add(this.galaxy)
  }

  update () {
    this.stats.begin()

    this.renderer.render(this.scene, this.camera)

    this.group.rotation.y += 0.01

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
