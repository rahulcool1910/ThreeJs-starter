import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from 'gsap';

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);

// Materials

const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color('green');

// Mesh
const sphere = new THREE.Mesh(geometry, material);
// sphere.position.normalize()
scene.add(sphere);

// Lights

// const pointLight = new THREE.PointLight(0xffffff, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  posX: 0,
  poxY: 0,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 2;
camera.position.y = 0;
camera.position.z = 0;
// camera.position.set(1,1,100)
// camera.position.normalize()
camera.lookAt(sphere.position);
scene.add(camera);

// const axeshelper=new THREE.AxesHelper(20 )
// scene.add(axeshelper)
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();
console.log('🚀 ~ file: script.js ~ line 102 ~ gsap', gsap);
camera.lookAt(sphere.position);

window.addEventListener('mousemove', (event) => {
  console.log(event.clientX);
  // camera.position.x=(event.clientX/screen.width - 0.5)*100
  // camera.position.y=(event.clientY/screen.height -0.5)*-100
  screen.posX = (event.clientX / screen.width - 0.5) * 3;
  screen.poxY = (event.clientY / screen.height - 0.5) * -3;
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // camera.position.y = Math.sin(elapsedTime) * 20
  // camera.position.x = Math.sin(elapsedTime) * 20
  // camera.lookAt(sphere.position)
  // console.log("🚀 ~ file: script.js ~ line 105 ~ Math.sin(elapsedTime)", Math.sin(elapsedTime))
  // console.log("🚀 ~ file: script.js ~ line 105 ~ elapsedTime", elapsedTime)

  // sphere.rotation.y+=0.01

  // Update Orbital Controls
  // controls.update()

  // Render

  // Call tick again on the next frame
  //   sphere.rotation.y = elapsedTime;
  camera.position.x = Math.sin(screen.posX * Math.PI) * 3;
  camera.position.z = Math.cos(screen.posX * Math.PI) * 3;
  camera.position.y = screen.poxY*3;
  camera.lookAt(sphere.position);
  renderer.render(scene, camera);
  // gsap.to(camera.position, { duration: 1, x: 100,y:100 });
  // gsap.to(camera.position, { duration: 10, x: 0, y:-100,delay:2});
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
// scene.
tick();
