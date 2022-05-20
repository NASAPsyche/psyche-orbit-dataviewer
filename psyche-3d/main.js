let splash = document.querySelector('.splash');
let orbits = document.querySelector('.orbits');
let intro = document.querySelector('.intro');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        splash.classList.add('active');
        orbits.classList.add('hide');

        setTimeout(() => {
            splash.classList.remove('active');
            splash.classList.add('fade');
        }, 3000);

        setTimeout(() => {
            splash.classList.remove('active');
            splash.classList.add('end');
            intro.classList.add('active');
        }, 5000);

    }, 1000);
})

// the FUN stuff!
// preloading all models

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 30);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.rotation.z = 90;
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 8;

renderer.render(scene,camera);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const loader = new GLTFLoader();

// load painted model
var paintedModel;

loader.load( 'models/PsychePainted.glb', function ( gltf ) {

	paintedModel = gltf.scene;
  paintedModel.castShadow = true;
  paintedModel.receiveShadow = true;
  paintedModel.scale.set(1.5, 1.5, 1.5);

  scene.add( paintedModel );

}, undefined, function ( error ) {

	console.error( error );

} );

// load heightmap model
var heightModel;

loader.load( 'models/PsycheHeightMap.glb', function ( gltf ) {

  heightModel = gltf.scene;
  heightModel.castShadow = true;
  heightModel.receiveShadow = true;
  heightModel.scale.set(1.5, 1.5, 1.5);

  scene.add( heightModel );

}, undefined, function ( error ) {

	console.error( error );

} );

// load interior model
var interiorModel;

loader.load( 'models/PsycheLayers.glb', function ( gltf ) {

  interiorModel = gltf.scene;
  interiorModel.castShadow = true;
  interiorModel.receiveShadow = true;
  interiorModel.rotation.y = -90/180*Math.PI;

  scene.add( interiorModel );

}, undefined, function ( error ) {

	console.error( error );

} );

// load impact model
var impactModel;

loader.load( 'models/PsycheImpact.glb', function ( gltf ) {

  impactModel = gltf.scene;
  impactModel.castShadow = true;
  impactModel.receiveShadow = true;
  impactModel.scale.set(3, 3, 3);

  scene.add( impactModel );

}, undefined, function ( error ) {

	console.error( error );

} );

// load final model
var finalModel;

loader.load( 'models/PsycheFormation.glb', function ( gltf ) {

  finalModel = gltf.scene;
  finalModel.castShadow = true;
  finalModel.receiveShadow = true;
  finalModel.scale.set(0.7, 0.7, 0.7);

  scene.add( finalModel );

}, undefined, function ( error ) {

	console.error( error );

} );

// purple plane
const geometry = new THREE.PlaneGeometry( 1000, 1000 );
const material = new THREE.MeshBasicMaterial( {color: 0x302144, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.x = 90/180*Math.PI;
plane.position.y = -7;
plane.receiveShadow = true;
scene.add( plane );

// sun light from top side
const sun = new THREE.DirectionalLight( 0x404040, 10 );
sun.castShadow = true;
sun.position.set(1, 1, 0);
scene.add(sun);

sun.shadow.mapSize.width = 512; // default
sun.shadow.mapSize.height = 512; // default
sun.shadow.camera.near = 0.5; // default
sun.shadow.camera.far = 500; // default

// additional light
const ambient = new THREE.AmbientLight( 0x404040, 1 );
scene.add(ambient);

// lighting for certain models
const ambientBright = new THREE.AmbientLight( 0x404040, 7 );

// const gridHelper = new THREE.GridHelper( 200, 50 );

// orbital controls (click and drag)
const controls = new OrbitControls(camera, renderer.domElement);

// animate the scene
function animate() {
  requestAnimationFrame( animate);

  controls.update();
  if (paintedModel) paintedModel.rotation.y += 0.0005;
  if (heightModel) heightModel.rotation.y += 0.0005;
  if (interiorModel) interiorModel.rotation.y += 0.0005;
  if (impactModel) impactModel.rotation.y += 0.0005;
  renderer.render(scene, camera);
}

// animate without speeding up rotation (for secondary clicks)
function animate1() {
  requestAnimationFrame( animate1 );

  controls.update();

  renderer.render(scene, camera);
}

// start button
var start = document.getElementById('startButton');
start.onclick = function startButton() {
    intro.classList.add('fade');
    orbits.classList.remove('hide');

    scene.remove(heightModel);
    scene.remove(interiorModel);
    scene.remove(impactModel);
    scene.remove(finalModel);
    animate();

    setTimeout(() => {
        intro.classList.add('end');
    }, 3000);
}

// orbit descriptions
let pA = document.getElementById('pA');
let pB = document.getElementById('pB');
let pC = document.getElementById('pC');
let pD = document.getElementById('pD');
let pF = document.getElementById('pF');
let bF = document.getElementById('bF');

// orbit a button
var orbitA = document.getElementById('orbitA');
orbitA.onclick = function buttonA() {
    pA.classList.toggle('show');

    scene.remove(paintedModel);
    scene.add(heightModel);
    scene.remove(interiorModel);
    scene.remove(impactModel);
    scene.remove(finalModel);

    scene.add(ambientBright);
    scene.add(sun);

    animate1();
}

// orbit b button
var orbitB = document.getElementById('orbitB');
orbitB.onclick = function buttonB() {
    pB.classList.toggle('show');

    scene.add(paintedModel);
    scene.remove(heightModel);
    scene.remove(interiorModel);
    scene.remove(impactModel);
    scene.remove(finalModel);

    scene.remove(ambientBright);
    scene.add(sun);

    animate1();
}

// orbit c button
var orbitC = document.getElementById('orbitC');
orbitC.onclick = function buttonC() {
    pC.classList.toggle('show');

    scene.remove(paintedModel);
    scene.remove(heightModel);
    scene.add(interiorModel);
    scene.remove(impactModel);
    scene.remove(finalModel);

    scene.remove(ambientBright);
    scene.add(sun);

    animate1();
}

// orbit d button
var orbitD = document.getElementById('orbitD');
orbitD.onclick = function buttonD() {
    pD.classList.toggle('show');

    scene.remove(paintedModel);
    scene.remove(heightModel);
    scene.remove(interiorModel);
    scene.add(impactModel);
    scene.remove(finalModel);

    scene.remove(ambientBright);
    scene.add(sun);

    animate1();

    bF.classList.add('show');
}

bF.onclick = function bF() {
    pF.classList.toggle('show');

    scene.remove(paintedModel);
    scene.remove(heightModel);
    scene.remove(interiorModel);
    scene.remove(impactModel);
    scene.add(finalModel);

    scene.add(ambientBright);
    scene.add(sun);

    animate1();

    pF.classList.add('show');

    let thanks = document.getElementById('thanks');
    thanks.classList.add('show');
}
