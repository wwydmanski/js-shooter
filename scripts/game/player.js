const speedAddition = 0.4;
const speedDecay = 0.1;

class Player {
    constructor() {
        this.gunVelocity = new THREE.Vector3();
        this.gunMaxOffset = new THREE.Vector3();
        this.gunMaxOffset.x = [2, 6];
        this.gunMaxOffset.y = [-4, 0];

        this.delta = 1.0;
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.PointerLockControls(this.camera);

        this.loadGun();

        this.debug = 0;

        document.addEventListener('click', this.shoot, true);
        console.info("Player loaded");
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
        player.gun.position.x = Math.min(Math.max(4-player.gunVelocity.x, player.gunMaxOffset.x[0]), player.gunMaxOffset.x[1]);
        player.gun.position.y = Math.min(Math.max(-2+player.gunVelocity.y, player.gunMaxOffset.y[0]), player.gunMaxOffset.y[1]);

        if(velY!=0 && !player.gunMaxOffset.y.includes(player.gun.position.y))
            player.gunVelocity.y -= speedAddition * velY*0.1;

        player.gun.rotation.x = -velZ * 0.115;
        player.gun.rotation.z = velX * 0.115;
        this.decaySpeed();
    }

    shoot() {
        var ball = player.makeBall();
        map.addObject(ball);

        ball.applyCentralImpulse( new THREE.Vector3(-700*Math.sin(player.controls.getObject().rotation.y), 0, -700*Math.cos(player.controls.getObject().rotation.y)));
    }

    handleMouseRotation(movX, movY) {
        if(movX!=0 && !player.gunMaxOffset.x.includes(player.gun.position.x))
            player.gunVelocity.x += speedAddition * movX*0.01;
        if(movY!=0 && !player.gunMaxOffset.y.includes(player.gun.position.y))
            player.gunVelocity.y += speedAddition * movY*0.01;
    }

    decaySpeed() {
        player.gunVelocity.x -= speedDecay * Math.sign(player.gunVelocity.x);
        player.gunVelocity.y -= speedDecay * Math.sign(player.gunVelocity.y);
        if (Math.abs(player.gunVelocity.x) <= speedDecay)
            player.gunVelocity.x = 0;
        if (Math.abs(player.gunVelocity.y) <= speedDecay)
            player.gunVelocity.y = 0;
    }

    makeBall() {
        var rectangle = new Physijs.SphereMesh(
            new THREE.SphereGeometry(
                Math.random() * (4 - 1) + 1,
                16,
                16
            ),
            Physijs.createMaterial(
                new THREE.MeshLambertMaterial({
                    reflectivity: .8,
                    map: THREE.ImageUtils.loadTexture('plywood.jpg')
                }),
                .9,
                .1
            ),
            1
        );

        var r = {
            x: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
            y: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
            z: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12
        };
        
        // var pos = player.controls.getObject().position;
        var pos = player.gun.localToWorld(new THREE.Vector3());
        rectangle.rotation.set(r.x, r.y, r.z);
        rectangle.position.x = pos.x;
        rectangle.position.y = pos.y;
        rectangle.position.z = pos.z;

        rectangle.castShadow = true;
        rectangle.receiveShadow = true;

        return rectangle;
    }
}