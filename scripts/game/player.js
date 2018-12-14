class Player {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.PointerLockControls(this.camera);

        this.loadGun();
    }

    loadGun() {
        var loader = new THREE.OBJLoader();
        loader.load('resources/flat_pistle.obj', function (geometry) {
            map.scene.add(geometry);
            player.camera.add(geometry);
            geometry.position.x = 4;
            geometry.position.y = -2;
            geometry.position.z = -4;

            player.gun = geometry;
        });
    }

    handleHUDMovement(velX, velY, velZ) {
        player.gun.position.x = 4-velX*0.5;
        player.gun.position.y = -2-velY*0.1;

        player.gun.rotation.z = velX*0.115;
    }
}