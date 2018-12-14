class Player {
    constructor() {
        this.gunVelocity = new THREE.Vector3();
        this.delta = 0.8;
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
        player.gun.position.z = -4-velZ*0.1;

        player.gun.rotation.x = -velZ*0.115;
        player.gun.rotation.z = velX*0.115;
    }

    handleMouseRotation(movX, movY) {
        player.delta *= player.delta;
        player.gunVelocity.x += ( - player.gunVelocity.x ) * 0.08 * player.delta;
        player.gunVelocity.y += ( - player.gunVelocity.y ) * 0.08 * player.delta;

        if(movX > 0 || movY > 0){
            player.gunVelocity.x += movX*player.delta*0.01;
            player.gunVelocity.y += movY*player.delta*0.01;
        }
        else {
            player.delta = 0.8;
            // player.gunVelocity.x += movX*0.005*delta;
            // player.gunVelocity.y += movY*0.001*delta;
        }


        player.gun.position.x = 4-player.gunVelocity.x;
        player.gun.position.y = -2-player.gunVelocity.y;
        player.gun.rotation.z = player.gunVelocity.x;
        console.info(player.gunVelocity);
    }
}