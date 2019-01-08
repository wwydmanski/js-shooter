class Gun {
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;

        this.handler = (geometry) => {
            map.scene.add(geometry);
            this.__proto__ = geometry;
            this.geometry = geometry;
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
    
            var pos = this.localToWorld(new THREE.Vector3());
            rectangle.position.x = pos.x;
            rectangle.position.y = pos.y+1;
            rectangle.position.z = pos.z;
    
            rectangle.castShadow = true;
            rectangle.receiveShadow = true;
    
            return rectangle;
        }

        this.shoot = () => {
            var bullet = this.craftBullet();
            map.addObject(bullet);

            var imp_y = 700 * Math.sin((this.controls.getPitchObject().rotation.x + this.rotation.x));
            var imp_x = -700 * Math.sin(this.controls.getObject().rotation.y)*Math.cos((this.controls.getPitchObject().rotation.x + this.rotation.x));
            var imp_z = -700 * Math.cos(this.controls.getObject().rotation.y)*Math.cos((this.controls.getPitchObject().rotation.x + this.rotation.x));
            bullet.applyCentralImpulse(new THREE.Vector3(imp_x, imp_y, imp_z));

            if(this.physics.ironsights)
                this.physics.applyRotationForce(1, 0, 0);
            else
                this.physics.applyRotationForce(2, 0, 0);
        }

        this.toggleIronsights = () =>{
            this.physics.toggleIronsights();
        }

        this.physics = new GunPhysics(this);
        document.addEventListener('click', (event) => {
            if(event.button==0)
                this.shoot();
            else if(event.button==2)
                this.toggleIronsights();
        }, true);

        console.info("Gun loaded");
    }

    loadGun() {
        var loader = new THREE.OBJLoader();
        loader.load('resources/flat_pistle.obj', this.handler);
    }
}