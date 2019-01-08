const speedAddition = 0.4;
const speedDecay = 0.1;

class Player {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new THREE.PointerLockControls(this.camera);

        this.gun = new Gun(this.camera);

        document.addEventListener('click', this.shoot, true);
        console.info("Player loaded");
    }

    shoot() {
        var ball = player.makeBall();
        map.addObject(ball);

        var pos = player.gun.localToWorld(new THREE.Vector3());

        var imp_x = -700*Math.sin(player.controls.getObject().rotation.y);
        var imp_y = pos.rotation.y;
        var imp_z = -700*Math.cos(player.controls.getObject().rotation.y);
        ball.applyCentralImpulse( new THREE.Vector3(imp_x, imp_y, imp_z));
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