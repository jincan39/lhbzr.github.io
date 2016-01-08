import int from './lib/int';

import THREE from 'three';
import THREEEffectComposer from 'three-effectcomposer';
const EffectComposer = THREEEffectComposer(THREE);
import RGBShiftShader from './shaders/rgbshift';

export default class Scene {
  constructor(music) {
    this.ratio = window.innerWidth / window.innerHeight;

    this.canvas = document.querySelector('.canvas');

    this.camera = new THREE.PerspectiveCamera(75, this.ratio, 0.1, 1000);
    this.camera.position.z = 275;
    this.camera.lookAt = new THREE.Vector3();

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.canvas
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.circle = new THREE.Object3D();
    this.geometry = [];
    this.geometrySleeve = [];
    this.geometryLength = 100;
    this.geometryType = [
      new THREE.TetrahedronGeometry(50, 0),
      new THREE.IcosahedronGeometry(40, 0),
      new THREE.OctahedronGeometry(40, 0)
    ];

    this.composer = new EffectComposer(this.renderer);

    this.mouse = {
      x: 0,
      y: 0
    };

    this.music = music;

    this.clicked = false;
  }

  createGeometry() {
    const number = int(0, this.geometryType.length - 1);

    for (let i = 0; i < this.geometryLength; i++) {
      this.geometry[i] = new THREE.Mesh(
        this.geometryType[number],
        new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          wireframe: true
        })
      );

      this.geometry[i].position.y = 100;

      this.geometrySleeve[i] = new THREE.Object3D();
      this.geometrySleeve[i].add(this.geometry[i]);
      this.geometrySleeve[i].rotation.z = i * (360 / this.geometryLength) * Math.PI / 180;

      this.circle.add(this.geometrySleeve[i]);
    }

    this.scene.add(this.circle);
  }

  createLight() {
    const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightOne.position.set(1, 1, 1);

    this.scene.add(lightOne);

    const lightTwo = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightTwo.position.set(-1, -1, 1);

    this.scene.add(lightTwo);
  }

  createShaders() {
    const effect = new EffectComposer.ShaderPass(RGBShiftShader);
    effect.uniforms.amount.value = 0.05;
    effect.renderToScreen = true;

    this.effect = effect;

    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera));

    this.composer.addPass(effect);

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    const that = this;
    const frequencies = this.music.getFrequency();

    requestAnimationFrame(this.render.bind(this));

    TweenLite.to(this.effect.uniforms.amount, 1, {
      value: (this.clicked) ? 0.005 : (this.mouse.x / window.innerWidth)
    });

    this.geometry.forEach((geometry, index) => {
      let value;

      if (window.AudioContext || window.webkitAudioContext) {
        value = (frequencies[index] / 256 * 2.5) + 0.01;
      } else {
        value = 1;
      }

      if (that.clicked) {
        TweenLite.to(geometry.scale, 0.1, { x: value, y: value, z: value });
        TweenLite.to(geometry.rotation, 0.1, { z: (index % 2 === 0) ? '+= 0.1' : '-= 0.1' });
      } else {
        TweenLite.to(geometry.scale, 0.1, { z: value });
      }
    });

    this.circle.rotation.z += 0.01;

    this.renderer.render(this.scene, this.camera);

    this.composer.render();
  }

  resize() {
    this.camera.aspect = this.ratio;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  mousemove(e) {
    this.mouse.x = e.clientX - window.innerWidth / 2;
    this.mouse.y = e.clientY - window.innerHeight / 2;
  }

  click() {
    const that = this;
    const clicked = this.clicked;

    this.geometry.forEach((geometry, index) => {
      if (clicked) {
        TweenLite.to(geometry.scale, 1, { x: 1, y: 1, z: 1 });
        TweenLite.to(geometry.rotation, 1, { x: 0, y: 0, z: 0 });
        TweenLite.to(geometry.position, 1, { x: 0, y: 100, z: 0 });

        that.clicked = false;
      } else {
        TweenLite.to(geometry.rotation, 1, {
          x: int(0, Math.PI),
          y: int(0, Math.PI),
          z: int(0, Math.PI)
        });

        TweenLite.to(geometry.position, 1, {
          x: '+= ' + int(-1000, 1000),
          y: '+= ' + int(-1000, 1000),
          z: '+= ' + int(-500, -250)
        });

        that.clicked = true;
      }
    });
  }
}
