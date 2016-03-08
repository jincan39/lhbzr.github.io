/* global Audio, Power0, requestAnimationFrame */

import THREE from 'three'
import GSAP from 'gsap'
import dat from 'dat-gui'
import Stats from 'stats-js'

const Soundcloud = require('soundcloud-badge')
const Analyser = require('web-audio-analyser')

const OrbitControls = require('three-orbit-controls')(THREE)
const glslify = require('glslify')

class Paralyzed {
  constructor () {
    this.color = '#FFAA00'

    this.gui = null

    this.renderer = null
    this.scene = null
    this.camera = null

    this.controls = null

    this.loadSong()

    this.createRender()
    this.createScene()
    this.createGeometry()

    this.startGUI()
    this.startStats()

    this.update()
  }

  startGUI () {
    this.gui = new dat.GUI()

    const _this = this

    this.gui.addColor(this, 'color').onChange(function () {
      console.log('Not figured out how to make this work.')
    })
  }

  startStats () {
    this.stats = new Stats()
    this.stats.domElement.style.display = 'block'
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.right = 0
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
    this.geometry = new THREE.IcosahedronGeometry(20, 4)

    this.material = new THREE.ShaderMaterial({
      vertexShader: glslify('./shaders/vertexShader.glsl'),
      fragmentShader: glslify('./shaders/fragmentShader.glsl'),
      uniforms: {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: {
          x: 1,
          y: 1
        }},
        u_speed: { type: 'f', value: 0.5 },
        u_color: { type: 'c', value: new THREE.Color(0xFFFFFF) },
        u_background: { type: 'c', value: new THREE.Color(0xFFAA00) },
        u_brightness: { type: 'f', value: 1 }
      }
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.mesh)
  }

  loadSong () {
    const AudioContext = window.AudioContext || window.webkitAudioContext

    const _this = this

    Soundcloud({
      client_id: '78c6552c14b382e23be3bce2fc411a82',
      song: 'https://soundcloud.com/mysteryskulls/paralyzed-single-version',
      dark: false,
      getFonts: false
    }, (err, src, data, div) => {
      if (err) throw err

      _this.music = new Audio()
      _this.music.crossOrigin = 'Anonymous'
      _this.music.src = src
      _this.music.play()

      _this.musicAnalyser = Analyser(_this.music, new AudioContext(), {
        audible: true,
        stereo: true
      })
    })
  }

  update () {
    this.stats.begin()

    this.controls.update()

    const array = this.musicAnalyser ? this.musicAnalyser.frequencies() : [1]
    const arrayAverage = array.reduce((p, c) => p + c, 0) / array.length

    GSAP.to(this.material.uniforms.u_brightness, 0.2, {
      ease: Power0.easeNone,
      value: arrayAverage / 50
    })

    GSAP.to(this.material.uniforms.u_time, 0.2, {
      ease: Power0.easeNone,
      value: `+= ${arrayAverage / 1000}`
    })

    this.renderer.render(this.scene, this.camera)

    this.stats.end()

    requestAnimationFrame(this.update.bind(this))
  }
}

const paralyzed = new Paralyzed()

document.body.style.margin = '0'
document.body.style.padding = '0'
