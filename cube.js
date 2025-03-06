// 等待 DOM 完全加载

document.addEventListener('DOMContentLoaded', function() {

    // 检查 THREE 是否可用

    if (typeof THREE === 'undefined') {

        console.error('THREE is not defined! Make sure Three.js is loaded properly.');

        document.getElementById('info').textContent = 'Error: Three.js library not loaded';

        return;

    }

    

    // 初始化

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x121212);

    

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.set(3, 3, 3);

    

    // 创建渲染器

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    

    // 检查 WebGL 是否可用

    if (!renderer) {

        document.getElementById('info').textContent = 'Error: WebGL not supported by your browser';

        return;

    }

    

    // 获取容器并添加渲染器

    const container = document.getElementById('canvas-container');

    if (!container) {

        console.error('Container element not found!');

        return;

    }

    container.appendChild(renderer.domElement);

    

    try {

        // 添加控制器

        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;

        

        // 添加光源

        const ambientLight = new THREE.AmbientLight(0x404040);

        scene.add(ambientLight);

        

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

        directionalLight.position.set(1, 1, 1);

        scene.add(directionalLight);

        

        // 创建一个简单的立方体（确保能看到内容）

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshPhongMaterial({

            color: 0x2196F3

        });

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        

        // 动画循环

        function animate() {

            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;

            cube.rotation.y += 0.01;

            controls.update();

            renderer.render(scene, camera);

        }

        

        // 窗口大小调整

        window.addEventListener('resize', function() {

            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        });

        

        // 启动动画

        animate();

        

    } catch (e) {

        console.error('Error in Three.js initialization:', e);

        document.getElementById('info').textContent = 'Error: ' + e.message;

    }

});
