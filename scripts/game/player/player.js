const speedAddition = 0.4;
const speedDecay = 0.1;

class Player {
    constructor(scene) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.PointerLockControls(this.camera);

        this.gun = new Gun(this.camera, this.controls);

        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }));
        var mesh = new Physijs.BoxMesh(geometry, material, 0.1);
        
        this.camera.add(mesh);
        this.mesh = mesh;

        console.info("Player loaded");
    }
}