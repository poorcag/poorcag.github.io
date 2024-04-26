import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( );
renderer.setSize( width, height );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setAnimationLoop( animation );

document.body.appendChild( renderer.domElement );

const wall_geometry = new THREE.BoxGeometry( 0.1, 1, 0.1 );
const wall_mesh = new THREE.Mesh( wall_geometry, material );

scene.add(wall_mesh);

wall_mesh.position.set(0.7, 0, 0);

const particle_geometry = new THREE.BufferGeometry();
const vertices = [];

const sprite = new THREE.TextureLoader().load( '../resources/disc.png' );
sprite.colorSpace = THREE.SRGBColorSpace;

for ( let i = 0; i < 10000; i ++ ) {

	const x = 20 * Math.random() - 10;
	const y = 20 * Math.random() - 10;
	const z = 20 * Math.random() - 10;

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

	const h = time/ 36000;
	particle_material.color.setHSL( h, 0.5, 0.5 );

	renderer.render( scene, camera );

}