/* global requestAnimationFrame */

require('gsap')

const THREE = require('three')
const dat = require('dat-gui')
const Stats = require('stats-js')

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
    this.camera.position.set(0, 0, -10)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  createGeometry () {
    const material = new THREE.PointCloudMaterial({
      size: 10,
      vertexColors: THREE.VertexColors
    })

    // const geometry = new THREE.SphereGeometry(10, 35, 2)

    var geometry = new THREE.Geometry()
    var x, y, z

    for (var i = 0; i <= 1000; i++) {
      x = (Math.random() * 10) - 10
      y = (Math.random() * 10) - 10
      z = (Math.random() * 10) - 10

      geometry.vertices.push(new THREE.Vector3(x, y, z))
    }

    const cloud = new THREE.PointCloud(geometry, material)

    console.log(cloud)

    this.scene.add(cloud)
  }

  update () {
    this.stats.begin()

    this.renderer.render(this.scene, this.camera)

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
