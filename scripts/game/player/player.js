const speedAddition = 0.4;
const speedDecay = 0.1;

class Player {
    constructor(scene) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.PointerLockControls(this.camera);
        
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ specular: 0xff0000, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, opacity: 0 }));
        material.transparent = !debug;
        var crosshair = new Physijs.BoxMesh(geometry, material, 0.1);

        if(MODE==2)
            this.camera.add(crosshair);
            
        this.crosshair = crosshair;
        this.crosshair.position.set(0,0,-40);
        
        this.gun = new Gun(this.camera, this.crosshair, this.controls);
        console.info("Player loaded");
    }
}