const speedAddition = 0.4;
const speedDecay = 0.1;

class Player {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.PointerLockControls(this.camera);

        this.gun = new Gun(this.camera, this.controls);

        console.info("Player loaded");
    }
}