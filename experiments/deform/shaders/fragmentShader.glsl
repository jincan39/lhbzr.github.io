varying vec2 vUv;
varying float noise;

void main() {
    vec3 color = vec3( vUv * ( 1. - 2. * noise ), 2.0 );
    gl_FragColor = vec4( color.rgb, 1.0 );
}
