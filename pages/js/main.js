import * as THREE from 'three';

import { MapControls } from 'three/addons/controls/MapControls.js';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( );
renderer.setSize( width, height );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setAnimationLoop( animation );

document.body.appendChild( renderer.domElement );

const wall_geometry = new THREE.BoxGeometry( 10, 100, 10 );
const wall_mesh = new THREE.Mesh( wall_geometry, material );

scene.add(wall_mesh);

wall_mesh.position.set(10, 0, 0);

const particle_geometry = new THREE.BufferGeometry();
const vertices = [];

const sprite = new THREE.TextureLoader().load( '../resources/disc.png' );
sprite.colorSpace = THREE.SRGBColorSpace;

const controls = new MapControls( camera, renderer.domElement );

console.log(controls)

// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 100;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 2;

for ( let i = 0; i < 10000; i ++ ) {

	const x = 50 * Math.random() - 25;
	const y = 50 * Math.random() - 25;
	const z = 50 * Math.random() - 25;

	vertices.push( x, y, z );

}

particle_geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

let particle_material = new THREE.PointsMaterial( { size: 0.1, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
particle_material.color.setHSL( 1.0, 0.3, 0.7, THREE.SRGBColorSpace );

const particles = new THREE.Points( particle_geometry, particle_material );
scene.add( particles );

// animation



function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

    wall_mesh.rotation.y = time / 2000;
    wall_mesh.rotation.x = - Math.PI / 5

	const h = time / 36000;
	particle_material.color.setHSL( h, 0.5, 0.5 );

	// controls.update();

	renderer.render( scene, camera );

}