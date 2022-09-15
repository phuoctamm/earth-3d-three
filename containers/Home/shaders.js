export const atmosphereVertext = [
  'varying vec3 vertexNormal;',
  'void main() {',
  'vertexNormal = normalize(normalMatrix * normal);',
  'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.4 );',
  '}',
].join('');

export const atmosphereFragment = [
  'varying vec3 vertexNormal;',
  'void main() {',
  'float intensity = pow(0.3 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);',
  'gl_FragColor = vec4(0.706,0.82,0.902, 1.0) * intensity;',
  '}',
].join('');
