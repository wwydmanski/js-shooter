class Gun {
    constructor(camera) {
        this.camera = camera;

        this.handler = (geometry) => {
            map.scene.add(geometry);
            geometry.position.x = 4;
            geometry.position.y = -2;
            geometry.position.z = -4;
            loader_geometry = geometry;

            this.__proto__ = loader_geometry;

            this.geometry = loader_geometry;

            this.camera.add(this.geometry);

        };

        this.loadGun();

        this.makeBall = () => {
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

        this.shoot = () => {
            var ball = this.makeBall();
            map.addObject(ball);

            var pos = this.localToWorld(new THREE.Vector3());

            var imp_x = -700 * Math.sin(player.controls.getObject().rotation.y);
            var imp_y = 700 * Math.sin(player.controls.getPitchObject().rotation.x + this.physics.rotation.x);
            var imp_z = -700 * Math.cos(player.controls.getObject().rotation.y);
            ball.applyCentralImpulse(new THREE.Vector3(imp_x, imp_y, imp_z));
        }

        this.physics = new GunPhysics(this);
        document.addEventListener('click', this.shoot, true);

        console.info("Gun loaded");
    }

    loadGun() {
        var loader = new THREE.OBJLoader();
        loader.load('resources/flat_pistle.obj', this.handler);
    }
}