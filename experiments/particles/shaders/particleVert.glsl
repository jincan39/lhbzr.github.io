#pragma glslify: curl = require(glsl-curl-noise)

attribute vec3 position;

void main() {
    vec3 positionRandom = curl(position);
    vec4 positionMv = modelViewMatrix * vec4(positionRandom, 1.0);

    gl_PointSize = 1.0;
    gl_Position = projectionMatrix * positionMv;
}
