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
scene.background = new THREE.Color('#48274f');

// Materials
const geometry = new THREE.TorusGeometry(1.4, 0.2, 16, 50);
const material = new THREE.MeshBasicMaterial({ color: 0xb7d8b0, wireframe: true });
const hole = new THREE.Mesh(geometry, material);

// Horizontal
hole.rotation.x = Math.PI / 2;

// Position the torus
hole.position.set(0, 6, -5);

scene.add(hole);

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

    renderer.render(scene, camera);
}
animate();
