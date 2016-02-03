const THREE = require('three')
const OrbitViewer = require('three-orbit-viewer')(THREE)
const glslify = require('glslify')

const app = OrbitViewer({
  clearColor: 0x000000,
  clearAlpha: 1,
  position: new THREE.Vector3(1, 1, -100)
})

const material = new THREE.ShaderMaterial({
  vertexShader: glslify('./shaders/vertexShader.glsl'),
  fragmentShader: glslify('./shaders/fragmentShader.glsl'),
  uniforms: {
    u_time: {
      type: 'f',
      value: 0
    }
  }
})

const mesh = new THREE.Mesh(
  new THREE.IcosahedronGeometry(20, 4),
  material
)

app.scene.add(mesh)

app.on('tick', () => {
  material.uniforms.u_time.value += 0.01
})
