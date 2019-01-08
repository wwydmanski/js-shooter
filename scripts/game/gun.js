class Gun {
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;

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

        this.craftBullet = () => {
            var rectangle = new Physijs.SphereMesh(
                new THREE.SphereGeometry(
                    0.2,
                    16,
                    16
                ),
                Physijs.createMaterial(
                    new THREE.MeshLambertMaterial({
                        reflectivity: .8,
                        map: THREE.ImageUtils.loadTexture('plywood.jpg')
                    }),
                    .9,
                    0
                ),
                1
            );
    
            var r = {
                x: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
                y: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
                z: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12
            };
    
            var pos = this.localToWorld(new THREE.Vector3());
            rectangle.rotation.set(r.x, r.y, r.z);
            rectangle.position.x = pos.x;
            rectangle.position.y = pos.y;
            rectangle.position.z = pos.z;
    
            rectangle.castShadow = true;
            rectangle.receiveShadow = true;
    
            return rectangle;
        }

        this.shoot = () => {
            var ball = this.craftBullet();
            map.addObject(ball);

            var imp_x = -700 * Math.sin(this.controls.getObject().rotation.y);
            var imp_y = 700 * Math.sin(this.controls.getPitchObject().rotation.x + this.rotation.x);
            var imp_z = -700 * Math.cos(this.controls.getObject().rotation.y);
            ball.applyCentralImpulse(new THREE.Vector3(imp_x, imp_y, imp_z));

            this.physics.applyRotationForce(2, 0, 0);
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