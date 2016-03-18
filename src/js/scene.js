/* global Power0, requestAnimationFrame, TweenLite */

import randomInt from './lib/randomInt'

import THREE from 'three'
import THREEEffectComposer from 'three-effectcomposer'
const EffectComposer = THREEEffectComposer(THREE)
import RGBShiftShader from './shaders/RGBShift'

export default class Scene {
  constructor (music) {
    this.clicked = false
    this.music = music

    this.canvas = null
    this.renderer = null

    this.scene = null
    this.camera = null

    this.circle = new THREE.Object3D()
    this.geometry = []
    this.geometrySleeve = []
    this.geometryLength = 100
    this.geometryType = [
      new THREE.TetrahedronGeometry(50, 0),
      new THREE.IcosahedronGeometry(40, 0),
      new THREE.OctahedronGeometry(40, 0)
    ]

    this.composer = null

    this.mouse = {
      x: 0,
      y: 0
    }

    this.createRenderer()
    this.createScene()

    this.createGeometry()
    this.createLight()
    this.createShaders()

    this.render()

    this.setElements()
  }

  createRenderer () {
    this.canvas = document.querySelector('.canvas')

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.canvas
    })

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  createScene () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 275
  }

  createGeometry () {
    const _this = this

    const number = randomInt(0, _this.geometryType.length - 1)

    for (let i = 0; i < _this.geometryLength; i++) {
      _this.geometry[i] = new THREE.Mesh(
        _this.geometryType[number],
        new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          wireframe: true
        })
      )

      _this.geometry[i].position.y = 100

      _this.geometrySleeve[i] = new THREE.Object3D()
      _this.geometrySleeve[i].rotation.z = i * (360 / _this.geometryLength) * Math.PI / 180
      _this.geometrySleeve[i].add(_this.geometry[i])

      _this.circle.add(_this.geometrySleeve[i])
    }

    _this.scene.add(_this.circle)
  }

  createLight () {
    const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1)
    const lightTwo = new THREE.DirectionalLight(0xFFFFFF, 1)

    lightOne.position.set(1, 1, 1)
    lightTwo.position.set(-1, -1, 1)

    this.scene.add(lightOne)
    this.scene.add(lightTwo)
  }

  createShaders () {
    this.composer = new EffectComposer(this.renderer)

    this.effect = new EffectComposer.ShaderPass(RGBShiftShader)
    this.effect.uniforms.amount.value = 0.05
    this.effect.renderToScreen = true

    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera))
    this.composer.addPass(this.effect)

    this.renderer.render(this.scene, this.camera)
  }

  render () {
    const _this = this

    TweenLite.to(_this.effect.uniforms.amount, 1, {
      value: (_this.clicked) ? 0.005 : (_this.mouse.x / window.innerWidth)
    })

    _this.geometry.forEach((geometry, index) => {
      let value

      if (window.AudioContext || window.webkitAudioContext) {
        value = (_this.music.getFrequency()[index] / 100) + 0.01
      } else {
        value = 1
      }

      if (_this.clicked) {
        TweenLite.to(geometry.scale, 0.05, { ease: Power0.easeNone, x: value, y: value, z: value })
        TweenLite.to(geometry.rotation, 0.05, { ease: Power0.easeNone, z: (index % 2 === 0) ? '+= 0.05' : '-= 0.05' })
      } else {
        TweenLite.to(geometry.scale, 0.05, { ease: Power0.easeNone, z: value })
      }
    })

    _this.circle.rotation.z += 0.01

    _this.renderer.render(_this.scene, _this.camera)
    _this.composer.render()

    requestAnimationFrame(_this.render.bind(_this))
  }

  resize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  mousemove (e) {
    this.mouse.x = e.clientX - window.innerWidth / 2
    this.mouse.y = e.clientY - window.innerHeight / 2
  }

  click () {
    if (this.clicked) {
      this.geometry.forEach((geometry, index) => {
        TweenLite.to(geometry.scale, 1, { x: 1, y: 1, z: 1 })
        TweenLite.to(geometry.rotation, 1, { x: 0, y: 0, z: 0 })
        TweenLite.to(geometry.position, 1, { x: 0, y: 100, z: 0 })
      })

      this.clicked = false
    } else {
      this.geometry.forEach((geometry, index) => {
        TweenLite.to(geometry.rotation, 1, {
          x: randomInt(0, Math.PI),
          y: randomInt(0, Math.PI),
          z: randomInt(0, Math.PI)
        })

        TweenLite.to(geometry.position, 1, {
          x: `+= ${randomInt(-1000, 1000)}`,
          y: `+= ${randomInt(-1000, 1000)}`,
          z: `+= ${randomInt(-500, -250)}`
        })
      })

      this.clicked = true
    }
  }

  setElements () {
    const _this = this

    const elements = document.querySelectorAll('.home, .projects-link')

    Array.from(elements).forEach((element) => {
      element.addEventListener('click', (e) => {
        // _this.click(e)
      })
    })
  }
}
