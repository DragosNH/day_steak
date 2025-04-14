import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Container
const container = document.getElementById('threejs-background');

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#b7d8b0');

// --- Materials ---
// -- Torus --
const geometry = new THREE.TorusGeometry(8, 0.3, 5, 60);
const material = new THREE.MeshBasicMaterial({ color: 0x57365e, wireframe: true });
// -- Spehere --
const spehereGeometry = new THREE.SphereGeometry( 5, 15, 100 );
const spehereMaterial = new THREE.MeshBasicMaterial({color: 0x38223c, wireframe: false })

// Shapes
const hole = new THREE.Mesh(geometry, material);
const spehere = new THREE.Mesh(spehereGeometry,spehereMaterial) 


// Horizontal
hole.rotation.x = Math.PI / 2;

// Position of the elements
hole.position.set(0, -0.4, -6);
spehere.position.set(0, -0.4, -5);

scene.add(hole);
scene.add(spehere)

// Handle resizing
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

// Animate
function animate() {
    requestAnimationFrame(animate);

    hole.rotation.z += 0.01;
    spehere.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();
